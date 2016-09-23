/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const DODGER_WIDTH = 40
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const DODGER_MOVE_SPEED = 4

var gameInterval = null;

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function a() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (rockEntirelyLeftOfDodger(dodgerLeftEdge, rockRightEdge)) return false;
    if (rockEntirelyRightOfDodger(dodgerRightEdge, rockLeftEdge)) return false;
    return true;
  }
  return false;

  function rockEntirelyLeftOfDodger(dodgerLeft, rockRight) {
    return rockRight < dodgerLeft;
  }

  function rockEntirelyRightOfDodger(dodgerRight, rockLeft) {
    return dodgerRight < rockLeft;
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = top

  GAME.appendChild(rock);

  function animateRock() {
    var rockAnimation = window.requestAnimationFrame(animateRock);
    //console.log(rockAnimation);
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if (checkCollision(rock)) endGame();

    moveRock();

    if (offScreen()) return removeRock(rockAnimation);

    function moveRock() {
      top += 2;
      rock.style.top = `${top}px`;
    }
    function offScreen() { return top > GAME_HEIGHT }
    function removeRock(rockAnimation) {
      console.log(`removing ${rockAnimation}`);
      cancelAnimationFrame(rockAnimation);
      rock.remove();
    }
  }

  animateRock();

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

  ROCKS.forEach(rock => {
    rock.remove();
  })

  document.removeEventListener('keydown', moveDodger)

  alert("YOU LOSE!");
}

function moveDodger(e) {
  switch (e.which) {
    case LEFT_ARROW:
      e.preventDefault();
      e.stopPropagation();
      moveDodgerLeft();
      break;
    case RIGHT_ARROW:
      e.preventDefault();
      e.stopPropagation();
      moveDodgerRight();
      break;
    default:
      break;
  }
}

function moveDodgerLeft() {
  var initialLeft = parseInt(DODGER.style.left);
  var targetLeft = Math.max(0, initialLeft - DODGER_MOVE_SPEED);

  function step() {
    var newLeft = Math.max(targetLeft, parseInt(DODGER.style.left) - 1);
    DODGER.style.left = newLeft + 'px';

    if (newLeft > targetLeft) {
      window.requestAnimationFrame(step);
    }
  }

  console.log(window.requestAnimationFrame(step));
}

function moveDodgerRight() {
  var initialLeft = parseInt(DODGER.style.left);
  var targetLeft = Math.min(GAME_WIDTH - DODGER_WIDTH, initialLeft + DODGER_MOVE_SPEED);

  function step() {
    var newLeft = Math.min(targetLeft, parseInt(DODGER.style.left) + 1);
    DODGER.style.left = newLeft + 'px';

    if (newLeft < targetLeft) {
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
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
