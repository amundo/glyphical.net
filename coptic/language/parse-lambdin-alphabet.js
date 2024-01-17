// parse-lambdin.js
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";


let parseLamdin = dom => Array.from(dom.querySelectorAll('#alphabet li'))
.map(li => {
  let [coptic, latin] = Array.from(li.querySelectorAll('span'))
    .map(el => el.textContent.trim())
  return { coptic, latin}
})

let path = `../lambdin/lessons/05_The_Coptic_Alphabet.html`
let html = await Deno.readTextFile(path)


let orthography = parseLamdin(new DOMParser().parseFromString(html, 'text/html'))

// Lambdin gives two transliterations for these, choosing the simplest
orthography.find(({coptic}) => coptic === 'ϫ').latin = 'j'
orthography.find(({coptic}) => coptic === 'ϭ').latin = 'c'

let changeset = {
  description: "Extract Lambdin Coptic alphabet and transliteration",
  changes: [{
    operation: "add",
    path: [],
    data: {
      orthography 
    }
  }]
}


await Deno.writeTextFile(
  "parse-lambdin-alphabet.changeset.json",
  JSON.stringify(changeset, null, 2),
);
