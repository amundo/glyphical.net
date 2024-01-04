import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { walk } from "https://deno.land/std/fs/mod.ts"

function wastransformParagraphs(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  if (!doc) throw new Error("Unable to parse the HTML string.");

  // Find all paragraphs with class 'indented'
  const sectionDivs = [...doc.querySelectorAll("div.section")];

  sectionDivs.forEach((sectionDiv, i) => {
    sectionDiv.outerHTML = `<section data-section-number="${i}">${sectionDiv.innerHTML}</section>`
  })
  
  return doc
}


function transformParagraphs(htmlString) {
  // Parse the HTML string
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  // Find all divs (replace '.class' with the actual class name you're targeting)
  const sectionDivs = [...doc.querySelectorAll("div.section")]

  // Transform each matching div into a section
  sectionDivs.forEach((sectionDiv, i) => {
    // Ensure outerHTML is supported and working as expected
    let section = doc.createElement('section')
    section.innerHTML = sectionDiv.innerHTML
    section.id = `section-${i+1}`
    sectionDiv.after(section)
    sectionDiv.remove()
  })

  let doctype = `<!doctype html>`

  return `${doctype}
  ${doc.documentElement.outerHTML}
  `
}

async function updateFiles() {
  let files = []
  for await (const entry of walk("lessons", { exts: [".html"] })) {
    files.push(entry.name)
    let htmlString = await Deno.readTextFile(entry.path)
    let fixedHtmlString = await transformParagraphs(htmlString)

    await Deno.writeTextFile(entry.path, fixedHtmlString)
  }
  return files
}

await updateFiles()

