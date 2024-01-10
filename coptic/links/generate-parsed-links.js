import {parseLinks} from './parse-links.js'

let plaintext = Deno.readTextFileSync('links.txt')  
let links = parseLinks(plaintext)

Deno.writeTextFileSync('links.json', JSON.stringify(links, null, 2))