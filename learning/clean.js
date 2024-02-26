// clean.js


const subdirectories = [
  "01-whats-a-web-page",
  "02-whitespace",
  "03-fonts"

];


// Function to delete HTML files that have a corresponding Markdown file
async function deleteCorrespondingHtmlFiles(subdirectory) {
  console.log(`${subdirectory} is the subdirectory path.`);
  const htmlPath = subdirectory; // Assuming HTML files are directly in the subdirectories

  console.log(`Deleting HTML files in: ${htmlPath}`)
  // Check if markdown directory exists before proceeding
  if (await Deno.lstat(subdirectory)) {
      for await (const markdownFile of Deno.readDir(subdirectory)) {
          if (markdownFile.isFile && markdownFile.name.endsWith(".md")) {
              const correspondingHtmlFileName = markdownFile.name.replace(".md", ".html");
              const correspondingHtmlFilePath = `${htmlPath}/${correspondingHtmlFileName}`;

              // Check if the corresponding HTML file exists
              if (await Deno.stat(correspondingHtmlFilePath)) {
                  // If the file exists, delete it
                  await Deno.remove(correspondingHtmlFilePath);
                  console.log(`Deleted: ${correspondingHtmlFilePath}`);
              } else {
                  // If the HTML file does not exist, no action is needed
                  console.log(`No corresponding HTML file found for ${markdownFile.name}, skipping.`);
              }
          }
      }
  } else {
      console.error(`Markdown directory does not exist: ${markdownPath}`);
  }
}

// Main function to orchestrate the cleanup process
async function main() {
  for (const subdirectory of subdirectories) {
      await deleteCorrespondingHtmlFiles(subdirectory);
  }
}

main().catch(console.error);

const startDir = '.'; // Starting directory, adjust as needed

