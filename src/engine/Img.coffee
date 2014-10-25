class Img extends Entity
  @cache: {}
  @PATH = 'assets/images'

  constructor: (args={}) ->
    super args

    src = args.src
    @w = args.w
    @h = args.h

    cache = @constructor.cache

    if cache.hasOwnProperty src
      @img = cache[src]
    else
      @img = new Image()
      @img.src = Img.PATH + '/' + src
      cache[src] = @img

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

    if not @img.width and @img.height then return

    w = @w or @img.width
    h = @w or @img.height

    ctx.drawImage @img, w/-2, h/-2, w, h
