module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.initConfig {
    coffee: {
      compile: {
        options: {
          bare: true
        }
        files: {
          'demo/gigatech.js': [
            'src/engine/math/Random.coffee'
            'src/engine/math/Vector.coffee'

            'src/engine/Color.coffee'
            'src/engine/Sound.coffee'
            'src/engine/EventReceiver.coffee'
            'src/engine/Controller.coffee'
            'src/engine/Entity.coffee'
            'src/engine/Node.coffee'
            'src/engine/ScreenAnchors.coffee'

            'src/engine/shapes/Shape.coffee'
            'src/engine/shapes/Circle.coffee'
            'src/engine/shapes/ProgressArc.coffee'
            'src/engine/shapes/Rectangle.coffee'
            'src/engine/shapes/Polygon.coffee'
            'src/engine/shapes/Line.coffee'
            'src/engine/shapes/Text.coffee'

            'src/engine/Img.coffee'

            'src/engine/effects/Easie.coffee'
            'src/engine/effects/Animation.coffee'
            'src/engine/effects/StateAnimation.coffee'
            'src/engine/effects/ValueAnimation.coffee'
            'src/engine/effects/PulseAnimation.coffee'
            'src/engine/effects/MinimizeAnimation.coffee'
            'src/engine/effects/ColorFader.coffee'

            'src/engine/input/InputHandler.coffee'
            'src/engine/input/KeyboardInputHandler.coffee'
            'src/engine/input/MouseInputHandler.coffee'
            'src/engine/input/TouchInputHandler.coffee'
            'src/engine/input/TouchGestureDetector.coffee'
            'src/engine/input/MouseGestureDetector.coffee'

            'src/engine/DebugDisplay.coffee'
            'src/engine/Background.coffee'
            'src/engine/Camera.coffee'
            'src/engine/Application.coffee'

            'src/engine/LocalStorage.coffee'
          ]
          'demo/01-simple/demo.js': [
            'src/demo/01-simple.coffee'
          ]
          'demo/02-html5-drag-and-drop/demo.js': [
            'src/demo/02-html5-drag-and-drop.coffee'
          ]
        }
      }
    }
    watch: {
      coffee: {
        files: ['src/**/*.coffee', 'Gruntfile.coffee']
        tasks: ['coffee']
      }
    }
  }
  grunt.registerTask('default', ['coffee'])
