

/*
plaintext looks like:

article
  definite 1.3
  indefinite 2.1
  omission (deletion) of 2.2; 4.3; 15.3; 16.2; 18.1; 23,2; 26.1
assimilation p. xvi
Bipartite Conjugation 24.2
Bohairic dialect p. viii-ix
Causative Infinitive: see Inflected Infinitive

*/

/*
create data strcuture like:

[
  {
    topic: "article",
    subtopics: [
      {
        topic: "definite",
        sections: "1.3"
      },
      {
        topic: "indefinite",
        sections: "2.1"
      },
      {
        topic: "omission (deletion) of",
        sections: [ "2.2",  "4.3", "15.3", "16.2", "18.1", "23,2", "26.1" ]
      }
    ]
  },
  {
    topic: "assimilation",
    sections: ["p. xvi"]
  },
  {
    topic: "Bipartite Conjugation",
    sections: ["24.2"]
  },
  {
    topic: "Bohairic dialect",
    sections: ["p. viii-ix"]
  },
  {
    topic: "Causative Infinitive",
    see: "Inflected Infinitive"
  }
]
*/

// write a js function to produce the data structure from the plaintext
let plaintextToTree = input => {
  const lines = input.split('\n');

  const root = lines.reduce((tree, line) => {
    const indentLevel = line.search(/\S|$/);
    const newNode = { name: line.trim(), children: [] };

    if (indentLevel === 0) {
      tree.push(newNode);
    } else {
      let parent = tree;
      // Traverse the tree to find the correct parent for the current indent level
      for (let i = 0; i < indentLevel; i++) {
        // Added check to prevent accessing an undefined array element
        if (!parent[parent.length - 1]) {
          console.error('Invalid tree structure at line:', line);
          return tree;
        }
        parent = parent[parent.length - 1].children;
      }
      parent.push(newNode);
    }

    return tree;
  }, []);

  return root;
};


// write a js function to reverse the data structure into an object whose keys are section numbers
// sort the resulting object by section number and print it out

/*

create a data structure like:

[
  {
    "section": "1.1",
    "topics": [ "article", "definite" ]
  },

  {
    "section": "1.2",
    "topics": [ "nouns, number", "nouns, plural" ]
  },
]

*/

// let index = parseSubjectIndex(plaintext)

// plaintext = plaintext

// plaintext = `clause types
// formal
//   w. adjectival predicate 15.2; 29.2
//   w. adverbial predicate 1.4; 2.2
// functional
//   circumstantial 23.1
//   relative 3.1; 5.1; 12.1; 12.2; 13.2; 19.1; 21.1`

// console.log(JSON.stringify(treeToNestedObject(plaintext), null, 2));

export { plaintextToTree }