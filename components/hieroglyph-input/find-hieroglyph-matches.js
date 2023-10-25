import {hieroglyphDb} from '../../data/hieroglyphs-db.js'

let tokenizeQuery = query => query
  .split(/\p{White_Space}+/gu)
  .map(token => token.trim())
  .filter(Boolean)


let findMatches = (query, items, fields) => {
  let queryTokens = tokenizeQuery(query)
console.log(queryTokens)
  return items
    .filter((item) =>
      queryTokens.every(queryToken => 
        fields.some((field) => 
          item[field]?.includes(queryToken)) 
        )
    )
}

let findHieroglyphMatches = (query) =>
  findMatches(query, hieroglyphDb.hieroglyphs, ["hieroglyph", "description", "gardiner"])

export { findHieroglyphMatches }
