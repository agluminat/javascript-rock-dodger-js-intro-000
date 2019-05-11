
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    // The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    // The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20

    /** if (false
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               ) {*/

      if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0

  GAME.appendChild(rock)


 function moveRock() {
    rock.style.top = `${top += 2}px)`

     if (checkCollision(rock)) {
       return endGame()
     }

     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock)
     } else {
        rock.remove()
      }
    }

   window.requestAnimationFrame(moveRock)

   ROCKS.push(rock)

   return rock
}


function endGame() {
  clearInterval(gameInterval)

  ROCKS.forEach(function(rock) {
    rock.remove()
  })

  document.removeEventListener('keydown', moveDodger)

  return alert("YOU LOSE!")
}

function moveDodger(e) {
  const key = e.which
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(key) > -1) {
    e.stopPropagation()
    e.preventDefault()
  }

  if (key === LEFT_ARROW) {
    moveDodgerLeft()
 } else if (key === RIGHT_ARROW) {
    moveDodgerRight()
 }
}

// implement me!
function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const right = positionToInteger(DODGER.style.left)

    if (right < 360) {
      DODGER.style.left = `${right + 4}px`
    }
  })
}

/**
 * This function should move DODGER to the right
 * (maybe 4 pixels?). Use window.requestAnimationFrame()!
 */

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
