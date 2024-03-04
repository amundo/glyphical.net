import {MarkdownBlock, MarkdownSpan, MarkdownElement} from "https://md-block.verou.me/md-block.js"

class TranscribeImage extends HTMLElement {
  constructor() {
    super()
    this.listen()
    this.dataset.layout = 'column'
  }

  connectedCallback() {

    this.innerHTML = `
<figure>
  <img class=fit-image>
  <figcaption>
      <a target=_blank></a>
  </figcaption>
</figure>
<textarea></textarea>
<md-block></md-block>
    `
    this.render()
  }

  static get observedAttributes() {
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute == "src") {
      this.src =  newValue
      console.log(`setting src to: ${newValue}`)
    }
  }

  set src(value){
    this.url = new URL(value, document.location.href)
    this.render()
  }

  get data() {
    return {
      transcription: this.querySelector('textarea').value,
      src: this.querySelector('img').src
    }
  }

  render() {
    this.querySelector('img').src = this.url.href
    let fileName = this.url.pathname.split('/').pop()
    this.querySelector('figcaption a').textContent = fileName
    this.querySelector('figcaption a').href = this.url.href
  }

  listen() {
    this.addEventListener('input', inputEvent => {
      if (inputEvent.target.matches('textarea')) {
        this.querySelector('md-block').mdContent = this.querySelector('textarea').value
        this.dispatchEvent(new CustomEvent('transcribe-image-input', {
          bubbles: true
        }))
      }


    })

    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches("img")){
        let img = clickEvent.target
        img.classList.toggle('fit-image')
      }
    })
  }
}

export { TranscribeImage }
customElements.define('transcribe-image', TranscribeImage)
