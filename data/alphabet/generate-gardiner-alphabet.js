let json = await Deno.readTextFile('../orthographies.json')
let data = JSON.parse(json)

console.table(data.orthographies, ['hieroglyph', 'Gardiner'])
