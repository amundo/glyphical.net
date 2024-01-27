// use deno_dom

import {DOMParser, Element} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

let response = await fetch('https://collections.mfa.org/advancedsearch/Objects/collectionTerms%3AAncient%20Egypt%2C%20Nubia%20and%20the%20Near%20East')
let html = await response.text()
let dom = new DOMParser().parseFromString(html, 'text/html')
let select = dom.querySelector('#multiselect_4_0')

let rooms = Array.from(select.querySelectorAll('option'))
.map(o => o.getAttribute('value'))
.slice(1)
.map(value => {
  let number = value.split("(")[0].trim().split(' ').pop()
  let name = value.split("(")[1].trim().replaceAll(')', '').trim()
  let type = name.split(" ").pop()
  let floor = number[0]
  return {number, name, type, number, floor}
})

console.log(JSON.stringify(rooms, null, 2))
 