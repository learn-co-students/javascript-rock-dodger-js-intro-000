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

    if (top > 360) {
        const dodgerLeftEdge = positionToInteger(DODGER.style.left);
        const dodgerRightEdge = dodgerLeftEdge + 40;
        const rockLeftEdge = positionToInteger(rock.style.left);
        const rockRightEdge = rockLeftEdge + 20;
        return (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge);
    } else {
        return false;
    }

}

function createRock(x) {
    const rock = document.createElement('div');

    rock.className = 'rock';
    rock.style.left = `${x}px`;

    var top = 0;


    rock.style.top = top;


    GAME.appendChild(rock);
    moveRock();


    function moveRock() {

        rock.style.top = `${top += 2}px`;

        var chech = window.checkCollision(rock);
        if (chech === true) {
            window.endGame();

        }

        if (top < 375) {
            const winAniRock = window.requestAnimationFrame(moveRock);
        }

        if (top == GAME_HEIGHT - 24) {
            rock.remove();
        }
    }

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


    clearInterval(gameInterval)

    ROCKS.forEach(function (rock) { rock.remove() })

    document.removeEventListener('keydown', moveDodger)

    START.innerHTML = 'Play again?'
    START.style.display = 'inline'


}

function moveDodger(e) {


    if (e.which === LEFT_ARROW) {
        e.preventDefault();
        e.stopPropagation();
        moveDodgerLeft();
    }
    if (e.which === RIGHT_ARROW) {
        e.preventDefault();
        e.stopPropagation();
        moveDodgerRight();
    }

}


function moveDodgerLeft() {


    dodgerLeftEdge = positionToInteger(DODGER.style.left);
    let left = dodgerLeftEdge;
    window.requestAnimationFrame(function () {
        if (dodgerLeftEdge > 0) {
            DODGER.style.left = `${left -= 4}px`;

        }
    });

}

function moveDodgerRight() {
    dodgerLeftEdge = positionToInteger(DODGER.style.left);
    dodgerRightEdge = dodgerLeftEdge + 40;
    let right = dodgerLeftEdge + 40;
    let left = dodgerLeftEdge;
    window.requestAnimationFrame(function () {
        if (dodgerRightEdge < 400) {
            DODGER.style.right = `${right -= 4}px`
            DODGER.style.left = `${left += 4}px`;
        }
    });

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

    gameInterval = setInterval(function () {
        createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
    }, 1000)
}
