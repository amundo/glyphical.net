import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"


let x = htmlString => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let replaceDivsWithSections = (oldClass, newClass) => {
    let divs = Array.from(
      doc.querySelectorAll(`div[class="${oldClass}"]`)
    )
  
    divs.forEach(div => {
      // replace with <section class=exercises>
      let section = doc.createElement('section')
      section.classList.add(newClass)
      div.before(section)
      section.innerHTML = div.innerHTML
      div.remove()
    })
  }

  replaceDivsWithSections('end-exercises', 'exercises')
  replaceDivsWithSections('end-vocabulary', 'vocabulary')
  
  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(x)