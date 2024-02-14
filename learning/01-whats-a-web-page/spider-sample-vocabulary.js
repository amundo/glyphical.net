import {DOMParser} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

let r = await fetch('https://glyphical.net/coptic/lambdin/lessons/lesson-index.json')
let index = await r.json()


let extractWords = dom => {  
  let lis =  Array.from(dom.querySelectorAll('#vocabulary ul li'))
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

let getVocab = async url => {
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
let populateVocab = async () => {
  let urls = index.lessons.map(l => `${l.url}`).slice(0,5); // Fetch only the first 5 lessons
  //make sure urls are relative to lessons-index.json
  urls = urls.map(url => new URL(url, 'https://glyphical.net/coptic/lambdin/lessons/lesson-index.json').href)
  let allWords = await Promise.all(urls.map(url => getVocab(url))); // Wait for all vocab fetching to complete
  let words = allWords.flat()
  words = filterWords(words)
  words.sort(() => Math.random() - 0.5)
  words = words.slice(0,10)
  return words
}

let allWords = await populateVocab()

let vocab = allWords.flat()

let renderWords = words => words
  .map(({form,definition}) => `${form} ‘${definition}’`)
  .join('\n')

console.log(renderWords(vocab))