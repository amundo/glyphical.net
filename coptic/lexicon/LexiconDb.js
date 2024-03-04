
class LexiconDb {
  constructor({dbName = 'lexicon-db', storeName = 'wordsStore'} = {}) {
    this.dbName = dbName
    this.storeName = storeName
    this.key = 'wordsData';
    // Open the database connection when an instance is created
    this.dbPromise = this.openDb();
  }

  openDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error opening IndexedDB:', event.target.error);
      };
    });
  }

  async appendWordsAndSave(objectsToAdd) {
    const db = await this.dbPromise;
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    let dataStructure = {
      words: [],
      metadata: {}, // Assuming metadata is handled separately or updated in a different operation
    };

    try {
      const existingData = await this.getExistingData(store);

      if (existingData) {
        dataStructure.words = existingData.words.concat(objectsToAdd);
        dataStructure.metadata = existingData.metadata; // Assume metadata needs to be preserved
      } else {
        dataStructure.words = objectsToAdd;
      }

      const updateReq = store.put({ id: this.key, ...dataStructure });

      updateReq.onsuccess = () => {
        console.log('Words and metadata successfully saved/updated in IndexedDB.');
      };

      updateReq.onerror = () => {
        console.error('Error saving/updating words and metadata in IndexedDB:', updateReq.error);
      };
    } catch (error) {
      console.error('Error processing IndexedDB operation:', error);
    }
  }

  getExistingData(store) {
    return new Promise((resolve, reject) => {
      const getReq = store.get(this.key);

      getReq.onsuccess = () => {
        resolve(getReq.result);
      };

      getReq.onerror = () => {
        reject('Error retrieving existing data from IndexedDB:', getReq.error);
      };
    });
  }
}


console.log(new LexiconDb)
export {LexiconDb}