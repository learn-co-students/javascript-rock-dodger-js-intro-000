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
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  // Hmmm, why would we have used `var` here?
  const top = 0 // changed to constants
  rock.style.top = top
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  $('#game').append(rock);
  console.log($('.rock').length);
  ROCKS.push(rock)
  moveRock();
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() { // issue here is when I create more than i rock, the why this code works, the second rock
    // is reading some type of value that is impacting the speed of the movement of the rocks
    for (var i = 0; i < $('.rock').length; i++) {
      if ($('.rock')[i].style.top === '380px'){
        //$('.rock')[i].remove()
      } else if ($('.rock').length === 2) {
        var rockValue = $('.rock')[1].style.top.replace('px', '');
        //console.log(rockValue);
        var rockNewValue = parseInt(rockValue, 10);
        $('.rock')[1].style.top = `${rockNewValue + 2}px`;
      } else {
        var rockValue = $('.rock')[0].style.top.replace('px', '');
        //console.log(rockValue);
        var rockNewValue = parseInt(rockValue, 10);
        $('.rock')[0].style.top = `${rockNewValue + 2}px`;
      }
    }
    window.requestAnimationFrame(moveRock);
  }
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     /**
      * Otherwise, if the rock hasn't reached the bottom of
      * the GAME, we want to move it again.
      */
     /**
      * But if the rock *has* reached the bottom of the GAME,
      * we should remove the rock from the DOM
      */




  // We should kick off the animation of the rock around here
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision


  // Finally, return the rock element you've created
}


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  gameInterval = null;
  //removal all ROCKS from the DOM
  //removing moveDodger event listener
  alert('YOU LOSE!')
}

function moveDodger(event) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */

   switch(event.which) {
       case 37: moveDodgerLeft();
       break;
       case 39: moveDodgerRight();
       break;
       default: return; // exit this handler for other keys
   }

}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var leftNumbers = DODGER.style.left.replace('px', '');
   var left = parseInt(leftNumbers, 10);
   DODGER.style.left = `${left - 4}px`;
   if (left > 0) {
     window.requestAnimationFrame(moveDodgerLeft);
     console.log(left + ' left button')
   }

}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var leftNumbers = DODGER.style.left.replace('px', '');
   var left = parseInt(leftNumbers, 10);
   DODGER.style.left = `${left + 4}px`;
   if (left < 360) {
     window.requestAnimationFrame(moveDodgerRight);
     console.log(left + ' right button')
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
  $(window).keydown(function(e){
    moveDodger(e);
  })

  START.style.display = 'none'
  //createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))

  //createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))

  /*
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
  */
}



  //createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
