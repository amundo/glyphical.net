class MuseumMap extends HTMLElement {
  #map = null
  constructor(){
    super()
    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let xml = await response.text()
    let dom = new DOMParser().parseFromString(xml, "image/svg+xml")
    let svg = dom.firstElementChild
    this.map = svg
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["src"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "src"){
      let url = new URL(newValue, document.location.href).href
      this.fetch(url)
    }
  }

  set map(svg){
    this.#map = svg
    this.render()
  }

  get map(){
    return this.#map
  }

  render(){
    this.innerHTML = ``
    this.appendChild(this.#map)
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      let target = clickEvent.target.closest('g[id^=gallery-]')
      if(target){
        target.dispatchEvent(new CustomEvent('gallery-click', {
          bubbles: true
        }))
      }
    })
  }
}

export {MuseumMap}
customElements.define('museum-map', MuseumMap)
