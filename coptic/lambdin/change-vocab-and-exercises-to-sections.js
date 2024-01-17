import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"


let x = htmlString => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let replaceDivsWithSections = (oldClass, newClass) => {
    if(!doc.querySelector(`div.${oldClass}`)) return
    
    let div = doc.querySelector(`div.${oldClass}`)

    // replace with <section class=newClass
    let section = doc.createElement('section')
    console.table({div, section})
    section.classList.add(newClass)
    div.before(section)
    section.innerHTML = div.innerHTML
    div.remove()
  }

  replaceDivsWithSections('end-exercises', 'exercises')
  replaceDivsWithSections('end-vocabulary', 'vocabulary')
  
  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(x)