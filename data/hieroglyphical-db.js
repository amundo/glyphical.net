import {DB} from './DB.js'
import {match} from '../modules/match.js'

class HieroglyphDb extends DB {
  constructor(url){
    super(url)  // pass url to super class
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