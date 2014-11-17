class App extends Application

  constructor: () ->
    super {
      bgColor: new Color 0, 0, 0
      fullscreen: true
    }

    @attach new Text {
      text: "Drag image from desktop to here."
    }

    @canvas.ondragover = (e) =>
      e.preventDefault()
      return false

    @canvas.ondrop = (e) =>
      e.preventDefault()
      for file in e.dataTransfer.files
        @addFileToScene file

    @start()

  addFileToScene: (file) ->
    acceptedTypes = {
      'image/png': true
      'image/jpeg': true
      'image/gif': true
    }

    if not acceptedTypes[file.type]
      return

    reader = new FileReader

    reader.onload = (event) =>
      @attach new Img {
        result: event.target.result
        w: 250
        h: 250
      }

    reader.readAsDataURL(file)


new App
