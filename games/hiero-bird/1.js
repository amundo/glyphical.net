const gameContainer = document.getElementById("game-container")
const birdsContainer = document.getElementById("birds")
const scoreDisplay = document.getElementById("score")
let score = 0
let targetHieroglyph = null

let response = await fetch("https://glyphical.net/data/hieroglyphs.json")
let data = await response.json()
let hieroglyphs = data.hieroglyphs
hieroglyphs = hieroglyphs
  .filter((h) => h.category == "Birds")
  .filter((h) =>
    !["combin", "with", " on ", " in ", "two", "three"]
      .some((x) => h.description.toLowerCase().includes(x))
  )

// Function to generate a random hieroglyph
function generateRandomHieroglyph() {
  // Randomly pick a hieroglyph from the array
  const randomIndex = Math.floor(Math.random() * hieroglyphs.length)
  const hieroglyph = hieroglyphs[randomIndex]

  // Create the span element for the hieroglyph
  const span = document.createElement("span")
  span.classList.add("hieroglyph")
  span.textContent = hieroglyph.hieroglyph
  span.style.top = `${Math.random() * 80}%` // Randomize vertical position

  // Add click event for scoring
  span.addEventListener("click", () => {
    if (hieroglyph === targetHieroglyph) {
      score++
      updateTargetHieroglyph()
    } else {
      score--
    }
    scoreDisplay.textContent = score
  })

  birdsContainer.appendChild(span)
}

// Function to update the target hieroglyph
function updateTargetHieroglyph() {
  // Logic to select and display new target hieroglyph
  // Update the message bar with the target hieroglyph's description
}

// Generate initial hieroglyphs
for (let i = 0; i < 5; i++) { // Adjust number as needed
  generateRandomHieroglyph()
}

// Update target hieroglyph for the first time
updateTargetHieroglyph()

// Reset and Exit button functionality
document.getElementById("reset-button").addEventListener("click", resetGame)
document.getElementById("exit-button").addEventListener("click", exitGame)

// Reset game function
function resetGame() {
  // Logic to reset the game
}

// Exit game function
function exitGame() {
  // Logic to handle game exit
}
