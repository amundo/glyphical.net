import { shuffleArray } from "./shuffle-array.js"
import {HieroglyphView} from "../../components/search-hieroglyphs/hieroglyph-view/HieroglyphView.js"
import {TypeWriter} from 'https://pathall.net/type-writer/v1.0.2/TypeWriter.js'

class HieroBird extends HTMLElement {
  constructor() {
    super()

    this.score = 0
    this.targetHieroglyph = null
    this.hieroglyphs = []

    this.innerHTML = `    
        <section id="birds">

        </section>
        
        <section id="message-bar">
            <p id="target-description">catch the <span id=target-description></span>!</p>
        </section>

        <section id="game-controls">
            <button id="reset-button">Reset Game</button>
            <button id="exit-button">Exit Game</button>
            <button id="toggle-music-button">🎵⏯️</button>
            <audio></audio>
        </section>

        <section id="score-display">
            Score: <span id="score">0</span>
        </section>
  `

    this.messageBar = this.querySelector('#message-bar')
    this.descriptionSpan = this.querySelector('#target-description')
    this.birdsContainer = this.querySelector('#birds')
    this.scoreDisplay = this.querySelector('#score')
    this.resetButton = this.querySelector('#reset-button')
    this.exitButton = this.querySelector('#exit-button')
    this.toggleMusicButton = this.querySelector('#toggle-music')
    this.audioPlayer = this.querySelector('audio')
    this.audioPlayer.src = 'audio/Mark Wilson X - Cry of the Desert.mp3'

    this.fetch()
    this.listen()
  }

  async fetch() {
    let response = await fetch(`https://glyphical.net/data/hieroglyphs.json`)
    let data = await response.json()
    let hieroglyphs = data.hieroglyphs
      .filter((h) => h.category === "Birds")
      .filter((h) =>
      !["combin", "with", " on ", " in ", "two", "three", "picking up"]
        .some((x) => h.description.toLowerCase().includes(x))
      )

    this.hieroglyphs = hieroglyphs
    await this.deal()
  }
    
  async deal(){
    shuffleArray(this.hieroglyphs)

    this.currentHieroglyphs = this.hieroglyphs.slice(0, 5)

    const targetIndex = Math.floor(Math.random() * this.currentHieroglyphs.length)
    this.targetHieroglyph = this.currentHieroglyphs[targetIndex]

    this.render()
  }

  renderHieroglyph(hieroglyph) {
    let hieroglyphView = new HieroglyphView()
    hieroglyphView.data = hieroglyph
    
    hieroglyphView.style.top = `${Math.random() * 80}%`
    hieroglyphView.style.right = `0`

    const duration = 40000 + Math.random() * 4000 // 10-14 seconds
    const delay = Math.random() * 1000 // 0-1 seconds

    hieroglyphView.animate([
      { transform: "translateX(100%)" },
      { transform: "translateX(0%)" },
    ], {
      duration,
      delay,
      iterations: Infinity,
    })

    hieroglyphView.addEventListener("click", clickEvent => {
      if (hieroglyphView.data.hieroglyph === this.targetHieroglyph.hieroglyph) {
        this.score++
        this.deal()
      } else {
        this.score--
      }
      this.scoreDisplay.textContent = this.score
    })

    this.birdsContainer.append(hieroglyphView)
  }

  render() {

    this.descriptionSpan.textContent = this.targetHieroglyph.description

    this.birdsContainer.innerHTML = ''
    this.currentHieroglyphs.forEach((hieroglyph) =>
      this.renderHieroglyph(hieroglyph)
    )
  }

  listen() {
    this.addEventListener("click", (clickEvent) => {
      if (clickEvent.target.matches('#toggle-music-button')) { 
        if(this.audioPlayer.paused){
          this.audioPlayer.play()
        } else {
          this.audioPlayer.pause()
        }

      }
    })
  }
}

export { HieroBird }
customElements.define("hiero-bird", HieroBird)
