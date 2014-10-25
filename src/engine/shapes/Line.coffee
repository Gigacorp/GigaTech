class Line extends Shape
  constructor: (args={}) ->
    super args
    @to = args.to

  render: (canvas, ctx) ->
    super canvas, ctx

    ctx.strokeStyle = @color.toString()
    ctx.lineWidth = @lineWidth
    ctx.beginPath()
    ctx.moveTo 0, 0
    ctx.lineTo @to.x, @to.y
    ctx.stroke()
