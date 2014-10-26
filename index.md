---
layout: default
title: GigaTech
---

GigaTech is an HTML5 game engine written in CoffeeScript.

## Features

 * Powerful scene graph.
 * Animation system powered by [Easie](https://github.com/jimjeffers/Easie).
 * Event system.
 * Collision detection.
 * Audio support.
 * Use it with [Ejecta](http://impactjs.com/ejecta) to create iOS games.

## Demo

<iframe src="demo/index.html" frameborder="0"></iframe>

## Code

<pre>
class SpinningRectangle extends Rectangle

  constructor: () ->
    super {
      color: new Color 255, 0, 0
      radius: [10, 10, 10, 10]
      w: 50
      h: 50
    }

    @pulse = new PulseAnimation
    @attach @pulse

    @on 'touchstart', 'mousedown', (event) =>
      if @intersects event.pos
        @pulse.stop().play()

  update: (delta) ->
    super delta
    @rotation += 1.5 * delta


class DemoApp extends Application

  constructor: () ->
    super {
      bgColor: new Color 0, 0, 0
    }

    @attach new SpinningRectangle

    @start()


new DemoApp
</pre>

## License

GigaTech is released under the [MIT license](https://github.com/Gigacorp/GigaTech/blob/master/LICENSE).

## Credits

GigaTech is a [Gigacorp](http://thegigacorp.com) product. The "Vector" and "Random" math classes were borrowed from the [CoffeePhysics](https://github.com/soulwire/Coffee-Physics) project. The animation system is built upon the [Easie](https://github.com/jimjeffers/Easie) project.
