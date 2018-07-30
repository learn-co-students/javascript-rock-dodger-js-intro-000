const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
var ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
var rockScore = 0


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 365) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 10;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (dodgerLeftEdge > rockRightEdge || dodgerRightEdge < rockLeftEdge){
      return 'miss'
    } else {
      return 'hit'
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
//Rock score update;
  rockScore += 1
  score.innerHTML = `${rockScore}`
  score.style.display = 'inline'
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  GAME.appendChild(rock)
  function moveRock() {
    //debugger;
    rock.style.top = `${top += 2}px`
    if (gameInterval !== null && checkCollision(rock) === 'hit') {
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
  //debugger
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock) { rock.remove() })
  //ROCKS = []
  //console.log(ROCKS)
  window.removeEventListener('keydown', moveDodger)
  if (rockScore > 30){
  START.innerHTML = `Play again? Score: ${rockScore}`
  START.style.display = 'inline'
}else {
  START.innerHTML = `Give the game a couple seconds to reset`
  START.style.display = 'inline'
}
  gameInterval = null
  //alert(`YOU LOSE! Score: ${rockScore}`)
  rockScore = 0
  return
}

function moveDodger(e) {
  document.addEventListener('keydown', function(e) {
    e.preventDefault()
    e.stopPropagation()
  if (e.which === 37) {
    moveDodgerLeft()
  }
})
  document.addEventListener('keydown', function(e) {
    e.preventDefault()
    e.stopPropagation()
  if (e.which === 39) {
    moveDodgerRight()
  }
})
}

function moveDodgerLeft() {
  //debugger;
  var left = positionToInteger(DODGER.style.left)
  function moveLeft(){
    DODGER.style.left = `${left - 6}px`
    }
  if (gameInterval !== null && left > 0) {
    window.requestAnimationFrame(moveLeft)
    }
  }



function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  function moveRight(){
    DODGER.style.left = `${left + 6}px`
    }

  if (gameInterval !== null && left < 390) {
    window.requestAnimationFrame(moveRight)
  }
}


function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  //debugger
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 10)))
  }, 100)
}
