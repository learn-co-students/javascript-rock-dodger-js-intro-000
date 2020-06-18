const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)) {
      endGame();
    }

    if (top >= GAME_HEIGHT) {
       rock.remove();
     } else {
       window.requestAnimationFrame(moveRock);
     }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}

function endGame() {
  document.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!")
}

function moveDodger(e) {
  var act = {37: moveDodgerLeft, 38: moveDodgerRight};

 if (e.which == 37 || e.which == 39) {
    e.preventDefault();
    e.stopPropagation();
    e.which == 37 ? moveDodgerLeft() : false;
    e.which == 39 ? moveDodgerRight() : false;
 }
}

function moveDodgerLeft() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)

   if(left === 0){
     DODGER.style.left = '0px'
   } else {
     DODGER.style.left = `${left - 4}px`
   }
}

function moveDodgerRight() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)

   if(left === 360){
     DODGER.style.left = '360px'
   } else {
     DODGER.style.left = `${left + 4}px`
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
