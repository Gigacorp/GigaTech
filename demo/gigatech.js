
/* Random */
var Random;

Random = function(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
};

Random.int = function(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return Math.floor(min + Math.random() * (max - min));
};

Random.sign = function(prob) {
  if (prob == null) {
    prob = 0.5;
  }
  if (Math.random() < prob) {
    return 1;
  } else {
    return -1;
  }
};

Random.bool = function(prob) {
  if (prob == null) {
    prob = 0.5;
  }
  return Math.random() < prob;
};

Random.item = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};


/* 2D Vector */
var Vector;

Vector = (function() {
  Vector.fromJSON = function(json) {
    return new Vector(json.x, json.y);
  };


  /* Adds two vectors and returns the product. */

  Vector.add = function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  };


  /* Subtracts v2 from v1 and returns the product. */

  Vector.sub = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  };


  /* Projects one vector (v1) onto another (v2) */

  Vector.project = function(v1, v2) {
    return v1.clone().scale((v1.dot(v2)) / v1.magSq());
  };


  /* Creates a new Vector instance. */

  function Vector(x, y) {
    this.x = x != null ? x : 0.0;
    this.y = y != null ? y : 0.0;
  }


  /* Sets the components of this vector. */

  Vector.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  };


  /* Add a vector to this one. */

  Vector.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };


  /* Subtracts a vector from this one. */

  Vector.prototype.sub = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  };


  /* Scales this vector by a value. */

  Vector.prototype.scale = function(f) {
    this.x *= f;
    this.y *= f;
    return this;
  };


  /* Computes the dot product between vectors. */

  Vector.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
  };


  /* Computes the cross product between vectors. */

  Vector.prototype.cross = function(v) {
    return (this.x * v.y) - (this.y * v.x);
  };


  /* Computes the magnitude (length). */

  Vector.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };


  /* Computes the squared magnitude (length). */

  Vector.prototype.magSq = function() {
    return this.x * this.x + this.y * this.y;
  };


  /* Computes the distance to another vector. */

  Vector.prototype.dist = function(v) {
    var dx, dy;
    dx = v.x - this.x;
    dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  };


  /* Computes the squared distance to another vector. */

  Vector.prototype.distSq = function(v) {
    var dx, dy;
    dx = v.x - this.x;
    dy = v.y - this.y;
    return dx * dx + dy * dy;
  };


  /* Normalises the vector, making it a unit vector (of length 1). */

  Vector.prototype.norm = function() {
    var m;
    m = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= m;
    this.y /= m;
    return this;
  };


  /* Limits the vector length to a given amount. */

  Vector.prototype.limit = function(l) {
    var m, mSq;
    mSq = this.x * this.x + this.y * this.y;
    if (mSq > l * l) {
      m = Math.sqrt(mSq);
      this.x /= m;
      this.y /= m;
      this.x *= l;
      this.y *= l;
      return this;
    }
  };


  /* Copies components from another vector. */

  Vector.prototype.copy = function(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  };


  /* Clones this vector to a new itentical one. */

  Vector.prototype.clone = function() {
    return new Vector(this.x, this.y);
  };


  /* Resets the vector to zero. */

  Vector.prototype.clear = function() {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  };

  Vector.prototype.equals = function(v) {
    return this.x === v.x && this.y === v.y;
  };

  Vector.prototype.toJSON = function() {
    return {
      x: this.x,
      y: this.y
    };
  };

  Vector.prototype.toString = function() {
    return "" + this.x + ", " + this.y;
  };

  return Vector;

})();

var Color;

Color = (function() {
  Color.random = function() {
    var color;
    color = new Color;
    color.random();
    return color;
  };

  Color.fromJSON = function(json) {
    return new Color(json.r, json.g, json.b);
  };

  Color.prototype.toJSON = function() {
    return {
      r: this.r,
      g: this.g,
      b: this.b
    };
  };

  function Color(r, g, b) {
    this.r = r != null ? r : 0;
    this.g = g != null ? g : 0;
    this.b = b != null ? b : 0;
  }

  Color.prototype.set = function(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  };

  Color.prototype.setFrom = function(c) {
    return this.set(c.r, c.g, c.b);
  };

  Color.prototype.random = function() {
    this.r = Random.int(0, 255);
    this.g = Random.int(0, 255);
    return this.b = Random.int(0, 255);
  };

  Color.prototype.clone = function() {
    return new Color(this.r, this.g, this.b);
  };

  Color.prototype.toString = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  };

  Color.prototype.equals = function(color) {
    return this.r === color.r && this.g === color.g && this.b === color.b;
  };

  return Color;

})();

this.Sound = (function() {
  function Sound() {}

  Sound.cache = {};

  Sound.PATH = 'assets/audio';

  Sound.load = function(id, file) {
    var audio, src;
    src = this.PATH + '/' + file;
    audio = new Audio(src);
    audio.preload = true;
    audio.load();
    return this.cache[id] = audio;
  };

  Sound.play = function(id, repeat) {
    var audio;
    if (repeat == null) {
      repeat = false;
    }
    if (!this.cache.hasOwnProperty(id)) {
      console.log("Unknown sound '" + id + "'");
      return;
    }
    audio = this.cache[id];
    audio.load();
    if (repeat) {
      audio.loop = true;
    }
    return audio.play();
  };

  Sound.stop = function(id) {
    var audio;
    if (!this.cache.hasOwnProperty(id)) {
      console.log("Unknown sound '" + id + "'");
      return;
    }
    audio = this.cache[id];
    return audio.pause();
  };

  return Sound;

})();

var EventReceiver,
  __slice = [].slice;

