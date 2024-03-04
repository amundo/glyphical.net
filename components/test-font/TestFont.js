let response = await fetch('../../data/hieroglyphs/hieroglyphs.json')
let {hieroglyphs} = await response.json()
let hs = hieroglyphs.sort(() => Math.random() < .5 ? 1 : -1)
.slice(0,100)

hs.forEach(h => h.unicode = `U+${h.unicode}`)

let sampleHieroglyphs = hs.map(h => [h.unicode,h.name])

class TestFont extends HTMLElement {
  constructor(){
    super()
  }
  
  
  connectedCallback(){
    this.innerHTML = `
    <div class=controls>
      <button>a</button>
    </div>
    <textarea></textarea>
    <output></output>
    
    `

    this.listen()
    this.render()
  }
 
  render(){
    this.renderButtons()
  }

  renderButtons(){
    let controlCharacters = [
      {"unicode": "U+13430", "description": "EGYPTIAN HIEROGLYPH VERTICAL JOINER", "character": "𓐰", "unicode_escape": "\\u13430"},
      {"unicode": "U+13431", "description": "EGYPTIAN HIEROGLYPH HORIZONTAL JOINER", "character": "𓐱", "unicode_escape": "\\u13431"},
      {"unicode": "U+13432", "description": "EGYPTIAN HIEROGLYPH INSERT AT TOP START", "character": "𓐲", "unicode_escape": "\\u13432"},
      {"unicode": "U+13433", "description": "EGYPTIAN HIEROGLYPH INSERT AT BOTTOM START", "character": "𓐳", "unicode_escape": "\\u13433"},
      {"unicode": "U+13434", "description": "EGYPTIAN HIEROGLYPH INSERT AT TOP END", "character": "𓐴", "unicode_escape": "\\u13434"},
      {"unicode": "U+13435", "description": "EGYPTIAN HIEROGLYPH INSERT AT BOTTOM END", "character": "𓐵", "unicode_escape": "\\u13435"},
      {"unicode": "U+13436", "description": "EGYPTIAN HIEROGLYPH OVERLAY MIDDLE", "character": "𓐶", "unicode_escape": "\\u13436"},
      {"unicode": "U+13437", "description": "EGYPTIAN HIEROGLYPH BEGIN SEGMENT", "character": "𓐷", "unicode_escape": "\\u13437"},
      {"unicode": "U+13438", "description": "EGYPTIAN HIEROGLYPH END SEGMENT", "character": "𓐸", "unicode_escape": "\\u13438"},
      {"unicode": "U+13439", "description": "EGYPTIAN HIEROGLYPH INSERT AT MIDDLE", "character": "𓐹", "unicode_escape": "\\u13439"},
      {"unicode": "U+1343A", "description": "EGYPTIAN HIEROGLYPH INSERT AT TOP", "character": "𓐺", "unicode_escape": "\\u1343A"},
      {"unicode": "U+1343B", "description": "EGYPTIAN HIEROGLYPH INSERT AT BOTTOM", "character": "𓐻", "unicode_escape": "\\u1343B"},
      {"unicode": "U+1343C", "description": "EGYPTIAN HIEROGLYPH BEGIN ENCLOSURE", "character": "𓐼", "unicode_escape": "\\u1343C"},
      {"unicode": "U+1343D", "description": "EGYPTIAN HIEROGLYPH END ENCLOSURE", "character": "𓐽", "unicode_escape": "\\u1343D"},
      {"unicode": "U+1343E", "description": "EGYPTIAN HIEROGLYPH BEGIN WALLED ENCLOSURE", "character": "𓐾", "unicode_escape": "\\u1343E"},
      {"unicode": "U+1343F", "description": "EGYPTIAN HIEROGLYPH END WALLED ENCLOSURE", "character": "𓐿", "unicode_escape": "\\u1343F"}
    ]

    let buttons = [...controlCharacters, ...sampleHieroglyphs]
      .map(([code,name]) => [String.fromCodePoint(parseInt(code.split('U+')[1],16)),name])
      .map(([controlCharacter,name]) => `<button title=" ${name}" data-control-character="${controlCharacter}"><span class=escaped-code>${controlCharacter}</span></button>`).join('')

    this.querySelector('.controls').innerHTML = buttons
  }

  listen(){
    this.output = this.querySelector('output')

    this.addEventListener('click', e => {
      let target = e.target.closest('button')
      console.log(target)
      let controlCharacter = target.dataset.controlCharacter
      this.querySelector('textarea').value += controlCharacter

    })
    
    
    this.addEventListener('keyup', keyupEvent => {
      if(keyupEvent.target.matches('textarea')){
        this.output.innerHTML = keyupEvent.target.value
      }
    })
  }
}

export {TestFont}
customElements.define('test-font', TestFont)

