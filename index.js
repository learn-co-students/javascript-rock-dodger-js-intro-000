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
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge + 40
  const rockLeftEdge = positionToInteger(rock.style.left)
  const rockRightEdge = rockLeftEdge + 20

  if (top > 360) {
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
      }
    else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
          return true
        }
    else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
          return true
      }
    } else {
      return false
    }
}

  // implement me!
  // use the comments below to guide you!
  // rocks are 20px high
  //rock.style.height = `20px`
  // DODGER is 20px high
  //DODGER.style.height = `20px`
  // GAME_HEIGHT - 20 - 20 = 360px;
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    //const dodgerRightEdge = 0;
    // FIXME: The rock is 20 pixels wide -- how do we get the right edge?
    //const rockRightEdge = 0;
    /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge; */
               /** 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;*/
               /* 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge*/

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock);
  function moveRock() {
    var topNumbers = rock.style.top.replace('px', '')
    var rockTop = parseInt(topNumbers, 10)

    if (rockTop === 0) {
        rock.style.top = `${rockTop + 2}px`
window.requestAnimationFrame(moveRock)
        }
    if (checkCollision(rock) === true) {
        return endGame()
        /*After passing the tests I went back and checked the repositories. My original code resulted in endless
        alerts when endGame() ran. Turns out it was because I called the function but didn't return the function.*/
      }
      if (rockTop > 0 && rockTop < 400) {
        rock.style.top = `${rockTop + 2}px`
        window.requestAnimationFrame(moveRock)
      }
      if (rockTop === 400) {
        //rock.remove()
        GAME.removeChild(rock)
      //  window.requestAnimationFrame(moveRock)
      }
    }
    //var rockInterval = setInterval(moveRock, 500);
//rock.addEventListener("load", moveRock());
window.requestAnimationFrame(moveRock)
ROCKS.push(rock)
return rock
}

// Hmmm, why would we have used `var` here?
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  // $("GAME").append.rock;
  /**
  * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
    // implement me!
    // (use the comments below to guide you!)
    //var topNumbers = rock.style.top.replace('px', '')
    //var top = parseInt(topNumbers, 10)



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

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision

  // Finally, return the rock element you've created

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  var list = document.querySelectorAll(".rock");
  for (let i = 0; i < list.length; i++) {
    list[i].remove();
  };

  /*var list = document.querySelectorAll(".rock")[0]
  list.parentNode.removeChild(list)*/


  /*var list = document.querySelectorAll(".rock")
  for (let i = 0; i < list.length+1; i++) {
    list[i].remove();
  }*/
  /*var rock = document.querySelectorAll("#rock")
  for (let i = 0; i < rock.length; i++) {
    rock[i].remove();
  }*/
  /*var parent = document.getElementById("game");
  var child = document.getElementsByClassName("rock");
  parent.removeChild(child);*/

  /*var rocky = GAME.getElementsByClassName(".rock")
  for (let i = 0; i < rocky.length; i++) {
    rock.pop[i]
  }*/


  /*while (GAME.hasChildNodes) {
    GAME.removeChild(GAME.firstChild)
  }*/

  /*var list = document.getElementById("game")
  while (list.hasChildNodes) {
    list.removeChild(game.firstChild)};*/

  //document.getElementsByClassName("rock")
  /*  var rock = document.getElementsByClassName('#rock');
    for (let i = 0; i < rock.length; i++) {
      rock.pop[i]
    }*/
  /*var rock = document.getElementsByClassName("#rock")
  GAME.removeChild(rock);*/
  /*var node = document.getElementById("rock");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }*/
  /*var rock = document.getElementsByClassName("rock")
  rock.remove();*/
  /*for (rock in ROCKS) {
    GAME.remove.rock
  }*/
  /*if (node.parentNode) {
    node.parentNode.removeChild(node)
  }*/
  /*while (list.firstChild) {
    list.removeChild(list.firstChild)
  }*/
//document.getElementsByClassName("rock")
  /*var node = document.getElementsByClassName('.rock');
  for (let i = 0; i < node.length-1; i--) {
    //[i].delete
    var parent = node[i].parentNode;
    parent.removeChild(node[i]);
  }*/
    //ROCKS =[];
    //GAME.remove.rock;
    //$('GAME').remove('rock');
    //ROCKS.length = 0;
    //document.getElementsByClassName(".rock").remove();
    //$(".rocks").remove();
    //for (rock in ROCKS) {
      //  }
      //GAME.removeChild.rock;
      //      return ROCKS*/
  //    ROCKS[i].remove()
    //  window.requestAnimationFrame(moveRock)
    document.removeEventListener('keydown', moveDodger);
    alert('YOU LOSE!');
  }



function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  //document.addEventListener('keydown', function(e) {
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.stopPropagation();
    e.preventDefault();
  }
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault();
  }
//})
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var leftNumbers = dodger.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)
   function moveLeft() {
   if (left > 0) {
       dodger.style.left = `${left - 4}px`
  }
}
window.requestAnimationFrame(moveLeft)
}
/*After passing the tests, I went back to the dodger and checked the repositories. My dodger originally moved all the way
left or right, not 4px at a time. This was because I called the requestAnimationFrame on the function instead of on
a nested function.*/

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
     var leftNumbers = dodger.style.left.replace('px', '')
     var left = parseInt(leftNumbers, 10)
     function moveRight() {
         if (left < 360) {
           dodger.style.left = `${left + 4}px`
         }
       }
       window.requestAnimationFrame(moveRight)
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
