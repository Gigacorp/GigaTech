class MouseInputHandler extends InputHandler
  constructor: () ->
    super()

    document.addEventListener 'mousedown', (ev) =>
      x = ev.x - APP.w/2
      y = ev.y - APP.h/2
      @queue {
        type: 'mousedown'
        pos: new Vector x, y
      }

    document.addEventListener 'mouseup', (ev) =>
      x = ev.x - APP.w/2
      y = ev.y - APP.h/2
      @queue {
        type: 'mouseup'
        pos: new Vector x, y
      }

    document.addEventListener 'mousemove', (ev) =>
      x = ev.x - APP.w/2
      y = ev.y - APP.h/2
      @queue {
        type: 'mousemove'
        pos: new Vector x, y
      }

    document.addEventListener 'mousewheel', (ev) =>
      ev.preventDefault()
      @queue {
        type: 'mousewheel'
        nativeEvent: ev
      }
