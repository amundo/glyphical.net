import {DOMParser, Element} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'
import {tableToJSON} from 'https://www.pathall.net/table-to-json/v1.0.1/table-to-json.js'
import {unspan} from './unspan.js' 

let url = 'https://en.wikipedia.org/wiki/Coptic_script'
let selector = `table.wikitable:nth-child(30)`

let response = await fetch(url)
let html = await response.text()
let doc = new DOMParser().parseFromString(html, "text/html")
let table = doc.querySelector(selector)
table.querySelectorAll('sup').forEach(sup => sup.remove())
unspan(table)

let wikipediaScript = tableToJSON(table)

/* 
letters look like:

 {
    "Uppercase (image)": "",
    "Lowercase (image)": "",
    "Uppercase (unicode)": "Ⲁ",
    "Lowercase (unicode)": "ⲁ",
    "Numeric value": "1",
    "Letter Name": "Alpha",
    "Greek equiv.": "Α, α",
    "Translit.": "A",
    "Sahidic pron.": "/a/",
    "Bohairic pron.": "/a/",
    "Late Coptic pron.": "/æ/, /ɑ/",
    "Greco-Bohairic pron.": "/ä/"
  }
*/

await Deno.writeTextFile('./wikipedia-coptic-script.json', JSON.stringify(wikipediaScript, null, 2))

let splitOnCase = letters => {
  let casedLetters = []

  let capitalize = word => {
    if(!word){ return word }
    word[0].toUpperCase() + word.slice(1)
  }

  letters.forEach(letter => {
      let upperCaseLetter = Object.assign({}, letter)
      let lowerCaseLetter = Object.assign({}, letter)

      upperCaseLetter.letter = letter["Uppercase (unicode)"]
      lowerCaseLetter.letter = letter["Lowercase (unicode)"]

      // delete upperCaseLetter["Lowercase (unicode)"]
      // delete lowerCaseLetter["Uppercase (unicode)"]

      upperCaseLetter.lowercase = letter["Lowercase (unicode)"]
      lowerCaseLetter.uppercase = letter["Uppercase (unicode)"]
      try {
        console.log(letter['Letter Name'])
      } catch(e){
        console.log(e)
      }

      upperCaseLetter.name = capitalize(letter['Letter Name'])
      lowerCaseLetter.name = letter['Letter Name'].toLowerCase()

      let transliterations = []
      
      transliterations = letter['Translit.']?.split(`/`).map(x => x.trim()) || transliterations

      upperCaseLetter.transliterations = transliterations
        .map(transliteration => capitalize(transliteration)) || []

      lowerCaseLetter.transliterations = transliterations
        .map(transliteration => transliteration.toLowerCase())|| []

      upperCaseLetter.type = 'uppercase'
      lowerCaseLetter.type = 'lowercase'
      
      casedLetters.push(upperCaseLetter)     
      casedLetters.push(lowerCaseLetter)

  })
  return casedLetters
}


let orthography = wikipediaScript.map(letter => {
  return {
    coptic: letter["Uppercase (unicode)"]|| "",
    latin: letter["Translit."]?.split(/[\/ ]+/g)[0].trim().toLowerCase() || ""
    // ,
    // metadata: { 
    //   wikipedia: letter 
    // }
  }
})
.filter(orthography => orthography.coptic && 
  orthography.latin
)

// hack because of Ϧ (Ⳉ)
let h = orthography
  .find(({coptic}) => coptic.includes(`Ϧ (Ⳉ)`))

h.coptic = `Ϧ`

let metadata = {
  "title": "Coptic Script",
  "source": "Wikipedia",
  "url": "https://en.wikipedia.org/wiki/Coptic_script"
}

let changeset = {
    "description": "Fetch Coptic Script data from Wikipedia",
    "date": new Date().toISOString(),
    "changes": [
    {
      operation: "add",
      path: [],
      data: {
        metadata,
        orthography
      }
    },
  ],
}

await Deno.writeTextFile('./fetch-wikipedia-coptic-script.changeset.json', JSON.stringify(changeset, null, 2))