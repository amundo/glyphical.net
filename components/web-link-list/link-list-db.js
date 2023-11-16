// IndexedDB helper functions
const dbRequest = indexedDB.open("webLinksDatabase", 1)

dbRequest.onupgradeneeded = (event) => {
  // Create an object store called "links" if it doesn't already exist
  let db = event.target.result
  if (!db.objectStoreNames.contains("links")) {
    db.createObjectStore("links", { keyPath: "id", autoIncrement: true })
  }
}

const addLinkToDB = link => {
  return new Promise((resolve, reject) => {
    const dbConnection = indexedDB.open("webLinksDatabase");
    dbConnection.onsuccess = event => {
      const db = event.target.result;
      const transaction = db.transaction(["links"], "readwrite");
      const store = transaction.objectStore("links");
      const request = store.add(link);

      request.onsuccess = () => {
        resolve(request.result); // Typically the key of the new object, if successful
      };

      request.onerror = () => {
        reject(request.error); // Error message in case of failure
      };
    };

    dbConnection.onerror = event => {
      reject('Database error: ' + event.target.errorCode);
    };
  });
};


const getAllLinksFromDB = () => {
  return new Promise((resolve, reject) => {
    const dbConnection = indexedDB.open("webLinksDatabase")
    dbConnection.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(["links"], "readonly")
      const store = transaction.objectStore("links")
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(request.error)
      }
    }
  })
}

export { addLinkToDB, getAllLinksFromDB }
