class Shape extends Entity
  constructor: (args={}) ->
    super args
    @color = args.color or null
    @stroke = args.stroke or null
    @lineWidth = args.lineWidth or 1

  intersectsDot: (x, y) ->
    # abstract