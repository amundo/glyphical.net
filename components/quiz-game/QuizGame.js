class QuizGame extends HTMLElement {
  #data = {}

  constructor() {
    super();
    this.data = {};
    this.score = 0;
    this.innerHTML = `
    <h3 class=question></h3>
    <ul class=choices></ul>
    <div class=info>
      <p class=message></p>
      <p class=score>
        <span class=score-label>Score:</span>
        <span class=score-value>0</span>
        /
        <span class=score-total>0</span> 
      </p> 
    </div>
    
    `
  }

  connectedCallback() {
    this.fetch(this.getAttribute('src'));
    this.addEventListener('change', changeEvent => this.handleChange(changeEvent))
  }

  static get observedAttributes() {
    return ['src', 'items', 'question', 'answer'];
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
      if(attribute == 'src'){
        let url = new URL(newValue, document.location.href)
        this.fetch(url)
      }

      if(attribute == 'items'){
        this.itemsProperty = newValue
      }

      if(attribute == 'question' || attribute == 'answer'){
        this[attribute] = newValue
      }
  }

  async fetch(url) {
    // url = new URL(url, import.meta.url)
    let response = await fetch(url);
    let data = await response.json();
    this.data = data;
  }

  get data(){
    return this.#data
  }

  set data(data){
    this.#data = data
    this.render()
  }

  get items(){
    return this.#data[this.itemsProperty]
  }

  render() {
    if (!this.items) {
      this.innerHTML = 'Loading...';
      return;
    }

    let item = this.items[Math.floor(Math.random() * this.items.length)];
    let question = item[this.question]
    let answer = item[this.answer]

    let wrongItems = this.items
      .filter(item => item[this.answer] !== answer)
      .slice(0,5)

    let choices = [answer, ...wrongItems.map(item => item[this.answer])]

    choices = choices
    .sort(() => Math.random() - 0.5)


    let renderChoices = choices => choices
      .map(choice => `
        <li>
          <label>
            <input type="radio" name="answer" value="${choice}">
            ${choice}
          </label>
        </li>
      `).join('')

    this.querySelector('.question').textContent = question
    this.querySelector('.choices').innerHTML = renderChoices(choices)
    this.querySelector('.score-value').textContent = this.score
    this.querySelector('.score-total').textContent = this.items.length

  }

  handleChange(event) {
    if (event.target.matches('input[type=radio]')) {
      let selectedAnswer = this.querySelector('input[name="answer"]:checked');

      if (!selectedAnswer) {
        return;
      }
      selectedAnswer = selectedAnswer.value

      let item = this.items
        .find(obj => obj[this.answer] === selectedAnswer)

      let answer = item[this.answer]

      if (selectedAnswer === answer) {
        this.score++;
      } else {
      }
      this.render();
    }
  }
}

export {QuizGame}
customElements.define('quiz-game', QuizGame)
