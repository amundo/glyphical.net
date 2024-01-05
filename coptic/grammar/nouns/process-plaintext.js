// Read the Markdown file from the first command-line argument
const filename = Deno.args[0];
if (!filename) {
  console.log("Please provide a Markdown file as the first argument.");
  Deno.exit(1);
}

try {
  // Read the content of the file
  let text = await Deno.readTextFile(filename);

  // Function to check if a chunk should be processed as a table
  const isTableChunk = chunk => chunk.trim().split('\n').every(line => line.includes('=>'));

  // Function to convert a chunk to table syntax
  const processTableChunk = chunk => {console.log(`processTableChunk`)
    const lines = chunk.trim().split('\n');
    const table = lines.map(line => {
      const [singular, plural] = line.split('=>').map(s => s.trim());
      return `| ${singular} | ${plural} |`;
    }).join('\n');
    return `| singular | plural |\n|----------|--------|\n${table}`;
  };

  // Split the text into chunks and process them
  let chunks = text.split(/\n\n+/g)
  .filter(Boolean)

  chunks = chunks.map(chunk => {
    chunk= chunk.trim()
    if (isTableChunk(chunk)) {
      return processTableChunk(chunk);
    } else {
      return chunk;
    }
  })

  // Reassemble the markdown
  let markdown = chunks.join('\n\n');

  // Write the modified content back to the file
  await Deno.writeTextFile(filename, markdown);
  // console.log(markdown)

  console.log("The file was processed and updated successfully.");
} catch (error) {
  console.error("An error occurred:", error);
  Deno.exit(1);
}

