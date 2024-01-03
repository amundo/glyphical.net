const tag = `<meta charset=utf-8>`

// get list of all files in lessons/ directory with deno 
let files = Deno.readDirSync('lessons')
  .map(({name}) => name)
  .filter(name => name.endsWith('.html'))
  .map(name => `lessons/${name}`)
  .map(name => {
    let html = Deno.readTextFileSync(name)
    let newHtml = html.replace('<head>', `<head>\n		${tag}`)
    return [name, newHtml]
  })

// write new files
files.forEach(([name, newHtml]) => {
  // console.log(name)
  // let newName = name.replace('lessons/', 'lessons/temp')  
  Deno.writeTextFileSync(`${name}`, newHtml)
})