EventReceiver = (function() {
  function EventReceiver() {
    this.handlers = {};
  }

  EventReceiver.prototype.callEventListeners = function(event) {
    var callback, _i, _len, _ref, _results;
    if (!this.handlers.hasOwnProperty(event.type)) {
      return;
    }
    if (event.cancelled) {
      return;
    }
    _ref = this.handlers[event.type];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      callback = _ref[_i];
      callback(event);
      if (event.cancelled) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  EventReceiver.prototype.on = function() {
    var args, callback, name, _i, _len, _results;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    callback = args.pop();
    _results = [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      name = args[_i];
      if (!this.handlers.hasOwnProperty(name)) {
        this.handlers[name] = [];
      }
      _results.push(this.handlers[name].push(callback));
    }
    return _results;
  };

  return EventReceiver;

})();

var Controller;

Controller = (function() {
  function Controller() {
    this.parent = null;
  }

  Controller.prototype.update = function(delta) {};

  return Controller;

})();

var Entity,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Entity = (function(_super) {
  __extends(Entity, _super);

  function Entity(args) {
    if (args == null) {
      args = {};
    }
    Entity.__super__.constructor.apply(this, arguments);
    this.id = args.id || '';
    this.pos = args.pos || new Vector(0, 0);
    this.rotation = args.rotation || 0;
    this.scale = args.scale || new Vector(1, 1);
    this.hidden = args.hidden || false;
    this.hFlipped = args.hFlipped || false;
    this.controllers = args.controllers || [];
    this.parent = null;
    this.alpha = args.alpha;
  }

  Entity.prototype.isHidden = function() {
    return this.hidden;
  };

  Entity.prototype.isVisible = function() {
    return !this.hidden;
  };

  Entity.prototype.clear = function() {
    return this.controllers = [];
  };

  Entity.prototype.getAbsPos = function() {
    if (this.parent && this.parent.id !== 'camera') {
      return Vector.add(this.parent.getAbsPos(), this.pos);
    }
    return this.pos.clone();
  };

  Entity.prototype.attach = function(controller) {
    if (!controller instanceof Controller) {
      throw "" + controller + " must be instanceof Controller";
    }
    controller.parent = this;
    return this.controllers.push(controller);
  };

  Entity.prototype.detach = function(controller) {
    if (!controller instanceof Controller) {
      throw "" + controller + " must be instanceof Controller";
    }
    controller.parent = null;
    return this.controllers = this.controllers.filter(function(i) {
      return i !== controller;
    });
  };

  Entity.prototype.update = function(delta) {
    var controller, _i, _len, _ref, _results;
    _ref = this.controllers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      controller = _ref[_i];
      _results.push(controller.update(delta));
    }
    return _results;
  };

  Entity.prototype.render = function(canvas, ctx) {
    ctx.translate(this.pos.x, this.pos.y);
    if (this.hFlipped) {
      ctx.rotate(this.rotation + Math.PI);
      return ctx.scale(-this.scale.x, this.scale.y);
    } else {
      ctx.rotate(this.rotation);
      return ctx.scale(this.scale.x, this.scale.y);
    }
  };

  Entity.prototype.getCurrentState = function() {
    return {
      pos: this.pos.clone(),
      scale: this.scale.clone(),
      rotation: this.rotation
    };
  };

  return Entity;

})(EventReceiver);

var Node,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Node = (function(_super) {
  __extends(Node, _super);

  function Node(args) {
    if (args == null) {
      args = {};
    }
    Node.__super__.constructor.call(this, args);
    this.children = args.children || [];
  }

  Node.prototype.clear = function() {
    Node.__super__.clear.call(this);
    return this.children = [];
  };

  Node.prototype.attach = function(entityOrController) {
    var entity;
    if (entityOrController instanceof Controller) {
      Node.__super__.attach.call(this, entityOrController);
      return;
    }
    entity = entityOrController;
    entity.parent = this;
    return this.children.push(entity);
  };

  Node.prototype.detach = function(entityOrController) {
    var entity;
    if (entityOrController instanceof Controller) {
      Node.__super__.detach.call(this, entityOrController);
      return;
    }
    entity = entityOrController;
    entity.parent = null;
    return this.children = this.children.filter(function(i) {
      return i !== entity;
    });
  };

  Node.prototype.update = function(delta) {
    var child, _i, _len, _ref, _results;
    Node.__super__.update.call(this, delta);
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.update(delta));
    }
    return _results;
  };

  Node.prototype.intersects = function(p) {};

  Node.prototype.broadcast = function(event) {
    var child, _i, _len, _ref, _results;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.callEventListeners(event);
      if (child instanceof Node) {
        _results.push(child.broadcast(event));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Node.prototype.render = function(canvas, ctx) {
    var child, _i, _len, _ref, _results;
    Node.__super__.render.call(this, canvas, ctx);
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child.hidden) {
        continue;
      }
      ctx.save();
      child.render(canvas, ctx);
      _results.push(ctx.restore());
    }
    return _results;
  };

  return Node;

})(Entity);

var Shape,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Shape = (function(_super) {
  __extends(Shape, _super);

  function Shape(args) {
    if (args == null) {
      args = {};
    }
    Shape.__super__.constructor.call(this, args);
    this.color = args.color || null;
    this.stroke = args.stroke || null;
    this.lineWidth = args.lineWidth || 1;
  }

  Shape.prototype.intersectsDot = function(x, y) {};

  return Shape;

})(Entity);

var Circle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle(args) {
    if (args == null) {
      args = {};
    }
    Circle.__super__.constructor.call(this, args);
    this.radius = args.radius || 0;
  }

  Circle.prototype.render = function(canvas, ctx) {
    Circle.__super__.render.call(this, canvas, ctx);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    if (this.color) {
      ctx.fillStyle = this.color.toString();
      ctx.fill();
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.toString();
      ctx.lineWidth = this.lineWidth;
      return ctx.stroke();
    }
  };

  Circle.prototype.intersects = function(p) {
    var d, pos, xDist, yDist;
    pos = this.getAbsPos();
    xDist = Math.abs(p.x - pos.x);
    yDist = Math.abs(p.y - pos.y);
    d = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return d < this.radius;
  };

  return Circle;

})(Shape);

