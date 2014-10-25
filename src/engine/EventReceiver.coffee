class EventReceiver

  constructor: () ->
    @handlers = {}

  callEventListeners: (event) ->
    if not @handlers.hasOwnProperty event.type then return

    if event.cancelled then return

    for callback in @handlers[event.type]
      callback event
      if event.cancelled then break

  on: (args...) ->
    callback = args.pop()
    for name in args
      if not @handlers.hasOwnProperty name
        @handlers[name] = []
      @handlers[name].push callback