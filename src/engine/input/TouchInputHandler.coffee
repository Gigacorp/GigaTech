class TouchInputHandler extends InputHandler
  constructor: () ->
    super()

    document.addEventListener 'touchstart', (ev) =>
      if APP.fullscreen
        ev.preventDefault()
      for touchEvent in ev.changedTouches
        x = touchEvent.pageX - APP.w/2
        y = touchEvent.pageY - APP.h/2
        @queue {
          type: 'touchstart'
          pos: new Vector x, y
          nativeEvent: ev
        }

    document.addEventListener 'touchmove', (ev) =>
      for touchEvent in ev.changedTouches
        x = touchEvent.pageX - APP.w/2
        y = touchEvent.pageY - APP.h/2
        @queue {
          type: 'touchmove'
          pos: new Vector x, y
          nativeEvent: ev
        }

    document.addEventListener 'touchend', (ev) =>
      @queue {
        type: 'touchend'
        pos: new Vector 0, 0
      }
