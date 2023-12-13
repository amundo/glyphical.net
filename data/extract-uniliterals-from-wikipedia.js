// extract-uniliterals-from-wikipedia.js
// Run script in page console.

import { tableToJSON } from "./table-to-json.js";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

let metadata = {
  "title": "Uniliteral Hieroglyphs",
  "source": "Wikipedia",
  "url": "https://en.wikipedia.org/wiki/Transliteration_of_Ancient_Egyptian",
  "parsedWith": "extract-uniliterals-from-wikipedia.js",
};

let response = await fetch(metadata.url);
let html = await response.text();
let document = new DOMParser().parseFromString(html, "text/html");
let table = document.querySelector("table.wikitable:nth-child(60)");

Array.from(table.querySelectorAll("tr"))
  .slice(0, 2)
  .forEach((tr) => tr.remove());

let headers = [
  "hieroglyph",
  "color",
  "depiction",
  "uniliteral",
  "say",
  "note",
  "oldEgyptian",
  "middleEgyptian",
];

Array.from(table.querySelectorAll("tr th"))
  .forEach((th, i) => th.textContent = headers[i]);

let hieroglyphs = tableToJSON(table).data;

Deno.writeTextFile(
  "uniliterals.json",
  JSON.stringify({ metadata, hieroglyphs }, null, 2),
);

// console.table(hieroglyphs)
