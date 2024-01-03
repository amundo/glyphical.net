let rules = [
  ["ꜣ", "A"],
  ["ꞽ", "i"],
  ["ꜥ", "a"],  
  ["w", "w"],
  ["b", "b"],
  ["p", "p"],
  ["f", "f"],
  ["m", "m"],
  ["n", "n"],
  ["h", "h"],
  ["ḥ", "H"],
  ["ḫ", "x"],
  ["ẖ", "X"],
  ["s", "s"],
  ["š", "S"],
  ["ḳ", "q"],
  ["k", "k"],
  ["g", "g"],
  ["t", "t"],
  ["ṯ", "T"],
  ["d", "d"],
  ["ḏ", "D"]
]
.map(([egyptological, mdc]) => ({egyptological, mdc}))

let transliterate = plaintext => {
  let transliterated = rules
    .reduce((transliterated, {egyptological, mdc}) => {
      return transliterated.replaceAll(new RegExp(mdc, "g"), egyptological)
    }, plaintext)
  
  return transliterated
}

export {transliterate}
