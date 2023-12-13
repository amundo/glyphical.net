let uniliterals = await Deno.readTextFile("./uniliterals.json");
let biliterals = await Deno.readTextFile("./biliterals.json");
let triliterals = await Deno.readTextFile("./triliterals.json");

let hieroglyphs = await Deno.readTextFile("./hieroglyphs.json");

uniliterals = JSON.parse(uniliterals);
biliterals = JSON.parse(biliterals);
triliterals = JSON.parse(triliterals);

hieroglyphs = JSON.parse(hieroglyphs);

biliterals.hieroglyphs.forEach((biliteral) => {
  biliteral.gardiner = biliteral.gardiner.toUpperCase();
});

await Deno.writeTextFile("/tmp/bkup", JSON.stringify(hieroglyphs, null, 2));

hieroglyphs.hieroglyphs.forEach((hieroglyph) => {
  if (!hieroglyph.metadata) hieroglyph.metadata = {};

  if (
    uniliterals.hieroglyphs.find((uniliteral) =>
      uniliteral.hieroglyph == hieroglyph.hieroglyph
    )
  ) {
    let matched = uniliterals.hieroglyphs.find((uniliteral) =>
      uniliteral.hieroglyph == hieroglyph.hieroglyph
    );

    hieroglyph.metadata.type = "uniliteral";
    hieroglyph.phonetic = matched.uniliteral;
  }

  if (
    biliterals.hieroglyphs.find((biliteral) =>
      biliteral.hieroglyph == hieroglyph.hieroglyph
    )
  ) {
    let matched = biliterals.hieroglyphs.find((biliteral) =>
      biliteral.hieroglyph == hieroglyph.hieroglyph
    );

    hieroglyph.metadata.type = "biliteral";
    hieroglyph.phonetic = matched.biliteral;
  }

  if (
    triliterals.hieroglyphs.find((triliteral) =>
      triliteral.hieroglyph == hieroglyph.hieroglyph
    )
  ) {
    let matched = triliterals.hieroglyphs.find((triliteral) =>
      triliteral.hieroglyph == hieroglyph.hieroglyph
    );

    hieroglyph.metadata.type = "triliteral";
    hieroglyph.phonetic = matched.triliteral;
  }
});

await Deno.writeTextFile(
  "./hieroglyphs.json",
  JSON.stringify(hieroglyphs, null, 2),
);
