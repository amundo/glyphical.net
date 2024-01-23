import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { walk } from "https://deno.land/std/fs/mod.ts"

function wrapNav(htmlString) {
  // Parse the HTML string
  const doc = new DOMParser().parseFromString(htmlString, "text/html")
  if (!doc) throw new Error("Unable to parse the HTML string.")

  if (doc.querySelector("a#previous")) {
    let nav = doc.createElement("nav")
    nav.id = `lesson-nav`

    let previousA = doc.querySelector("a#previous")
    let nextA = doc.querySelector("a#forward")

    previousA.before(nav)

    nav.append(previousA, "\n")
    nav.append(nextA, "\n")
  }

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
    let fixedHtmlString = await wrapNav(htmlString)

    await Deno.writeTextFile(entry.path, fixedHtmlString)
  }
  return files
}

await updateFiles()
