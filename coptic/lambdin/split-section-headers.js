import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { walk } from "https://deno.land/std/fs/mod.ts"

function transformParagraphs(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  // Find all paragraphs with class 'indented'
  const paragraphs = [...doc.querySelectorAll("p.indented")]

  paragraphs.forEach((p) => {
    // Check if paragraph starts with the pattern: number, title, period
    const match = p.textContent.trim().match(/^(\d+(\.\d)*)\s([^\.]+)\.\s(.+)/)
    if (match) {
      // Create a new h2 element with the section number and title
      const h2 = doc.createElement("h2")
      h2.textContent = match[3] // the title part
      console.log(match[1], `\n`, match[3], `\n`)
      h2.setAttribute("data-section-number", match[1])
      h2.setAttribute("id", `s${match[1].replace(".", "")}`)

      // Update the paragraph text to remove the section number and title
      p.textContent = match[4] // the rest of the text

      // Insert the new h2 before the paragraph
      p.parentNode.insertBefore(h2, p)
    }
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
