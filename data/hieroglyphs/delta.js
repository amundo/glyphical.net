const applyChangesetToDatabase = (db, changeset) => {
  changeset.changes.forEach((change) => {
    if (change.operation === "add") {
      // Handle adding data at the root of the database
      if (change.path.length === 0 || change.path[0] === "/") {
        db = { ...db, ...change.data }
      } // Handle adding data to a specific path within the database
      else {
        let target = db
        let pathLength = change.path.length

        change.path.slice(0, pathLength - 1).forEach((key) => {
          if (!target[key]) {
            target[key] = {} // Initialize a new object if the key does not exist
          }
          target = target[key]
        })

        let lastKey = change.path[pathLength - 1]
        if (Array.isArray(target[lastKey])) {
          target[lastKey] = [...target[lastKey], ...change.data]
        } else {
          target[lastKey] = change.data
        }
      }
    } // Handle 'update' operation
    else if (change.operation === "update") {
      let targetArray = change.path.slice(0, -1).reduce(
        (acc, key) => acc[key],
        db,
      )
      let lastKey = change.path[change.path.length - 1]
      let itemsToUpdate = targetArray[lastKey]

      if (Array.isArray(itemsToUpdate)) {
        // Bulk update all items if no match criteria is provided
        if (!change.match || Object.keys(change.match).length === 0) {
          itemsToUpdate.forEach((item) => Object.assign(item, change.data))
        } // Update specific items based on match criteria
        else {
          itemsToUpdate.forEach((item) => {
            if (
              Object.keys(change.match).every((key) =>
                item[key] === change.match[key]
              )
            ) {
              Object.assign(item, change.data)
            }
          })
        }
      }
    }
  })

  return db
}

let changesetFiles = [
  "000-initialize-hieroglyph-database.changeset.json",
  "001-fetch-list-of-hieroglyphs-template.changeset.json",
  // '002-add-frequency-counts.changeset.json',
  "003-initialize-tags.changeset.json",
  "004-tag-betro-hieroglyphs.changeset.json",
]

let db = changesetFiles.reduce((db, changesetFile) => {
  let changeset = JSON.parse(Deno.readTextFileSync(changesetFile))

  return applyChangesetToDatabase(db, changeset)
}, {})

Deno.writeTextFileSync("hieroglyphs.delta.json", JSON.stringify(db, null, 2))
