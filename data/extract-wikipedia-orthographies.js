import { tableToJSON } from "http://pathall.net/table-to-json/v1.0.0/table-to-json.js";

import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

let url = "https://en.wikipedia.org/wiki/Transliteration_of_Ancient_Egyptian";
let response = await fetch(url);
let html = await response.text();
let dom = new DOMParser().parseFromString(html, "text/html");
// let dom = new JSDOM(html)
let table = dom.querySelector("table.wikitable:nth-child(18)");
let clone = table.cloneNode(true);
clone.querySelectorAll("tr")[0].remove();
clone.querySelectorAll("tr")[1].remove();
clone.querySelectorAll("th[rowspan]").forEach((row) =>
  row.removeAttribute("rowspan")
);
clone.querySelectorAll("br").forEach((br) => br.remove());

clone.querySelectorAll("sup").forEach((sup) => sup.remove());
clone.querySelectorAll("a").forEach((a) => {
  a.outerHTML = a.textContent;
});

Array.from(clone.querySelectorAll("th"))[0]
  .innerHTML = `hieroglyph`;

Array.from(clone.querySelectorAll("th"))[7]
  .innerHTML = `MdC`;

Array.from(clone.querySelectorAll("th"))[13]
  .innerHTML = `Leiden`;

Array.from(clone.querySelectorAll("th"))[4]
  .innerHTML = `Erman_Grapow`;

Array.from(clone.querySelectorAll("th"))[10]
  .innerHTML = `Hannig_Allen`;

Array.from(clone.querySelectorAll("th"))[14]
  .innerHTML = `conventional`;

Array.from(clone.querySelectorAll("tr"))[2]
  .remove();

let data = tableToJSON(clone).data;

let json = {
  metadata: {
    title: "Ancient Egyptian Transliteration Orthographies",
    source: "Wikipedia",
    url,
  },
  orthography: data,
};

await Deno.writeTextFile("orthographies.json", JSON.stringify(json, null, 2));
