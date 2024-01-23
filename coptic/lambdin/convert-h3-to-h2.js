import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let convertH3toH2 = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let h3s = doc.querySelectorAll("section.vocabulary h3, section.exercises h3")

  for (let h3 of h3s) {
    let section = h3.parentElement

    // replace class with id
    let sectionClass = section.classList[0]
    section.id = sectionClass
    section.classList.remove(sectionClass)
    section.removeAttribute("class")

    // replace h3 with h2
    let h2 = doc.createElement("h2")
    h2.setAttribute("id", `${section.id}-heading`)
    h2.innerHTML = h3.innerHTML
    h3.replaceWith(h2)
  }

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(convertH3toH2)
