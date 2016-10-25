/**
 * Don't change these constants!
 */
//adding for submission 
 console.log("linked");

const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0;
  rock.style.top = top;
  // append rock to GAME
  document.getElementById('game').appendChild(rock);

  function moveRock() {
      // move rock down the screen two pixels
      rock.style.top = `${top += 2}px`
      // recursive function?
      if (top < GAME_HEIGHT){
        window.requestAnimationFrame(moveRock)
      }else{
        if (top > GAME_HEIGHT){
          rock.remove();
        }
      }
      // check for collision and end the game if true
      if(checkCollision(rock)){endGame()}


  }

  moveRock()

  ROCKS.push(rock)

  return rock

}

   function checkCollision(rock) {
  // check where rock is on screen
  const top = positionToInteger(rock.style.top)
  // check if coordinates of objects overlap
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 39;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left)+19;

    var leftHit = rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge
    var midHit = rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge
    var rightHit = rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge

    return(leftHit || midHit || rightHit);
    }
  }

function endGame() {
 // document.location.reload(true);
 console.log("ended");
 document.removeEventListener('keydown', moveDodger)
 dodger.style.left = '180px'
 clearInterval(gameInterval)
 ROCKS.forEach(function(rock){rock.remove()})
 START.innerHTML = "Try Again"
 START.style.display = 'inline'

}

function moveDodger(e) {
  // connect functions to keys
   if (e.which === LEFT_ARROW){moveDodgerLeft(); }
   if (e.which === RIGHT_ARROW){moveDodgerRight();}

   if (e.which != 0) {
        if (e.which === LEFT_ARROW || e.which === RIGHT_ARROW) {
            e.preventDefault();
            e.stopPropagation()
            console.log('stopped default')
        }
    }
}

function moveDodgerLeft() {
  // move dodger to left 10px

   var leftNumbers = DODGER.style.left.replace('px','')
    var left = parseInt(leftNumbers,10)
    if(left > 0){
    dodger.style.left = `${left-10}px`
    }


}



function moveDodgerRight() {
  //move dodger to right 10px
  var leftNumbers = dodger.style.left.replace('px','')
    var left = parseInt(leftNumbers,10)
    if(left < 360){
    dodger.style.left = `${left+10}px`

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
