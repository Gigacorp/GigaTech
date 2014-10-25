class DemoApp extends Application

  constructor: () ->
    super {}

    @root.attach new Rectangle {
      color: new Color 255, 0, 0
      w: 50
      h: 50
    }

    @frame()

new DemoApp
