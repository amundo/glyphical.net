import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

// mv h2 to h1 and wrap in header tag
function wrapH2(htmlString) {
  // Parse the HTML string
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if(doc.querySelector('h2[id^=lesson_]')){
    let h2 = doc.querySelector('h2[id^=lesson_]')
    let heading = h2.textContent.trim()
    let header = doc.createElement('header')
    header.classList.add('lesson-header')
    
    header.innerHTML = `<h1 class=lesson-h1>${h2.textContent.trim()}</h1>`
    
    h2.before(header)

    h2.remove()
  }  

  let doctype = `<!doctype html>`

  return `${doctype}
  ${doc.documentElement.outerHTML}
  `
}

await updateFiles(wrapH2)

