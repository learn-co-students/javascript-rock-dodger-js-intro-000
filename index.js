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

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {
     if(checkCollision(rock)){
       //GAME.removeChild(rock);
       //ROCKS.shift();
       endGame();
       console.log(ROCKS);
       return;
     }
     rock.style.top = `${top += 2}px`;
     if(top < GAME_HEIGHT-20){
       if(rock.parentNode === GAME){
        window.requestAnimationFrame(moveRock);
       }
     }
     else{
       rock.remove();
       //GAME.removeChild(rock);
       ROCKS.shift();
     }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);
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
  clearInterval(gameInterval);
  while(ROCKS.length > 0){
    var thisRock = ROCKS.shift();
    thisRock.remove();
    //GAME.removeChild(thisRock);
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  return;
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    window.requestAnimationFrame(moveDodgerLeft);
  }
  else if (e.which === RIGHT_ARROW){
    window.requestAnimationFrame(moveDodgerRight);
  }
}

function moveDodgerLeft() {
   var leftNum = positionToInteger(DODGER.style.left);
   function stepLeft(){
     DODGER.style.left = `${leftNum-4}px`;
   }
   if(leftNum > 0){
     window.requestAnimationFrame(stepLeft);
   }
}

function moveDodgerRight() {
   var rightNum = positionToInteger(DODGER.style.left);
   function stepRight(){
     DODGER.style.left = `${rightNum+4}px`;
   }
   if(rightNum < 360){
     window.requestAnimationFrame(stepRight);
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
