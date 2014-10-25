class Polygon extends Shape
  constructor: (args={}) ->
    super args
    @closePath = args.closePath or false
    @vertices = args.vertices or []

  render: (canvas, ctx) ->
    super canvas, ctx

    ctx.beginPath()

    for vertex in @vertices
      ctx.lineTo vertex.x, vertex.y

    if @closePath
      ctx.closePath()

    if @color
      ctx.fillStyle = @color.toString()
      ctx.fill()

    if @stroke
      ctx.strokeStyle = @stroke.toString()
      ctx.lineWidth = @lineWidth
      ctx.stroke()
