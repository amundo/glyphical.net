let response = await fetch('https://github.com/microsoft/font-tools/raw/main/EgyptianOpenType/font/eot.ttf')
let arrayBuffer = await response.arrayBuffer()

Deno.writeFileSync('./eot.ttf', new Uint8Array(arrayBuffer))