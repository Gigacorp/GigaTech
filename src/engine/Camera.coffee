class Camera extends Node
  constructor: (args={}) ->
    super args

    # We force the ID because of some wonky code in Entity.getAbsPos.
    @id = 'camera'

    @zoom = args.zoom or 1
    @minZoom = args.minZoom or 0.1
    @maxZoom = args.maxZoom or 10

    @zoomer = new ValueAnimation {
      f: Easie.cubicOut
      duration: 0.5
      onUpdate: (value) =>
        @setZoom value
    }

    @mover = new StateAnimation {
      duration: 0.5
      f: Easie.cubicOut
      state1: {
        pos: new Vector 0, 0
      }
      state2: {
        pos: new Vector 0, 0
      }
    }

    @attach @zoomer
    @attach @mover

  setZoom: (zoom) ->
    if zoom > @maxZoom then zoom = @maxZoom
    if zoom < @minZoom then zoom = @minZoom
    @zoom = zoom

  zoomTo: (zoom, onDone=null) ->
    @zoomer.from = @zoom
    @zoomer.to = zoom
    @zoomer.stop()
    @zoomer.play onDone

  panTo: (pos) ->
    @mover.state1.pos.copy @pos
    @mover.state2.pos.copy pos
    @mover.stop()
    @mover.play()

