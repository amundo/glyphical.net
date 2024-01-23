import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { updateFiles } from "./update-lesson-html-files.js"

function groupGrammarSections(htmlString) {
  // Parse the HTML string
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if (doc.querySelector(".end-vocabulary")) {
    let sections = Array.from(doc.querySelectorAll("section"))

    let articles = sections
      .map((section) => {
        let article = doc.createElement("article")
        article.id = section.id
        article.innerHTML = section.innerHTML
        return article
      })

    articles.forEach((article) => doc.body.append(article))
    sections.forEach((section) => section.remove())
    let grammarSection = doc.createElement("section")
    grammarSection.id = "grammar-section"
    doc.querySelector(".end-vocabulary").before(grammarSection)

    articles.forEach((article) => {
      grammarSection.append(article)
    })

    // doc.querySelectorAll('section p:first-child')
    // .forEach(p => {

    //   let text = p.textContent.trim()
    //   let h2 = doc.createElement('h3')
    // })
  }

  return `<!doctype html>
  ${doc.documentElement.outerHTML}
  `
}

updateFiles(groupGrammarSections)
