
class HieroglyphView extends HTMLElement {
  #hieroglyph = null

  constructor(){
    super()

    this.listen()
  }

  set data(hierogylyph){
    this.#hieroglyph = hierogylyph
    this.render()
  }

  get data(){
    return this.#hieroglyph
  }


  attachTemplate() {
      const template = document.querySelector("#hieroglyph-view-template");
      if(template){

        const templateContent = template.content;
        this.innerHTML = ``
        this.append(templateContent.cloneNode(true));
      } else {
        this.innerHTML = `
          <div class="hieroglyph"></div>
          <div class="description"></div>
        `
      }
  }

  render() {
    this.attachTemplate();
    const elements = this.querySelectorAll('[class]');
    elements.forEach(element => {
      const classNames = element.className.split(' ');
      classNames.forEach(className => {
        const value = this.findMatchingValue(className, this.#hieroglyph);
        if (value !== undefined) {
          element.textContent = value;
        }
      });
    });
  }
  
  findMatchingValue(className, data) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      for (const key in data) {
        if (key === className) {
          return data[key];
        } else {
          const nestedValue = this.findMatchingValue(className, data[key]);
          if (nestedValue !== undefined) {
            return nestedValue;
          }
        }
      }
    }
    return undefined;
  }
  
      
  wasrender(){
    this.attachTemplate()

    Object.entries(this.#hieroglyph)
      .forEach(([key, value]) => {
        if(typeof value == 'string' && !Array.isArray(value)){
          if(this.querySelector(`.${key}`)){
            this.querySelector(`.${key}`).textContent = value
          }
        } else if (typeof value == 'object'&& !Array.isArray(value)){
          Object.entries(this.#hieroglyph[key])
            .forEach(([subKey, subValue]) => {
              // console.log({subKey, subValue})
              if(this.querySelector(`.${subKey}`)){
                this.querySelector(`.${subKey}`).textContent = subValue
              }
            })
        }
      })
  }
  
  listen(){
    this.addEventListener('click', clickEvent => {
      
    })
  }
}

export {HieroglyphView}
customElements.define('hieroglyph-view', HieroglyphView)
