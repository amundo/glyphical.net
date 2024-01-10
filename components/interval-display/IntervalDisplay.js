class IntervalDisplay extends HTMLElement {
  constructor(){
    super()
    this.innerHTML = `<h1></h1>`
    this.currentIndex = 0
    this.intervalDuration = 2000
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
    if(attribute == 'duration'){
      this.intervalDuration = parseInterval(newValue)
    }
  }

  set data(data){
    if(data.metadata){
      this.metadata = data.metadata
    }
    
    Object.entries(data).forEach(([key, value]) => {
      this.dataKey = key
      if(Array.isArray(value)){
        this[key] = value
      }
    })
    
    this.render()
  }

  get data(){
    return {
      metadata: this.metadata,
      [this.dataKey]: this[this.dataKey]
    }
  }
  
  render(){
      let h1 = this.querySelector('h1')
      let item = this[this.dataKey][this.currentIndex]

      h1.textContent = item
      setInterval(() => {
        this.currentIndex++
        if(this.currentIndex >= this[this.dataKey].length){
          this.currentIndex = 0
        } else {
          h1.textContent = this[this.dataKey][this.currentIndex]
        }
    }, parseInterval(this.intervalDuration))
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {IntervalDisplay}
customElements.define('interval-display', IntervalDisplay)
