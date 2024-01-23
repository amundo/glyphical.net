let linksPlaintext = `01_Preface.html
02_Table_of_Contents.html
03_Abbreviations_and_Conventions.html
04_Introduction.html
05_The_Coptic_Alphabet.html
lesson_01.html
lesson_02.html
lesson_03.html
lesson_04.html
lesson_05.html
lesson_06.html
lesson_07.html
lesson_08.html
lesson_09.html
lesson_10.html
lesson_11.html
lesson_12.html
lesson_13.html
lesson_14.html
lesson_15.html
lesson_16.html
lesson_17.html
lesson_18.html
lesson_19.html
lesson_20.html
lesson_21.html
lesson_22.html
lesson_23.html
lesson_24.html
lesson_25.html
lesson_26.html
lesson_27.html
lesson_28.html
lesson_29.html
lesson_30.html
`
let urls = linksPlaintext
  .split("\n")
  .filter(Boolean)
  .map((anchor) => [
    anchor,
    anchor
      .replace(".html", "")
      .replaceAll(/[^a-zA-Z0-9]/gu, " ").trim(),
  ])
  .map(([anchor, title]) => `<a href="lessons/${anchor}">${title}</a>`)
  .map((anchor) => `<li>${anchor}</li>`)
  .join("\n")

let ol = `<ol>${urls}</ol>`

console.log(ol)
