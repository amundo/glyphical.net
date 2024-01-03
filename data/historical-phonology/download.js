import {flattenTable} from './flatten-table.js'
import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

let url = 'https://en.wiktionary.org/wiki/Appendix:Egyptian_pronunciation'

let response = await fetch(url)
let html = await response.text()
let document = new DOMParser().parseFromString(html, 'text/html')
let table = document.querySelector('table.wikitable:nth-child(15)')

flattenTable(table)


let rows = Array.from(table.querySelectorAll('tr'))

let history = rows
.filter(row => row.children[7])
// .map(row => Array.from(row.children).forEach(cell => cell.innerHTML = cell.innerHTML.replaceAll("<br>", "  ")))
.map(row => row.children[7].textContent)
.reduce((unique, value) => {
    if (!unique.includes(value)) {
        unique.push(value);
    }
    return unique
  }, [])
  .join(' > ')

console.log(history)