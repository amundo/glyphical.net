import {match} from '../modules/match.js'

class DB {
  constructor(){
    this.fetch()
  }

  async fetch(){
    let url = new URL('./hieroglyphs.json', import.meta.url)
    let hieroglyphsResponse = await fetch(url)
    let {hieroglyphs, metadata} = await hieroglyphsResponse.json()

    this.hieroglyphs = hieroglyphs
    this.metadata = metadata
  }

  get categories(){
    return this.hieroglyphs
      .reduce((categories, hieroglyph) => {
        if(!categories.includes(hieroglyph.category)){
          categories.push(hieroglyph.category)
        }
        return categories
      }, [])
  }
  get byCategory(){
    if(!this.cachedByCategory){
      this.cachedByCategory = this.hieroglyphs
      .reduce((byCategory, hieroglyph) => {
        if(!byCategory[hieroglyph.category]){
          byCategory[hieroglyph.category] = []
        }
        byCategory[hieroglyph.category].push(hieroglyph)
        return byCategory
      }, {})
    }
    return this.cachedByCategory
  }

  search(query){
    console.log('searching', query)
    return this.hieroglyphs
      .filter(hieroglyph => {
        return match(query,hieroglyph)
      })
  }
}

let hieroglyphDb = new DB()
await hieroglyphDb.fetch()

window.hieroglyphDb = hieroglyphDb
export {hieroglyphDb}