/* Don't change these constants!
    // no, left is A and right is D.
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 65
const RIGHT_ARROW = 68
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/* Be aware of what's above this line,
 * but all of your work should happen below.
 */

// apparently they didn't include JQ for me, so i did that.
var width = parseInt($('#dodger').css("width").replace('px',''), 10);
var leftEdge = parseInt(dodger.style.left.replace('px',''), 10)
var rightEdge = leftEdge + width;
var rightFrame = parseInt($("#game").css("width").replace('px',''), 10);

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
    // why is this here before the movement of the dodger?
    // or for that matter, before the definition of the rock?
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
    // why isn't this called or otherwise connected to the CSS
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /* Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
    // SHOULDNT YOU SAY WHY?
  var top = 0

  rock.style.top = top

  /* Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /* This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */

    /* Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /* But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
  }

  // We should kick off the animation of the rock around here.

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

/* End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
}

function moveDodger(e) {
  if (e.which === 65 && leftEdge > 0){
    moveDodgerLeft();
  } else if (e.which === 68 && rightEdge < rightFrame){
    moveDodgerRight();
  }
  // implement me!
  /* This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
      // why is this written so differently from all the other ones?
   */
}

function moveDodgerLeft() {
  console.log("moving left");
  DODGER.style.left= `${leftEdge - 5}px`;
  // implement me!
  /* This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  console.log("moving right");
  DODGER.style.left= `${leftEdge + 5}px`;
  // implement me!
  /* This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/* @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() { // why is this at the bottom
  window.addEventListener('keydown', (e) => {moveDodger(e)})

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
