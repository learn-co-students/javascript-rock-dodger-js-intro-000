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

  const top = positionToInteger(rock.style.top);
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
     const dodgerLeftEdge = positionToInteger(DODGER.style.left)
     const dodgerRightEdge = dodgerLeftEdge + 40;
     const rockLeftEdge = positionToInteger(rock.style.left)
     const rockRightEdge = rockLeftEdge + 20;



     if ( rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge ) {
       return true;
     } else if ( rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ) {
       return true;
     } else if ( rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge ) {
       return true;
     } else {
       return false;
     }
   }
}

function createRock(x) {
   const rock = document.createElement('div');  // create a div for the rock
   rock.className = 'rock';   // assign the rock class
   rock.style.left = `${x}px`;    // set rock with random x position
   var top = 0;
   rock.style.top = top;    // set rock at y position 0

   document.getElementById("game").appendChild( rock ); // put the rock in the game


   function moveRock() {
     // move the rock down 2 pixels  top = top + 2;
     rock.style.top = `${top +=2}px`;

     // if rock collides with DODGER call endGame()
     if ( checkCollision( rock ) === true ) {
       endGame();
     }

     // if rock is not at the bottom then move rock
     if ( top < 380 ) {
        window.requestAnimationFrame( moveRock );
      } else {
       // or if rock has reached bottom then remove it from the DOM
        rock.remove();
      }
   }
   // We should kick of the animation of the rock around here
   window.requestAnimationFrame(moveRock);

   // Add the rock to ROCKS so that we can remove all rocks
   // when there's a collision
   ROCKS.push(rock);

   // Finally, return the rock element you've created
   return rock;
 }


// GAME OVER
function endGame() {
  clearInterval( gameInterval );   // end the game by clearing gameInterval
  // remove all ROCKS from the DOM
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }

  document.removeEventListener('keydown', moveDodger); // remove the moveDodger event listener

  return alert( 'YOU LOSE!' );   // alert "YOU LOSE!"  to the players
}

// move DODGER left/right if left/right arrow is pressed
function moveDodger(e) {
  if ( e.which === LEFT_ARROW  ) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  }
  else if ( e.which === RIGHT_ARROW ) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }
}

// move DODGER to the left 4 pixels at a time
function moveDodgerLeft() {
  window.requestAnimationFrame( function() {
    const left = positionToInteger(dodger.style.left);
    if ( left > 0 ) {
        dodger.style.left = `${left - 4}px`;
    }
  })

}

// move DODGER to the right 4 pixels at a time
function moveDodgerRight() {
  window.requestAnimationFrame( function() {
    const left = positionToInteger(dodger.style.left);
    if ( left < 360 ) {
        dodger.style.left = `${left + 4}px`;
    }
  })
}

// convert the style position from XXpx to an integer XX
function positionToInteger(p) {
   return parseInt(p.split('px')[0]) || 0
}

function start() {

  // listen for keydown and moveDodger accordingly
  document.addEventListener('keydown', moveDodger);

  // hide 'start'
  START.style.display = 'none';

  // create a rock at random x position between 0 and 379 every 1000ms
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
