class Ball extends Circle

  constructor: () ->
    super {
      color: new Color 255, 255, 0
      radius: 7
    }

    @velocity = new Vector

    @pulse = new PulseAnimation
    @attach @pulse

    @on "gameOver", () =>
      @reset()

    @on 'touchstart', 'mousedown', (event) =>
      @velocity.add Vector.sub(@pos, event.pos).norm().scale(7)
      @pulse.stop().play()

  reset: () ->
    @pos.clear()
    @velocity.clear()

  update: (delta) ->
    super delta

    if APP.state == 'gameOver'
      return

    @velocity.y += 9.82 * delta
    @pos.add @velocity

    left = -APP.w/2
    right = APP.w/2
    bottom = APP.h/2
    top = -APP.h/2

    if @pos.x-@radius < left or @pos.x+@radius > right or @pos.y+@radius > bottom or @pos.y-@radius < top
      APP.setState "gameOver"



class Clock extends Text

  constructor: (args={}) ->
    super args

    @time = 0

    @best = LocalStorage.get {
      key: 'best'
      default: 0
    }

    @on "gameOver", () =>
      @time = 0

  update: (delta) ->
    super delta

    if APP.state == 'gameOver'
      return

    @time += delta

    if @time > @best
      @best = @time.toFixed(2)
      LocalStorage.set {
        key: 'best'
        value: @best
      }

    @text = "#{@time.toFixed(2)} | Best: #{@best}"


class Instructions extends Node

  constructor: (args={}) ->
    super args

    @attach new Text {
      text: ">> Tap <<"
    }

    @hidden = false

    @on 'touchstart', 'mousedown', (event) =>
      APP.setState "inGame"

    @on "inGame", () =>
      @hidden = true

    @on "gameOver", () =>
      @hidden = false


class DemoApp2 extends Application

  constructor: () ->
    super {
      bgColor: new Color 0, 0, 0
      fullscreen: true
    }

    @state = "gameOver"

    @camera.topLeft.attach new Clock {
      pos: new Vector 5, 5
      textAlign: 'left'
      textBaseline: 'top'
    }

    @attach new Ball {
    }

    @attach new Instructions {
      pos: new Vector 0, 100
    }

    @start()

  setState: (newState) ->
    oldState = @state

    if @oldState == newState
      return

    @state = newState

    @broadcast {
      type: newState
      oldState: oldState
    }

new DemoApp2
