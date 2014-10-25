class ProgressArc extends Shape
  constructor: (args={}) ->
    super args
    @radius = args.radius or 10
    @percent = args.percent or 1

  render: (canvas, ctx) ->
    super canvas, ctx

    startAngle = 1.5*Math.PI
    endAngle = startAngle - (@percent*Math.PI*2)

    ctx.beginPath()
    ctx.arc 0, -@lineWidth/2, @radius, startAngle, endAngle, false
    ctx.lineWidth = @lineWidth
    ctx.strokeStyle = @color.toString()
    ctx.stroke()
