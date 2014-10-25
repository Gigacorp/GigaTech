class Text extends Shape

  constructor: (args={}) ->
    args.color = args.color or APP.fgColor.clone()

    super args

    @text = args.text or ''
    @textAlign = args.textAlign or 'center'
    @textBaseline = args.textBaseline or 'middle'
    @fontSize = args.fontSize or APP.fontSize
    @font = args.font or APP.font
    @alpha = args.alpha

  render: (canvas, ctx) ->
    super canvas, ctx

    ctx.font = @fontSize + 'px ' + @font
    ctx.textAlign = @textAlign
    ctx.textBaseline = @textBaseline
    ctx.lineWidth = @lineWidth

    if @color
      ctx.fillStyle = @color.toString()
      ctx.fillText @text, 0, 0

    if @stroke
      ctx.strokeStyle = @stroke.toString()
      ctx.strokeText @text, 0, 0
