import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

function copyHeaderIntoFooter(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if(doc.querySelector('header#lesson-header')){
    let footer = doc.createElement('footer')
    let main = doc.querySelector('main')
    let header = doc.querySelector('header')
    footer.innerHTML = header.innerHTML
    footer.id = 'lesson-footer'
    main.after(footer)
  }


  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(copyHeaderIntoFooter)
