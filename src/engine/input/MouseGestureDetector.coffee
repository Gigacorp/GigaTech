class MouseGestureDetector extends EventReceiver
  constructor: () ->
    super()

    @lastMouseDownPos = null
    @preventClick = false

    @on 'mousedown', (event) =>
      @lastMouseDownPos = event.pos.clone()
      @preventClick = false

    @on 'mouseup', (event) =>
      if @lastMouseDownPos and not @preventClick
        APP.broadcast {
          type: 'click'
          pos: @lastMouseDownPos.clone()
        }
      @lastMouseDownPos = null

    @on 'mousemove', (event) =>
      if not @lastMouseDownPos then return
      pos = event.pos.clone()
      len = Vector.sub(pos, @lastMouseDownPos).mag()
      if len > CFG.INPUT_DRAG_TRESHOLD
        @preventClick = true
        APP.broadcast {
          type: 'mousedrag'
          pos: pos
          start: @lastMouseDownPos.clone()
        }