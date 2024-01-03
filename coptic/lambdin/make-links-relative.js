import { walk } from "https://deno.land/std/fs/mod.ts";

// The directory you want to iterate over
const targetDirectory = "./lessons/";

for await (const entry of walk(targetDirectory)) {
  if (entry.isFile && entry.path.endsWith('.html')) { // Checking if it's an HTML file
    try {
      // Read the content of the file
      const content = await Deno.readTextFile(entry.path);

      // Regular expression to find <a href="/lessons/lesson_..."> and replace with <a href="lesson_02.html">
      const updatedContent = content.replace(/<a href="\/lessons\/lesson_/g, '<a href="lesson_');

      // Check if anything was replaced
      if (content !== updatedContent) {
        await Deno.writeTextFile(entry.path, updatedContent);
        console.log(`Updated links in: ${entry.path}`);
      }
      
    } catch (error) {
      console.error(`Error processing ${entry.path}: ${error}`);
    }
  }
}

console.log("Done processing files.");
