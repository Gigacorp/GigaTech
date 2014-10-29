class Application extends Node

  constructor: (args={}) ->
    super args

    window.APP = @
    @EJECTA = typeof ejecta isnt "undefined"
    @blurred = false

    @fgColor = args.fgColor or new Color 255, 255, 255
    @bgColor = args.bgColor or new Color 0, 0, 255
    @font = args.font or 'Helvetica'
    @fontSize = args.fontSize or 16
    @background = args.background or new Background { color: @bgColor }
    @fullscreen = Boolean(args.fullscreen)

    @canvas = document.getElementById 'canvas'
    @ctx = @canvas.getContext '2d'

    @resize false

    @camera = args.camera or new Camera

    @touch = new TouchInputHandler
    @mouse = new MouseInputHandler
    @keyboard = new KeyboardInputHandler
    @touchGestureDetector = new TouchGestureDetector
    @mouseGestureDetector = new MouseGestureDetector
    @debug = new DebugDisplay

    @camera.attach @debug

    window.onresize = =>
      @resize()

    window.onfocus = =>
      @resume()

    window.onblur = =>
      @pause()

  pause: () ->
    @blurred = true

  resume: () ->
    @blurred = false
    @last = null
    @frame()

  resize: (broadcast=true) ->
    @w = if @fullscreen then window.innerWidth else @canvas.offsetWidth
    @h = if @fullscreen then window.innerHeight else @canvas.offsetHeight

    if not @EJECTA
      @retinaCanvasHack()

    if broadcast
      @broadcast {
        type: 'resize'
        w: @w
        h: @h
      }

  screenToWorld: (p) ->
    ret = Vector.add p, @camera.pos
    ret.scale 1/@camera.zoom

  worldToScreen: (p) ->
    ret = p.clone()
    ret.scale @camera.zoom
    ret.sub @camera.pos

  broadcast: (event) ->
    @callEventListeners event

    @touchGestureDetector.callEventListeners event
    @mouseGestureDetector.callEventListeners event

    @camera.callEventListeners event
    @callEventListeners event

    @camera.broadcast event
    super event

  retinaCanvasHack: () ->
    @scaleFactor = if window.devicePixelRatio then window.devicePixelRatio else 1

    @canvas.width = @w * @scaleFactor
    @canvas.height = @h * @scaleFactor

    @canvas.style.width = @w + 'px'
    @canvas.style.height = @h + 'px'

    @ctx.scale @scaleFactor, @scaleFactor

  update: () ->
    now = new Date().getTime()
    delta = if @last then (now - @last) / 1000 else 0

    @mouse.update delta
    @touch.update delta
    @keyboard.update delta

    @camera.update delta
    super delta

    @last = now

  render: () ->
    @ctx.save()
    @ctx.translate @w/2, @h/2

    @background.render @canvas, @ctx

    @ctx.translate -@camera.pos.x, -@camera.pos.y

    @ctx.save()
    @ctx.scale @camera.zoom, @camera.zoom
    super @canvas, @ctx
    @ctx.restore()

    @camera.render @canvas, @ctx

    @ctx.restore()

  start:() ->
    @broadcast {
      type: 'start'
    }
    @frame()

  frame: () =>
    if @blurred
      return

    @update()
    @render()

    requestAnimationFrame @frame
