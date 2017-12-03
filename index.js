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

  if (top < 360) {
    return false
  }
  if (top >= 360 & top <= 400) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge & rockRightEdge > dodgerLeftEdge ) ||
       (rockLeftEdge >= dodgerLeftEdge & rockRightEdge <= dodgerRightEdge) ||
       (rockLeftEdge < dodgerRightEdge & rockRightEdge > dodgerRightEdge)) {
         //console.log(`dodger: ${dodgerLeftEdge} - ${dodgerRightEdge}`)
         //console.log(`rock: ${rockLeftEdge} - ${rockRightEdge}`)
         return true
    }
    else {
      if (top === 400) {
        //console.log('remove')
        //console.log(document.querySelector('.rock'))
        document.querySelector('.rock').remove()
        //console.log(document.querySelector('.rock'))
        //console.log(ROCKS.length)
        ROCKS.pop()
        //console.log(ROCKS.length)
        return false
      }
    }
  }
  return false
} //function checkCollision

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  //console.log('append')
  //console.log(GAME.appendChild(rock))
  GAME.appendChild(rock)
  moveRock()
  var topNumbers = rock.style.top.replace('px', '')

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  var lgth = ROCKS.length
  return rock

  function moveRock() {
    rock.style.top = `${top += 2}px`
    if (ROCKS.length != 0) {
      if (checkCollision(rock)) {
        endGame()
        return
      }
      else {
        if (topNumbers < 400) {
          window.requestAnimationFrame(moveRock)
        }
      }
    }
  } //function moveRock
} //function createRock

function endGame() {
  window.clearInterval(gameInterval)
  //console.log('new')
  var cnt = document.querySelectorAll('.rock').length
  //console.log(cnt)
  for (var i = 0; i < cnt; i++) {
    //console.log(document.querySelector('.rock'))
    document.querySelector('.rock').remove()
  }
  var cnt = document.querySelectorAll('.rock').length
  //console.log(cnt)
  //console.log(ROCKS.length)
  //console.log(ROCKS[0])
  while (ROCKS.length > 0) {
    var last = ROCKS.length - 1
    //console.log(ROCKS[last])
    //var rock = ROCKS[ROCKS.length - 1]
    //document.querySelector(`'${ROCKS[last]}'`).remove()
    //document.querySelector(`'${rock}'`).remove()
    //document.querySelector('.rock').remove()
    ROCKS.pop()
  }
  //console.log(ROCKS.length)

  //spies.push(expect.spyOn(rock, 'remove'))
/*
  while (document.querySelector('.rock')) {
    var el = document.querySelector('.rock')
    el.remove()
  }
*/
/*
  var cnt = document.querySelectorAll('.rock').length
  for (var i = 0; i < cnt; i++) {
    var el = document.querySelector('.rock')
    el.remove()
  }
*/
/*
  while (document.querySelector('.rock')) {
    document.querySelector('.rock').remove()
  }
*/
/*
  var cnt = document.querySelectorAll('.rock').length
  for (var i = 0; i < cnt; i++) {
    document.querySelector('.rock').remove()
  }
*/
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
  //document.location.reload()
}

function moveDodger(e) {
     if (e.which === LEFT_ARROW) {
       moveDodgerLeft()
       e.preventDefault()
       e.stopPropagation()
     }
     else if (e.which === RIGHT_ARROW) {
       moveDodgerRight()
       e.preventDefault()
       e.stopPropagation()
     }
} //function moveDodger

function moveDodgerLeft() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)

   function stepL() {
     DODGER.style.left = `${left -= 9}px`
   }
   if (left > 0){
     window.requestAnimationFrame(stepL)
   }
 } //function moveDodgerLeft

function moveDodgerRight() {
   var rightNumbers = DODGER.style.left.replace('px', '')
   var right = parseInt(rightNumbers, 10)

   function stepR() {
     DODGER.style.left = `${right += 9}px`
   }
   if (right < 360){
     window.requestAnimationFrame(stepR)
   }
} //function moveDodgerRight

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger, true)

  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
