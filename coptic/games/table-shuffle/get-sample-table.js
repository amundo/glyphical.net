// use deno_dom 
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"


let getSampleTable = async () => {
  let request = await fetch('https://en.wikipedia.org/wiki/Coptic_language')
  let html = await request.text()
  let doc = new DOMParser().parseFromString(html, 'text/html')
  let table = doc.querySelector('table.wikitable:nth-child(137)')
  return table
}

let table = await getSampleTable()

export {table}