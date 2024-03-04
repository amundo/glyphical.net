---
title: LexiconDb Class
author: Patrick Hall
---


The `LexiconDb` class is designed to manage interactions with an IndexedDB database specifically tailored for storing and managing words and metadata. It encapsulates functionality for opening a connection to the database, appending objects to a words array, and saving this data within IndexedDB.

## Constructor

```javascript
constructor()
```

Initializes a new instance of the `LexiconDb` class, setting up the database name, store name, and key for accessing the words data. It also initiates opening the database connection.

## Methods

### openDb

```javascript
openDb()
```

**Description:**

Opens a connection to the IndexedDB database. If necessary, it upgrades the database by creating the specified object store.

**Returns:**

- `Promise`: A promise that resolves with the database instance upon successful connection.

### appendWordsAndSave

```javascript
async appendWordsAndSave(objectsToAdd)
```

**Parameters:**

- `objectsToAdd`: Array of objects. These objects will be appended to the `words` array in the database.

**Description:**

Appends an array of objects to the `words` array within the database's data structure. If the structure does not exist, it is created. This method handles both the retrieval of existing data and the saving of updated data asynchronously.

**Returns:**

- This method does not return a value but will log success or error messages to the console based on the outcome of the operation.

### getExistingData

```javascript
getExistingData(store)
```

**Parameters:**

- `store`: The IndexedDB store from which to retrieve the existing data.

**Description:**

A helper method to retrieve existing data from the IndexedDB store.

**Returns:**

- `Promise`: A promise that resolves with the existing data if found, or rejects with an error message.

## Usage Example

To use the `LexiconDb` class, first, create an instance of the class. Then, call `appendWordsAndSave` with the objects you want to add to the database.

```javascript
// Create an instance of LexiconDb
const lexiconDb = new LexiconDb();

// Define objects to add
const wordsToAdd = [
  { word: 'Hello', definition: 'A greeting' },
  { word: 'World', definition: 'The earth, together with all of its countries and peoples' }
];

// Append objects to the words array and save/update in IndexedDB
lexiconDb.appendWordsAndSave(wordsToAdd).then(() => {
  console.log('Words added successfully');
}).catch(error => {
  console.error('Error adding words:', error);
});
```

This documentation outlines the basic functionality of the `LexiconDb` class, intended to facilitate the management of words and their metadata within an IndexedDB database in a web application.

---