class StepOne extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    new Array(12 * 12)
      .fill()
      .forEach(_ => {
        const div = document.createElement('div');
        shadow.appendChild(div);
      });

    const style = document.createElement('style');
    style.textContent = `
      :root {
        display: inline-grid;
        border: 5px solid lightgray;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: repeat(12, 1fr);
        gap: 1px;
        background: lightgray;
      }

      :root div {
        display: block;
        background: #fff;
        height: 1em;
        width: 1em;
      }

      :root span {
        grid-column: span 12;
        grid-row: span 12;
      }
    `;

    shadow.appendChild(style);
  }
}

customElements.define('step-one', StepOne)
export {StepOne}