import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let changeClassesToLangAttr = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  doc.querySelectorAll('.gk')
    .forEach(gk => { 
      gk.classList.remove('gk')
      gk.setAttribute("lang", 'el') 
      if(gk.classList.length === 0) gk.removeAttribute('class')
    })
  
  doc.querySelectorAll('.c')
    .forEach(c => { 
      c.classList.remove('c')
      c.setAttribute("lang", 'cop') 
      if(c.classList.length === 0) c.removeAttribute('class')
    })


    return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(changeClassesToLangAttr)
