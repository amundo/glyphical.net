import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

function makeExercisesAccordions(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")
  
  Array.from(doc.querySelectorAll('#exercises ul'))
  .forEach(ul => {
    let exercise = ul.parentElement
    let coptic = exercise.querySelector("span.c").textContent.trim()
  
    let answer = exercise.querySelector("li").textContent.trim()
    let details = doc.createElement('details')
    details.innerHTML = `<summary><span class=c>${coptic}</span></summary>
    ${answer}
    `
    
    let li = doc.createElement('li')
    li.append(details)
    exercise.replaceWith(li)
  })


  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(makeExercisesAccordions)
