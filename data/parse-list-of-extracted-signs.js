// parse-list-of-extracted-signs.js
/*

run on https://en.wikipedia.org/wiki/List_of_Egyptian_hieroglyphs

*/

let parseGardinerUnicode = td => {
  let lis = Array.from(td.querySelectorAll('li'))
  lis = lis.filter(li => li.textContent.trim().length > 0)
  let [gardiner, unicode] = lis.map(li => li.textContent.trim())
  return {
    gardiner,
    unicode
  }
}

let parseTransliterations = td => {
  let lis = Array.from(td.querySelectorAll('li'))
  lis = lis.filter(li => li.textContent.trim().length > 0)
		.map(li => li.textContent.trim())
  return lis
}

let table = document.querySelector('.wikitable')

let rows = Array.from(table.rows)

rows = rows.filter(row => row.querySelector('li') && row.querySelector('td')) // some rows are subheaders

copy(
  rows.map(row => {
    let hieroglyph = {}

    let clean = el => el.innerText
      .replaceAll('\n', ' ')
      .trim()
    hieroglyph.hieroglyph = clean(row.cells[0])
    hieroglyph = Object.assign(hieroglyph, parseGardinerUnicode(row.cells[1]))
    hieroglyph.description = clean(row.cells[2])
    hieroglyph.transliterations = parseTransliterations(row.cells[3]) || ""
    hieroglyph.phonetic = clean(row.cells[4])
    hieroglyph.notes = clean(row.cells[5])



    return hieroglyph
  })
)