// fetch-lexilogos.js
// import deno_dom
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const url = "https://www.lexilogos.com/keyboard/coptic.htm";
let response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

let html = await response.text();
let doc = new DOMParser().parseFromString(html, "text/html");

let as = Array.from(doc.querySelectorAll(".as"));

let pairs = as.map((a) => {

  let lexilogos = a.textContent.trim();
  let coptic = a.querySelector(".bt")?.getAttribute("value");
  return { lexilogos, coptic };
});

let specialPairs = [
  //     Type j for ē
  ["j", "ē"],

  //     Type w for ō
  ["w", "ō"],

  //     Type s_ for ⲋ
  ["s_", "ⲋ"],

  //     Type hh for ϧ (H)
  ["hh", "ϧ"],

  //     Type d_ and t_   for d and ti
  ["d_", "ϫ"],
  ["t_", "ϯ"],

  //     Type c for ch
  ["c", "ϭ"],
].map(([lexilogos, coptic]) => ({ lexilogos, coptic }));

pairs.push(...specialPairs)

let capitalized = [] 

pairs.forEach(({coptic, lexilogos}) => {
  capitalized.push(({coptic: coptic.toUpperCase(), lexilogos: lexilogos.toUpperCase()}))
})

pairs.push(...capitalized)

pairs = pairs.filter(({coptic, lexilogos}) => coptic && lexilogos)
  
let changeset = {
  description: "Add lexilogos input scheme",
  changes: pairs.map(({lexilogos, coptic}) => ({
    operation: "update",
    path: ["letters"],
    match: { coptic },
    data: {
      lexilogos 
    }
  })),
}

await Deno.writeTextFile(
  "fetch-lexilogos.changeset.json",
  JSON.stringify(changeset, null, 2),
);