var ProgressArc,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ProgressArc = (function(_super) {
  __extends(ProgressArc, _super);

  function ProgressArc(args) {
    if (args == null) {
      args = {};
    }
    ProgressArc.__super__.constructor.call(this, args);
    this.radius = args.radius || 10;
    this.percent = args.percent || 1;
  }

  ProgressArc.prototype.render = function(canvas, ctx) {
    var endAngle, startAngle;
    ProgressArc.__super__.render.call(this, canvas, ctx);
    startAngle = 1.5 * Math.PI;
    endAngle = startAngle - (this.percent * Math.PI * 2);
    ctx.beginPath();
    ctx.arc(0, -this.lineWidth / 2, this.radius, startAngle, endAngle, false);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color.toString();
    return ctx.stroke();
  };

  return ProgressArc;

})(Shape);

var Rectangle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Rectangle = (function(_super) {
  __extends(Rectangle, _super);

  function Rectangle(args) {
    if (args == null) {
      args = {};
    }
    Rectangle.__super__.constructor.call(this, args);
    this.w = args.w;
    this.h = args.h;
    this.radius = args.radius || 0;
  }

  Rectangle.prototype.intersects = function(p) {
    return this.intersectsXY(p.x, p.y);
  };

  Rectangle.prototype.intersectsXY = function(x, y) {
    var bottom, left, pos, right, top;
    pos = this.getAbsPos();
    left = pos.x - this.w / 2;
    top = pos.y - this.h / 2;
    bottom = top + this.h;
    right = left + this.w;
    return x > left && x < right && y > top && y < bottom;
  };

  Rectangle.prototype.render = function(canvas, ctx) {
    Rectangle.__super__.render.call(this, canvas, ctx);
    if (this.radius) {
      return this.renderRounded(canvas, ctx);
    } else {
      return this.renderStandard(canvas, ctx);
    }
  };

  Rectangle.prototype.renderStandard = function(canvas, ctx) {
    if (this.color) {
      ctx.fillStyle = this.color.toString();
      ctx.fillRect(this.w / -2, this.h / -2, this.w, this.h);
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.toString();
      ctx.lineWidth = this.lineWidth;
      return ctx.strokeRect(this.w / -2, this.h / -2, this.w, this.h);
    }
  };

  Rectangle.prototype.renderRounded = function(canvas, ctx) {
    var h, r, w, x, y;
    w = this.w;
    h = this.h;
    x = w / -2;
    y = h / -2;
    r = this.radius;
    ctx.beginPath();
    ctx.moveTo(x + r[0], y);
    ctx.arcTo(x + w, y, x + w, y + h, r[1]);
    ctx.arcTo(x + w, y + h, x, y + h, r[2]);
    ctx.arcTo(x, y + h, x, y, r[3]);
    ctx.arcTo(x, y, x + w, y, r[0]);
    ctx.closePath();
    if (this.color) {
      ctx.fillStyle = this.color.toString();
      ctx.fill();
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.toString();
      ctx.lineWidth = this.lineWidth;
      return ctx.stroke();
    }
  };

  return Rectangle;

})(Shape);

var Polygon,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Polygon = (function(_super) {
  __extends(Polygon, _super);

  function Polygon(args) {
    if (args == null) {
      args = {};
    }
    Polygon.__super__.constructor.call(this, args);
    this.closePath = args.closePath || false;
    this.vertices = args.vertices || [];
  }

  Polygon.prototype.render = function(canvas, ctx) {
    var vertex, _i, _len, _ref;
    Polygon.__super__.render.call(this, canvas, ctx);
    ctx.beginPath();
    _ref = this.vertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertex = _ref[_i];
      ctx.lineTo(vertex.x, vertex.y);
    }
    if (this.closePath) {
      ctx.closePath();
    }
    if (this.color) {
      ctx.fillStyle = this.color.toString();
      ctx.fill();
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.toString();
      ctx.lineWidth = this.lineWidth;
      return ctx.stroke();
    }
  };

  return Polygon;

})(Shape);

var Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Line = (function(_super) {
  __extends(Line, _super);

  function Line(args) {
    if (args == null) {
      args = {};
    }
    Line.__super__.constructor.call(this, args);
    this.to = args.to;
  }

  Line.prototype.render = function(canvas, ctx) {
    Line.__super__.render.call(this, canvas, ctx);
    ctx.strokeStyle = this.color.toString();
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.to.x, this.to.y);
    return ctx.stroke();
  };

  return Line;

})(Shape);

var Text,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Text = (function(_super) {
  __extends(Text, _super);

  function Text(args) {
    if (args == null) {
      args = {};
    }
    args.color = args.color || APP.fgColor.clone();
    Text.__super__.constructor.call(this, args);
    this.text = args.text || '';
    this.textAlign = args.textAlign || 'center';
    this.textBaseline = args.textBaseline || 'middle';
    this.fontSize = args.fontSize || APP.fontSize;
    this.font = args.font || APP.font;
    this.alpha = args.alpha;
  }

  Text.prototype.render = function(canvas, ctx) {
    Text.__super__.render.call(this, canvas, ctx);
    ctx.font = this.fontSize + 'px ' + this.font;
    ctx.textAlign = this.textAlign;
    ctx.textBaseline = this.textBaseline;
    ctx.lineWidth = this.lineWidth;
    if (this.color) {
      ctx.fillStyle = this.color.toString();
      ctx.fillText(this.text, 0, 0);
    }
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.toString();
      return ctx.strokeText(this.text, 0, 0);
    }
  };

  return Text;

})(Shape);

