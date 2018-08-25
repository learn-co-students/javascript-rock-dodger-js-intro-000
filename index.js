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
var collision = false;


/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rockEl) {
  const top = positionToInteger(rockEl.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rockEl.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    if (
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
      ) {
      collision = true;
      return true;
    }
  }
}

function createRock(x) {
  const rockNode = document.createElement('div')
  rockNode.className = 'rock'
  rockNode.style.left = `${x}px`
  var top = 0
  rockNode.style.top = top

  GAME.appendChild(rockNode);
  ROCKS.push(rockNode);

  function moveRock() {
    rockNode.style.top = `${top += 2}px`
    if(collision) {
      return;
    } else if(checkCollision(rockNode)) {
      endGame();
    } else if(top < 380) {
      window.requestAnimationFrame(moveRock);
    } else {
      ROCKS.shift();
      rockNode.remove();
      // GAME.removeChild(rockNode);
    }
  }

  window.requestAnimationFrame(moveRock);

  return rockNode
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  for(var i = 0; i < ROCKS.length; i++) {
    GAME.removeChild(ROCKS[i]);
  }
  window.removeEventListener('keydown', moveDodger);
  window.alert("YOU LOSE!");
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    moveDodgerLeft();
  }
  if(e.which === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
 function step() {
   var leftNum = parseInt(DODGER.style.left.replace("px", ""));
   if(leftNum > 0) {
     DODGER.style.left = `${leftNum - 8}px`;
   }
 }
 window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  function step() {
    var leftNum = parseInt(DODGER.style.left.replace("px", ""));
    if(leftNum < 360) {
      DODGER.style.left = `${leftNum + 8}px`;
    }
  }
  window.requestAnimationFrame(step);
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
