class Animation extends Controller

  constructor: (args={}) ->
    @current = 0
    @duration = args.duration or 0
    @paused = true
    @f = args.f or Easie.linearNone
    @onDone = args.onDone or null
    if args.play
      @play()

  pause: () ->
    @paused = true
    return @

  play: (onDone=null) ->
    if onDone
      @onDone = onDone
    @paused = false
    return @

  stop: () ->
    @paused = true
    @current = 0
    return @

  update: (delta) ->
    if @paused
      return

    @current += delta

    if @current > @duration
      @current = @duration

    @step()

    if @current == @duration
      @stop()
      if @onDone then @onDone @
