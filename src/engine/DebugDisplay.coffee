DEBUG = (text) ->
  APP.debug.setText text

class DebugDisplay extends Node
  constructor: ->
    super {
      pos: new Vector -APP.w/2, APP.h/2
    }

    @color = APP.fgColor.clone()

    @STAY_TIME = 4
    FONT_SIZE = 20

    @text = new Text {
      alpha: 0
      text: ''
      textAlign: 'left'
      pos: new Vector 0, -FONT_SIZE/2
      font: 'Monospace'
      fontSize: FONT_SIZE
      color: @color
    }

    @fader = new ValueAnimation {
      f: Easie.linearNone
      duration: 4
      onUpdate: (value) =>
        @text.alpha = value
    }

    @attach @text
    @text.attach @fader

  setText: (text) ->
    @fader.stop()
    @fader.from = 1
    @fader.to = 0
    @fader.play()
    @text.text = text
