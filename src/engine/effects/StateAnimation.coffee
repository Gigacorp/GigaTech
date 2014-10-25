class StateAnimation extends Animation

  constructor: (args={}) ->
    super args
    @state1 = args.state1 or {}
    @state2 = args.state2 or {}

  step: () ->
    if @state2.pos isnt undefined
      changeX = @state2.pos.x - @state1.pos.x
      changeY = @state2.pos.y - @state1.pos.y
      @parent.pos.x = @f @current, @state1.pos.x, changeX, @duration
      @parent.pos.y = @f @current, @state1.pos.y, changeY, @duration

    if @state2.scale isnt undefined
      changeX = @state2.scale.x - @state1.scale.x
      changeY = @state2.scale.y - @state1.scale.y
      @parent.scale.x = @f @current, @state1.scale.x, changeX, @duration
      @parent.scale.y = @f @current, @state1.scale.y, changeY, @duration

    if @state2.rotation isnt undefined
      change = @state2.rotation - @state1.rotation
      @parent.rotation = @f @current, @state1.rotation, change, @duration