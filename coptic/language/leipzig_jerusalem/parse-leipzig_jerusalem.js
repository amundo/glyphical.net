let pairs = `ⲁ a ⲙ m ⲱ ô
ⲃ b ⲛ n ϣ š
ⲅ g ⲝ ks ϥ f
ⲇ d ⲟ o ϩ h
ⲉ e ⲡ p ϧ x
ⲍ z ⲣ r ϫ č
ⲏ ê ⲥ s ϭ c
ⲑ th ⲧ t ϯ ti
ⲓ i ⲩ u ⳉ x’
ⲕ k ⲫ ph ⳃ ç
ⲗ l ⲯ ps ⳋ ç’`
.split`\n`
.map(l => l
  .split` `
  .map((_1,i,cs) => {
    if(i === 0){
      return [cs.slice(0,2), cs.slice(2,4), cs.slice(4,6)]
    } else {
      return
    }
  })
  .filter(Boolean)
)
.flat()

let transpose = matrix => matrix[0]
  .map((_, i) => matrix.map(row => row[i]))

let orthography = transpose(pairs)
  .flat()
  .map(([a,b]) => [a,b,b].join`\t`).join('\n')
  // .map(([coptic, jl]) => ({coptic, jl}))

let metadata = {
  title: "The Leipzig-Jerusalem Transliteration of Coptic",
  authors: [
    "Eitan Grossman",
     "Martin Haspelmath"
  ]
}

console.log(orthography)
// console.table(JSON.stringify({metadata, orthography}, null, 2))