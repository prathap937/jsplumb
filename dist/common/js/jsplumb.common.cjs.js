'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.PerimeterAnchorShapes = void 0;
(function (PerimeterAnchorShapes) {
  PerimeterAnchorShapes["Circle"] = "Circle";
  PerimeterAnchorShapes["Ellipse"] = "Ellipse";
  PerimeterAnchorShapes["Triangle"] = "Triangle";
  PerimeterAnchorShapes["Diamond"] = "Diamond";
  PerimeterAnchorShapes["Rectangle"] = "Rectangle";
  PerimeterAnchorShapes["Square"] = "Square";
})(exports.PerimeterAnchorShapes || (exports.PerimeterAnchorShapes = {}));
exports.AnchorLocations = void 0;
(function (AnchorLocations) {
  AnchorLocations["Assign"] = "Assign";
  AnchorLocations["AutoDefault"] = "AutoDefault";
  AnchorLocations["Bottom"] = "Bottom";
  AnchorLocations["BottomLeft"] = "BottomLeft";
  AnchorLocations["BottomRight"] = "BottomRight";
  AnchorLocations["Center"] = "Center";
  AnchorLocations["Continuous"] = "Continuous";
  AnchorLocations["ContinuousBottom"] = "ContinuousBottom";
  AnchorLocations["ContinuousLeft"] = "ContinuousLeft";
  AnchorLocations["ContinuousRight"] = "ContinuousRight";
  AnchorLocations["ContinuousTop"] = "ContinuousTop";
  AnchorLocations["ContinuousLeftRight"] = "ContinuousLeftRight";
  AnchorLocations["ContinuousTopBottom"] = "ContinuousTopBottom";
  AnchorLocations["Left"] = "Left";
  AnchorLocations["Perimeter"] = "Perimeter";
  AnchorLocations["Right"] = "Right";
  AnchorLocations["Top"] = "Top";
  AnchorLocations["TopLeft"] = "TopLeft";
  AnchorLocations["TopRight"] = "TopRight";
})(exports.AnchorLocations || (exports.AnchorLocations = {}));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function noSuchPoint() {
  return {
    d: Infinity,
    x: null,
    y: null,
    l: null,
    x1: null,
    y1: null,
    x2: null,
    y2: null
  };
}
function EMPTY_BOUNDS() {
  return {
    xmin: Infinity,
    xmax: -Infinity,
    ymin: Infinity,
    ymax: -Infinity
  };
}
var defaultSegmentHandler = {
  boxIntersection: function boxIntersection(handler, segment, x, y, w, h) {
    var a = [];
    a.push.apply(a, handler.lineIntersection(segment, x, y, x + w, y));
    a.push.apply(a, handler.lineIntersection(segment, x + w, y, x + w, y + h));
    a.push.apply(a, handler.lineIntersection(segment, x + w, y + h, x, y + h));
    a.push.apply(a, handler.lineIntersection(segment, x, y + h, x, y));
    return a;
  },
  boundingBoxIntersection: function boundingBoxIntersection(handler, segment, box) {
    return this.boxIntersection(handler, segment, box.x, box.y, box.w, box.h);
  },
  lineIntersection: function lineIntersection(handler, x1, y1, x2, y2) {
    return [];
  },
  findClosestPointOnPath: function findClosestPointOnPath(handler, segment, x, y) {
    return noSuchPoint();
  }
};
var AbstractSegment =
function AbstractSegment(params) {
  _classCallCheck(this, AbstractSegment);
  this.params = params;
  _defineProperty(this, "x1", void 0);
  _defineProperty(this, "x2", void 0);
  _defineProperty(this, "y1", void 0);
  _defineProperty(this, "y2", void 0);
  _defineProperty(this, "extents", EMPTY_BOUNDS());
  _defineProperty(this, "type", void 0);
  this.x1 = params.x1;
  this.y1 = params.y1;
  this.x2 = params.x2;
  this.y2 = params.y2;
}
;

var UNDEFINED = "undefined";
var DEFAULT = "default";
var TRUE = "true";
var FALSE = "false";
var WILDCARD = "*";

exports.AbstractSegment = AbstractSegment;
exports.DEFAULT = DEFAULT;
exports.EMPTY_BOUNDS = EMPTY_BOUNDS;
exports.FALSE = FALSE;
exports.TRUE = TRUE;
exports.UNDEFINED = UNDEFINED;
exports.WILDCARD = WILDCARD;
exports.defaultSegmentHandler = defaultSegmentHandler;
