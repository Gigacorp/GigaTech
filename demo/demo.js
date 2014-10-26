var DemoApp, SpinningRectangle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SpinningRectangle = (function(_super) {
  __extends(SpinningRectangle, _super);

  function SpinningRectangle() {
    SpinningRectangle.__super__.constructor.call(this, {
      color: new Color(255, 0, 0),
      radius: [10, 10, 10, 10],
      w: 50,
      h: 50
    });
    this.pulse = new PulseAnimation;
    this.attach(this.pulse);
    this.on('touchstart', 'mousedown', (function(_this) {
      return function(event) {
        if (_this.intersects(event.pos)) {
          return _this.pulse.stop().play();
        }
      };
    })(this));
  }

  SpinningRectangle.prototype.update = function(delta) {
    SpinningRectangle.__super__.update.call(this, delta);
    return this.rotation += 1.5 * delta;
  };

  return SpinningRectangle;

})(Rectangle);

DemoApp = (function(_super) {
  __extends(DemoApp, _super);

  function DemoApp() {
    DemoApp.__super__.constructor.call(this, {
      bgColor: new Color(0, 0, 0)
    });
    this.attach(new SpinningRectangle);
    this.start();
  }

  return DemoApp;

})(Application);

new DemoApp;
