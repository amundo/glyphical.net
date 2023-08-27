import {DB} from './DB.js'
import { match } from "https://pathall.net/match/v1.0.1/match.js"
// import { match } from "http://localhost:1111/modules/match/match.js"

class HieroglyphDb extends DB {
  constructor(url){
    super(url)  // pass url to super class
    // this.initialize()
    this.initialize()
  }

  async initialize(){
    await this.fetch()
  }

  random(n = 1){
    return Array.from(Array(this.hieroglyphs.length), (_,i) => i)
      .sort(() => Math.random() <= .5 ? 1 : -1)
      .slice(0, n)
      .map(n => this.hieroglyphs[n])
  }

  search(query){
    return this.hieroglyphs
      .filter(hieroglyph => {
        return match(query,hieroglyph)
      })
  }
  
  get categories(){
    return Object.keys(this.byCategory);
  }

  get byCategory(){
    return this.groupBy('collection');
  }
}

let hieroglyphDb = new HieroglyphDb('./hieroglyphs.json')
await hieroglyphDb.initialize()

export {hieroglyphDb}

