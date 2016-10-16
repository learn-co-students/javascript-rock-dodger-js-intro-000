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

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    if(
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
      ) {
      console.log('collision');
      return true;
    } else {
      console.log('there is no');
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div'); // assigned element div to const rock
  rock.className = 'rock'; // give rock a className
  rock.id = parseInt(Math.random() * 1000000000000000);
  rock.style.left = `${x}px`; // random places the rock depending on the x variable passed in
  const top = 0;
  rock.style.top = '0px'; // places the rock at the top
  $('#game').append(rock); // appends rock to the game, this uses jquery method;
  ROCKS.push(); // adds rock to ROCKS array
//  console.log(rock.id);
  moveRock(rock.id);
}


function moveRock(value) {
//      console.log(value);
      var rockId = value;
      var currentTopValue = parseInt(document.getElementById(rockId).style.top.replace('px', ''));
//      console.log(currentTopValue);
      function run() {
        if (currentTopValue !== 380 ) {
          console.log(currentTopValue);
          var rockNewValue = currentTopValue += 2;
          document.getElementById(rockId).style.top = `${rockNewValue}px`;
          window.requestAnimationFrame(run);
          if (checkCollision(document.getElementById(rockId))) {
            endGame();
          return;
          }
        }
      else {
          document.getElementById(rockId).remove();
          ROCKS.pop();
          return;
      }
    }
  window.requestAnimationFrame(run);
}

function endGame() {
  gameInterval = null;
  //removal all ROCKS from the DOM
  $('.rock').remove();
  //removing moveDodger event listener
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(event) {

     switch(event.which) {
       case 37:
       event.preventDefault();
       event.stopPropagation();
       moveDodgerLeft();
       break;
       case 39:
       event.preventDefault();
       event.stopPropagation();
       moveDodgerRight();
       break;
       default: return; // exit this handler for other keys
   }

}
function moveDodgerLeft() {
  var leftOriginalNumber = parseInt(DODGER.style.left.replace('px', ''));
    if (leftOriginalNumber > 0 ) {
      var leftNewNumber = leftOriginalNumber -= 4;
      DODGER.style.left = `${leftNewNumber}px`;
    }
 }

function moveDodgerRight() {
   var rightOriginalNumber = parseInt(DODGER.style.left.replace('px', ''));
     if (rightOriginalNumber <360 ) {
      var rightNewNumber = rightOriginalNumber += 4;
      DODGER.style.left = `${rightNewNumber}px`;
    }
}


/** below causes collisions when left and right are called after each other
function moveDodgerLeft() {
  var leftOriginalNumber = parseInt(DODGER.style.left.replace('px', ''));
  function run(){
    if (leftOriginalNumber > 0 ) {
      var leftNewNumber = leftOriginalNumber -= 4;
      DODGER.style.left = `${leftNewNumber}px`;
      window.requestAnimationFrame(run);
    }
  }
  window.requestAnimationFrame(run);
 }

function moveDodgerRight() {
   var rightOriginalNumber = parseInt(DODGER.style.left.replace('px', ''));
   function run(){
     if (rightOriginalNumber <360 ) {
      var rightNewNumber = rightOriginalNumber += 4;
      DODGER.style.left = `${rightNewNumber}px`;
      window.requestAnimationFrame(run);
    }
  }
  window.requestAnimationFrame(run);
}
**/
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
