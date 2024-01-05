// Import necessary Deno modules
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// Function to check if a word is Coptic
function isCoptic(word) {
  const copticRegex = /\p{Script=Greek}|\p{Script=Coptic}/gu;
  return copticRegex.test(word);
}

// Function to wrap Coptic words with <span>
function wrapCopticWords(textNode) {
  return textNode.split(/\s+/).map(word => isCoptic(word) ? `<span lang="cop">${word}</span>` : word).join(' ');
}

// Function to process the HTML file
async function processHtmlFile(filePath) {
  try {
    // Read the HTML file
    const text = await Deno.readTextFile(filePath);
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    if (doc) {
      // Iterate through each text node in the document
      doc.querySelectorAll('*').forEach(node => {
        node.childNodes.forEach(child => {
          if (child.nodeType === 3) { // Node.TEXT_NODE
            // Replace the text node with processed text
            child.replaceWith(wrapCopticWords(child.textContent));
          }
        });
      });

      // Output the processed HTML
      console.log(doc.documentElement.outerHTML);
    } else {
      console.error('Failed to parse the HTML document.');
    }
  } catch (error) {
    console.error('Error processing the HTML file:', error);
  }
}

// Replace 'path/to/your/file.html' with the actual file path
const filePath = Deno.args[0]

processHtmlFile(filePath)
