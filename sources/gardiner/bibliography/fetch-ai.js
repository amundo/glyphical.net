const query = 'Zeitschrift für ägyptische Sprache und Altertumskunde';
let start = 0;
const rows = 10; // Number of rows per page
const allDocs = []; // Array to store all docs
const uniqueTitleVolumeSet = new Set(); // To keep track of unique title/volume combinations

const fetchPage = async (start, rows) => {
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&output=json&rows=${rows}&start=${start}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    let docs = data.response.docs;

    // Filter docs to only include the first occurrence of each title/volume combination
    docs = docs.filter(doc => {
      const title = doc.title || '';
      const volume = doc.volume || '';
      const titleVolumeKey = `${title}-${volume}`;

      if (!uniqueTitleVolumeSet.has(titleVolumeKey)) {
        uniqueTitleVolumeSet.add(titleVolumeKey);
        return true;
      }
      return false;
    });

    // Add PDF property to each doc
    docs.forEach(doc => {
      const identifier = doc.identifier;
      doc.pdf = `https://archive.org/download/${identifier}/${identifier}.pdf`;
    });

    // Add the filtered docs to the allDocs array
    allDocs.push(...docs);
    
    const numFound = data.response.numFound;
    if (start + rows < numFound) {
      await fetchPage(start + rows, rows);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchAllPages = async () => {
  await fetchPage(start, rows);
  return allDocs;
};


// Example usage
fetchAllPages().then(allDocs => {
  console.log(JSON.stringify(allDocs, null, 2));
});
