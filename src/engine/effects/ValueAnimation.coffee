class ValueAnimation extends Animation

  constructor: (args={}) ->
    super args
    @from = args.from or 0
    @to = args.to or 0
    @onUpdate = args.onUpdate

  step: () ->
    value = @f @current, @from, (@to-@from), @duration
    @onUpdate value
