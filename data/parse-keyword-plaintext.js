let plaintext = Deno.readTextFileSync("keyword-plaintext.txt");

let chunks = plaintext
  .split(/\n\n+/g)
  .map((chunk) => chunk.trim());

let hieroglyphs = chunks.map((chunk) => {
  let [hieroglyph, gardiner, description, notes] = chunk.split(/\n/g);
  return { hieroglyph, gardiner, description, notes };
});

let metadata = {
  title: "Hieroglyphs with keywords",
  author: "Patrick Hall",
  notes: ["Generated from keywords-plaintext.txt, which is hand-edited."],
};

let data = { metadata, hieroglyphs };

Deno.writeTextFileSync(
  "hieroglyph-keywords.json",
  JSON.stringify(data, null, 2),
);
