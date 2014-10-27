class MouseInputHandler extends InputHandler
  constructor: (args={}) ->
    super()

    getPos = (ev) ->
      new Vector(
        ev.offsetX - APP.w/2,
        ev.offsetY - APP.h/2
      )

    APP.canvas.addEventListener 'mousedown', (ev) =>
      ev.preventDefault()
      @queue {
        type: 'mousedown'
        pos: getPos ev
      }

    APP.canvas.addEventListener 'mouseup', (ev) =>
      @queue {
        type: 'mouseup'
        pos: getPos ev
      }

    APP.canvas.addEventListener 'mousemove', (ev) =>
      @queue {
        type: 'mousemove'
        pos: getPos ev
      }

    APP.canvas.addEventListener 'mousewheel', (ev) =>
      if APP.fullscreen
        ev.preventDefault()
      @queue {
        type: 'mousewheel'
        nativeEvent: ev
      }
