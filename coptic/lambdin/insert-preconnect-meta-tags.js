const tag = `  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
`

async function updateFiles() {
  for await (const entry of walk(".", { exts: [".html"] })) {
    const { path } = entry;
    let html = Deno.readTextFileSync(path)
    let newHtml = html
    if(!html.includes(`rel="preconnect"`)){
      newHtml = html.replace("<head>", `<head>\n\t${tag}`)
    }
    Deno.writeTextFileSync(path, newHtml);
  }
}

