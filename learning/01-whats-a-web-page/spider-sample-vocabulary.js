import {DOMParser} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

let r = await fetch('https://glyphical.net/coptic/lambdin/lessons/lesson-index.json')
let index = await r.json()

let wordCount = 0

let extractWords = dom => {  
  let lis =  Array.from(dom.querySelectorAll('#vocabulary ul li'))
  wordCount += lis.length
  return lis
    .filter(li => !`(,`.split``.some(c => li.textContent.includes(c)))
    .filter(li => li.querySelector('.c'))
    .map(li => {
			let form = li.querySelector('.c').textContent.trim()
      let clone = li.cloneNode(true)
			clone.querySelector('.c').remove()
      let definition = clone.textContent.trim()
      return {form, definition}
    })
}

let fetchLessonAndExtractWords = async url => {
  let r = await fetch(url)
  let html = await r.text()
  let parser = new DOMParser()
  let dom = parser.parseFromString(html, 'text/html')
	let lessonWords = extractWords(dom)

  return lessonWords
}

let filterWords = words => {
  words = words
    .filter(word => word.form && word.definition)
    .filter(word => !word.form.includes(" "))
  	.filter(word => word.definition[0].toUpperCase() != word.definition[0])
  	.map(word => { word.form = word.form.replace('.', '') ; return word } )
  	.map(word => { word.definition = word.definition.slice(0,-1); return word } )
  let compare = new Intl.Collator('cop').compare
  words.sort((a,b) => compare(a.form, b.form))

  return words
}

// Use Promise.all to wait for all getVocab promises to resolve
let fetchAllLessonsAndExtractWords = async urls => {
  //make sure urls are relative to lessons-index.json
  urls = urls.map(url => new URL(url, 'https://glyphical.net/coptic/lambdin/lessons/lesson-index.json').href)
  let chapterWords = await Promise.all(urls.map(url => fetchLessonAndExtractWords(url))); // Wait for all vocab fetching to complete
  console.log(`${chapterWords.length} chapters, ${wordCount} words`)
  return chapterWords
}


let urls = index.lessons.map(l => `${l.url}`)

let chapterWords = await fetchAllLessonsAndExtractWords(urls)
console.log(chapterWords)
let completeVocab = chapterWords.flat()

let sampleWords = chapterWords.slice(0,5)
  .flat()

let filteredSampleWords = filterWords(sampleWords)
let randomSampleWords = filteredSampleWords.sort(() => Math.random() - 0.5).slice(0,10)

randomSampleWords = randomSampleWords.slice(0,10)


let renderWords = words => words
  .map(({form,definition}) => `${form} ‘${definition}’`)
  .join('\n')


let renderHtmlWords = words => words
  .map(({form,definition}) => `<li><span lang=cop>${form}</span> ‘<span class=definition>${definition}</span>’`)
  .join('\n')

let renderHtmlWordlist = words => {
  let lis = renderHtmlWords(words)
  let page = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: sans-serif; }
      .definition { font-size: 0.8em; }
    </style>
    <title>Sample Vocabulary</title>
    </head>
    <body>
      
      <ul>
        ${lis}
        </ul>
        </body>
        </html>
        `
  return page
}

console.log(completeVocab.length)
await Deno.writeTextFile('sample-vocabulary.txt', renderWords(randomSampleWords))
await Deno.writeTextFile('lambdin-vocabulary.txt', renderWords(completeVocab))
await Deno.writeTextFile('lambdin-vocabulary.html', renderHtmlWordlist(completeVocab))
  