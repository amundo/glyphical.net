// check-no-literal-overlap.js

/*

there should be no hieroglyphs that show up in more than one of
uniliterals.json, biliterals.json, and triliterals.json
*/

let uniliterals = await Deno.readTextFile("./uniliterals.json");
let biliterals = await Deno.readTextFile("./biliterals.json");
let triliterals = await Deno.readTextFile("./triliterals.json");

uniliterals = JSON.parse(uniliterals).hieroglyphs;
biliterals = JSON.parse(biliterals).hieroglyphs;
triliterals = JSON.parse(triliterals).hieroglyphs;

let uniAndBiLiteral = uniliterals.filter((uniliteral) => {
  return biliterals.find((biliteral) =>
    biliteral.hieroglyph == uniliteral.hieroglyph
  );
});

let biAndTriLiteral = biliterals.filter((biliteral) => {
  return triliterals.find((triliteral) =>
    triliteral.hieroglyph == biliteral.hieroglyph
  );
});

let uniAndTriLiteral = uniliterals.filter((uniliteral) => {
  return triliterals.find((triliteral) =>
    triliteral.hieroglyph == uniliteral.hieroglyph
  );
});

console.table([
  ...uniAndBiLiteral,
  ...biAndTriLiteral,
  ...uniAndTriLiteral,
]);
