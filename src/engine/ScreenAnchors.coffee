class ScreenAnchors extends Node

  constructor: () ->
    super {
      id: 'anchors'
    }

    @top = new Node {
      id: 'top'
      pos: new Vector 0, -(APP.h/2)
    }

    @bottom = new Node {
      id: 'bottom'
      pos: new Vector 0, (APP.h/2)
    }

    @left = new Node {
      id: 'left'
      pos: new Vector -(APP.w/2), 0
    }

    @right = new Node {
      id: 'right'
      pos: new Vector (APP.w/2), 0
    }

    @topLeft = new Node {
      id: 'top-left'
      pos: new Vector @left.pos.x, @top.pos.y
    }

    @topRight = new Node {
      id: 'top-right'
      pos: new Vector @right.pos.x, @top.pos.y
    }

    @bottomLeft = new Node {
      id: 'bottom-left'
      pos: new Vector @left.pos.x, @bottom.pos.y
    }

    @bottomRight = new Node {
      id: 'bottom-right'
      pos: new Vector @right.pos.x, @bottom.pos.y
    }

    @attach @left
    @attach @right
    @attach @top
    @attach @bottom
    @attach @topLeft
    @attach @topRight
    @attach @bottomLeft
    @attach @bottomRight
