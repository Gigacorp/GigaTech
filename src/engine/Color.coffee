class Color

  @random: () ->
    color = new Color
    color.random()
    return color

  @fromJSON: (json) ->
    new Color json.r, json.g, json.b

  toJSON: () ->
    {
      r: @r
      g: @g
      b: @b
    }

  constructor: (@r=0, @g=0, @b=0) ->

  set: (@r, @g, @b) ->

  setFrom: (c) ->
    @set c.r, c.g, c.b

  random: () ->
    @r = Random.int 0, 255
    @g = Random.int 0, 255
    @b = Random.int 0, 255

  clone: ->
    new Color @r, @g, @b

  toString: () ->
    "rgb(#{@r}, #{@g}, #{@b})"

  equals: (color) ->
    return @r == color.r and
           @g == color.g and
           @b == color.b


