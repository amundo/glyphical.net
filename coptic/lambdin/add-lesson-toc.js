import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let generateIdFromHeading = (heading) => {
  return heading.textContent
  .trim()
    .toLowerCase()
    .replace(/\P{Letter}/gu, "-")
    .replace(/(^-|-$)/g, "")
}

function addLessonToc(htmlString) {
  const document = new DOMParser().parseFromString(htmlString, "text/html")
  if (!document) throw new Error("Unable to parse the HTML string.")

  let sectionHeadings

  if(document.querySelector('header#lesson-header')){
    sectionHeadings = Array.from(document.querySelectorAll('main section h2, main section h3'))
  } else {
    return 
  } 

  let toc = sectionHeadings.reduce((toc, sectionHeading) => {
    let a = document.createElement('a')

    let id = generateIdFromHeading(sectionHeading)
    sectionHeading.setAttribute('id', id)

    a.setAttribute('href', `#${sectionHeading.id}`)
    a.textContent = sectionHeading.textContent

    let topLink = document.createElement('a')
    topLink.setAttribute('href', '#lesson-header')
    topLink.textContent = '^'
    topLink.classList.add('top-link')
    sectionHeading.appendChild(topLink)
    
    let li = document.createElement('li')
    li.appendChild(a)
    toc.appendChild(li)
    return toc
  }, document.createElement('ul'))


  let nav = document.createElement('nav')
  nav.id = 'lesson-toc'
  nav.appendChild(toc)

  let main = document.querySelector('main.main-lesson-content')
  
  main.firstElementChild.before(nav)


  return `<!doctype html>
  ${document.documentElement.outerHTML}
  `
}

updateFiles(addLessonToc)
