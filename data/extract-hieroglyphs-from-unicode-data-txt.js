import { exists } from "https://deno.land/std/fs/mod.ts";

const UNICODE_DATA_URL = "https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt";
const FILE_NAME = "UnicodeData.txt";

async function downloadUnicodeData(url) {
  const res = await fetch(url);
  const text = await res.text();
  await Deno.writeTextFile(FILE_NAME, text);
}

async function processUnicodeData() {
  if (!await exists(FILE_NAME)) {
    await downloadUnicodeData(UNICODE_DATA_URL);
  }

  const data = await Deno.readTextFile(FILE_NAME);
  const lines = data.split('\n');
  const hieroglyphs = lines
    .filter(line => line.includes("EGYPTIAN"))
    .map(line => {
      const [codepoint, name] = line.split(';');
      return {
        codepoint,
        name,
        hieroglyph: String.fromCodePoint(parseInt(codepoint, 16))
      };
    });

  const metadata = {
    title: "Egyptian Hieroglyphs in UnicodeData.txt",
    source: UNICODE_DATA_URL,
    parsedWith: "extract-hieroglyphs-from-unicode-data-txt.js"
  };

  const result = { metadata, hieroglyphs };
  await Deno.writeTextFile("UnicodeDataHieroglyphs.json", JSON.stringify(result, null, 2));
}

processUnicodeData()
