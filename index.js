const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ((dodgerLeftEdge >= rockLeftEdge && dodgerLeftEdge <= rockRightEdge)
      || (dodgerRightEdge >= rockLeftEdge && dodgerRightEdge <= rockRightEdge)) {
      return true;
    }
    return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `let` here?
  let top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);

  function moveRock() {
    if(checkCollision(rock)) endGame();

    rock.style.top = `${top += 2}px`;
    if (top < 400) {
      window.requestAnimationFrame(moveRock);
    } else {
      GAME.removeChild(rock);
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);
  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  while(ROCKS.length > 0) {
    ROCKS.shift().remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  } else if(e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  function step() {
    let left = parseInt(dodger.style.left.replace('px', ''));
    if(left >= 4) {
      dodger.style.left = `${left -= 4}px`;
    } else if(left > 0 && left < 4) {
      dodger.style.left = `0px`;
    }
  }
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  function step() {
    let left = parseInt(dodger.style.left.replace('px', ''));
    if(left <= 356) {
      dodger.style.left = `${left += 4}px`;
    } else if(left < 356 && left > 352) {
      dodger.style.left = `360px`;
    }
  }
  window.requestAnimationFrame(step);
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

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000)
}
