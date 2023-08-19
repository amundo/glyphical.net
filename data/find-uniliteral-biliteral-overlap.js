/*

find hieroglyphs that occur in both biliterals.json & uniliterals.json
and print out the hieroglyphs that are in both files
using deno

*/


// import the json files
import biliterals from './biliterals.json' assert { type: "json" };
import uniliterals from './uniliterals.json' assert { type: "json" };

let shared = []

uniliterals.hieroglyphs.filter(uniliteral => {
  biliterals.hieroglyphs.filter(biliteral => {
    if (biliteral.hieroglyph === uniliteral.hieroglyph) {
      shared.push(uniliteral.hieroglyph)
    }
  })
})

console.table(shared)