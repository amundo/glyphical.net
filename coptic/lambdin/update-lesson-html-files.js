import { walk } from "https://deno.land/std/fs/mod.ts"

async function updateFiles(transform, root="lessons") {
  let files = []
  for await (const entry of walk(root, { exts: [".html"] })) {
    files.push(entry.name)
    let htmlString = await Deno.readTextFile(entry.path)
    let fixedHtmlString = await transform(htmlString)

    await Deno.writeTextFile(entry.path, fixedHtmlString)
  }
  return files
}

export {updateFiles}