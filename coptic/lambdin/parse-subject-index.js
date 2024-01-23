
let parseLine = (line) => {
  let tokens = line.split(/[;, ]+/g)
  let references = tokens.filter((token) => token.match(/^(\d+\.\d+)$/))
  let topic
  if(references.some(reference => line.includes(reference))){
    topic = line.slice(0, line.indexOf(references[0] || 0)).trim() 
  } else {
    topic = line.trim()
  }
  return { topic, references }
}

let addReferences = (nodes, path = []) => { 
  let entries = []

  nodes.forEach((node) => {
    let { topic, references } = parseLine(node.name)
    node.topic = topic
    node.references = references

    const newPath = [...path, topic]
    if (node.children && node.children.length) {
      addReferences(node.children, newPath)
    } else {
      node.path = newPath
    }

    node.references.forEach((reference) => {
      entries.push({ ...node, reference, path: newPath }) // Push the node into the array
    })
  })

  return entries
}

let plaintextToTree = (input) => {
  const lines = input.split("\n")
  const baseIndentLevel = 2

  const root = lines.reduce((tree, line, lineIndex) => {
    if (line.trim() === "") return tree

    const indentLevel = line.search(/\S|$/)
    if (indentLevel % baseIndentLevel !== 0) {
      console.error(
        `Invalid indentation at line ${
          lineIndex + 1
        }: "${line}". Expected multiple of ${baseIndentLevel} spaces.`,
      )
      return tree
    }

    const newNode = { name: line.trim(), children: [], references: [] }

    if (indentLevel === 0) {
      tree.push(newNode)
    } else {
      let parent = tree
      for (let i = 0; i < indentLevel / baseIndentLevel; i++) {
        if (!parent[parent.length - 1]) {
          console.error("Invalid tree structure at line:", line)
          return tree
        }
        parent = parent[parent.length - 1].children
      }
      parent.push(newNode)
    }

    return tree
  }, [])

  return root
}

export { addReferences, plaintextToTree }
