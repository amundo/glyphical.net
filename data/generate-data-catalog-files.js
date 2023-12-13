const IGNORE_THESE_FILES = [
  "pharaohs.json",
  "data-catalog.json",
  "deno.json",
  "references.json",
  "hieroglyph-keywords.json"
]

let getDirEntries = async path => {
  const dirEntries = []
  for await (const dirEntry of Deno.readDir(path)) {
    dirEntries.push(dirEntry)
  }
  return dirEntries
}

// Get an array of directory entries
const dirEntries = await getDirEntries('.')

// Filter out the entries of interest
const jsonFiles = dirEntries
  .filter(
    dirEntry => dirEntry.isFile && 
      dirEntry.name.endsWith('.json') &&
      !IGNORE_THESE_FILES.includes(dirEntry.name)
  )

let checkMetadata = object => object.metadata && 
    object.metadata.title && 
    object.metadata.description && 
    object.metadata.title

    console.table(
jsonFiles.map(dirEntry => {
  const json = Deno.readTextFileSync(dirEntry.name)
  try {
    let content = JSON.parse(json)
    if(!checkMetadata(content)) {
      dirEntry.name
    }
  } catch(e) {
    console.error(dirEntry.name, e);
  }
})
    )