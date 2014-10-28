class TouchInputHandler extends InputHandler
  constructor: () ->
    super()

    getPos = (ev) ->
      ret = new Vector(
        touchEvent.offsetX - APP.w/2,
        touchEvent.offsetY - APP.h/2
      )

      # if not APP.fullscreen
      #   ret.x -= APP.canvas.offsetLeft
      #   ret.y -= APP.canvas.offsetTop

      return ret

    APP.canvas.addEventListener 'touchstart', (ev) =>
      # ev.preventDefault()
      if APP.fullscreen
        ev.preventDefault()
      for touchEvent in ev.changedTouches
        @queue {
          type: 'touchstart'
          pos: getPos ev
          nativeEvent: ev
        }

    APP.canvas.addEventListener 'touchmove', (ev) =>
      for touchEvent in ev.changedTouches
        @queue {
          type: 'touchmove'
          pos: getPos ev
          nativeEvent: ev
        }

    APP.canvas.addEventListener 'touchend', (ev) =>
      @queue {
        type: 'touchend'
        pos: new Vector 0, 0
      }

    APP.canvas.addEventListener 'touchend', (ev) =>
      ev.preventDefault()
