// deno-pandoc-md-to-html.js
import { walk } from "https://deno.land/std/fs/mod.ts"

// Permissions required:
// --allow-run: To run Pandoc commands.
// --allow-read: To read directories and files.
// --allow-write: To write the converted HTML files.

const rootDir = "./"

// Function to convert a single Markdown file to HTML using Pandoc
async function convertMdToHtml(filePath) {
  const outputFilePath = filePath.replace(/\.md$/, ".html")

  // Construct the command using the new Deno.Command API
  const pandocCommand = new Deno.Command("pandoc", {
    args: [
      filePath,
      "--css",
      "../css/lessons.css",
      "--include-before-body",
      "templates/header.template.html",
      "-o",
      outputFilePath,
    ],
  })

  try {
    // Start the process
    const process = await pandocCommand.spawn()

    // Wait for the Pandoc process to complete
    const status = await process.status

    if (status.success) {
      console.log(`Converted ${filePath} to HTML: ${outputFilePath}`)
    } else {
      console.error(
        `Failed to convert ${filePath}. Process exited with code ${status.code}.`,
      )
    }
  } catch (error) {
    console.error(`Error converting ${filePath}: ${error}`)
  }
}


// Function to recursively find and convert all Markdown files
async function findAndConvertMdFiles(startDir) {
  let mdFiles = []
  for await (const entry of walk(startDir, { exts: [".md"] })) {
    mdFiles.push(entry.path)
  }

  for (const mdFile of mdFiles) {
    await convertMdToHtml(mdFile)
  }

}

// Run the conversion process
await findAndConvertMdFiles(rootDir)
