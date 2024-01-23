import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

// moving all styles out of lambdin/styles ../ into coptic/css
// 		<link rel="stylesheet" href="../styles/lessons.css">
/// becomes
// 		<link rel="stylesheet" href="../../css/coptic.css"
function moveCSS(htmlString) {
  // Parse the HTML string
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if (doc.querySelector("header.lesson-header")) {
    let main = doc.createElement("main")
    main.classList.add("main-lesson-content")

    doc.querySelectorAll("section, .end-vocabulary, .end-exercises")
      .forEach((el) => main.append(el))
    console.log(doc.querySelector("header"))
    let header = doc.querySelector("header.lesson-header")

    header.after(main)
  }

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(moveCSS)
