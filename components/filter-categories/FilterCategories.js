class FilterCategories extends HTMLElement {
  #categories = []

  constructor(){
    super()
    this.listen()
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

  
  set data(categories){
    this.#categories = categories
    this.render()
  }

  get data(){
    return this.categories
  }

  renderCategories(){
    this.#categories.reduce((ul, {symbol,label,category,id}) => {
      let li = document.createElement('li')
      li.innerHTML = `<button class=category-button data-category="${category}">${symbol}</button>`
      ul.append(li)
      return ul
    }, document.createElement('ul'))
    
    document.body.innerHTML = ``
    document.body.append(ul)
  }

  render(){
    this.renderCategories()
  }
}

export {FilterCategories}
customElements.define('filter-categories', FilterCategories)
