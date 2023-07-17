let hieroglyphs = await Deno.readTextFile('./hieroglyphs.json')
let frequency = await Deno.readTextFile('./hieroglyph-sign-frequency.json')

await Deno.writeTextFile('/tmp/bkp', JSON.stringify(hieroglyphs, null, 2))

frequency = JSON.parse(frequency)
hieroglyphs = JSON.parse(hieroglyphs)

let totalCount = Object.values(frequency)
  .reduce((a, b) => a + b, 0)

Object.entries(frequency)
  .map(([hieroglyph, count]) => {
    
    

hieroglyphs.hieroglyphs.forEach(hieroglyph => {
  if(frequency[hieroglyph.hieroglyph]){
    hieroglyph.metadata.frequency = frequency[hieroglyph.hieroglyph]
  } else {
    hieroglyph.metadata.frequency = 0
  }
})

await Deno.writeTextFile('./hieroglyphs.json', JSON.stringify(hieroglyphs, null, 2))