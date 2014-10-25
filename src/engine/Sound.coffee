class @Sound

  @cache = {}
  @PATH = 'assets/audio'

  @load: (id, file) ->
    src = @PATH + '/' + file

    audio = new Audio src
    audio.preload = true
    audio.load()

    @cache[id] = audio

  @play: (id, repeat=false) ->
    if not @cache.hasOwnProperty id
      console.log "Unknown sound '#{id}'"
      return

    audio = @cache[id]
    audio.load()

    if repeat
      audio.loop = true

    audio.play()

  @stop: (id) ->
    if not @cache.hasOwnProperty id
      console.log "Unknown sound '#{id}'"
      return

    audio = @cache[id]

    audio.pause()

