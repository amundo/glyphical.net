const emptyDb = {
  "metadata": {
    "title": "Coptic language",
    "sources": ["Lambdin 1983", "Wikipedia"],
    "name": "language",
    "description":
      "Synthesized information about Coptic"
  },
  "orthography": []
}

let changeset = {
  "description": "Initialize the hieroglyphs database with metadata.",
  changes: [
    {
      operation: "add",
      path: "/",
      data: emptyDb,
    }
  ]
}

await Deno.writeTextFile(
  "initialize-coptic-language.changeset.json",
  JSON.stringify(changeset, null, 2),
)