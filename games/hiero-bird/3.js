import { shuffleArray } from "./shuffle-array.js"
const gameContainer = document.getElementById("game-container")
const birdsContainer = document.getElementById("birds")
const scoreDisplay = document.getElementById("score")
let score = 0
let targetHieroglyph = null

async function fetchHieroglyphs() {
  let response = await fetch("https://glyphical.net/data/hieroglyphs.json")
  let data = await response.json()
  let hieroglyphs = data.hieroglyphs
    .filter((h) => h.category === "Birds")
    .filter((h) =>
      !["combin", "with", " on ", " in ", "two", "three"]
        .some((x) => h.description.toLowerCase().includes(x))
    )

  shuffleArray(hieroglyphs)

  const initialHieroglyphs = hieroglyphs.slice(0, 5)

  const targetIndex = Math.floor(Math.random() * initialHieroglyphs.length)
  targetHieroglyph = initialHieroglyphs[targetIndex]

  const messageBar = document.getElementById("message-bar")
  messageBar.textContent =
    `Click on the hieroglyph that represents: ${targetHieroglyph.description}`

  initialHieroglyphs.forEach((hieroglyph) =>
    generateRandomHieroglyph(hieroglyph)
  )
}

function renderHieroglyph(hieroglyphs) {
  const span = document.createElement("span")
  span.classList.add("hieroglyph")
  span.textContent = hieroglyph.hieroglyph
  span.style.top = `${Math.random() * 80}%`

  const duration = 20000 + Math.random() * 4000 // 10-14 seconds
  const delay = Math.random() * 5000 // up to 5 seconds

  span.animate([
    { transform: "translateX(100vw)" },
    { transform: "translateX(-100vw)" },
  ], {
    duration,
    delay,
    iterations: Infinity,
  })

  span.addEventListener("click", () => {
    alert('clicked')
    if (hieroglyph === this.targetHieroglyph) {
      score++
      updateTargetHieroglyph(hieroglyphs)
    } else {
      score--
    }
    scoreDisplay.textContent = score
  })

  birdsContainer.appendChild(span)
}

function updateTargetHieroglyph() {
  // Update the message bar
  const messageBar = document.getElementById("message-bar")
  messageBar.textContent =
    `Click on the hieroglyph that represents: ${targetHieroglyph.description}`
}

function resetGame() {
  // Logic to reset the game
}

function exitGame() {
  // Logic to handle game exit
}

document.getElementById("reset-button").addEventListener("click", resetGame)
document.getElementById("exit-button").addEventListener("click", exitGame)

fetchHieroglyphs().then((hieroglyphs) => {
  for (let i = 0; i < 5; i++) {
    generateRandomHieroglyph(hieroglyphs)
  }
  updateTargetHieroglyph(hieroglyphs)
})
