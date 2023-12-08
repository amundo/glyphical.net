class CategoryChip extends HTMLElement {
  constructor(){
    super()

    this.innerHTML = `
    <span class="category-chip-symbol"></span>
    <span class="category-chip-label"></span>
    <span class="tooltip"></span>
    `

    this.listen()

  }

  set data(category){
    this.category = category
    this.render()
  }

  get data(){
    return this.category 
  }

  render(){
    this.querySelector('.category-chip-symbol').innerHTML = this.data.symbol
    this.querySelector('.category-chip-label').innerHTML = this.data.label
    this.querySelector('.tooltip').innerHTML = `<code>${this.data.id}</code> ${this.data.category}`
  }

  listen(){
    this.addEventListener('mousemove', mousemoveEvent => {
      let tooltip = this.querySelector('.tooltip')
      let x = mousemoveEvent.clientX;
      let y = mousemoveEvent.clientY;
      tooltip.style.left = `${x + 10}px`
      tooltip.style.top = `${y + 10}px`;
    })
    
  }
}

export {CategoryChip}
customElements.define('category-chip', CategoryChip)
