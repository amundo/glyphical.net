function appendWordsAndSave(objectsToAdd) {
  // Define the structure to be updated
  const dataStructure = {
    words: [],
    metadata: {}, // Assuming metadata is handled separately or updated in a different operation
  };

  // Open a connection to the IndexedDB database
  const request = indexedDB.open('WordsDatabase', 1);

  // Handle database setup or upgrade needed
  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('wordsStore')) {
      db.createObjectStore('wordsStore', { keyPath: 'id' });
    }
  };

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction('wordsStore', 'readwrite');
    const store = transaction.objectStore('wordsStore');

    // Attempt to retrieve the existing structure
    const getReq = store.get('wordsData');

    getReq.onsuccess = function() {
      // If the structure exists, append new words
      if (getReq.result) {
        const existingData = getReq.result;
        dataStructure.words = existingData.words.concat(objectsToAdd);
        dataStructure.metadata = existingData.metadata; // Assume metadata needs to be preserved
      } else {
        // If not, simply add the new words to the structure
        dataStructure.words = objectsToAdd;
      }

      // Save or update the structure in IndexedDB
      const updateReq = store.put({ id: 'wordsData', ...dataStructure });

      updateReq.onsuccess = function() {
        console.log('Words and metadata successfully saved/updated in IndexedDB.');
      };

      updateReq.onerror = function() {
        console.error('Error saving/updating words and metadata in IndexedDB:', updateReq.error);
      };
    };

    getReq.onerror = function() {
      console.error('Error retrieving existing data from IndexedDB:', getReq.error);
    };
  };

  request.onerror = function(event) {
    console.error('Error opening IndexedDB:', event.target.error);
  };
}

class LexiconDb {
  constructor(dbName="lexicon-db", dbVersion="0.1") {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.words = []
  }
  addWords(words){
    appendWordsAndSave(words)
  }


}

export {LexiconDb}