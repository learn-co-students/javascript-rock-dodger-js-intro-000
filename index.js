const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

let gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerRightEdge) ||
      (rockRightEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    ) {
      return true;
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  let top = 0;

  rock.style.top = top;
  GAME.appendChild(rock);
  function moveRock() {
    if (checkCollision(rock)) {
      endGame();
    } else if (positionToInteger(rock.style.top) < 400) {
      rock.style.top = `${(top += 2)}px`;
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  for (let i = 0; i < ROCKS.length; i += 1) {
    ROCKS[i].remove();
  }
  clearInterval(gameInterval);
  removeEventListener('keydown', moveDodger);
  alert('YOU LOSE');
}

function moveDodger(e) {
  switch (e.which) {
    case LEFT_ARROW:
      moveDodgerLeft();
      e.preventDefault();
      e.stopPropagation();
      break;
    case RIGHT_ARROW:
      moveDodgerRight();
      e.preventDefault();
      e.stopPropagation();
      break;
  }
}

function moveDodgerLeft() {
  const left = positionToInteger(DODGER.style.left);
  function step() {
    DODGER.style.left = `${left - 4}px`;
  }
  if (left > 0) {
    window.requestAnimationFrame(step);
  }
}

function moveDodgerRight() {
  const right = positionToInteger(DODGER.style.left);
  function step() {
    DODGER.style.left = `${right + 4}px`;
  }
  if (right < 360) {
    window.requestAnimationFrame(step);
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

  gameInterval = setInterval(() => {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}
