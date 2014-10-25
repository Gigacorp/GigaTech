class InputHandler
  constructor: () ->
    @inputs = []

  update: (delta) ->
    for input in @inputs
      APP.broadcast input
    @inputs.length = 0

  queue: (event) ->
    @inputs.push event
