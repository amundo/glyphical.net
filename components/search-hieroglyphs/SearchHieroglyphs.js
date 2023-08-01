import { HieroglyphView } from "./hieroglyph-view/HieroglyphView.js"
import { hieroglyphDb } from '../../data/hieroglyphs-db.js'
import { parseQueryString } from "https://pathall.net/parse-query-string/v1.0.1/parse-query-string.js"

// await hieroglyphDb.initialize()

const shortcuts = {
  "d": "description",
  "c": "category",
  "g": "gardiner",
  "m": "mdc",
  "h": "hieroglyph",
  "u": "unicode",
  "l": "literal"
}

class SearchHieroglyphs extends HTMLElement {
  constructor(){
    super()
    this.db = hieroglyphDb  

    this.innerHTML = `
      <div class="results-info"></div>
      <div class="results"></div>
    `

    this.state = {
      query: {},
      results: []
    }

    this.initialize()
    this.listen()
  }

  async initialize(){
    this.state = {
      query: {},
      results: this.db.hieroglyphs
    };

    this.render()
  }

  stringifyQuery(query){
    return query
      .map(([key,value]) => `${key}:${value}`)
      .join(' ')
  }

  clear(){
    this.querySelector('.results').innerHTML = ''
    this.querySelector('.results-info').innerHTML = ''
  }

  render() {  
    this.clear();
    this.renderResultsInfo(this.state.query, this.state.results);
    this.renderResults(this.state.query, this.state.results);
  }

  renderResultsInfo(query={}, results=this.db.hieroglyphs){
    if (!results) {
      return; // If results is undefined, exit the function early
    }

    if(Object.entries(query).length > 0){
      this.querySelector('.results-info')
        .innerHTML = `Your search for <mark class=search-query-mark>${this.stringifyQuery(query)}</mark> had ${results.length} result${results.length !== 1 ? 's' : ''}. `

      this.querySelector('.results-info')
        .insertAdjacentHTML('beforeend', `<button class=clear-results-button>Clear</button>`)
    }
  }

  renderResults(query={}, results=this.db.hieroglyphs){
    this.clear()

    this.renderResultsInfo(query, results)

    if(Object.entries(query).length === 0){
      results.sort(() => Math.random() - 0.5)
    }
    
    results.forEach(result => {
      let hieroglyphView = new HieroglyphView()
      hieroglyphView.data = result
      this.querySelector('.results')
        .append(hieroglyphView)
    })
  }

  search(query){
    if(typeof query === 'string'){
      query = parseQueryString(query, {shortcuts, defaultCategory: "description" })
    }


    this.state.query = query
    this.state.results = this.db.search(query)
    this.render()
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches('.clear-results-button')){
        this.renderResults()
      }

      if(clickEvent.shiftKey && clickEvent.target.matches('hieroglyph-view .hieroglyph')){
        clickEvent.target.closest('hieroglyph-view').classList.toggle('selected')
      }
    })
    
    this.addEventListener('category-clicked', categoryClickedEvent => {
      let category = categoryClickedEvent.detail
      this.search(`category:${category}`)
    })
  }
}

customElements.define('search-hieroglyphs', SearchHieroglyphs)

export {
  SearchHieroglyphs
}