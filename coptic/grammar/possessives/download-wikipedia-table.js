import {DOMParser, Element} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'


const url = `https://en.wikipedia.org/wiki/Coptic_language`
const selector = `.mw-content-ltr > div:nth-child(102) > table:nth-child(1)`


let response = await fetch(url)
if(!response.ok) throw new Error(`Could not fetch ${url}`)
let html = await response.text()
let document = new DOMParser().parseFromString(html, 'text/html')

let table = document.querySelector(selector)
let rows = Array.from(table.querySelectorAll(`tr`))

function unspanTable(table) {
  uncolspan(table);
  unrowspan(table);
}

function uncolspan(table) {
  const cloneCellAfter = (cell) => {
    const clone = cell.cloneNode(true);
    cell.parentNode.insertBefore(clone, cell.nextSibling);
  };

  const colspannedCells = [...table.querySelectorAll('[colspan]')];
  colspannedCells.forEach(cell => {
    const colspan = parseInt(cell.getAttribute('colspan'), 10);
    cell.setAttribute('colspan', 1);
    for (let i = 1; i < colspan; i++) {
      cloneCellAfter(cell);
    }
  });
}

function unrowspan(table) {
  let rows = Array.from(table.querySelectorAll(`tr`))

  const rowspannedCells = [...table.querySelectorAll('[rowspan]')];
  rowspannedCells.forEach(cell => {
    const rowspan = parseInt(cell.getAttribute('rowspan'), 10);
    const parentRow = cell.parentNode;
    cell.setAttribute('rowspan', 1);

    for (let i = 1; i < rowspan; i++) {
      const targetRow = rows[parentRow.rowIndex + i];
      if (targetRow) {
        const newCell = targetRow.insertCell(cell.cellIndex);
        newCell.outerHTML = cell.outerHTML;
      }
    }
  })
}

unspanTable(table)

let cellIndex = cell => {
  let index = 0
  while(cell.previousElementSibling) {
    index++
    cell = cell.previousElementSibling
  }
  return index

}

let rowIndex = cell => {
  let index = 0
  while(cell.parentNode.previousElementSibling) {
    index++
    cell = cell.parentNode.previousElementSibling
  }
  return index
}

let projectHeadersToCells = table => {
  let headers = Array.from(table.querySelectorAll('th'))
  let rows = Array.from(table.querySelectorAll('tr'))

  headers.forEach(header => {
    console.log(header.textContent.trim(), cellIndex(header), rowIndex(header))
  })

  let cells = rows
    .map(row => Array.from(row.querySelectorAll('td')))

  return cells.map(row => row.map(cell => cell.textContent.trim()))
}

projectHeadersToCells(table)

Deno.exit()

let matrix = Array.from(table.querySelectorAll('tr'))
.map(row => Array.from(row.querySelectorAll('td')))
.map(cells => cells.map(cell => cell.textContent.trim()))


console.log(JSON.stringify(matrix, null, 2))