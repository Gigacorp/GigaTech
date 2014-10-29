class TouchInputHandler extends InputHandler
  constructor: () ->
    super()

    getPos = (ev) ->
      ret = new Vector(
        ev.pageX - APP.w/2,
        ev.pageY - APP.h/2
      )

      # if not APP.fullscreen
      #   ret.x -= APP.canvas.offsetLeft
      #   ret.y -= APP.canvas.offsetTop

      return ret

    APP.canvas.addEventListener 'touchstart', (ev) =>
      if APP.fullscreen
        ev.preventDefault()
      for touchEvent in ev.changedTouches
        @queue {
          type: 'touchstart'
          pos: getPos touchEvent
          nativeEvent: ev
        }

    APP.canvas.addEventListener 'touchmove', (ev) =>
      for touchEvent in ev.changedTouches
        @queue {
          type: 'touchmove'
          pos: getPos touchEvent
          nativeEvent: ev
        }

    APP.canvas.addEventListener 'touchend', (ev) =>
      @queue {
        type: 'touchend'
        pos: new Vector 0, 0
      }

    APP.canvas.addEventListener 'touchend', (ev) =>
      ev.preventDefault()
