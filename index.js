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

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

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
  // Hmmm, why would we have used `var` here?
  var top = 0
  //rock.style.top = `${top}px`
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
GAME.appendChild(rock)
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    if (checkCollision(rock)) {
      endGame();
      }

    if (positionToInteger(rock.style.top) < 400) {
      top += 2
      rock.style.top = `${top += 2}px`
      window.requestAnimationFrame(moveRock)
    }
    else {
      rock.remove()
      }
    }
    window.requestAnimationFrame(moveRock)
    ROCKS.push(rock)
    return rock
}



/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
// just modifying the DOM
  document.removeEventListener(`keydown`, moveDodger);
  clearInterval(gameInterval);

  for(var i = 0; i < ROCKS.length; i++)  {
    ROCKS[i].remove();
      }
  alert("You Lose!");
}

function moveDodger(e) {
  switch (e.which) {
    case LEFT_ARROW:
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
    break
    case RIGHT_ARROW:
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
    break
  }}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = positionToInteger(leftNumbers)

      if (left > 0) {
        dodger.style.left = `${left - 4}px`
      }

    //  window.requestAnimationFrame(moveDodgerLeft);
    //  return
    }
// tried to use window.requestAnimationFrame(moveDodgerLeft) but it just got stuck in a loop
// maybe i need to add a if held down tyle command
// in order to pass I need to rewrite the move left and right so that the which = the name of the keys and add in the animation


function moveDodgerRight() {
  var rightNumbers = DODGER.style.left.replace('px', '')
  var left = positionToInteger(rightNumbers)
    if (left < 360) {
      dodger.style.left = `${left + 4}px`
    }
}

// this really threw me for a loop for the left < 360 and plus 4, i dont under stand that combo

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
