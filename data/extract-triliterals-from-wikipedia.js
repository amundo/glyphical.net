// extract-triliterals-from-wikipedia.js
// Run script with deno (see task)
// run script with 

import {tableToJSON} from './table-to-json.js'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

let response = await fetch('https://en.wikipedia.org/wiki/Egyptian_triliteral_signs')
let html = await response.text()
let document = new DOMParser().parseFromString(html, 'text/html')

let table = document.querySelector('.wikitable')
let trs = Array.from(table.querySelectorAll('tr'))

trs.forEach(tr => {
  tr.firstElementChild.remove()
})

let data = tableToJSON(table).data

let oldHeaders = [ "Gardiner", "Unicode", "Transl.", "Description", "Notes" ]
let newHeaders = ['gardiner', 'hieroglyph', 'triliteral', 'description', 'notes']

let hieroglyphs = data.map(data => {
  return oldHeaders.reduce((newHieroglyph, oldHeader, i) => {
    newHieroglyph[newHeaders[i]] = data[oldHeader]
    return newHieroglyph
  }, {})
})

let metadata = {
  "title": "Triliterals",
  "source": "Wikipedia",
  "url": "https://en.wikipedia.org/wiki/Egyptian_triliteral_signs",
  "parsedWith": "extract-triliterals-from-wikipedia.js"
}


Deno.writeTextFile('triliterals.json', JSON.stringify({metadata, hieroglyphs}, null, 2))