let table = document.querySelector('table')
// Array.from(table.rows).slice(4).forEach(row => row.remove())

// let clone = table.cloneNode(true)
// table.after(clone)
// clone.style.display = 'none'

let rows = Array.from(table.tBodies[0].rows)

let cells = rows.map((row) => row.cells[1])

cells
  .forEach((cell) => {
    cell.originalRow = cell.parentElement
  })

cells.sort(() => Math.random() < .5)
rows.forEach((row) => row.cells[1].remove())

let shuffledIndices = Array.from(Array(cells.length), (x, i) => i)

cells.forEach((cell, i) => {
  cell.setAttribute
  rows[shuffledIndices[i]].append(cell)
})

let handleDragStart = e => {
  // e.preventDefault()
  // e.target.originalRow = e.target.parentElement
  e.target.latestRow = e.target.parentElement
  e.target.classList.add("dragging")
}

let handleDragOver = e => e.preventDefault()

let handleDrop = e => {
  let dragCell = document.querySelector(".dragging")
  let dropCell = e.target
  let dropCellRow = dropCell.parentElement

  let dragCellLatestRow = dragCell.latestRow

  dropCellRow.append(dragCell)
  dragCellLatestRow.append(dropCell)

  dragCell.classList.remove("dragging")

  checkForWin()
}

let checkForWin = () => {
  cells.forEach(cell => {
    if(cell.parentElement === cell.originalRow){
      cell.classList.remove("wrong")
      cell.classList.add("correct")
    } else {
      cell.classList.remove("correct")
      cell.classList.add("wrong")
    }
  })

  if(cells.every(cell => cell.classList.contains("correct"))){
    document.body.classList.add("win")
  }
}

let makeCellsDraggable = (cells) => {
  cells.forEach((cell) => {
    cell.setAttribute("draggable", true)
    cell.addEventListener("dragstart", handleDragStart)
    cell.addEventListener("dragover", handleDragOver)
    cell.addEventListener("drop", handleDrop)
  })
}

makeCellsDraggable(cells)

