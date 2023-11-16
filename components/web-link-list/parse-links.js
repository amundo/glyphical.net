let parseMetadata = metadataChunk => {
  let metadataLines = metadataChunk.split(/\n/g)
    .map(x => x.trim())
    .filter(Boolean)
  let metadataPairs = metadataLines.map(line => {
    let [key, value] = line.split(/:\s+/)
    return [key, value]
  })
  let metadataObject = Object.fromEntries(metadataPairs)
  return metadataObject
}

let parseTags = s => {
  return s
    .split(/\p{White_Space}+/gu)
    .map(x => x.trim())
    .filter(Boolean)
    .sort()
}

let parseLink = chunk => {
  let lines = chunk.split(/\n/g)
    .map(x => x.trim())
    .filter(Boolean)

  let [url, title, description, tags] = lines

  return {
    url,
    title,
    description,
    tags: parseTags(tags)
  }
}


let parseLinks =  plaintext => {
  let chunks = plaintext
    .split(/^---/gm)
    .filter(Boolean)

  let [metadataChunk, linksChunk] = chunks

  let metadata = parseMetadata(metadataChunk)

  let linkChunks = linksChunk
    .split(/\n\n+/gm)
    .filter(Boolean)
    .map(chunk => chunk.trim())

  let links = linkChunks.map(parseLink)

  return {metadata,links}
}

export {
  parseLinks,
  parseLink
}