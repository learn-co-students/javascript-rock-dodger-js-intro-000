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
var checking = false

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  var top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top >= 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // The DODGER is 40 pixels wide, so Right edge = Left Edge + 40
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // The rock is 20 pixel's wide, so Right edge is rockLeftEdge + 20
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
    (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) ||
    (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
        endGame()
        var checking = true
    }
    /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
    }
    return true
  }

function createRock(x) {
  var rock = document.createElement('div');
  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = top
  var rockTop = positionToInteger(rock.style.top);
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
game.appendChild(rock);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
moveRock(rock);
}

function moveRock(rock) {
  var rockTop = positionToInteger(rock.style.top);
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */


    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  // while (checkCollision(rock) === false) {
   var intervals = 0
   function step() {
   intervals++
   rock.style.top = `${rockTop += 2}px`
   checkCollision(rock);
   if ( rockTop >= 380 ) {
   ROCKS.push(rock);
   rock.remove();
   }
   // checking = true when checkCollision determines there is a collision
   if (rockTop <= 380 & checking == false) {
   window.requestAnimationFrame(step);
   }
   }
   if (intervals < 190 ) {
   window.requestAnimationFrame(step);
 }

  // After rock reaches bottom, add the rock to ROCKS array and
  // remove all rocks from the DOM. Then return the rock element.
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision

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
// get all elements in DOM with class 'rock' and then remove them all
checking = true
clearInterval(gameInterval);
var allRocks = []
allRocks = document.querySelectorAll('.rock');
for (i = 0, l = allRocks.length; i < l; i++) {
  let r = allRocks[i];
  r.remove();
}
  //for (let i = 0, l = allRocks.length; i<l; i++) {
//    allRocks[i].remove();
//  }
// Reset ROCKS array
ROCKS.length = 0;
// Remove keydown listeners in place for moveDodger
document.removeEventListener('keydown', moveDodger);
// Alert the user 'YOU LOSE!'
alert('YOU LOSE!');
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
// checks for keydown events and calls proper dodger
// movement functions
var left = positionToInteger(DODGER.style.left);
var right = positionToInteger(DODGER.style.right);


if (e.which === LEFT_ARROW ) {
  e.stopPropagation();
  e.preventDefault();
  if (left > 0) {
  return moveDodgerLeft();
    }

}

if (e.which === RIGHT_ARROW) {
  e.stopPropagation();
  e.preventDefault();
  if (left < 400) {
  return moveDodgerRight();
  }
}
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
var left = positionToInteger(DODGER.style.left);
var right = positionToInteger(DODGER.style.right) + 40;
var moves = 0

if ( left - 4 > 0 ) {
function step() {
    DODGER.style.left = `${left -= 1}px`;
    moves += 1;
    if (moves < 4) {
      window.requestAnimationFrame(step)
    }
}
window.requestAnimationFrame(step);

}
}


function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
var left = positionToInteger(DODGER.style.left);
var right = positionToInteger(DODGER.style.left) + 40;
var moves = 0
if ( left + 44 <= 400 ) {
  function step() {
      DODGER.style.left = `${left += 1}px`;
      moves += 1;
      if (moves < 4) {
        window.requestAnimationFrame(step)
      }
  }
  window.requestAnimationFrame(step);

}
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
