
```1) Rock Dodger checkCollision(rock) rock is > 360px from the top of GAME collides if the rock's left edge is <= the DODGER's left edge and the rock's right edge is >= the DODGER's left edge:
     Error: Expected undefined to be true
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toBe (node_modules/expect/lib/Expectation.js:66:28)
      at Context.it (test/index-test.js:45:38)

  2) Rock Dodger checkCollision(rock) rock is > 360px from the top of GAME collides if the rock's left edge is >= the DODGER's left edge and the rock's right edge is <= the DODGER's right edge:
     Error: Expected undefined to be true
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toBe (node_modules/expect/lib/Expectation.js:66:28)
      at Context.it (test/index-test.js:51:38)

  3) Rock Dodger checkCollision(rock) rock is > 360px from the top of GAME collides if the rock's left edge is <= the DODGER's right edge and the rock's right edge is >= the DODGER's right edge:
     Error: Expected undefined to be true
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toBe (node_modules/expect/lib/Expectation.js:66:28)
      at Context.it (test/index-test.js:57:38)

  4) Rock Dodger createRock(x) calls window.requestAnimationFrame():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:86:19)

  5) Rock Dodger createRock(x) moveRock() checks for a collision:
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:104:21)

  6) Rock Dodger createRock(x) moveRock() ends the game if there is a collision:
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:117:21)

  7) Rock Dodger endGame() clears gameInterval:
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:146:19)

  8) Rock Dodger endGame() removes all of the rocks:
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:164:26)

  9) Rock Dodger moveDodger(e) e.which === LEFT_ARROW calls e.preventDefault():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:214:21)

  10) Rock Dodger moveDodger(e) e.which === LEFT_ARROW calls e.stopPropagation():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:222:21)

  11) Rock Dodger moveDodger(e) e.which === LEFT_ARROW calls moveDodgerLeft():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:230:19)

  12) Rock Dodger moveDodger(e) e.which === RIGHT_ARROW calls e.preventDefault():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:253:21)

  13) Rock Dodger moveDodger(e) e.which === RIGHT_ARROW calls e.stopPropagation():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:261:21)

  14) Rock Dodger moveDodger(e) e.which === RIGHT_ARROW calls moveDodgerRight():
     Error: spy was not called
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toHaveBeenCalled (node_modules/expect/lib/Expectation.js:318:28)
      at Context.it (test/index-test.js:269:19)

  15) Rock Dodger moveDodgerLeft() moves the DODGER to the left:
     Error: Expected 180 to be less than 180
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toBeLessThan (node_modules/expect/lib/Expectation.js:156:28)
      at Context.it (test/index-test.js:290:52)

  16) Rock Dodger moveDodgerRight moves the DODGER to the right:
     Error: Expected 180 to be greater than 180
      at assert (node_modules/expect/lib/assert.js:29:9)
      at Expectation.toBeGreaterThan (node_modules/expect/lib/Expectation.js:178:28)
      at Context.it (test/index-test.js:316:52)JavaScript Rock Dodger
---

## Objectives

1. Use JavaScript to build a rock-dodging game
2. Explain how `window.requestAnimationFrame()` is used to animate movement on a page
3. Explain how to use `setInterval()`
4. Show off your JavaScript know-how

## Instructions

You did it — you've made it to the end of the introductory JavaScript
curriculum. You've learned how to write JavaScript and how to use JavaScript to
manipulate the DOM. Now, only this lab stands between you and ~~freedom~~ the
end of this course!

So that we don't catch you off-guard, know that this project is meant to be
difficult. We're really testing the limits of what we've learned so far. But
know that we've solved the lab using only things that we've taught — well,
mostly. There are two things (which we've partially implemented for you) that
you should know about.

#### `window.requestAnimationFrame()`

This function tells the browser that we want to animate some change on the page.
We'll use it in this lab for animating the movement of rocks and the dodger.

We can use [`window.requestAnimationFrame()`][requestAnimation] by passing it a
callback that contains our animation:

``` javascript
function move(el) {
  var top = 0

  function step() {
    el.style.top = `${top += 2}px`

    if (top < 200) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}
```

If we call `move(el)` with a valid DOM element, `window.requestAnimationFrame()`
will be called with the function `step`, which moves the `el` down the page in
two-pixel increments until it's been moved 200 pixels. Pretty easy, right?

(Note that we can pass `step` to `window.requestAnimationFrame()` _inside_ of
`step`. This is a nifty feature of JavaScript (and other languages) called
[_recursion_](https://en.wikipedia.org/wiki/Recursion_(computer_science)). Don't
worry if this concept makes your head spin a bit — that feeling is normal. For
now, know that we can use `window.requestAnimationFrame()` as demonstrated
above.)

#### `setInterval()`

[`setInterval()`][setInterval]
takes two arguments: a callback, and an interval in milliseconds. We can use it
like so:

``` javascript
function sayHello() {
  console.log('hello')
}

const myInterval = setInterval(sayHello, 1000)
```

The above will print `'hello'` to console once every second.

Note that `setInterval()` returns a reference to the interval. We can stop the
interval from executing by calling `clearInterval(myInterval)`.

#### Getting Started

Open up `index.html` in your browser. You should see a black 400-by-400px box
with a white square at the bottom. That square is the dodger — it can only move
left and right.

Well, it _should_ be able to move only left and right — we'll need to implement
that functionality!

Now open `index.js`. You'll see that we've defined a few functions for you, but
we've left much of the file blank.

We've left enough comments to get you started, though, and we've defined all of
the HTML and CSS that you'll need so that you can just focus on the JavaScript!

Remember to reload the page after updating and saving the file. You've got this!

Good luck!

## Resources

- [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)

<p class='util--hide'>View <a href='https://learn.co/lessons/javascript-rock-dodger'>Rock Dodger</a> on Learn.co and start learning to code for free.</p>

[requestAnimation]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
[setInterval]: https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval
