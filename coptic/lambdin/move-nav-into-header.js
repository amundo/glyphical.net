import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

function moveNavIntoHeader(htmlString){
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if (doc.querySelector('header.lesson-header') && doc.querySelector('nav#lesson-nav') ) {
    let header = doc.querySelector('header.lesson-header') 
    let nav = doc.querySelector('nav#lesson-nav')
    // assymetrical, make both ids
    header.id = 'lesson-header'
    header.classList.remove('lesson-header')

    header.append(nav)
  }

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(moveNavIntoHeader)