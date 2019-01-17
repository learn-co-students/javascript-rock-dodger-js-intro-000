/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const KEYB_SPACE = 32 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

const GAME_STATUS_RUN = 'RUN';
const GAME_STATUS_END = 'END';
const GAME_STATUS_INIT = 'INIT';

var cfg = {
  game: {
    status: GAME_STATUS_INIT,
    height: 400,
    width: 400
  },
  dodger: {
    speed: 4,
    width: 40,
    height: 20
  },
  rock: {
    speed: 2,
    width: 20,
    height: 20
  }
};

var gameInterval = null;
// var gameStatus = GAME_STATUS_END;

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
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+cfg.dodger.width;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left)+cfg.rock.width;

    if (((rockRightEdge >= dodgerLeftEdge) && (rockLeftEdge <= dodgerRightEdge)) || 
        ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerLeftEdge))) {
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

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    
    rock.style.top = `${top+=cfg.rock.speed}px`;
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if (checkCollision(rock)) {
      // if (cfg.game.status === GAME_STATUS_RUN) {   // fail test if check this
        endGame();
      // }
      // else {
      //   return;
      // }
    }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    else if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
    }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    else {
      rock.remove();  
    }

  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  
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
  // if (cfg.game.status === GAME_STATUS_RUN) {    // tests run it twice, 
                                              // fail for clearInterval and remove rocks!
    // cfg.game.status = GAME_STATUS_END;
    clearInterval(gameInterval);
    for (let i=0; i<ROCKS.length; i++) {
      if ((ROCKS[i].className === 'rock') && (ROCKS[i].parentElement !== null)) {
        ROCKS[i].remove();
        // ROCKS.splice(i, 1);   // tests fail if remove it from the array...
      }
    }
    window.removeEventListener('keydown', moveDodger);
    if (cfg.game.status === GAME_STATUS_RUN) {
      cfg.game.status = GAME_STATUS_END;
      alert('I am sorry. Game Over. You could retry if you like.');
    }
  // }
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
  console.log(`moveDodger - key pressed: "${e.key}", (${e.which})`);
  switch (e.which) {
    case LEFT_ARROW:
      moveDodgerLeft();
      e.stopPropagation();
      return e.preventDefault();
    case RIGHT_ARROW:
      moveDodgerRight();
      e.stopPropagation();
      return e.preventDefault();
    case KEYB_SPACE:
      (cfg.game.status === GAME_STATUS_RUN) ? pause() : start();
      e.stopPropagation();
      return e.preventDefault();
  }
}

function moveDodgerLeft() {
  let left = positionToInteger(DODGER.style.left);
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  left -= cfg.dodger.speed;
  if (left < 0) {
    left = 0;
  }
  DODGER.style.left = left+'px';
}

function moveDodgerRight() {
  let left = positionToInteger(DODGER.style.left);
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  left += cfg.dodger.speed;
  if (left > GAME_WIDTH-cfg.dodger.width) {
    left = GAME_WIDTH-cfg.dodger.width;
  }
  DODGER.style.left = left+'px';
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

// function pause() {
// }

function start() {
  START.style.display = 'none'
  cfg.game.status = GAME_STATUS_RUN;

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}

// if jQuery does not exists in the project
(function ready() {
  if (!document.body) {setTimeout(ready, 50); return;}
  // Document is ready here
  window.addEventListener('keydown', moveDodger)
})();

// $(function() {
//   window.addEventListener('keydown', moveDodger)
// });