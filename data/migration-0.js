const store = await open("hieroglyphs_db");

const response = await Deno.readTextFile('hieroglyphs.json')
const initialData = await response.json()
