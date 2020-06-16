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
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20;

    if (rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge || rockLeftEdge>=dodgerLeftEdge && rockLeftEdge<=dodgerRightEdge)
        {
      return true
    }
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



  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)

   */

  function moveRock() {
    function step() {
      rock.style.top = `${top += 2}px`


    if (checkCollision(rock)){
      endGame()
      //console.log(ROCKS.length)







    }
    else if (positionToInteger(rock.style.top)<400){
      window.requestAnimationFrame(step)
    }
    else {
      rock.remove()
      //document.removeChild(rock)
    }
  }


     window.requestAnimationFrame(step)

  }




  ROCKS.push(rock);
  moveRock();


  // We should kick off the animation of the rock around here.

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.


  // Finally, return the rock element you've created.
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
  for (let item of ROCKS){
    item.remove();
  }
  ROCKS.splice(0);




  //GAME.removeChild(temp)
  window.removeEventListener('keydown',moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  // implement me!
  if (e.which===37){
    moveDodgerLeft()
    e.preventDefault();
    e.stopPropagation();
  }
  else if (e.which===39){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }

}

function moveDodgerLeft() {
  // implement me!
  function stepLeft(){
    if (positionToInteger(DODGER.style.left)>=4){
      DODGER.style.left=`${positionToInteger(DODGER.style.left)-4}px`}
  }
  window.requestAnimationFrame(stepLeft);


  /**

   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  function stepRight(){
    if (positionToInteger(DODGER.style.left)<=356){
      DODGER.style.left=`${positionToInteger(DODGER.style.left)+4}px`
    }

  }
  window.requestAnimationFrame(stepRight);
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
