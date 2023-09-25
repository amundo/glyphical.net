import { hieroglyphDb } from "../../data/hieroglyphs-db.js"
import { HieroglyphView } from "../search-hieroglyphs/hieroglyph-view/HieroglyphView.js"

class ByAspect extends HTMLElement {
  constructor(){
    super()
    this.db = hieroglyphDb
    this.innerHTML = `
      <div class=sorted></div>
      <hieroglyph-view></hieroglyph-view>
    `
    this.listen()
  }

  connectedCallback(){
    this.db.hieroglyphs.forEach(hieroglyph => {
      let span = document.createElement('span')
      span.textContent = hieroglyph.hieroglyph
      span.hieroglyph = hieroglyph
      this.querySelector('.sorted').appendChild(span)

      let {width,height} = span.getBoundingClientRect()
      let aspect = width / height

      span.dataset.aspect = aspect
    })

    let spans = Array.from(this.querySelectorAll('span'))
    spans.sort((a,b) => parseFloat(a.dataset.aspect) - parseFloat(b.dataset.aspect))

    spans.forEach(span => this.querySelector('.sorted').appendChild(span))
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches('span')){
        if(clickEvent.target.classList.contains('selected')){
          clickEvent.target.classList.remove('selected')
        } else {
          this.querySelectorAll('span').forEach(span => span.classList.remove('selected'))
          clickEvent.target.classList.add('selected')
          this.querySelector('hieroglyph-view').data = clickEvent.target.hieroglyph

        }
      }
    })

    this.addEventListener('mouseover', mouseoverEvent => {
      if(mouseoverEvent.target.matches('span') && !this.querySelector(".selected")){
        this.querySelector('hieroglyph-view').data = mouseoverEvent.target.hieroglyph
      }
    })
  }
}

export {ByAspect}
customElements.define('by-aspect', ByAspect)
