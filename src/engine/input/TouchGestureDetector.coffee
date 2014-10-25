class TouchGestureDetector extends EventReceiver
  constructor: () ->
    super()

    @lastTouchStart = null
    @preventTap = false
    @lastMag = null
    @twoFingerSwipeDetected = true

    # Reset
    @on 'touchstart', (event) =>
      @lastTouchStart = event.pos.clone()
      @preventTap = false
      @oldP1 = null
      @oldP2 = null

    # Detect taps
    @on 'touchend', (event) =>
      if @lastTouchStart and not @preventTap
        APP.broadcast {
          type: 'tap'
          pos: @lastTouchStart.clone()
        }
      @lastTouchStart = null
      @lastMag = null

    # Detect drags
    @on 'touchmove', (event) =>
      if @lastTouchStart == null then return
      if event.nativeEvent.touches.length > 1 then return
      pos = event.pos.clone()
      len = Vector.sub(pos, @lastTouchStart).mag()
      if len > 10
        @preventTap = true
        APP.broadcast {
          type: 'touchdrag'
          pos: pos
          start: @lastTouchStart.clone()
        }

    # Detect two-finger swipe
    @on 'touchmove', (event) =>
      if event.nativeEvent.touches.length < 2 then return

      @preventTap = true

      t1 = event.nativeEvent.touches[0]
      t2 = event.nativeEvent.touches[1]

      p1 = new Vector t1.pageX, t1.pageY
      p2 = new Vector t2.pageX, t2.pageY

      @oldP1 ?= p1
      @oldP2 ?= p2

      d1 = Vector.sub p1, @oldP1
      d2 = Vector.sub p2, @oldP2

      @oldP1 = p1
      @oldP2 = p2

      direction = null

      if d1.x > 0 and d2.x > 0
        direction = 'right'
      else if d1.x < 0 and d2.x < 0
        direction = 'left'

      if direction == null
        @twoFingerSwipeDetected = false
        return
      else
        @twoFingerSwipeDetected = true

      APP.broadcast {
        type: 'twoFingerSwipe'
        direction: direction
        d1: d1
        d2: d2
      }

    # Detect zoom gesture
    @on 'touchmove', (event) =>
      if event.nativeEvent.touches.length < 2 then return
      if @twoFingerSwipeDetected then return

      @preventTap = true

      t1 = event.nativeEvent.touches[0]
      t2 = event.nativeEvent.touches[1]

      p1 = new Vector t1.pageX, t1.pageY
      p2 = new Vector t2.pageX, t2.pageY

      d = Vector.sub p1, p2

      mag = d.mag()

      @lastMag ?= mag

      delta = mag - @lastMag

      @lastMag = mag

      APP.broadcast {
        type: 'zoom'
        delta: delta
      }
