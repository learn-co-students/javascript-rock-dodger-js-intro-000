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

    // The DODGER is 40 pixels wide
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // The rock is 20 pixel's wide
    const rockRightEdge = rockLeftEdge + 20;

    /**
     * There's been a collision if one of three things is true:
     * 1. The rock's left edge is < the DODGER's left edge,
     *    and the rock's right edge is > the DODGER's left edge;
     * 2. The rock's left edge is > the DODGER's left edge,
     *    and the rock's right edge is < the DODGER's right edge;
     * 3. The rock's left edge is < the DODGER's right edge,
     *    and the rock's right edge is > the DODGER's right edge
     */
    if (((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) ||
        ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
        ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge))) {
      return true
    }
  }
  return false
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

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
    // implement me!
    // (use the comments below to guide you!)
    var top = 0;

    function step() {
      rock.style.top = `${top += 2}px`

      /**
       * If a rock collides with the DODGER,
       * we should call endGame()
       */
      if(checkCollision(rock)) {
        endGame()
      }
      /**
       * Otherwise, if the rock hasn't reached the bottom of
       * the GAME, we want to move it again.
       */
      else if (top < GAME_HEIGHT) {
        window.requestAnimationFrame(step)
      }
      /**
      * But if the rock *has* reached the bottom of the GAME,
      * we should remove the rock from the DOM
      */
      else {
        rock.remove()
      }
    }
    window.requestAnimationFrame(step)
  }

  // We should kick of the animation of the rock around here
  moveRock()

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
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
  clearInterval(gameInterval)

  for(let i = 0; i < ROCKS.length; i++)
    ROCKS[i].remove();

  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  /*
   * function that determines if the right or left keyboard arrow is pushed
   * and calls the correct move function to move the dodger
  */
   switch(e.which) {
     case LEFT_ARROW:
      e.preventDefault();
      e.stopPropagation();
      moveDodgerLeft();
      break;

     case RIGHT_ARROW:
      e.preventDefault();
      e.stopPropagation();
      moveDodgerRight();
      break;
   }
}

function moveDodgerLeft() {
  //moves the dodger 4px to the left if the dodger has not reached the
  //left wall
  var left = positionToInteger(DODGER.style.left);

 	if (left > 0) {
     window.requestAnimationFrame(() => {
       dodger.style.left = `${left - 4}px`;
     });
   }
}

function moveDodgerRight() {
  //moves the dodger 4px to the right if the dodger has not reached the
  //right wall
  var left = positionToInteger(DODGER.style.left);

	if (left < 360) {
    window.requestAnimationFrame(() => {
      dodger.style.left = `${left + 4}px`;
    });
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
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
