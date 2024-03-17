import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

let isBlockLevel = (element) => {
  let blockLevelTags = ["div", "p", "section", "header", "h1", "h2", "h3", "h4", "h5", "h6"]
  return blockLevelTags.includes(element.nodeName.toLowerCase())
}

function assignPathBasedIds(root) {
  // Helper function to compute an element's path as a data-path value
  function computePathDataPath(element) {
    let path = []
    let currentElement = element

    // Iterate up the DOM tree
    while (currentElement.parentNode !== null && currentElement.nodeName.toLowerCase() !== 'body') {
      let parent = currentElement.parentNode
      let children = Array.from(parent.children);
      let index = children.indexOf(currentElement) + 1; // Adding 1 to make it human-readable (1-indexed)
      path.unshift(index); // Add the index to the beginning of the path array
      currentElement = parent; // Move up the DOM tree
    }

    // Join the path with dots to form the data-path
    return "_" + path.join('.')
  }
  // Select all elements in the body to assign data-paths
  let allElements = root.querySelectorAll('*');

  allElements.forEach(element => {
    let pathDataPath = computePathDataPath(element);
    if (isBlockLevel(element) && pathDataPath !== '' && !element.getAttribute("id")) { // Avoid assigning data-paths to the body element itself
      element.setAttribute('id', pathDataPath);
    }
  })
}




let addIdsToElements = htmlString => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  assignPathBasedIds(doc.documentElement.querySelector("body"))

  return `<!doctype html>
${doc.documentElement.outerHTML}
  `
}

updateFiles(addIdsToElements)

