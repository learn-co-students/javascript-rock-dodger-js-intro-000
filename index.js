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
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
         (rockLeftEdge >= dodgerLeftEdge && rockRightEdge < dodgerRightEdge) ||
         (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
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
  moveRock();

  function moveRock() {
    if (checkCollision(rock)){
      endGame();
    } else {
    var top_pos = positionToInteger(rock.style.top);
    top_pos += 2;
    rock.style.top = `${top_pos}px`
    if (top_pos <= GAME_HEIGHT - 22){
      window.requestAnimationFrame(moveRock);
    } else {
      GAME.remove(rock);
    }
  }
}


  ROCKS.push(rock)
  return rock
}


function endGame() {
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){ // this isn't working properly. Need to look into removing an array of items from the DOM. Could possibly iterate through with a for-loop, but basically the same as this.
    GAME.remove(rock)
  });
  document.body.removeEventListener('keydown', moveDodger); // how do I remove this properly? linked to comment question below about naming functions in event listeners -- to remove them, I have to reference the function name.
  alert('YOU LOSE!');
}

function moveDodger(e) {
  document.body.addEventListener('keydown', function(e){  // should this function be explicit? i.e. ('keydown', moveDodgerLeft)? how would we generalize/abstract that i s
    if (e.which === LEFT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft();
    } else if (e.which === RIGHT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight();
    }
  });
}



function moveDodgerLeft() {
  var left_pos = positionToInteger(DODGER.style.left);
  function step(){
    left_pos -= 4;
    DODGER.style.left = `${left_pos}px`;
  }
  if (positionToInteger(DODGER.style.left) >= 4){
    requestAnimationFrame(step);
  }
}

function moveDodgerRight() {
  var left_pos = positionToInteger(DODGER.style.left);
  function step(){
    left_pos += 4;
    DODGER.style.left = `${left_pos}px`;
  }

  if (positionToInteger(DODGER.style.left) <= 356){
    requestAnimationFrame(step);
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
