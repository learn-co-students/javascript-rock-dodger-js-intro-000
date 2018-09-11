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
    
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockRightEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) {
      return true;
    }    
    if (rockLeftEdge < dodgerRightEdge && rockLeftEdge > dodgerLeftEdge) {
      return true;
    }
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerRightEdge) {
      return true;
    }
    return (false);
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);    
   
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {      
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if(checkCollision(rock)) {
         //endGame();
         return(endGame());
     }
      
     rock.style.top = `${top += 4}px`;
        
     if (top < 400) {
       window.requestAnimationFrame(moveRock)
     } else {
         /**
         * But if the rock *has* reached the bottom of the GAME,
         * we should remove the rock from the DOM
         */
         GAME.removeChild(rock);
         console.log(rock);
         //ROCKS.shift();
         
     } 
  } 
    
     /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
  
  // We should kick of the animation of the rock around here
  moveRock();

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
    
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
    
    var l = ROCKS.length
    for (let i=0; i < l; i++) {
        ROCKS[0].remove();
        ROCKS.shift();
    }
    
    document.removeEventListener('keydown',moveDodger);
    
    console.log(ROCKS);
    
    alert("YOU LOSE!"); 
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW){
    e.preventDefault();
    e.stopPropagation();  
    moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation(); 
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  
    var left = positionToInteger(DODGER.style.left);
    //console.log(left);
    
    if (left < 1) {
      return;
    }
    
    function move() {
        DODGER.style.left = `${left -= 4}px`;
        
        if (left > 0) {
          window.requestAnimationFrame(move)
          //console.log(left)
        }
    } 
    
    move();
}

function moveDodgerRight() {
    
    var left = positionToInteger(DODGER.style.left);
    
    if (left > 356){
      return;
    }
    
    function move() {
        DODGER.style.left = `${left += 4}px`;
        
        if (left < 360) {
          window.requestAnimationFrame(move)
          //console.log(left)
        }
    }
    
    move();
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
  }, 500)
}
