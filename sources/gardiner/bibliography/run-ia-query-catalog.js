import { exists } from "https://deno.land/std/fs/mod.ts"

let toSlug = s => s
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\p{Letter}-]+/gu, "")

const fetchDocs = async (query) => {
  let start = 0;
  const rows = 10;
  const allDocs = [];

  console.log(`Searching… ${query}`)

  const fetchPage = async (start, rows) => {
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&output=json&rows=${rows}&start=${start}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      let docs = data.response.docs;

      docs.forEach(doc => {
        const identifier = doc.identifier;
        doc.pdf = `https://archive.org/download/${identifier}/${identifier}.pdf`;
      });

      allDocs.push(...docs);
      
      const numFound = data.response.numFound;
      if (start + rows < numFound) {
        await fetchPage(start + rows, rows);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  await fetchPage(start, rows);
  return allDocs;
};

const processCatalog = async (catalogPath) => {
  try {
    const catalogData = await Deno.readTextFileSync(catalogPath);
    const catalog = JSON.parse(catalogData);
    const queries = catalog.queries;

    for (const queryObj of queries) {
        let filePath = `results/${toSlug(queryObj.query)}.json`
        let found = await exists(filePath)
        
        if(found){
          console.log(`File ${filePath} already exists, skipping query.`);
        } else {
        const docs = await fetchDocs(queryObj.query);

        await Deno.writeTextFileSync(filePath, JSON.stringify(docs, null, 2));
        console.log(`Query results saved to ${filePath}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Usage example
processCatalog('ia-search-catalog.json');
