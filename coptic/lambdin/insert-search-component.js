import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

function insertSearchComponent(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if(doc.querySelector('header')){
    let searchToggleButton = `  <button id="toggle-search-button" class="search-button" aria-label="Search">🔍</button>`
    let importSearchComponent = `  <script type="module" src="./lambdin.js"></script>`
    let importSearchComponentCSS = `<link rel="stylesheet" href="../../../components/search-book/search-book.css">`
    let searchComponent = `<search-book src="lesson-index.json"></search-book>`
    
    doc.querySelector('header').innerHTML +=  searchToggleButton
    doc.querySelector('footer').innerHTML += searchComponent
    doc.querySelector('head').innerHTML += importSearchComponent
    doc.querySelector('head').innerHTML += importSearchComponentCSS
    
    return `<!doctype html>
    ${doc.documentElement.outerHTML}
    `
  }
}

updateFiles(insertSearchComponent)
