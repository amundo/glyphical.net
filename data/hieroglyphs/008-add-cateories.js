let categoriesJson = await Deno.readTextFile('../categories.json')
let categories = JSON.parse(categoriesJson)




let changeset = {
  description: "Derive egyptological transliteration from Manuel de Codage transliteration",
    operation: "update",
    path: ["metadata", "categories"],
    data: categories.categories
}

await Deno.writeTextFile(
  `008-add-categories.changeset.json`,
  JSON.stringify(changeset, null, 2),
)
console.log(`Wrote 008-add-categories.changeset.json`)
