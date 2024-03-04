import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

function copyHeaderIntoFooter(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")
  let footer = doc.createElement('footer')
  let main = doc.querySelector('main')
  let header = doc.querySelector('header')
  let headerClone = header.cloneNode(true)
  main.append(footer)

  if ( doc.querySelector("header.lesson-header") ){
    footer.append(headerClone)
  }

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(copyHeaderIntoFooter)
