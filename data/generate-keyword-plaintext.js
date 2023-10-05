import wtf from './hieroglyphs.json' assert { type: "json" }

let {hieroglyphs} = wtf


let plaintext = hieroglyphs.map(hieroglyph => {
  let representation = `
${hieroglyph.hieroglyph}
${hieroglyph.gardiner}
${hieroglyph.description}
`
  return representation
})

Deno.writeTextFileSync('keyword-plaintext.txt', plaintext.join('\n'))

