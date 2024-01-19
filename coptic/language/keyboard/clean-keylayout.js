// Deno script to remove lines containing control characters from an XML file
const filePath = './Coptic-English.keylayout';
const newFilePath = './Coptic-English-cleaned.keylayout';

// Function to read file
async function readFile(path) {
  const decoder = new TextDecoder('utf-8');
  const data = await Deno.readFile(path);
  return decoder.decode(data);
}

// Function to write file
async function writeFile(path, data) {
  const encoder = new TextEncoder();
  await Deno.writeFile(path, encoder.encode(data));
}

// Function to remove lines containing control characters
function removeLinesWithControlCharacters(xmlContent) {
  const controlCharRegex = /&#x00[0-1][0-9A-Fa-f];/g;
  return xmlContent.split('\n').filter(line => !controlCharRegex.test(line)).join('\n');
}

// Main function
async function main() {
  try {
    const content = await readFile(filePath);
    const cleanedContent = removeLinesWithControlCharacters(content);
    await writeFile(newFilePath, cleanedContent);
    console.log('File processed and saved as:', newFilePath);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
