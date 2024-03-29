import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let convertH3toH2 = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let toplinks = doc.querySelectorAll('main h3 .top-link')

  toplinks.forEach(toplink => {
    toplink.textContent = '⬆'
  })  

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(convertH3toH2)
