const wikipedia = `
Coptic uses U+0304 ◌̄ COMBINING MACRON to indicate syllabic consonants, for example ⲛ̄.[12][13]

Coptic abbreviations use U+0305 ◌̅ COMBINING OVERLINE to draw a continuous line across the remaining letters of an abbreviated word.[13][14] It extends from the left edge of the first letter to the right edge of the last letter. For example, ⲡ̅ⲛ̅ⲁ̅, a common abbreviation for ⲡⲛⲉⲩⲙⲁ 'spirit'.

A different kind of overline uses U+FE24 ◌︤ COMBINING MACRON LEFT HALF, U+FE26 ◌︦ COMBINING CONJOINING MACRON, and U+FE25 ◌︥ COMBINING MACRON RIGHT HALF to distinguish the spelling of certain common words or to highlight proper names of divinities and heroes.[13][14] For this the line begins in the middle of the first letter and continues to the middle of the last letter. A few examples: ⲣ︤ⲙ︥, ϥ︤ⲛ︦ⲧ︥, ⲡ︤ϩ︦ⲣ︦ⲃ︥.

Sometimes numerical use of letters is indicated with a continuous line above them using U+0305 ◌̅ COMBINING OVERLINE as in ⲁ͵ⲱ̅ⲡ̅ⲏ̅ for 1,888 (where "ⲁ͵" is 1,000 and "ⲱ̅ⲡ̅ⲏ̅" is 888). Multiples of 1,000 can be indicated by a continuous double line above using U+033F ◌̿ COMBINING DOUBLE OVERLINE as in ⲁ̿ for 1,000. 
`

let strokes = [
  ["=", "\u0304"], // combining macron
  ["+", "\u0305"], // combining overline (continuous)
  [">=", "\uFE24" ], // combining macron left half
  ["<=", "\uFE25" ], // combining macron right half
  ["|=", "\uFE26" ] // combining conjoining macron
]

let changeset = {
  description: "Add support for supralinear stroke input",
  changes: strokes.map(([before, after]) => ({
    operation: "update",
    path: ["orthography"],
    data: {
      lexilogos 
    }
  })),
}

await Deno.writeTextFile(
  "fetch-lexilogos.changeset.json",
  JSON.stringify(changeset, null, 2),
);
