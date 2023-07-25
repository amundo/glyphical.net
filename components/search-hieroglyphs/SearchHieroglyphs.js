import { match } from "https://docling.land/modules/match.js"
import { HieroglyphView } from "./hieroglyph-view/HieroglyphView.js"
import {hieroglyphDb} from '../../data/hieroglyphical-db.js'
import { parseQueryString } from "../../modules/parse-query-string.js"

class SearchHieroglyphs extends HTMLElement {
  constructor(){
    super()
    this.db = hieroglyphDb  

    this.innerHTML = `
      <div class="results-info"></div>
      <div class="results"></div>
    `

    this.listen()
    this.initialize()
  }

  async initialize(){
    await this.db.fetch() // Ensure the data is loaded before proceeding

    this.state = {
      query: {},
      results: this.db.hieroglyphs,
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
    if(Object.entries(query).length > 0){
      this.querySelector('.results-info')
        .innerHTML = `Your search for "${this.stringifyQuery(query)}" had ${results.length} result${results.length !== 1 ? 's' : ''}. `

      this.querySelector('.results-info')
        .insertAdjacentHTML('beforeend', `<button class=clear-results-button>Clear</button>`)

    }
  }

  renderResults(query={}, results=this.db.hieroglyphs){
    console.log({query, hieros: this.db.hieroglyphs.length})
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
      query = parseQueryString(query)
    }
    let results = this.db.search(query)
    this.renderResults(query, results)
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches('.clear-results-button')){
        this.renderResults()
      }
    })
    
    this.addEventListener('hieroglyph-clicked', hieroglyphClickedEvent => {
      let hieroglyph = hieroglyphClickedEvent.detail
      this.search(`hieroglyph:${hieroglyph.hieroglyph}`)
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