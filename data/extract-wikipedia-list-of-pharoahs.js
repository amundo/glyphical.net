// import { tableToJSON } from 'https://pathall.net/table-to-json/v1.0.1/table-to-json.js'
import { tableToJSON } from "./table-to-json.js";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { unspan } from "./unspan.js";

let url = "https://en.wikipedia.org/wiki/List_of_pharaohs";
let response = await fetch(url);
let html = await response.text();
let document = new DOMParser().parseFromString(html, "text/html");

Deno.writeTextFileSync("wtf.html", html);

let cleanUpTable = (table) => {
  table.querySelectorAll("br").forEach((br) => br.remove());
  table.querySelectorAll("sup").forEach((sup) => sup.remove());
  table.querySelectorAll("a").forEach((a) => {
    a.outerHTML = a.textContent;
  });
};

let dynasty = null;

let pharaohs = [];

document.querySelectorAll(
  ".mw-parser-output h3 span.mw-headline, .mw-parser-output table.wikitable",
)
  .forEach((el, i) => {
    if (el.matches("span.mw-headline")) {
      dynasty = el.textContent.trim();
    }
    if (el.matches("table")) {
      if (el.children.length === 0) return;
      unspan(el);
      cleanUpTable(el);

      let rows = Array.from(el.querySelectorAll("tr"));

      let headerRow = rows[0];
      rows = rows.slice(1);
      // add dynasty as row column
      // headerRow.innerHTML += `<th>dynasty</th>`

      // rows.forEach(row => {
      //   row.innerHTML += `<td>${dynasty}</td>`
      //   // console.log(row.firstElementChild.tagName)
      //   // console.log(row.outerHTML)
      // })

      let data = tableToJSON(el);
      data.forEach((datum) => {
        datum.dynasty = dynasty;
      });

      pharaohs.push(...data);
    }
  });

let json = {
  metadata: {
    title: "Ancient Egyptian Pharaohs",
    source: "Wikipedia",
    url,
  },
  pharaohs,
};

await Deno.writeTextFile("pharaohs.json", JSON.stringify(json, null, 2));
