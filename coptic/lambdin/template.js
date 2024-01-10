import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"


let x = htmlString => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(x)