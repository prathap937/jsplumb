var PerimeterAnchorShapes;
(function (PerimeterAnchorShapes) {
  PerimeterAnchorShapes["Circle"] = "Circle";
  PerimeterAnchorShapes["Ellipse"] = "Ellipse";
  PerimeterAnchorShapes["Triangle"] = "Triangle";
  PerimeterAnchorShapes["Diamond"] = "Diamond";
  PerimeterAnchorShapes["Rectangle"] = "Rectangle";
  PerimeterAnchorShapes["Square"] = "Square";
})(PerimeterAnchorShapes || (PerimeterAnchorShapes = {}));
var AnchorLocations;
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
})(AnchorLocations || (AnchorLocations = {}));

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

var UNDEFINED = "undefined";
var DEFAULT = "default";
var TRUE = "true";
var FALSE = "false";
var WILDCARD = "*";

export { AnchorLocations, DEFAULT, EMPTY_BOUNDS, FALSE, PerimeterAnchorShapes, TRUE, UNDEFINED, WILDCARD, defaultSegmentHandler };