var Img,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Img = (function(_super) {
  __extends(Img, _super);

  Img.cache = {};

  Img.PATH = 'assets/images';

  function Img(args) {
    var cache, src;
    if (args == null) {
      args = {};
    }
    Img.__super__.constructor.call(this, args);
    src = args.src;
    this.w = args.w;
    this.h = args.h;
    cache = this.constructor.cache;
    if (cache.hasOwnProperty(src)) {
      this.img = cache[src];
    } else {
      this.img = new Image();
      this.img.src = Img.PATH + '/' + src;
      cache[src] = this.img;
    }
  }

  Img.prototype.intersects = function(p) {
    return this.intersectsXY(p.x, p.y);
  };

  Img.prototype.intersectsXY = function(x, y) {
    var bottom, left, pos, right, top;
    pos = this.getAbsPos();
    left = pos.x - this.w / 2;
    top = pos.y - this.h / 2;
    bottom = top + this.h;
    right = left + this.w;
    return x > left && x < right && y > top && y < bottom;
  };

  Img.prototype.render = function(canvas, ctx) {
    var h, w;
    Img.__super__.render.call(this, canvas, ctx);
    if (!this.img.width && this.img.height) {
      return;
    }
    w = this.w || this.img.width;
    h = this.w || this.img.height;
    return ctx.drawImage(this.img, w / -2, h / -2, w, h);
  };

  return Img;

})(Entity);


/*
Easie.coffee (https://github.com/jimjeffers/Easie)
Project created by J. Jeffers

Robert Penner's Easing Equations in CoffeeScript
http://robertpenner.com/easing/

DISCLAIMER: Software provided as is with no warranty of any type.
Don't do bad things with this :)
 */
this.Easie = (function() {
  function Easie() {}

  Easie.backIn = function(time, begin, change, duration, overshoot) {
    if (overshoot == null) {
      overshoot = 1.70158;
    }
    return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
  };

  Easie.backOut = function(time, begin, change, duration, overshoot) {
    if (overshoot == null) {
      overshoot = 1.70158;
    }
    return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;
  };

  Easie.backInOut = function(time, begin, change, duration, overshoot) {
    if (overshoot == null) {
      overshoot = 1.70158;
    }
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
    } else {
      return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;
    }
  };

  Easie.bounceOut = function(time, begin, change, duration) {
    if ((time /= duration) < 1 / 2.75) {
      return change * (7.5625 * time * time) + begin;
    } else if (time < 2 / 2.75) {
      return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
    } else if (time < 2.5 / 2.75) {
      return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
    } else {
      return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
    }
  };

  Easie.bounceIn = function(time, begin, change, duration) {
    return change - Easie.bounceOut(duration - time, 0, change, duration) + begin;
  };

  Easie.bounceInOut = function(time, begin, change, duration) {
    if (time < duration / 2) {
      return Easie.bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
    } else {
      return Easie.bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
    }
  };

  Easie.circIn = function(time, begin, change, duration) {
    return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
  };

  Easie.circOut = function(time, begin, change, duration) {
    return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
  };

  Easie.circInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
    } else {
      return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
    }
  };

  Easie.cubicIn = function(time, begin, change, duration) {
    return change * (time /= duration) * time * time + begin;
  };

  Easie.cubicOut = function(time, begin, change, duration) {
    return change * ((time = time / duration - 1) * time * time + 1) + begin;
  };

  Easie.cubicInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time * time + begin;
    } else {
      return change / 2 * ((time -= 2) * time * time + 2) + begin;
    }
  };

  Easie.elasticOut = function(time, begin, change, duration, amplitude, period) {
    var overshoot;
    if (amplitude == null) {
      amplitude = null;
    }
    if (period == null) {
      period = null;
    }
    if (time === 0) {
      return begin;
    } else if ((time = time / duration) === 1) {
      return begin + change;
    } else {
      if (period == null) {
        period = duration * 0.3;
      }
      if ((amplitude == null) || amplitude < Math.abs(change)) {
        amplitude = change;
        overshoot = period / 4;
      } else {
        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
      }
      return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
    }
  };

  Easie.elasticIn = function(time, begin, change, duration, amplitude, period) {
    var overshoot;
    if (amplitude == null) {
      amplitude = null;
    }
    if (period == null) {
      period = null;
    }
    if (time === 0) {
      return begin;
    } else if ((time = time / duration) === 1) {
      return begin + change;
    } else {
      if (period == null) {
        period = duration * 0.3;
      }
      if ((amplitude == null) || amplitude < Math.abs(change)) {
        amplitude = change;
        overshoot = period / 4;
      } else {
        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
      }
      time -= 1;
      return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;
    }
  };

  Easie.elasticInOut = function(time, begin, change, duration, amplitude, period) {
    var overshoot;
    if (amplitude == null) {
      amplitude = null;
    }
    if (period == null) {
      period = null;
    }
    if (time === 0) {
      return begin;
    } else if ((time = time / (duration / 2)) === 2) {
      return begin + change;
    } else {
      if (period == null) {
        period = duration * (0.3 * 1.5);
      }
      if ((amplitude == null) || amplitude < Math.abs(change)) {
        amplitude = change;
        overshoot = period / 4;
      } else {
        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
      }
      if (time < 1) {
        return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
      } else {
        return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
      }
    }
  };

  Easie.expoIn = function(time, begin, change, duration) {
    if (time === 0) {
      return begin;
    }
    return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
  };

  Easie.expoOut = function(time, begin, change, duration) {
    if (time === duration) {
      return begin + change;
    }
    return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
  };

  Easie.expoInOut = function(time, begin, change, duration) {
    if (time === 0) {
      return begin;
    } else if (time === duration) {
      return begin + change;
    } else if ((time = time / (duration / 2)) < 1) {
      return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
    } else {
      return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
    }
  };

  Easie.linearNone = function(time, begin, change, duration) {
    return change * time / duration + begin;
  };

  Easie.linearIn = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };

  Easie.linearOut = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };

  Easie.linearInOut = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };

  Easie.quadIn = function(time, begin, change, duration) {
    return change * (time = time / duration) * time + begin;
  };

  Easie.quadOut = function(time, begin, change, duration) {
    return -change * (time = time / duration) * (time - 2) + begin;
  };

  Easie.quadInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time + begin;
    } else {
      return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
    }
  };

  Easie.quartIn = function(time, begin, change, duration) {
    return change * (time = time / duration) * time * time * time + begin;
  };

  Easie.quartOut = function(time, begin, change, duration) {
    return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
  };

  Easie.quartInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time * time * time + begin;
    } else {
      return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
    }
  };

  Easie.quintIn = function(time, begin, change, duration) {
    return change * (time = time / duration) * time * time * time * time + begin;
  };

  Easie.quintOut = function(time, begin, change, duration) {
    return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
  };

  Easie.quintInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time * time * time * time + begin;
    } else {
      return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
    }
  };

  Easie.sineIn = function(time, begin, change, duration) {
    return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
  };

  Easie.sineOut = function(time, begin, change, duration) {
    return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
  };

  Easie.sineInOut = function(time, begin, change, duration) {
    return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
  };

  return Easie;

})();

