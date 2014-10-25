class PulseAnimation extends StateAnimation

  constructor: () ->
    super {
      state1: {
        scale: new Vector 0.7, 0.7
      }
      state2: {
        scale: new Vector 1, 1
      }
      f: Easie.elasticOut
      duration: 1
    }