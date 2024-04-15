let entries = `

ⲡ.ⲣⲱⲙⲉ
man, person; mankind.

ⲧⲉ.ⲥϩⲓⲙⲉ
woman, wife.

ⲛⲉ.ϩⲓⲟⲙⲉ
women, wives.

ⲡ.ϩⲗ̅ⲗⲟ
old man, monk.

ⲑⲗ̅ⲗⲱ
old woman

ⲧ.ϩⲗ̅ⲗⲱ
old woman

ⲡ.ϫⲱⲱⲙⲉ
book, book-roll, document.

ⲡ.ⲱⲛⲉ
stone.

ⲧⲉ.ϩⲓⲏ
road, way, path.


ⲛⲉ.ϩⲓⲟⲟⲩⲉ
roads, ways, paths.


ⲡ.ⲧⲟⲟⲩ
mountain; monastery.

ⲡ.ⲏⲓ
house.

ⲡ.ⲛⲟⲩⲃ
gold.

ϩⲛ̅
in.


ϩⲙ̅
in.

ϩⲁ
under.

ϩⲓ
on, upon.

ϩⲓϫⲛ̅
on, upon.

ϩⲓϫⲙ̅
on, upon.

ⲙⲛ̅
with, together with, in the company of; and.


`
.trim()
.split(/\n\n+/g)
.filter(Boolean)
.map(entry => entry.trim())


let prepositions = `
ϩⲛ̅
in.


ϩⲙ̅
in.

ϩⲁ
under.

ϩⲓ
on, upon.

ϩⲓϫⲛ̅
on, upon.

ϩⲓϫⲙ̅
on, upon.

ⲙⲛ̅
with, together with, in the company of; and.`.split(/\n\n+/g).filter(Boolean).map(entry => entry.split('\n')[0])

let classifyType = form => {
  if(form.includes(".")){
    return 'noun'
  }
  if(prepositions.includes(form)){
    return 'preposition'
  }
}

let parseNoun = form => {
  let [article, root] = form.split('.')
  let number = article.startsWith('ⲛ') ? 'plural' : 'singular'
  let gender
  if(article.startsWith('ⲧ')) {
    gender = 'feminine'
  } else if(article.startsWith('ⲡ')) {
    gender = 'masculine'
  } else {
    gender = 'common'
  }

  article = {
    form: article,
    gloss: 'the',
    type: 'prefix',
    features: {
      number,
      gender
    },
    type: 'prefix'
  }

  root = {
    form: root,
    gloss: "",
    type: 'root',
    features: {
      number
    }
  }
  return [article, root]
}

let parseForm = form => {
  let type = classifyType(form)
  if(type === 'noun'){
    return parseNoun(form)
  }
  if(type === 'preposition'){
    return {
      form,
      gloss: '',
      features:{},
      type: 'preposition'
    }
  }
}

let words = entries.map(entry => {
  entry = entry.replace(/\.$/,'')

  let [form, gloss] = entry.split('\n')
  
  let analysis = parseForm(form)
  if(Array.isArray(analysis)){
    console.log(analysis)
    return analysis
  }
  analysis.gloss = gloss

  return analysis
})
.flat()

// await Deno.writeTextFile('lexicon.json', JSON.stringify(words, null, 2))