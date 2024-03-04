// Define the skeleton for index.html
let indexHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Book wiki</title>
  <link rel="stylesheet" href="css/wpln.css">
</head>
<body>
<h1>Book wiki</h1>
<ul>`

// Function to check if pandoc is installed by trying to get its version
async function checkPandocInstalled() {
  try {
    await new Deno.Command("pandoc", { args: ["--version"] }).output()
  } catch (error) {
    console.error("Error: pandoc is not installed.")
    Deno.exit(1)
  }
}

// Function to convert markdown files to HTML
async function convertMarkdownToHtml() {
  for await (const entry of Deno.readDir("markdown/")) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      const markdownFilePath = `markdown/${entry.name}`
      const htmlFileName = markdownFilePath
      .replace(".md", ".html")
      .replace("markdown", "html")
      
      console.log(`${entry.name} → ${htmlFileName}`)

      try {
        let args = [
          "-o",
          htmlFileName,
          "-f", 
          "markdown",
          "--include-before-body",
          "header.template.html",
          "--standalone",
          "--css",
          "css/wpln.css",
          markdownFilePath,
        ]

        await new Deno.Command("pandoc", {
          args,
        }).output()

        // console.log(args.join` `)
        indexHtml += `<li><a href="${htmlFileName.split('/').pop()}">${
          entry.name.replace(".md", "")
        }</a></li>`
      } catch (error) {
        console.error(`Error converting file ${entry.name}: ${error}`)
      }
    }
  }
}

// Function to write the index.html file
async function writeIndexHtml() {
  indexHtml = `${indexHtml}\n</ul>
</body>
</html>`
  await Deno.writeTextFile("html/index.html", indexHtml)
}

// Main function to orchestrate the conversion process
async function main() {
  await checkPandocInstalled()
  await convertMarkdownToHtml()
  await writeIndexHtml()
}

main()
