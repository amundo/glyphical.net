import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { walk } from "https://deno.land/std/fs/mod.ts"

function transformParagraphs(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  // Find all paragraphs with class 'indented'
  const sectionDivs = [...doc.querySelectorAll("div.class")]

  sectionDivs.forEach((sectionDiv, i) => {
    sectionDiv.outerHTML =
      `<section data-section-number="${i}">${sectionDiv.innerHTML}</section>`
  })

  return doc.body.innerHTML
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
