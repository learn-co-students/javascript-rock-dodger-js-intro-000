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
const DODGER_MOVE_SPEED = 4
const ROCK_MOVE_SPEED = 2

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    /*
     * There's been a collision if one of three things is true:
     * 1. The rock's left edge is < the DODGER's left edge,
     *    and the rock's right edge is > the DODGER's left edge;
     * 2. The rock's left edge is > the DODGER's left edge,
     *    and the rock's right edge is < the DODGER's right edge;
     * 3. The rock's left edge is < the DODGER's right edge,
     *    and the rock's right edge is > the DODGER's right edge
     */
    if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerLeftEdge) {
      return true
    }else if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge){
      return true
    }else if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge){
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

  //Add rock to the game
   GAME.appendChild(rock)

  /*
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    /*
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)){
       return endGame();
     }
    /**
     * If the rock has reached the bottom the game remove it
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     if (positionToInteger(rock.style.top) > GAME_HEIGHT){
       rock.remove();
     }else{
       rock.style.top = integerToPosition(positionToInteger(rock.style.top) + ROCK_MOVE_SPEED)
       window.requestAnimationFrame(moveRock)
     }
  }

  // Animate Rock
  window.requestAnimationFrame(moveRock)
  //Add Rocks to array
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  ROCKS.forEach(function(rock){
    rock.remove();
  });

  START.innerHTML = 'Play again?'
  START.style.display = 'inline'

  return alert('You loose!')
}

/*
 * This function should call `moveDodgerLeft()`
 * if the left arrow is pressed and `moveDodgerRight()`
 * if the right arrow is pressed. (Check the constants
 * we've declared for you above.)
 * And be sure to use the functions declared below!
 */
function moveDodger(e) {
   console.log(`key code ${e.which} was pressed.`)
   switch (e.which) {
     case LEFT_ARROW:
      e.preventDefault()
      e.stopPropagation()
       moveDodgerLeft();
       break;
     case RIGHT_ARROW:
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight();
      break;
     default:
       break;
   }
}

/*
 * This function should move DODGER to the left
 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
 */
function moveDodgerLeft() {
   window.requestAnimationFrame(function(){
     console.log('Moving left');
     var left = positionToInteger(DODGER.style.left);
     if (left > 0){
       DODGER.style.left = integerToPosition(left - DODGER_MOVE_SPEED)
     }
   });
}

/*
 * This function should move DODGER to the right
 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
 */
function moveDodgerRight() {
window.requestAnimationFrame(function(){
     console.log('Moving right');
     var left = positionToInteger(DODGER.style.left);
     if (left < 360){
       DODGER.style.left = integerToPosition(left + DODGER_MOVE_SPEED)
     }
   });
}

/*
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

/*
 * @param {number} i The position number
 * @returns {position} The position as an position (with 'px')
 */
function integerToPosition(i){
  return `${i}px`
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
