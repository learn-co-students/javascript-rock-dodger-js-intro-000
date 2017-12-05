/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400 // donne la hauteur
const GAME_WIDTH = 400 // donne la largeur
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

    //FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;


    const rockLeftEdge = positionToInteger(rock.style.left)

    //FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;


    if ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge) || (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) {
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

  top = rock.style.top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock);

  function moveRock() {
    // debugger;
    rock.style.top = `${top += 2}px`;

if (checkCollision(rock)){

  return endGame();

} if (top < GAME_HEIGHT && !checkCollision(rock)){

    window.requestAnimationFrame(moveRock);

  } else {

rock.remove()// La méthode ChildNode.remove() retire l'objet de l'arbre auquel il appartient.

    };
  }

  window.requestAnimationFrame(moveRock); //permet de faire bouger les blocs.


  ROCKS.push(rock)

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
clearInterval(gameInterval);// supprime l'intervalle de temps entre chaque mouvement de rock
  window.removeEventListener(`keydown`, moveDodger);
   // Permet d'enlever un event listener
   alert("YOU LOSE!");
  for (var i = 0; i < ROCKS.length ; i++){ //on est obligé de supprimer un par et non pas ROCKS tout d'un coup c'est pourquoi ROCKS.remove() ne fonctionnait pas
    ROCKS[i].remove();
  }
}

function moveDodger(e) {
  if (parseInt(e.which) === LEFT_ARROW){
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft()
  } if (parseInt(e.which) === RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
window.requestAnimationFrame(function(){
       const left = positionToInteger(DODGER.style.left)
       if (left > 0) {
         DODGER.style.left = `${left - 4}px`;
       }
     })
}
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


function moveDodgerRight() {
  window.requestAnimationFrame(function(){
         const left = positionToInteger(DODGER.style.left)
         if (left < 360) {
           DODGER.style.left = `${left + 4}px`;
         }
       })

// return parseInt(p.split('px')[0]) || 0
}

  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


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
