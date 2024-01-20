import {transliterate} from './transliterate.js'

export class TransliterationEditor extends HTMLElement {
  constructor(){
    super()
    this.listen()
  }

  connectedCallback(){
    this.innerHTML = `
      <select name=from></select>  
      <textarea name=input-textarea></textarea>
    
      <div class=cheatsheet>cheatsheet</div>
  
      <select name=to></select>
      <textarea class=output name=output-textarea></textarea>
      `
    this.fromSelect = this.querySelector('select[name=from]')
    this.toSelect = this.querySelector('select[name=to]')
    this.inputTextarea = this.querySelector('textarea[name=input-textarea]')
    this.outputTextarea = this.querySelector('textarea[name=output-textarea]')
  }

  static get observedAttributes(){
    return ['language-src', 'from', 'to']
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    switch (attribute) {
      case 'language-src':
        this.fetch(newValue) 
        break
      case 'from':
        this.inputOrthography = newValue 
        break
      case 'to':
        this.outputOrthography = newValue 
        break
      default:
        break
    }
  }
  
  async fetch(url){
    let response = await fetch(url)
    this.language = await response.json()

    this.renderOrthographySelects()
    this.render()
  }
  
  set from(value){
    if(this.fromSelect){
      this.fromSelect.value = value
    }
  }

  get from(){
    return this.fromSelect.value
  }

  set to(value){
    if(this.toSelect){
      this.toSelect.value = value
    }
  }

  get to(){
    return this.toSelect.value
  }

  get cheatsheet(){
    return this.language.orthography
      .map(o => [o[this.inputOrthography], o[this.outputOrthography]])
      .filter(([from,to]) => from != to)
      .map(([from,to]) => `
        <span class=correspondence>
          <kbd class=from>${from}</kbd><kbd class=to>${to}</kbd>
        </span>
      `)
      .join(' ')
  }

  renderOrthographySelects(){
    let orthographyNames = Object.keys(this.language.orthography[0])

    this.querySelectorAll('select').forEach(select => select.textContent = '')

    orthographyNames
      .map(orthographyName => {
        let option = document.createElement('option')
        option.textContent = orthographyName
        option.value = orthographyName
        return option
      })
      .forEach(option => {
        this.querySelector('select[name=from]')
          .append(option)

        this.querySelector('select[name=to]')
          .append(option.cloneNode(true))
      })
  }

  render(){
    this.querySelector(`select[name=from] option[value="${this.from}"]`).selected = true
    this.querySelector(`select[name=to] option[value="${this.to}"]`).selected = true
    
    this.querySelector('.cheatsheet').innerHTML = this.cheatsheet
  }

  transliterate(){
    let input = this.inputTextarea.value

    this.outputTextarea.value = transliterate(input,  this.language.orthography, this.from, this.to)
  }

  listen(){
    this.addEventListener('keyup', keyupEvent => this.transliterate())
    this.addEventListener('change', changeEvent => { 
      if(changeEvent.target.matches('select')){
        this.render()
        this.transliterate()
      }
    })
  }
}

customElements.define('transliteration-editor', TransliterationEditor)

