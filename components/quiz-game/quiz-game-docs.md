---
lang: en
title:  \<quiz-game\> docs
css: quiz-game.css
---

<main>

This component is a generic quiz game. It can be used to create a quiz game from a list of questions and answers.



<section id=example>

## Example


```html
<quiz-game src="sample-data.json" question="hmm" answer="location" items="geo-questions"></quiz-game>  
```

```{=html}
<quiz-game src="sample-data.json" question="hmm" answer="location" items="geo-questions"></quiz-game>  
```

This assumes data that looks like this:

```json
{
  "geo-questions": [
    {
      "hmm": "What is the capital of France?",
      "location": "Paris"
    },
    {
      "hmm": "What is the largest planet in our solar system?",
      "location": "Jupiter"
    },
    {
      "hmm": "What is the smallest country in the world?",
      "location": "Vatican City"
    },
    {
      "hmm": "What is the highest mountain in the world?",
      "location": "Mount Everest"
    },
    {
      "hmm": "What is the largest ocean in the world?",
      "location": "Pacific Ocean"
    }
  ]
}
```


</section>

<section id=attributes>

## Attributes

The attribute are:

- `src` - the URL of the JSON file containing the data
- `items` - the name of the property in the JSON file that contains the array of questions and answers
- `question` - the name of a property in objects in the `items` array that contains the question
- `answer` - the name of a property in objects in the `items` array that contains the answer


</section>

<section id=data>

## Data

</section>

<section id=events>

## Events

</section>

<section id=layouts>

## Layouts

</section>

<section id=see-also>

## See also

</main>


<script type="module">
import {QuizGame} from './QuizGame.js'

window.quizGame = document.querySelector('quiz-game')
</script>

