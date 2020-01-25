/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var right = 180;
var gameInterval = null


function checkCollision(rock) {
 
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockLeftEdge >= dodgerLeftEdge) {
      return true
    } else if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge){
      return true
    }else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`
    if(checkCollision(rock)){
      endGame()
    }if(top < GAME_HEIGHT){
      window.requestAnimationFrame(moveRock)
    }else{
      rock.remove()
    }
  }
  
  window.requestAnimationFrame(moveRock)

  // We should kick off the animation of the rock around here.

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}


function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock){rock.remove()})
  document.removeEventListener('keydown',moveDodger);
  alert("YOU LOSE!")
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft()
    }
    
    if (e.which === RIGHT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight()
    }
}

function moveDodgerLeft() {
  function move(){
     DODGER.style.left = `${right -= 4}px`;
     
     if (right > 0){
       window.requestAnimationFrame(move);
     }
  }
  window.requestAnimationFrame(move);
}

function moveDodgerRight() {
  function move(){
     DODGER.style.left = `${right += 4}px`;
     
     if (right <360){
       window.requestAnimationFrame(move);
     }
  }
  window.requestAnimationFrame(move);
}

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
  }, 1000);
}
