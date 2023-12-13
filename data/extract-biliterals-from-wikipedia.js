let metadata = {
  title: "Biliteral hieroglyphs",
  source: "Wikipedia",
  url: "https://en.wikipedia.org/wiki/Egyptian_biliteral_signs",
  parsedWith: "extract-biliterals-from-wikipedia.js",
};

let splitHieroglyphs = (s) =>
  s.split(/(\p{sc=Egyp})/gu)
    .filter((x) => x.match(/(\p{sc=Egyp})/gu))
    .filter(Boolean);

let parseCell = (td) => {
  let lines = td.innerText.split("\n")
    .map((line) => line.trim());

  let [hieroglyphsLine, biliteral, mdcsLine] = lines;
  let mdcs = mdcsLine
    .trim()
    .split(/ +/g)
    .map((x) => x.trim())
    .filter(Boolean);

  let hieroglyphs = splitHieroglyphs(hieroglyphsLine);

  hieroglyphs = hieroglyphs
    .map((hieroglyph, i) => {
      return {
        hieroglyph,
        mdc: mdcs[i],
        biliteral,
      };
    });
  return hieroglyphs.flat();
};

let table = document.querySelector(".wikitable");
let cells = Array.from(table.querySelectorAll("td"));

let biliterals = cells
  .filter((td) => td.innerText.trim().length)
  .map(parseCell)
  .flat();

console.log(
  {
    metadata,
    hieroglyphs: biliterals,
  }.hieroglyphs,
);
