const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39 
const ROCKS = []
const START = document.getElementById('start')

var dodgerLeftEdge = positionToInteger(DODGER.style.left)
var dodgerRightEdge = positionToInteger(DODGER.style.left) + 40

var gameInterval = null

function checkCollision(rock) {
  const topRock = positionToInteger(rock.style.top);
  const bottomRock = topRock - 20;
  const topDodger = positionToInteger(DODGER.style.top);
  const bottomDodger = topDodger - 20;
    if (topRock > 360) {
      const dodgerLeftEdge = positionToInteger(DODGER.style.left)
      const dodgerRightEdge = dodgerLeftEdge + 40;
      const rockLeftEdge = positionToInteger(rock.style.left)
      const rockRightEdge = rockLeftEdge + 20;
      if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
        return true;
      }
      if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
        return true;
      }
      if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
        return true;
      }
      if (false ) {
        return true
      }
    }
    return false;
  }

function createRock(x) {
  const rock = document.createElement('div')
    rock.className = 'rock'
    rock.style.left = `${x}px`
    var top = 0
    rock.style.top = top
    GAME.appendChild(rock);
    function moveRock() {
      if (checkCollision(rock) === true) {
        endGame();
      }
      else {
        const topRock = positionToInteger(rock.style.top);
        const bottomRock = topRock - 20;
        if (bottomRock > 0) {
          rock.style.top = `${topRock - 2}px`;
          window.requestAnimationFrame(moveRock);
        }
        else {
          GAME.removeChild(rock);
        }
      }
    }
    window.requestAnimationFrame(moveRock);
    ROCKS.push(rock)
    return rock
  }

function endGame() {
    clearInterval(gameInterval);
    for (var i = 0; i < ROCKS.length; i++) {
      ROCKS[i].remove();
    }
    window.removeEventListener('keydown', moveDodger);
    alert("YOU LOSE!");
  }

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
      moveDodgerLeft();
      e.preventDefault();
      e.stopPropagation();
    }
  if (e.which === RIGHT_ARROW) {
      moveDodgerRight();
      e.preventDefault();
      e.stopPropagation();
    }
  }

function moveDodgerLeft() {
  var leftNumbers = positionToInteger(DODGER.style.left);
  if (leftNumbers > 0) {
      leftNumbers -= 4;
      DODGER.style.left = `${leftNumbers}px`;
      window.requestAnimationFrame(moveDodgerLeft);
    }
  }

function moveDodgerRight() {
    var leftNumbers = positionToInteger(DODGER.style.left);
    if (leftNumbers < 360) {
      leftNumbers += 4;
      DODGER.style.left = `${leftNumbers}px`;
      window.requestAnimationFrame(moveDodgerRight);
    }
  }

function positionToInteger(p) {
    return parseInt(p.split('px')[0]) || 0
  }

function start() {
    window.addEventListener('keydown', moveDodger)

    START.style.display = 'none';

    gameInterval = setInterval(function () {
      createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
    }, 1000)
  }
