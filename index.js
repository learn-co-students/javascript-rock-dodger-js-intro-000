const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = positionToInteger($("#game").css("height"))
const GAME_WIDTH = 400
const LEFT_ARROW = 65
const RIGHT_ARROW = 68
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

// apparently they didn't include JQ for me, so i did that.
var width = positionToInteger($('#dodger').css("width"));
var leftEdge = positionToInteger(DODGER.style.left);
var rightEdge = leftEdge + width;
var rightFrame = positionToInteger($("#game").css("width"));

function checkCollision(rock) {
  var top = positionToInteger(rock.style.top)

  if (top > 360) {
    var rockLeftEdge = positionToInteger(rock.style.left)
    var rockRightEdge = rockLeftEdge + positionToInteger($('.rock').css("width"));

    if ( (rockRightEdge >= leftEdge && rockRightEdge <= rightEdge)
        || (rockLeftEdge >= leftEdge && rockRightEdge <= rightEdge)
        || (rockLeftEdge <= rightEdge && rockRightEdge >= rightEdge))
        {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock' //...does this get pushed over there?
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

  GAME.appendChild(rock);

  function moveRock() { // why is this under "createRock"?
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)){ // WHY WOULD THESE BE UNDER "moveRock"???
      endGame();
    } else if (top < GAME_HEIGHT){
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock) // apparently initial movement.
  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(rock =>{rock.remove()})
  document.removeEventListener('keydown', moveDodger);
  alert("You Lose!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW && leftEdge > 0){moveDodgerLeft();}
  else if (e.which === RIGHT_ARROW && rightEdge < rightFrame){moveDodgerRight();}
}

function moveDodgerLeft() {
  window.requestAnimationFrame(()=>{
    DODGER.style.left= `${leftEdge - 5}px`;
    leftEdge -=5; rightEdge -=5;
    // i really do not know what is synchronous and what isn't.
  })
}
function moveDodgerRight() {
  window.requestAnimationFrame(()=>{
    DODGER.style.left= `${leftEdge + 5}px`;
    leftEdge +=5; rightEdge +=5;
  })
}

/**
 * @param {string} p The position property // what is this?
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
