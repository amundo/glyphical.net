import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

let generateJSONFileName = (title) => {
  let regex = /[^\p{Letter}\p{Number}]+/gu
  return title.toLowerCase().replaceAll(/\p{White_Space}+/gu, "_").replace(
    regex,
    "_",
  ) + ".json"
}

let transformSentences = (sentences) =>
  sentences.map(({ coptic, english, arabic }) => {
    let words = coptic.split(/\P{Letter}+/gu)
      .map((form) => ({ form, gloss: "", language: "coptic" }))
    return {
      transcription: coptic,
      words,
      translation: english,
      arabic,
    }
  })

// Function to parse HTML content
let parseHtmlContent = async (htmlUrl) => {
  // Fetch HTML content from a URL
  const response = await fetch(htmlUrl)
  const html = await response.text()

  // Parse the HTML content
  const document = new DOMParser().parseFromString(html, "text/html")

  // Ensure document is parsed successfully
  if (!document) {
    console.error("Failed to parse the document")
    return
  }

  // Your original logic adapted for the parsed document
  let rows = Array.from(document.querySelectorAll(".row"))
    .slice(2)
    .filter((row) =>
      ["[class*=coptic]", "[class*=englishtext]", "[class*=arabic]"]
        .every((selector) => row.querySelector(selector))
    )

  let sentences = rows.map((row) => {
    let coptic = row.querySelector("[class*=coptic]").textContent.trim()
    let english = row.querySelector("[class*=englishtext]").textContent.trim()
    let arabic = row.querySelector("[class*=arabic]").textContent.trim()
    return { coptic, english, arabic }
  })

  sentences = sentences.slice(
    0,
    rows.findIndex((row) =>
      row.querySelector("[class*=coptic]").textContent.trim().length === 0
    ),
  )

  sentences = transformSentences(sentences)

  // Adapt metadata extraction for offline
  let metadata = {
    title: document.querySelector("h1")?.textContent.trim() || "Unknown title",
    fileName: generateJSONFileName(
      document.querySelector("h1")?.textContent.trim() || "Unknown title",
    ),
    source: "Tasbeha.org",
    url: htmlUrl, // Since we're offline, this could be the fetched URL or a placeholder
    notes: [
      "Ahem boi says that this text is “sounded out” from pronunciation and doesn’t follow standard orthography.",
    ],
    links: {
      audio: document.querySelector("audio.mediaplayerlyrics")?.getAttribute(
        `src`,
      ) || "Unknown audio source",
    },
  }

  await Deno.writeTextFile(
    metadata.fileName,
    JSON.stringify({ metadata, sentences }, null, 2),
  )
}

parseHtmlContent(`https://tasbeha.org/hymn_library/view/693?mid=10179`)
// Example usage, replace 'your_html_page_url_here' with the actual URL or local HTML content
// parseHtmlContent('your_html_page_url_here');