var Animation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Animation = (function(_super) {
  __extends(Animation, _super);

  function Animation(args) {
    if (args == null) {
      args = {};
    }
    this.current = 0;
    this.duration = args.duration || 0;
    this.paused = true;
    this.f = args.f || Easie.linearNone;
    this.onDone = args.onDone || null;
  }

  Animation.prototype.pause = function() {
    this.paused = true;
    return this;
  };

  Animation.prototype.play = function(onDone) {
    if (onDone == null) {
      onDone = null;
    }
    if (onDone) {
      this.onDone = onDone;
    }
    this.paused = false;
    return this;
  };

  Animation.prototype.stop = function() {
    this.paused = true;
    this.current = 0;
    return this;
  };

  Animation.prototype.update = function(delta) {
    if (this.paused) {
      return;
    }
    this.current += delta;
    if (this.current > this.duration) {
      this.current = this.duration;
    }
    this.step();
    if (this.current === this.duration) {
      this.stop();
      if (this.onDone) {
        return this.onDone();
      }
    }
  };

  return Animation;

})(Controller);

var StateAnimation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

StateAnimation = (function(_super) {
  __extends(StateAnimation, _super);

  function StateAnimation(args) {
    if (args == null) {
      args = {};
    }
    StateAnimation.__super__.constructor.call(this, args);
    this.state1 = args.state1 || {};
    this.state2 = args.state2 || {};
  }

  StateAnimation.prototype.step = function() {
    var change, changeX, changeY;
    if (this.state2.pos !== void 0) {
      changeX = this.state2.pos.x - this.state1.pos.x;
      changeY = this.state2.pos.y - this.state1.pos.y;
      this.parent.pos.x = this.f(this.current, this.state1.pos.x, changeX, this.duration);
      this.parent.pos.y = this.f(this.current, this.state1.pos.y, changeY, this.duration);
    }
    if (this.state2.scale !== void 0) {
      changeX = this.state2.scale.x - this.state1.scale.x;
      changeY = this.state2.scale.y - this.state1.scale.y;
      this.parent.scale.x = this.f(this.current, this.state1.scale.x, changeX, this.duration);
      this.parent.scale.y = this.f(this.current, this.state1.scale.y, changeY, this.duration);
    }
    if (this.state2.rotation !== void 0) {
      change = this.state2.rotation - this.state1.rotation;
      return this.parent.rotation = this.f(this.current, this.state1.rotation, change, this.duration);
    }
  };

  return StateAnimation;

})(Animation);

var ValueAnimation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ValueAnimation = (function(_super) {
  __extends(ValueAnimation, _super);

  function ValueAnimation(args) {
    if (args == null) {
      args = {};
    }
    ValueAnimation.__super__.constructor.call(this, args);
    this.from = args.from || 0;
    this.to = args.to || 0;
    this.onUpdate = args.onUpdate;
  }

  ValueAnimation.prototype.step = function() {
    var value;
    value = this.f(this.current, this.from, this.to - this.from, this.duration);
    return this.onUpdate(value);
  };

  return ValueAnimation;

})(Animation);

var PulseAnimation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PulseAnimation = (function(_super) {
  __extends(PulseAnimation, _super);

  function PulseAnimation() {
    PulseAnimation.__super__.constructor.call(this, {
      state1: {
        scale: new Vector(0.7, 0.7)
      },
      state2: {
        scale: new Vector(1, 1)
      },
      f: Easie.elasticOut,
      duration: 1
    });
  }

  return PulseAnimation;

})(StateAnimation);

var MinimizeAnimation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MinimizeAnimation = (function(_super) {
  __extends(MinimizeAnimation, _super);

  function MinimizeAnimation() {
    MinimizeAnimation.__super__.constructor.call(this, {
      state1: {
        scale: new Vector(1, 1)
      },
      state2: {
        scale: new Vector(0, 0)
      },
      f: Easie.linearNone,
      duration: 0.3
    });
  }

  return MinimizeAnimation;

})(StateAnimation);

var ColorFader,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ColorFader = (function(_super) {
  __extends(ColorFader, _super);

  function ColorFader(args) {
    if (args == null) {
      args = {};
    }
    ColorFader.__super__.constructor.call(this, args);
    this.color = args.color || new Color;
    this.from = args.from || new Color;
    this.to = args.to || new Color;
  }

  ColorFader.prototype.step = function() {
    var b, g, r;
    r = this.f(this.current, this.from.r, this.to.r - this.from.r, this.duration);
    g = this.f(this.current, this.from.g, this.to.g - this.from.g, this.duration);
    b = this.f(this.current, this.from.b, this.to.b - this.from.b, this.duration);
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return this.color.set(r, g, b);
  };

  return ColorFader;

})(Animation);

var InputHandler;

InputHandler = (function() {
  function InputHandler() {
    this.inputs = [];
  }

  InputHandler.prototype.update = function(delta) {
    var input, _i, _len, _ref;
    _ref = this.inputs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      input = _ref[_i];
      APP.broadcast(input);
    }
    return this.inputs.length = 0;
  };

  InputHandler.prototype.queue = function(event) {
    return this.inputs.push(event);
  };

  return InputHandler;

})();

var KeyboardInputHandler,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

