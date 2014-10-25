class Circle extends Shape
  constructor: (args={}) ->
    super args
    @radius = args.radius or 0

  render: (canvas, ctx) ->
    super canvas, ctx

    ctx.beginPath()
    ctx.arc 0, 0, @radius, 0, Math.PI*2, false
    ctx.closePath()

    if @color
      ctx.fillStyle = @color.toString()
      ctx.fill()

    if @stroke
      ctx.strokeStyle = @stroke.toString()
      ctx.lineWidth = @lineWidth
      ctx.stroke()

  intersects: (p) ->
    pos = @getAbsPos()
    xDist = Math.abs p.x - pos.x
    yDist = Math.abs p.y - pos.y
    d = Math.sqrt (xDist * xDist) + (yDist * yDist)
    return d < @radius
