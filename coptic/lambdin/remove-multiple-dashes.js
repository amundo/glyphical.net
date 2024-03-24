import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

// this is dumb and an artefact of a previous script oh well
let removeMultipleDashes = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let els = Array.from(doc.querySelectorAll('*'))

  els
    .filter(el => el.getAttribute('id') && el.getAttribute('id').match(/^--+/))
    .forEach(el => el.setAttribute("id", el.getAttribute('id').replace(/^-+/, '')))

  els
    .filter(el => el.getAttribute('href') && el.getAttribute('href').match(/^#-+/))
    .forEach(el => el.setAttribute("href", el.getAttribute('href').replace(/^#-+/, '#')) )


  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(removeMultipleDashes)
