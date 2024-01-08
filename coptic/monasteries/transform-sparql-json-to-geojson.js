let transformToFeature = monastery => {
  let [longitude, latitude] = monastery.coordinates
  .replace("Point(", "")
  .replace(')', "")
  .split(" ")
  .map(coordinate => parseFloat(coordinate))

  return {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      /* GeoJSON is  [longitude, latitude] */
      "coordinates": [longitude, latitude]
    },
    "properties": {
      "type": "monastery",
      "name": monastery.monasteryLabel,
      "article": monastery.article,
      "wikidata": monastery.monastery
    }
  }
}

let transformToGeojson = data => {
  return {
    "type": "FeatureCollection",
    "features": data.map(transformToFeature)
  }
}

let json = await Deno.readTextFile('wikidata-coptic-monasteries.json')
let data = JSON.parse(json)
console.log(JSON.stringify(transformToGeojson(data), null, 2))
