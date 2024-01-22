import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"


let removeSpuriousMains = htmlString => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let mains = Array.from(doc.querySelectorAll("main"))
  mains
    .filter(main => main.textContent.trim().length)
    .forEach(main => main.remove())
  
  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(removeSpuriousMains)