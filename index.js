/**
 * Don't change these constants!
 */
const BACKGROUND = '#0099FF';
const GAME = document.getElementById('game');
const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
GAME.style.backgroundColor = BACKGROUND;
GAME.style.width = GAME_WIDTH + 'px';
GAME.style.height = GAME_HEIGHT + 'px';
const DODGER = document.getElementById('dodger');
const DODGER_WIDTH = Math.floor(GAME_WIDTH / 10);
const DODGER_HEIGHT = Math.floor(DODGER_WIDTH / 2);
const DODGER_SPEED = Math.floor(GAME_WIDTH / 100) * 2;
const DODGER_INITIAL_POSITION = Math.floor((GAME_WIDTH - DODGER_WIDTH) / 2);
DODGER.style.width = DODGER_WIDTH + 'px';
DODGER.style.height = DODGER_HEIGHT + 'px';
DODGER.style.left = DODGER_INITIAL_POSITION + 'px';
// DODGER.style.borderRadius = '25%';
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const ROCK_WIDTH = Math.floor(DODGER_WIDTH / 2);
const ROCK_HEIGHT = ROCK_WIDTH;
const ROCK_SPEED = Math.floor(GAME_HEIGHT / 200);
const START = document.getElementById('start');
const COLLISION_HEIGHT = GAME_HEIGHT - DODGER_HEIGHT - ROCK_HEIGHT;

var gameInterval = null;
let frameHandles = [];

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > COLLISION_HEIGHT) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH;

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

    let collisionLeft = rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge;
    let collisionMiddle = rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge;
    let collisionRight = rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge;

    let collision = collisionLeft || collisionMiddle || collisionRight;

    if (collision) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.width = ROCK_WIDTH + 'px';
  rock.style.height = ROCK_HEIGHT + 'px';
  rock.style.borderRadius = '50%';

  let top = 0;
  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += ROCK_SPEED}px`;

    if (checkCollision(rock)) {
      endGame();
    } else if (top < GAME_HEIGHT) {
      let handle = window.requestAnimationFrame(moveRock);
      frameHandles.push(handle);
    } else {
      rock.remove();
    }
  }

  let handle = window.requestAnimationFrame(moveRock);
  frameHandles.push(handle);

  ROCKS.push(rock);
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  window.removeEventListener("keydown", moveDodger);

  ROCKS.forEach(rock => rock.remove());
  // frameHandles.forEach(handle => window.cancelAnimationFrame(handle));

  alert("YOU LOSE!");
  // reset();
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault();
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.stopPropagation();
    e.preventDefault();
  }
}

function moveDodgerLeft() {
  let pos = positionToInteger(DODGER.style.left);
  if (pos > 0) {
    DODGER.style.left = `${pos -= DODGER_SPEED}px`;
  }
}

function moveDodgerRight() {
  let pos = positionToInteger(DODGER.style.left);
  if (pos < (GAME_WIDTH - DODGER_WIDTH)) {
    DODGER.style.left = `${pos += DODGER_SPEED}px`;
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function () {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}

function reset() {
  START.style.display = 'inline';
  DODGER.style.left = DODGER_INITIAL_POSITION + 'px';
}
