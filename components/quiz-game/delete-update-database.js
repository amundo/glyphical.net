let data = await Deno.readTextFile('../../data/hieroglyphs.json')
data = JSON.parse(data)

let change = {
  "description": "add a tag gardiner-iii to any hieroglyph in the list",
  "match": {
    "path": ["hieroglyphs", "hieroglyph"],
    "any": [
      "𓌇",
      "𓅮",
      "𓆼",
      "𓐠",
      "𓍔",
      "𓍯",
      "𓌳",
      "𓆞",
      "𓆷",
      "𓅷",
      "𓅡",
      "𓇉",
      "𓅭",
      "𓂓",
      "𓍑"
    ]
  },
  "update": {
    "operation": "push",
    "field": "tags",
    "value": "gardiner-ii"
  }
}


let updateDatabase = (data, change) => {
  // Make sure the match.path points to the correct data structure in our database
  let target = data

  change.match.path.forEach(pathSegment => target = target[pathSegment] )
  // Assuming target now refers to the hieroglyphs array
  change.match.any.forEach(hieroglyph => {
    let match = target.find(item => item.hieroglyph === hieroglyph);
    if (match) {
      if (!match.tags) {
        match.tags = [];
      }
      match.tags.push(change.update.value);
    }
  });
}

// Test it
updateDatabase(data, change);

// Output the data to see the changes
console.log(data);

