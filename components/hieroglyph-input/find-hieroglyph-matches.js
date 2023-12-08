import { hieroglyphDb } from '../../data/hieroglyphs-db.js';

/**
 * Tokenizes a query string into an array of trimmed, non-empty tokens.
 * 
 * @param {string} query - The query string to tokenize.
 * @returns {string[]} An array of string tokens.
 */
let tokenizeQuery = query => query
  .split(/\p{White_Space}+/gu)
  .map(token => token.trim())
  .filter(Boolean);

/**
 * Finds matching items based on the query tokens and specified fields.
 * 
 * @param {string} query - The query string to use for matching.
 * @param {Object[]} items - The array of items to search within.
 * @param {string[]} fields - The fields within each item to check for matches.
 * @returns {Object[]} An array of items that match the query.
 */
let findMatches = (query, items, fields) => {
  let queryTokens = tokenizeQuery(query);
  console.log(queryTokens);
  return items
    .filter((item) =>
      queryTokens.every(queryToken => 
        fields.some((field) => 
          item[field]?.includes(queryToken)) 
        )
    );
};

/**
 * Finds matches in the hieroglyph database based on the given query.
 * 
 * @param {string} query - The query string to search for in the hieroglyph database.
 * @returns {Object[]} An array of hieroglyphs that match the query.
 */
let findHieroglyphMatches = (query) =>
  findMatches(query, hieroglyphDb.hieroglyphs, ["hieroglyph", "description", "gardiner"]);

export { findHieroglyphMatches };