KeyboardInputHandler = (function(_super) {
  __extends(KeyboardInputHandler, _super);

  function KeyboardInputHandler() {
    KeyboardInputHandler.__super__.constructor.call(this);
    document.addEventListener('keydown', (function(_this) {
      return function(ev) {
        return _this.queue({
          type: 'keydown',
          keyCode: ev.keyCode
        });
      };
    })(this));
    document.addEventListener('keyup', (function(_this) {
      return function(ev) {
        return _this.queue({
          type: 'keyup',
          keyCode: ev.keyCode
        });
      };
    })(this));
  }

  return KeyboardInputHandler;

})(InputHandler);

var MouseInputHandler,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MouseInputHandler = (function(_super) {
  __extends(MouseInputHandler, _super);

  function MouseInputHandler(args) {
    var getPos;
    if (args == null) {
      args = {};
    }
    MouseInputHandler.__super__.constructor.call(this);
    getPos = function(ev) {
      return new Vector(ev.offsetX - APP.w / 2, ev.offsetY - APP.h / 2);
    };
    APP.canvas.addEventListener('mousedown', (function(_this) {
      return function(ev) {
        ev.preventDefault();
        return _this.queue({
          type: 'mousedown',
          pos: getPos(ev)
        });
      };
    })(this));
    APP.canvas.addEventListener('mouseup', (function(_this) {
      return function(ev) {
        return _this.queue({
          type: 'mouseup',
          pos: getPos(ev)
        });
      };
    })(this));
    APP.canvas.addEventListener('mousemove', (function(_this) {
      return function(ev) {
        return _this.queue({
          type: 'mousemove',
          pos: getPos(ev)
        });
      };
    })(this));
    APP.canvas.addEventListener('mousewheel', (function(_this) {
      return function(ev) {
        if (APP.fullscreen) {
          ev.preventDefault();
        }
        return _this.queue({
          type: 'mousewheel',
          nativeEvent: ev
        });
      };
    })(this));
  }

  return MouseInputHandler;

})(InputHandler);

var TouchInputHandler,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TouchInputHandler = (function(_super) {
  __extends(TouchInputHandler, _super);

  function TouchInputHandler() {
    var getPos;
    TouchInputHandler.__super__.constructor.call(this);
    getPos = function(ev) {
      var ret;
      ret = new Vector(touchEvent.offsetX - APP.w / 2, touchEvent.offsetY - APP.h / 2);
      return ret;
    };
    APP.canvas.addEventListener('touchstart', (function(_this) {
      return function(ev) {
        var touchEvent, _i, _len, _ref, _results;
        if (APP.fullscreen) {
          ev.preventDefault();
        }
        _ref = ev.changedTouches;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          touchEvent = _ref[_i];
          _results.push(_this.queue({
            type: 'touchstart',
            pos: getPos(ev),
            nativeEvent: ev
          }));
        }
        return _results;
      };
    })(this));
    APP.canvas.addEventListener('touchmove', (function(_this) {
      return function(ev) {
        var touchEvent, _i, _len, _ref, _results;
        _ref = ev.changedTouches;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          touchEvent = _ref[_i];
          _results.push(_this.queue({
            type: 'touchmove',
            pos: getPos(ev),
            nativeEvent: ev
          }));
        }
        return _results;
      };
    })(this));
    APP.canvas.addEventListener('touchend', (function(_this) {
      return function(ev) {
        return _this.queue({
          type: 'touchend',
          pos: new Vector(0, 0)
        });
      };
    })(this));
    APP.canvas.addEventListener('touchend', (function(_this) {
      return function(ev) {
        return ev.preventDefault();
      };
    })(this));
  }

  return TouchInputHandler;

})(InputHandler);

var TouchGestureDetector,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TouchGestureDetector = (function(_super) {
  __extends(TouchGestureDetector, _super);

  function TouchGestureDetector() {
    TouchGestureDetector.__super__.constructor.call(this);
    this.lastTouchStart = null;
    this.preventTap = false;
    this.lastMag = null;
    this.twoFingerSwipeDetected = true;
    this.on('touchstart', (function(_this) {
      return function(event) {
        _this.lastTouchStart = event.pos.clone();
        _this.preventTap = false;
        _this.oldP1 = null;
        return _this.oldP2 = null;
      };
    })(this));
    this.on('touchend', (function(_this) {
      return function(event) {
        if (_this.lastTouchStart && !_this.preventTap) {
          APP.broadcast({
            type: 'tap',
            pos: _this.lastTouchStart.clone()
          });
        }
        _this.lastTouchStart = null;
        return _this.lastMag = null;
      };
    })(this));
    this.on('touchmove', (function(_this) {
      return function(event) {
        var len, pos;
        if (_this.lastTouchStart === null) {
          return;
        }
        if (event.nativeEvent.touches.length > 1) {
          return;
        }
        pos = event.pos.clone();
        len = Vector.sub(pos, _this.lastTouchStart).mag();
        if (len > 10) {
          _this.preventTap = true;
          return APP.broadcast({
            type: 'touchdrag',
            pos: pos,
            start: _this.lastTouchStart.clone()
          });
        }
      };
    })(this));
    this.on('touchmove', (function(_this) {
      return function(event) {
        var d1, d2, direction, p1, p2, t1, t2;
        if (event.nativeEvent.touches.length < 2) {
          return;
        }
        _this.preventTap = true;
        t1 = event.nativeEvent.touches[0];
        t2 = event.nativeEvent.touches[1];
        p1 = new Vector(t1.pageX, t1.pageY);
        p2 = new Vector(t2.pageX, t2.pageY);
        if (_this.oldP1 == null) {
          _this.oldP1 = p1;
        }
        if (_this.oldP2 == null) {
          _this.oldP2 = p2;
        }
        d1 = Vector.sub(p1, _this.oldP1);
        d2 = Vector.sub(p2, _this.oldP2);
        _this.oldP1 = p1;
        _this.oldP2 = p2;
        direction = null;
        if (d1.x > 0 && d2.x > 0) {
          direction = 'right';
        } else if (d1.x < 0 && d2.x < 0) {
          direction = 'left';
        }
        if (direction === null) {
          _this.twoFingerSwipeDetected = false;
          return;
        } else {
          _this.twoFingerSwipeDetected = true;
        }
        return APP.broadcast({
          type: 'twoFingerSwipe',
          direction: direction,
          d1: d1,
          d2: d2
        });
      };
    })(this));
    this.on('touchmove', (function(_this) {
      return function(event) {
        var d, delta, mag, p1, p2, t1, t2;
        if (event.nativeEvent.touches.length < 2) {
          return;
        }
        if (_this.twoFingerSwipeDetected) {
          return;
        }
        _this.preventTap = true;
        t1 = event.nativeEvent.touches[0];
        t2 = event.nativeEvent.touches[1];
        p1 = new Vector(t1.pageX, t1.pageY);
        p2 = new Vector(t2.pageX, t2.pageY);
        d = Vector.sub(p1, p2);
        mag = d.mag();
        if (_this.lastMag == null) {
          _this.lastMag = mag;
        }
        delta = mag - _this.lastMag;
        _this.lastMag = mag;
        return APP.broadcast({
          type: 'zoom',
          delta: delta
        });
      };
    })(this));
  }

  return TouchGestureDetector;

})(EventReceiver);

