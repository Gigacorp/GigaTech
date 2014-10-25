class Entity extends EventReceiver

  constructor: (args={}) ->
    super

    @id = args.id or ''
    @pos = args.pos or new Vector 0, 0
    @rotation = args.rotation or 0
    @scale = args.scale or new Vector 1, 1
    @hidden = args.hidden or false

    @hFlipped = args.hFlipped or false

    @controllers = args.controllers or []
    @parent = null

    @alpha = args.alpha

  isHidden: () ->
    @hidden

  isVisible: () ->
    not @hidden

  clear: ->
    @controllers = []

  getAbsPos: ->
    if @parent and @parent.id isnt 'camera'
      return Vector.add @parent.getAbsPos(), @pos
    return @pos.clone()

  attach: (controller) ->
    if not controller instanceof Controller
      throw "#{controller} must be instanceof Controller"
    controller.parent = @
    @controllers.push controller

  detach: (controller) ->
    if not controller instanceof Controller
      throw "#{controller} must be instanceof Controller"
    controller.parent = null
    @controllers = @controllers.filter (i) -> i isnt controller

  update: (delta) ->
    for controller in @controllers
      controller.update delta

  render: (canvas, ctx) ->
    ctx.translate @pos.x, @pos.y

    # if typeof @alpha isnt undefined
    #   ctx.globalAlpha = @alpha

    if @hFlipped
      ctx.rotate @rotation + Math.PI
      ctx.scale -@scale.x, @scale.y
    else
      ctx.rotate @rotation
      ctx.scale @scale.x, @scale.y

  getCurrentState: () ->
    {
      pos: @pos.clone()
      scale: @scale.clone()
      rotation: @rotation
    }

