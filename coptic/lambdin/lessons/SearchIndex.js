class SearchIndex {
  constructor(dbName, storeName, lessonsIndexUrl) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.lessonsIndexUrl = lessonsIndexUrl;
    this.db = null;
    this.init();
  }

  init() {
    let request = indexedDB.open(this.dbName, 1);

    request.addEventListener('error', event => {
      console.error("Error opening IndexedDB", event);
    });

    request.addEventListener('upgradeneeded', event => {
      this.db = event.target.result;
      this.db.createObjectStore(this.storeName, {
        keyPath: "url"
      });
    });

    request.addEventListener('success', event => {
      this.db = event.target.result;
      this.fetchLessons();
    });
  }
  async fetchLessons() {
    let response = await fetch(this.lessonsIndexUrl);
    let {
      lessons
    } = await response.json();

    // Fetch lesson content and store in IndexedDB
    for (const lesson of lessons) {
      let lessonResponse = await fetch(`./${lesson.url}`);
      let html = await lessonResponse.text();
      let doc = new DOMParser().parseFromString(html, 'text/html');

      // Start transaction here, so it stays active
      let transaction = this.db.transaction([this.storeName], "readwrite");
      let objectStore = transaction.objectStore(this.storeName);

      let request = objectStore.get(lesson.url);
      await new Promise((resolve, reject) => {
        request.addEventListener('success', async event => {
          if (!event.target.result) {
            objectStore.add({
              // url: lesson.url,
              // text: doc.body.textContent
              ...lesson, 
              text: doc.body.textContent
            }).addEventListener('success', resolve);
          } else {
            resolve();
          }
        });
        request.addEventListener('error', reject);
      });
    }
  }


  search(query, callback) {
    let transaction = this.db.transaction([this.storeName], "readonly");
    let objectStore = transaction.objectStore(this.storeName);
    let lessons = [];

    objectStore.openCursor().addEventListener('success', event => {
      let cursor = event.target.result;
      if (cursor) {
        if (cursor.value.text.toLowerCase().includes(query.toLowerCase())) {
          lessons.push(cursor.value.text);
        }
        cursor.continue();
      } else {
        callback(lessons);
      }
    });
  }
}

let lessonIndex = new SearchIndex("LessonDatabase", "lessons", "lesson-index.json");

export {lessonIndex}