var MouseGestureDetector,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MouseGestureDetector = (function(_super) {
  __extends(MouseGestureDetector, _super);

  function MouseGestureDetector() {
    MouseGestureDetector.__super__.constructor.call(this);
    this.lastMouseDownPos = null;
    this.preventClick = false;
    this.on('mousedown', (function(_this) {
      return function(event) {
        _this.lastMouseDownPos = event.pos.clone();
        return _this.preventClick = false;
      };
    })(this));
    this.on('mouseup', (function(_this) {
      return function(event) {
        if (_this.lastMouseDownPos && !_this.preventClick) {
          APP.broadcast({
            type: 'click',
            pos: _this.lastMouseDownPos.clone()
          });
        }
        return _this.lastMouseDownPos = null;
      };
    })(this));
    this.on('mousemove', (function(_this) {
      return function(event) {
        var len, pos;
        if (!_this.lastMouseDownPos) {
          return;
        }
        pos = event.pos.clone();
        len = Vector.sub(pos, _this.lastMouseDownPos).mag();
        if (len > 10) {
          _this.preventClick = true;
          return APP.broadcast({
            type: 'mousedrag',
            pos: pos,
            start: _this.lastMouseDownPos.clone()
          });
        }
      };
    })(this));
  }

  return MouseGestureDetector;

})(EventReceiver);

var DEBUG, DebugDisplay,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DEBUG = function(text) {
  return APP.debug.setText(text);
};

DebugDisplay = (function(_super) {
  __extends(DebugDisplay, _super);

  function DebugDisplay() {
    var FONT_SIZE;
    DebugDisplay.__super__.constructor.call(this, {
      pos: new Vector(-APP.w / 2, APP.h / 2)
    });
    this.color = APP.fgColor.clone();
    this.STAY_TIME = 4;
    FONT_SIZE = 20;
    this.text = new Text({
      alpha: 0,
      text: '',
      textAlign: 'left',
      pos: new Vector(0, -FONT_SIZE / 2),
      font: 'Monospace',
      fontSize: FONT_SIZE,
      color: this.color
    });
    this.fader = new ValueAnimation({
      f: Easie.linearNone,
      duration: 4,
      onUpdate: (function(_this) {
        return function(value) {
          return _this.text.alpha = value;
        };
      })(this)
    });
    this.attach(this.text);
    this.text.attach(this.fader);
  }

  DebugDisplay.prototype.setText = function(text) {
    this.fader.stop();
    this.fader.from = 1;
    this.fader.to = 0;
    this.fader.play();
    return this.text.text = text;
  };

  return DebugDisplay;

})(Node);

var Background;

Background = (function() {
  function Background(args) {
    if (args == null) {
      args = {};
    }
    this.color = args.color || new Color(0, 0, 255);
  }

  Background.prototype.render = function(canvas, ctx) {
    var left, top;
    left = -APP.w / 2;
    top = -APP.h / 2;
    ctx.fillStyle = this.color.toString();
    return ctx.fillRect(left, top, APP.w, APP.h);
  };

  return Background;

})();

var Camera,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Camera = (function(_super) {
  __extends(Camera, _super);

  function Camera(args) {
    if (args == null) {
      args = {};
    }
    Camera.__super__.constructor.call(this, args);
    this.id = 'camera';
    this.zoom = args.zoom || 1;
    this.minZoom = args.minZoom || 0.1;
    this.maxZoom = args.maxZoom || 10;
    this.zoomer = new ValueAnimation({
      f: Easie.cubicOut,
      duration: 0.5,
      onUpdate: (function(_this) {
        return function(value) {
          return _this.setZoom(value);
        };
      })(this)
    });
    this.mover = new StateAnimation({
      duration: 0.5,
      f: Easie.cubicOut,
      state1: {
        pos: new Vector(0, 0)
      },
      state2: {
        pos: new Vector(0, 0)
      }
    });
    this.attach(this.zoomer);
    this.attach(this.mover);
  }

  Camera.prototype.setZoom = function(zoom) {
    if (zoom > this.maxZoom) {
      zoom = this.maxZoom;
    }
    if (zoom < this.minZoom) {
      zoom = this.minZoom;
    }
    return this.zoom = zoom;
  };

  Camera.prototype.zoomTo = function(zoom, onDone) {
    if (onDone == null) {
      onDone = null;
    }
    this.zoomer.from = this.zoom;
    this.zoomer.to = zoom;
    this.zoomer.stop();
    return this.zoomer.play(onDone);
  };

  Camera.prototype.panTo = function(pos) {
    this.mover.state1.pos.copy(this.pos);
    this.mover.state2.pos.copy(pos);
    this.mover.stop();
    return this.mover.play();
  };

  return Camera;

})(Node);

