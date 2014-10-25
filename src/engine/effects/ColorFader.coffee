class ColorFader extends Animation

  constructor: (args={}) ->
    super args
    @color = args.color or new Color
    @from = args.from or new Color
    @to = args.to or new Color

  step: () ->
    r = @f @current, @from.r, (@to.r-@from.r), @duration
    g = @f @current, @from.g, (@to.g-@from.g), @duration
    b = @f @current, @from.b, (@to.b-@from.b), @duration

    r = Math.round r
    g = Math.round g
    b = Math.round b

    @color.set r, g, b
