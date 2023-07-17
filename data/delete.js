// import hieroglyphs file
let {hieroglyphDb} = await import('../data/hieroglyphical-db.js')
let {hieroglyphs, metadata} = hieroglyphDb

// sum the frequencies of all hieroglyphs
const total = hieroglyphs
  .reduce((total, hieroglyph) => {
    return total + hieroglyph.metadata.frequency
  }, 0)
// console.log(hieroglyphs.slice(0,500).map(h => h.metadata.frequency).reduce((a,b) => a+b) / total * 100)

// convert to entries of [frequency, hieroglyph]

let groupedByFrequency = hieroglyphs
  .reduce((groupedByFrequecy, hieroglyph) => {
    let {frequency} = hieroglyph.metadata
    if(!groupedByFrequecy[frequency]){
      groupedByFrequecy[frequency] = []
    }
    groupedByFrequecy[frequency].push(hieroglyph)
    return groupedByFrequecy
  }, {})


// convert to entries of [frequency, hieroglyph]
let groupedByFrequencyEntries = Object.entries(groupedByFrequency)
  .sort(([aFrequency], [bFrequency]) => bFrequency - aFrequency )


console.log(Object.keys(groupedByFrequencyEntries[0][1]))
// group groupedByFrequencyEntries into 5 groups
let frequencyGroups = groupedByFrequencyEntries


