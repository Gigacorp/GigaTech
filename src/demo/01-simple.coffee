class SpinningRectangle extends Rectangle

  constructor: () ->
    super {
      color: new Color 255, 0, 0
      radius: [10, 10, 10, 10]
      w: 50
      h: 50
    }

    @pulse = new PulseAnimation
    @attach @pulse

    @on 'touchstart', 'mousedown', (event) =>
      if @intersects event.pos
        @pulse.stop().play()

  update: (delta) ->
    super delta
    @rotation += 1.5 * delta


class App extends Application

  constructor: () ->
    super {
      bgColor: new Color 0, 0, 0
      fullscreen: true
    }

    @attach new SpinningRectangle

    @start()


new App
