import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let changeToplinkArrow = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let toplinks = doc.querySelectorAll('.top-link')

  toplinks.forEach(toplink => {
    toplink.textContent = '⬆'
  })  

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(changeToplinkArrow)
