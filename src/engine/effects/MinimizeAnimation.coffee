class MinimizeAnimation extends StateAnimation

  constructor: () ->
    super {
      state1: {
        scale: new Vector 1, 1
      }
      state2: {
        scale: new Vector 0, 0
      }
      f: Easie.linearNone
      duration: 0.3
    }