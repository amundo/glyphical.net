import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let makeQuestionsInteractive = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  let lis = Array.from(doc.querySelectorAll("ol ol li"))
  console.log(lis.length)
  lis.every((li) => li.querySelector(".c"))

  let rejigger = (li) => {
    let coptic = li.querySelector(".c").textContent.trim()
    let english = li.cloneNode(true).querySelector("li").textContent.trim()
      .replace(coptic, "").trim()

    li.innerHTML = `  <details><summary><span class=c>${coptic}</span></summary>
      ${english}
    </details>`
  }

  lis
    .forEach((li) => {
      // rejigger(li)
    })

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(makeQuestionsInteractive)
