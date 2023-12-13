let response = await fetch(new URL("./hieroglyphs.json", import.meta.url));
let { metadata, hieroglyphs } = await response.json();

hieroglyphs.forEach((hieroglyph) => {
  hieroglyph.type = hieroglyph.metadata.type || "unknown";
  hieroglyph.frequency = hieroglyph.metadata.frequency || 0;
  delete hieroglyph.metadata;
});
console.table(hieroglyphs.slice(0, 10));

let data = { metadata, hieroglyphs };

await Deno.writeTextFile("hieroglyphs.json", JSON.stringify(data, null, 2));
