class BiliteralQuiz extends HTMLElement {
  constructor() {
    super();
    this.score = 0;
    this.infoDiv = document.createElement('div');
    this.infoDiv.className = 'info';
    this.appendChild(this.infoDiv);
    this.fetchData();

    this.addEventListener('change', changeEvent => {
      if (changeEvent.target.matches('input[type="radio"]')) {
        const selectedValue = changeEvent.target.value;
        const currentHieroglyph = this.querySelector('h2').textContent;
        if (selectedValue === currentHieroglyph) {
          this.score++;
          this.infoDiv.textContent = `Correct! Your score is ${this.score}`;
        } else {
          const correctChoice = this.data.hieroglyphs.find(item => item.hieroglyph === currentHieroglyph);
          this.infoDiv.textContent = `Incorrect. The correct answer is ${correctChoice.biliteral}`;
        }
        this.renderQuestion();
      }
    });
  }

  async fetchData() {
    const src = this.getAttribute('src');
    console.log(src)
    try {
      const response = await fetch(src);
      if (response.ok) {
        this.data = await response.json();
        this.renderQuestion();
      } else {
        console.error(`Failed to fetch ${src}`);
      }
    } catch (error) {
      console.error(`Error fetching ${src}: ${error}`);
    }
  }

  randomQuestion() {
    const hieroglyphs = this.data.hieroglyphs;
    return hieroglyphs[Math.floor(Math.random() * hieroglyphs.length)];
  }

  render() {
    console.log(`rendering()`)
    this.innerHTML = '';
    this.appendChild(this.infoDiv);
    this.renderQuestion();
  }

  randomChoices(correctChoice) {
    let choices = [correctChoice];
    while (choices.length < 3) {
      const randomChoice = this.randomQuestion();
      if (!choices.includes(randomChoice)) {
        choices.push(randomChoice);
      }
    }
    return this.shuffleArray(choices);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  renderQuestion() {

    console.log(`renderingQuestion()`)
    const questionData = this.randomQuestion();
    const choices = this.randomChoices(questionData);
  
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
  
    const header = document.createElement('h2');
    header.textContent = questionData.hieroglyph;
    questionElement.appendChild(header);
  
    choices.forEach(choice => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'answer';
      radio.value = choice.hieroglyph;
  
      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice.biliteral));
      questionElement.appendChild(label);
    });
  
    // Clear previous content
    this.innerHTML = '';
  
    // Append the info div and the new question to the component
    this.appendChild(this.infoDiv);
    this.appendChild(questionElement);
  }
  
}

customElements.define('biliteral-quiz', BiliteralQuiz);
export {BiliteralQuiz}