class Application extends EventReceiver

  constructor: (args={}) ->
    super args

    @fgColor = args.fgColor or new Color 255, 255, 255
    @bgColor = args.bgColor or new Color 0, 0, 255
    @font = args.font or 'Helvetica'
    @fontSize = args.fontSize or 16
    @camera = args.camera or new Camera
    @background = args.background or new Background { color: @bgColor }

    window.APP = @

    @EJECTA = typeof ejecta isnt "undefined"
    @canvas = document.getElementById 'canvas'

    blurred = false

    @ctx = @canvas.getContext '2d'

    @w = window.innerWidth
    @h = window.innerHeight

    @touch = new TouchInputHandler
    @mouse = new MouseInputHandler
    @keyboard = new KeyboardInputHandler
    @touchGestureDetector = new TouchGestureDetector
    @mouseGestureDetector = new MouseGestureDetector

    @debug = new DebugDisplay

    @camera.attach @debug

    @root = new Node {
      id: 'root'
    }

    if not @EJECTA
      @retinaCanvasHack()

      window.onresize = =>
        @retinaCanvasHack()

      window.onfocus = =>
        @blurred = false
        @last = null
        @frame()

      window.onblur = =>
        @blurred = true

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
    @root.callEventListeners event

    @camera.broadcast event
    @root.broadcast event

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
    @root.update delta

    @last = now

  render: () ->
    @ctx.save()
    @ctx.translate @w/2, @h/2

    @background.render @canvas, @ctx

    @ctx.translate -@camera.pos.x, -@camera.pos.y

    @ctx.save()
    @ctx.scale @camera.zoom, @camera.zoom
    @root.render @canvas, @ctx
    @ctx.restore()

    @camera.render @canvas, @ctx

    @ctx.restore()

  frame: () =>
    if @blurred
      return

    @update()
    @render()

    requestAnimationFrame @frame
