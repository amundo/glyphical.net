import {DB} from './DB.js'
import { match } from "https://pathall.net/match/v1.0.0/match.js"
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

