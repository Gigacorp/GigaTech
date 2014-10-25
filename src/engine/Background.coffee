class Background

  constructor: (args={}) ->
    @color = args.color or new Color 0, 0, 255

  render: (canvas, ctx) ->
    left = -APP.w/2
    top = -APP.h/2
    ctx.fillStyle = @color.toString()
    ctx.fillRect left, top, APP.w, APP.h
