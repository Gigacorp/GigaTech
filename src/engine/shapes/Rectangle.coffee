class Rectangle extends Shape

  constructor: (args={}) ->
    super args
    @w = args.w
    @h = args.h
    @radius = args.radius or 0

  intersects: (p) ->
    @intersectsXY p.x, p.y

  intersectsXY: (x, y) ->
    pos = @getAbsPos()
    left = pos.x - @w/2
    top = pos.y - @h/2
    bottom = top + @h
    right = left + @w
    return x > left and x < right and y > top and y < bottom

  render: (canvas, ctx) ->
    super canvas, ctx

    if @radius
      @renderRounded canvas, ctx
    else
      @renderStandard canvas, ctx

  renderStandard: (canvas, ctx) ->
    if @color
      ctx.fillStyle = @color.toString()
      ctx.fillRect @w/-2, @h/-2, @w, @h

    if @stroke
      ctx.strokeStyle = @stroke.toString()
      ctx.lineWidth = @lineWidth
      ctx.strokeRect @w/-2, @h/-2, @w, @h

  renderRounded: (canvas, ctx) ->
    w = @w
    h = @h
    x = w/-2
    y = h/-2
    r = @radius

    ctx.beginPath()
    ctx.moveTo x+r[0], y

    ctx.arcTo x+w, y,   x+w, y+h, r[1]
    ctx.arcTo x+w, y+h, x,   y+h, r[2]
    ctx.arcTo x,   y+h, x,   y,   r[3]
    ctx.arcTo x,   y,   x+w, y,   r[0]

    ctx.closePath()

    if @color
      ctx.fillStyle = @color.toString()
      ctx.fill()

    if @stroke
      ctx.strokeStyle = @stroke.toString()
      ctx.lineWidth = @lineWidth
      ctx.stroke()