var Application,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Application = (function(_super) {
  __extends(Application, _super);

  function Application(args) {
    var blurred;
    if (args == null) {
      args = {};
    }
    this.frame = __bind(this.frame, this);
    Application.__super__.constructor.call(this, args);
    this.fgColor = args.fgColor || new Color(255, 255, 255);
    this.bgColor = args.bgColor || new Color(0, 0, 255);
    this.font = args.font || 'Helvetica';
    this.fontSize = args.fontSize || 16;
    this.camera = args.camera || new Camera;
    this.background = args.background || new Background({
      color: this.bgColor
    });
    this.fullscreen = Boolean(args.fullscreen);
    window.APP = this;
    this.EJECTA = typeof ejecta !== "undefined";
    this.canvas = document.getElementById('canvas');
    blurred = false;
    this.ctx = this.canvas.getContext('2d');
    this.w = this.fullscreen ? window.innerWidth : this.canvas.offsetWidth;
    this.h = this.fullscreen ? window.innerHeight : this.canvas.offsetHeight;
    this.touch = new TouchInputHandler;
    this.mouse = new MouseInputHandler;
    this.keyboard = new KeyboardInputHandler;
    this.touchGestureDetector = new TouchGestureDetector;
    this.mouseGestureDetector = new MouseGestureDetector;
    this.debug = new DebugDisplay;
    this.camera.attach(this.debug);
    if (!this.EJECTA) {
      this.retinaCanvasHack();
      window.onresize = (function(_this) {
        return function() {
          return _this.retinaCanvasHack();
        };
      })(this);
      window.onfocus = (function(_this) {
        return function() {
          _this.blurred = false;
          _this.last = null;
          return _this.frame();
        };
      })(this);
      window.onblur = (function(_this) {
        return function() {
          return _this.blurred = true;
        };
      })(this);
    }
  }

  Application.prototype.screenToWorld = function(p) {
    var ret;
    ret = Vector.add(p, this.camera.pos);
    return ret.scale(1 / this.camera.zoom);
  };

  Application.prototype.worldToScreen = function(p) {
    var ret;
    ret = p.clone();
    ret.scale(this.camera.zoom);
    return ret.sub(this.camera.pos);
  };

  Application.prototype.broadcast = function(event) {
    this.callEventListeners(event);
    this.touchGestureDetector.callEventListeners(event);
    this.mouseGestureDetector.callEventListeners(event);
    this.camera.callEventListeners(event);
    this.callEventListeners(event);
    this.camera.broadcast(event);
    return Application.__super__.broadcast.call(this, event);
  };

  Application.prototype.retinaCanvasHack = function() {
    this.scaleFactor = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.canvas.width = this.w * this.scaleFactor;
    this.canvas.height = this.h * this.scaleFactor;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    return this.ctx.scale(this.scaleFactor, this.scaleFactor);
  };

  Application.prototype.update = function() {
    var delta, now;
    now = new Date().getTime();
    delta = this.last ? (now - this.last) / 1000 : 0;
    this.mouse.update(delta);
    this.touch.update(delta);
    this.keyboard.update(delta);
    this.camera.update(delta);
    Application.__super__.update.call(this, delta);
    return this.last = now;
  };

  Application.prototype.render = function() {
    this.ctx.save();
    this.ctx.translate(this.w / 2, this.h / 2);
    this.background.render(this.canvas, this.ctx);
    this.ctx.translate(-this.camera.pos.x, -this.camera.pos.y);
    this.ctx.save();
    this.ctx.scale(this.camera.zoom, this.camera.zoom);
    Application.__super__.render.call(this, this.canvas, this.ctx);
    this.ctx.restore();
    this.camera.render(this.canvas, this.ctx);
    return this.ctx.restore();
  };

  Application.prototype.start = function() {
    this.broadcast({
      type: 'start'
    });
    return this.frame();
  };

  Application.prototype.frame = function() {
    if (this.blurred) {
      return;
    }
    this.update();
    this.render();
    return requestAnimationFrame(this.frame);
  };

  return Application;

})(Node);

var LocalStorage;

LocalStorage = (function() {
  function LocalStorage() {}

  LocalStorage["delete"] = function(args) {
    return localStorage.removeItem(args.key);
  };

  LocalStorage.set = function(args) {
    var item;
    item = JSON.stringify(args.value);
    return localStorage.setItem(args.key, item);
  };

  LocalStorage.get = function(args) {
    var item;
    item = localStorage.getItem(args.key);
    if (item) {
      item = JSON.parse(item);
    } else {
      item = args["default"];
    }
    return item;
  };

  return LocalStorage;

})();

var ScreenAnchors,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ScreenAnchors = (function(_super) {
  __extends(ScreenAnchors, _super);

  function ScreenAnchors() {
    ScreenAnchors.__super__.constructor.call(this, {
      id: 'anchors'
    });
    this.top = new Node({
      id: 'top',
      pos: new Vector(0, -(APP.h / 2))
    });
    this.bottom = new Node({
      id: 'bottom',
      pos: new Vector(0, APP.h / 2)
    });
    this.left = new Node({
      id: 'left',
      pos: new Vector(-(APP.w / 2), 0)
    });
    this.right = new Node({
      id: 'right',
      pos: new Vector(APP.w / 2, 0)
    });
    this.topLeft = new Node({
      id: 'top-left',
      pos: new Vector(this.left.pos.x, this.top.pos.y)
    });
    this.topRight = new Node({
      id: 'top-right',
      pos: new Vector(this.right.pos.x, this.top.pos.y)
    });
    this.bottomLeft = new Node({
      id: 'bottom-left',
      pos: new Vector(this.left.pos.x, this.bottom.pos.y)
    });
    this.bottomRight = new Node({
      id: 'bottom-right',
      pos: new Vector(this.right.pos.x, this.bottom.pos.y)
    });
    this.attach(this.left);
    this.attach(this.right);
    this.attach(this.top);
    this.attach(this.bottom);
    this.attach(this.topLeft);
    this.attach(this.topRight);
    this.attach(this.bottomLeft);
    this.attach(this.bottomRight);
  }

  return ScreenAnchors;

})(Node);
