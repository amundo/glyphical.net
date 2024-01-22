let plaintext = await Deno.readTextFile('subject-index.txt')
let lines = plaintext.split('\n')

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
// split into lines and use a .reduce

let parseSubjectIndex = (lines) => {
  let result = []
  let currentTopic = null
  let currentSubtopic = null
  for (let line of lines) {
    if (line === '') continue
    if (line.match(/^\s/)) {
      // subtopic
      if (currentSubtopic) {
        currentSubtopic.sections.push(line.trim())
      } else {
        currentSubtopic = {
          topic: line.trim(),
          sections: []
        }
        currentTopic.subtopics.push(currentSubtopic)
      }
    } else {
      // topic
      if (currentTopic) {
        result.push(currentTopic)
      }
      currentTopic = {
        topic: line.trim(),
        subtopics: []
      }
      currentSubtopic = null
    }
  }
  result.push(currentTopic)
  return result
}

console.log(parseSubjectIndex(plaintext.split`\n`))

// write a js function to reverse the data structure into an object whose keys are section numbers
// sort the resulting object by section number and print it out

let reverseSubjectIndex = (subjectIndex) => {
  let result = {}
  for (let topic of subjectIndex) {
    for (let subtopic of topic.subtopics) {
      for (let section of subtopic.sections) {
        result[section] = { topic: topic.topic, subtopic: subtopic.topic }
      }
    }
  }
  return result
}