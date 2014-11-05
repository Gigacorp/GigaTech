class Node extends Entity

  constructor: (args={}) ->
    super args
    @children = args.children or []

  clear: ->
    super()
    @children = []

  attach: (entityOrController) ->
    if entityOrController instanceof Controller
      super entityOrController
      return

    entity = entityOrController
    entity.parent = @
    @children.push entity

  detach: (entityOrController) ->
    if entityOrController instanceof Controller
      super entityOrController
      return

    entity = entityOrController
    entity.parent = null
    @children = @children.filter (i) -> i isnt entity

  getAllByClass: (klass) ->
    @children.filter (i) -> i instanceof klass

  update: (delta) ->
    super delta

    for child in @children
      child.update delta

  intersects: (p) ->
    # return getBoundingBox().intersects p

  broadcast: (event) ->
    for child in @children
      child.callEventListeners event
      if child instanceof Node
        child.broadcast event

  render: (canvas, ctx) ->
    super canvas, ctx

    for child in @children
      if child.hidden then continue
      ctx.save()
      child.render canvas, ctx
      ctx.restore()
