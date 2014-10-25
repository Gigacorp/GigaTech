class KeyboardInputHandler extends InputHandler
  constructor: () ->
    super()

    document.addEventListener 'keydown', (ev) =>
      @queue {
        type: 'keydown'
        keyCode: ev.keyCode
      }

    document.addEventListener 'keyup', (ev) =>
      @queue {
        type: 'keyup'
        keyCode: ev.keyCode
      }