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

    if ( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
         (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
         (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
       ) return true
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  var iter = 0

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
    iter++;
    console.log(`I am mooving for the ${iter} time. top is ${top}`);

    if (checkCollision(rock)) {
         iter = 0;
         endGame();
    } else if (top = GAME_HEIGHT) {
          iter = 0;
          GAME.removeChild(rock);
    } else  window.requestAnimationFrame(moveRock);
  }
  window.requestAnimationFrame(moveRock);
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
  clearInterval(gameInterval);
  var rocksToRemove = GAME.getElementsByClassName('rock');

  for (var i = rocksToRemove.length-1; i>-1; i--) {
    rocksToRemove[i].remove();
  }
  document.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!")
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
     if (e.which === LEFT_ARROW){
        e.preventDefault();
        e.stopPropagation();
        moveDodgerLeft();
     } if (e.which === RIGHT_ARROW) {
        e.preventDefault();
        e.stopPropagation();
        moveDodgerRight();
      }

}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)

   function leftstep() {
     DODGER.style.left = `${left -= 4}px`
   }

   if (left >= 4) window.requestAnimationFrame(leftstep)
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var rightNumbers = DODGER.style.left.replace('px', '')
   var right = parseInt(rightNumbers, 10)

   function rightstep() {
     DODGER.style.left = `${right += 4}px`
   }

   if (right < GAME_WIDTH-40) window.requestAnimationFrame(rightstep)
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
  }, 1000)
}
