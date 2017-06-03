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

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ( (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) || (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0

  rock.style.top = top
  GAME.append(rock);


  function moveRock(r) {
    var top_m = 0;
    function step(){
      r.style.top = `${top_m += 2}px`;
      if (top_m < GAME_HEIGHT){
        window.requestAnimationFrame(step);
      }
    }
    if (checkCollision()){
      endGame();
    } else {
      window.requestAnimationFrame(step);
    }
  }


  ROCKS.push(rock)
  moveRock(rock);
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  document.remove(ROCKS); // this doesn't seem right.
  window.removeEventListener('keydown', moveDoger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === 37){
   moveDodgerLeft();
}
 if (e.which === 39) {
   moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var dodger = document.getElementById('dodger');
  var left_margin = positionToInteger(dodger.style.left);
  function step(){
    dodger.style.left = `${left_margin - 4}px`;
    if (left_margin > 4){
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  var dodger = document.getElementById('dodger');
  var left_margin = positionToInteger(dodger.style.left);
  function step(){
      dodger.style.left = `${left_margin + 4}px`;
      if (left_margin < 356){
        window.requestAnimationFrame(step);
      }
  }
  window.requestAnimationFrame(step);
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
