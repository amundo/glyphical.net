class StepTwo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 12; col++) {
        const div = document.createElement('div');
        shadow.appendChild(div);
        div.style.gridRow = row + 1
        div.style.gridColumn = col + 1
      }
    }

    // this.classList.add('horizontal')

    let span = document.createElement('span')
    span.textContent = '𓐍' 
    span.textContent = '𓎿'
    span.textContent = '𓌇'
    span.textContent = '𓆓'

    
    span.style.outline = '1px solid fuchsia'
    span.style.height = '100%'
    span.style.width = '100%'
    span.style.fontSize = "12rem";
    span.style.background = 'hsla(50, 100%, 50%, 0.5)'
    span.style.placeContent = 'center'
    span.style.margin = '0'
    span.style.display = 'grid'
    span.style.lineHeight = '0'
    shadow.appendChild(span)
    let clone = span.cloneNode(true)
    clone.style.outline = '1px solid chartreuse'

    clone.textContent = '𓂧'
    shadow.appendChild(clone
      )

    const style = document.createElement('style');
    style.textContent = `
    :host {
      display: inline-grid;
      border: 5px solid lightgray;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(12, 1fr);
      gap: 1px;
      background: lightgray;
    }
    
    div {
      background: #fff;
      height: 1rem;
      width: 1rem;
      padding:0;
      margin:0;
    }
    
    span:nth-of-type(1) {
      grid-row: 1 / 13;  
      grid-column: 1 / span 13;
      background: pink;
      display:grid;
    }
    
    span:nth-of-type(2) {
      grid-row: 7 / 13; 
      grid-column: 1 / span 7; 
      font-size: 3rem;
    }
  
    `  

    shadow.appendChild(style);
  }
}

customElements.define('step-two', StepTwo)
export {StepTwo}