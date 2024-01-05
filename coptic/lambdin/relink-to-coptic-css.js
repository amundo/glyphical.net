import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

// moving all styles out of lambdin/styles ../ into coptic/css
// 		<link rel="stylesheet" href="../styles/lessons.css">
/// becomes
// 		<link rel="stylesheet" href="../../css/coptic.css"
function moveCSS(htmlString) {
  // Parse the HTML string
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if(doc.querySelector('link[href="../styles/lessons.css"]')){
    let link = doc.querySelector('link[href="../styles/lessons.css"]')
    console.log(link.href)
    link.href = "../../css/coptic.css"
    console.log(link.getAttribute('href'))
  }  

  let doctype = `<!doctype html>`

  return `${doctype}
  ${doc.documentElement.outerHTML}
  `
}

await updateFiles(moveCSS, '.')

