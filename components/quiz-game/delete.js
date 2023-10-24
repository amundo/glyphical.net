let query = {
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

let data = await Deno.readTextFile('hieroglyphs.json')
data = JSON.parse(data)

let isPrimary = value => typeof value == 'string' ||
  

data.filter(item => {
  path.reduce((match, step) => {
    if(Array.isArray(data[step])){
      data = data[step]
    } else if(typeof data[step]) {

    }
    return data
  }, data)
})