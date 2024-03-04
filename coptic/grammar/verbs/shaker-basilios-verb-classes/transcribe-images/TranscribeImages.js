import {TranscribeImage} from '../transcribe-image/TranscribeImage.js'

class TranscribeImages extends HTMLElement {
  constructor(){
    super()
    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      this.fetch(newValue)
    }
  }

  parseUrls(plaintext){
    let urls = plaintext.split('\n')
    urls = urls.map(url => new URL(url, document.location.href).href)
    console.log(urls[0])
    return urls
  }

  set data(urls){
    if(!Array.isArray(urls) && typeof urls == 'string'){
      urls = this.parseUrls(urls)
    } else {
      urls = urls.map(url => this.parseUrls(url))
    }

    this.urls = urls
    this.render()
  }

  get data(){
    return Array.from(this.querySelectorAll('transcribe-image'))
      .map(transcribeImage => transcribeImage.data)

  }
  render(){
    this.urls.forEach(url => {
      // let transcribeImage = document.createElement('transcribe-image')
      let transcribeImage = new TranscribeImage()

      this.appendChild(transcribeImage)
      transcribeImage.setAttribute('src', url)
    })
  }

  listen(){
  }
}

export {TranscribeImages}
customElements.define('transcribe-images', TranscribeImages)
