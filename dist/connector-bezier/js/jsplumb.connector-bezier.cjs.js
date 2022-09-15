'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('@jsplumb/util');
var core = require('@jsplumb/core');
var common = require('@jsplumb/common');

function _compute(connector, paintInfo, p, _computeBezier) {
  var sp = p.sourcePos,
      tp = p.targetPos,
      _w = Math.abs(sp.curX - tp.curX),
      _h = Math.abs(sp.curY - tp.curY);
  if (!connector.showLoopback || p.sourceEndpoint.elementId !== p.targetEndpoint.elementId) {
    connector.isLoopbackCurrently = false;
    _computeBezier(connector, paintInfo, p, sp, tp, _w, _h);
  } else {
    connector.isLoopbackCurrently = true;
    var x1 = p.sourcePos.curX,
        y1 = p.sourcePos.curY - connector.margin,
        cx = x1,
        cy = y1 - connector.loopbackRadius,
    _x = cx - connector.loopbackRadius,
        _y = cy - connector.loopbackRadius;
    _w = 2 * connector.loopbackRadius;
    _h = 2 * connector.loopbackRadius;
    paintInfo.points[0] = _x;
    paintInfo.points[1] = _y;
    paintInfo.points[2] = _w;
    paintInfo.points[3] = _h;
    core._addSegment(connector, core.SEGMENT_TYPE_ARC, {
      loopback: true,
      x1: x1 - _x + 4,
      y1: y1 - _y,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      r: connector.loopbackRadius,
      ac: !connector.clockwise,
      x2: x1 - _x - 4,
      y2: y1 - _y,
      cx: cx - _x,
      cy: cy - _y
    });
  }
}
function createBezierConnectorBase(type, connection, params, defaultStubs) {
  var base = core.createConnectorBase(type, connection, params, defaultStubs);
  params = params || {};
  var bezier = util.extend(base, {
    showLoopback: params.showLoopback !== false,
    curviness: params.curviness || 10,
    margin: params.margin || 5,
    proximityLimit: params.proximityLimit || 80,
    clockwise: params.orientation && params.orientation === "clockwise",
    loopbackRadius: params.loopbackRadius || 25,
    isLoopbackCurrently: false
  });
  return bezier;
}

var Vectors = {
  subtract: function subtract(v1, v2) {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y
    };
  },
  dotProduct: function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  },
  square: function square(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  },
  scale: function scale(v, s) {
    return {
      x: v.x * s,
      y: v.y * s
    };
  }
};
var maxRecursion = 64;
var flatnessTolerance = Math.pow(2.0, -maxRecursion - 1);
function distanceFromCurve(point, curve) {
  var candidates = [],
      w = _convertToBezier(point, curve),
      degree = curve.length - 1,
      higherDegree = 2 * degree - 1,
      numSolutions = _findRoots(w, higherDegree, candidates, 0),
      v = Vectors.subtract(point, curve[0]),
      dist = Vectors.square(v),
      t = 0.0,
      newDist;
  for (var i = 0; i < numSolutions; i++) {
    v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
    newDist = Vectors.square(v);
    if (newDist < dist) {
      dist = newDist;
      t = candidates[i];
    }
  }
  v = Vectors.subtract(point, curve[degree]);
  newDist = Vectors.square(v);
  if (newDist < dist) {
    dist = newDist;
    t = 1.0;
  }
  return {
    location: t,
    distance: dist
  };
}
function nearestPointOnCurve(point, curve) {
  var td = distanceFromCurve(point, curve);
  return {
    point: _bezier(curve, curve.length - 1, td.location, null, null),
    location: td.location
  };
}
function _convertToBezier(point, curve) {
  var degree = curve.length - 1,
      higherDegree = 2 * degree - 1,
      c = [],
      d = [],
      cdTable = [],
      w = [],
      z = [[1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0]];
  for (var i = 0; i <= degree; i++) {
    c[i] = Vectors.subtract(curve[i], point);
  }
  for (var _i = 0; _i <= degree - 1; _i++) {
    d[_i] = Vectors.subtract(curve[_i + 1], curve[_i]);
    d[_i] = Vectors.scale(d[_i], 3.0);
  }
  for (var row = 0; row <= degree - 1; row++) {
    for (var column = 0; column <= degree; column++) {
      if (!cdTable[row]) cdTable[row] = [];
      cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
    }
  }
  for (var _i2 = 0; _i2 <= higherDegree; _i2++) {
    if (!w[_i2]) {
      w[_i2] = [];
    }
    w[_i2].y = 0.0;
    w[_i2].x = parseFloat("" + _i2) / higherDegree;
  }
  var n = degree,
      m = degree - 1;
  for (var k = 0; k <= n + m; k++) {
    var lb = Math.max(0, k - m),
        ub = Math.min(k, n);
    for (var _i3 = lb; _i3 <= ub; _i3++) {
      var j = k - _i3;
      w[_i3 + j].y += cdTable[j][_i3] * z[j][_i3];
    }
  }
  return w;
}
function _findRoots(w, degree, t, depth) {
  var left = [],
      right = [],
      left_count,
      right_count,
      left_t = [],
      right_t = [];
  switch (_getCrossingCount(w, degree)) {
    case 0:
      {
        return 0;
      }
    case 1:
      {
        if (depth >= maxRecursion) {
          t[0] = (w[0].x + w[degree].x) / 2.0;
          return 1;
        }
        if (_isFlatEnough(w, degree)) {
          t[0] = _computeXIntercept(w, degree);
          return 1;
        }
        break;
      }
  }
  _bezier(w, degree, 0.5, left, right);
  left_count = _findRoots(left, degree, left_t, depth + 1);
  right_count = _findRoots(right, degree, right_t, depth + 1);
  for (var i = 0; i < left_count; i++) {
    t[i] = left_t[i];
  }
  for (var _i4 = 0; _i4 < right_count; _i4++) {
    t[_i4 + left_count] = right_t[_i4];
  }
  return left_count + right_count;
}
function _getCrossingCount(curve, degree) {
  var n_crossings = 0,
      sign,
      old_sign;
  sign = old_sign = util.sgn(curve[0].y);
  for (var i = 1; i <= degree; i++) {
    sign = util.sgn(curve[i].y);
    if (sign != old_sign) n_crossings++;
    old_sign = sign;
  }
  return n_crossings;
}
function _isFlatEnough(curve, degree) {
  var error, intercept_1, intercept_2, left_intercept, right_intercept, a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
  a = curve[0].y - curve[degree].y;
  b = curve[degree].x - curve[0].x;
  c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;
  var max_distance_above, max_distance_below;
  max_distance_above = max_distance_below = 0.0;
  for (var i = 1; i < degree; i++) {
    var value = a * curve[i].x + b * curve[i].y + c;
    if (value > max_distance_above) {
      max_distance_above = value;
    } else if (value < max_distance_below) {
      max_distance_below = value;
    }
  }
  a1 = 0.0;
  b1 = 1.0;
  c1 = 0.0;
  a2 = a;
  b2 = b;
  c2 = c - max_distance_above;
  det = a1 * b2 - a2 * b1;
  dInv = 1.0 / det;
  intercept_1 = (b1 * c2 - b2 * c1) * dInv;
  a2 = a;
  b2 = b;
  c2 = c - max_distance_below;
  det = a1 * b2 - a2 * b1;
  dInv = 1.0 / det;
  intercept_2 = (b1 * c2 - b2 * c1) * dInv;
  left_intercept = Math.min(intercept_1, intercept_2);
  right_intercept = Math.max(intercept_1, intercept_2);
  error = right_intercept - left_intercept;
  return error < flatnessTolerance ? 1 : 0;
}
function _computeXIntercept(curve, degree) {
  var XLK = 1.0,
      YLK = 0.0,
      XNM = curve[degree].x - curve[0].x,
      YNM = curve[degree].y - curve[0].y,
      XMK = curve[0].x - 0.0,
      YMK = curve[0].y - 0.0,
      det = XNM * YLK - YNM * XLK,
      detInv = 1.0 / det,
      S = (XNM * YMK - YNM * XMK) * detInv;
  return 0.0 + XLK * S;
}
function _bezier(curve, degree, t, left, right) {
  var temp = [[]];
  for (var j = 0; j <= degree; j++) {
    temp[0][j] = curve[j];
  }
  for (var i = 1; i <= degree; i++) {
    for (var _j = 0; _j <= degree - i; _j++) {
      if (!temp[i]) temp[i] = [];
      if (!temp[i][_j]) temp[i][_j] = {};
      temp[i][_j].x = (1.0 - t) * temp[i - 1][_j].x + t * temp[i - 1][_j + 1].x;
      temp[i][_j].y = (1.0 - t) * temp[i - 1][_j].y + t * temp[i - 1][_j + 1].y;
    }
  }
  if (left != null) {
    for (var _j2 = 0; _j2 <= degree; _j2++) {
      left[_j2] = temp[_j2][0];
    }
  }
  if (right != null) {
    for (var _j3 = 0; _j3 <= degree; _j3++) {
      right[_j3] = temp[degree - _j3][_j3];
    }
  }
  return temp[degree][0];
}
function _getLUT(steps, curve) {
  var out = [];
  steps--;
  for (var n = 0; n <= steps; n++) {
    out.push(_computeLookup(n / steps, curve));
  }
  return out;
}
function _computeLookup(e, curve) {
  var EMPTY_POINT = {
    x: 0,
    y: 0
  };
  if (e === 0) {
    return curve[0];
  }
  var degree = curve.length - 1;
  if (e === 1) {
    return curve[degree];
  }
  var o = curve;
  var s = 1 - e;
  if (degree === 0) {
    return curve[0];
  }
  if (degree === 1) {
    return {
      x: s * o[0].x + e * o[1].x,
      y: s * o[0].y + e * o[1].y
    };
  }
  if (4 > degree) {
    var l = s * s,
        h = e * e,
        u = 0,
        m,
        g,
        f;
    if (degree === 2) {
      o = [o[0], o[1], o[2], EMPTY_POINT];
      m = l;
      g = 2 * (s * e);
      f = h;
    } else if (degree === 3) {
      m = l * s;
      g = 3 * (l * e);
      f = 3 * (s * h);
      u = e * h;
    }
    return {
      x: m * o[0].x + g * o[1].x + f * o[2].x + u * o[3].x,
      y: m * o[0].y + g * o[1].y + f * o[2].y + u * o[3].y
    };
  } else {
    return EMPTY_POINT;
  }
}
function computeBezierLength(curve) {
  var length = 0;
  if (!isPoint(curve)) {
    var steps = 16;
    var lut = _getLUT(steps, curve);
    for (var i = 0; i < steps - 1; i++) {
      var a = lut[i],
          b = lut[i + 1];
      length += dist(a, b);
    }
  }
  return length;
}
var _curveFunctionCache = new Map();
function _getCurveFunctions(order) {
  var fns = _curveFunctionCache.get(order);
  if (!fns) {
    fns = [];
    var f_term = function f_term() {
      return function (t) {
        return Math.pow(t, order);
      };
    },
        l_term = function l_term() {
      return function (t) {
        return Math.pow(1 - t, order);
      };
    },
        c_term = function c_term(c) {
      return function (t) {
        return c;
      };
    },
        t_term = function t_term() {
      return function (t) {
        return t;
      };
    },
        one_minus_t_term = function one_minus_t_term() {
      return function (t) {
        return 1 - t;
      };
    },
        _termFunc = function _termFunc(terms) {
      return function (t) {
        var p = 1;
        for (var i = 0; i < terms.length; i++) {
          p = p * terms[i](t);
        }
        return p;
      };
    };
    fns.push(f_term());
    for (var i = 1; i < order; i++) {
      var terms = [c_term(order)];
      for (var j = 0; j < order - i; j++) {
        terms.push(t_term());
      }
      for (var _j4 = 0; _j4 < i; _j4++) {
        terms.push(one_minus_t_term());
      }
      fns.push(_termFunc(terms));
    }
    fns.push(l_term());
    _curveFunctionCache.set(order, fns);
  }
  return fns;
}
function pointOnCurve(curve, location) {
  var cc = _getCurveFunctions(curve.length - 1),
      _x = 0,
      _y = 0;
  for (var i = 0; i < curve.length; i++) {
    _x = _x + curve[i].x * cc[i](location);
    _y = _y + curve[i].y * cc[i](location);
  }
  return {
    x: _x,
    y: _y
  };
}
function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function isPoint(curve) {
  return curve[0].x === curve[1].x && curve[0].y === curve[1].y;
}
function pointAlongPath(curve, location, distance) {
  if (isPoint(curve)) {
    return {
      point: curve[0],
      location: location
    };
  }
  var prev = pointOnCurve(curve, location),
      tally = 0,
      curLoc = location,
      direction = distance > 0 ? 1 : -1,
      cur = null;
  while (tally < Math.abs(distance)) {
    curLoc += 0.005 * direction;
    cur = pointOnCurve(curve, curLoc);
    tally += dist(cur, prev);
    prev = cur;
  }
  return {
    point: cur,
    location: curLoc
  };
}
function pointAlongCurveFrom(curve, location, distance) {
  return pointAlongPath(curve, location, distance).point;
}
function locationAlongCurveFrom(curve, location, distance) {
  return pointAlongPath(curve, location, distance).location;
}
function gradientAtPoint(curve, location) {
  var p1 = pointOnCurve(curve, location),
      p2 = pointOnCurve(curve.slice(0, curve.length - 1), location),
      dy = p2.y - p1.y,
      dx = p2.x - p1.x;
  return dy === 0 ? Infinity : Math.atan(dy / dx);
}
function gradientAtPointAlongPathFrom(curve, location, distance) {
  var p = pointAlongPath(curve, location, distance);
  if (p.location > 1) p.location = 1;
  if (p.location < 0) p.location = 0;
  return gradientAtPoint(curve, p.location);
}
function perpendicularToPathAt(curve, location, length, distance) {
  distance = distance == null ? 0 : distance;
  var p = pointAlongPath(curve, location, distance),
      m = gradientAtPoint(curve, p.location),
      _theta2 = Math.atan(-1 / m),
      y = length / 2 * Math.sin(_theta2),
      x = length / 2 * Math.cos(_theta2);
  return [{
    x: p.point.x + x,
    y: p.point.y + y
  }, {
    x: p.point.x - x,
    y: p.point.y - y
  }];
}
function bezierLineIntersection(x1, y1, x2, y2, curve) {
  var a = y2 - y1,
      b = x1 - x2,
      c = x1 * (y1 - y2) + y1 * (x2 - x1),
      coeffs = _computeCoefficients(curve),
      p = [a * coeffs[0][0] + b * coeffs[1][0], a * coeffs[0][1] + b * coeffs[1][1], a * coeffs[0][2] + b * coeffs[1][2], a * coeffs[0][3] + b * coeffs[1][3] + c],
      r = _cubicRoots.apply(null, p),
      intersections = [];
  if (r != null) {
    for (var i = 0; i < 3; i++) {
      var _t = r[i],
          t2 = Math.pow(_t, 2),
          t3 = Math.pow(_t, 3),
          x = {
        x: coeffs[0][0] * t3 + coeffs[0][1] * t2 + coeffs[0][2] * _t + coeffs[0][3],
        y: coeffs[1][0] * t3 + coeffs[1][1] * t2 + coeffs[1][2] * _t + coeffs[1][3]
      };
      var s = void 0;
      if (x2 - x1 !== 0) {
        s = (x[0] - x1) / (x2 - x1);
      } else {
        s = (x[1] - y1) / (y2 - y1);
      }
      if (_t >= 0 && _t <= 1.0 && s >= 0 && s <= 1.0) {
        intersections.push(x);
      }
    }
  }
  return intersections;
}
function boxIntersection(x, y, w, h, curve) {
  var i = [];
  i.push.apply(i, bezierLineIntersection(x, y, x + w, y, curve));
  i.push.apply(i, bezierLineIntersection(x + w, y, x + w, y + h, curve));
  i.push.apply(i, bezierLineIntersection(x + w, y + h, x, y + h, curve));
  i.push.apply(i, bezierLineIntersection(x, y + h, x, y, curve));
  return i;
}
function boundingBoxIntersection(boundingBox, curve) {
  var i = [];
  i.push.apply(i, bezierLineIntersection(boundingBox.x, boundingBox.y, boundingBox.x + boundingBox.w, boundingBox.y, curve));
  i.push.apply(i, bezierLineIntersection(boundingBox.x + boundingBox.w, boundingBox.y, boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h, curve));
  i.push.apply(i, bezierLineIntersection(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h, boundingBox.x, boundingBox.y + boundingBox.h, curve));
  i.push.apply(i, bezierLineIntersection(boundingBox.x, boundingBox.y + boundingBox.h, boundingBox.x, boundingBox.y, curve));
  return i;
}
function _computeCoefficientsForAxis(curve, axis) {
  return [-curve[0][axis] + 3 * curve[1][axis] + -3 * curve[2][axis] + curve[3][axis], 3 * curve[0][axis] - 6 * curve[1][axis] + 3 * curve[2][axis], -3 * curve[0][axis] + 3 * curve[1][axis], curve[0][axis]];
}
function _computeCoefficients(curve) {
  return [_computeCoefficientsForAxis(curve, "x"), _computeCoefficientsForAxis(curve, "y")];
}
function _cubicRoots(a, b, c, d) {
  var A = b / a,
      B = c / a,
      C = d / a,
      Q = (3 * B - Math.pow(A, 2)) / 9,
      R = (9 * A * B - 27 * C - 2 * Math.pow(A, 3)) / 54,
      D = Math.pow(Q, 3) + Math.pow(R, 2),
      S,
      T,
      t = [0, 0, 0];
  if (D >= 0)
    {
      S = util.sgn(R + Math.sqrt(D)) * Math.pow(Math.abs(R + Math.sqrt(D)), 1 / 3);
      T = util.sgn(R - Math.sqrt(D)) * Math.pow(Math.abs(R - Math.sqrt(D)), 1 / 3);
      t[0] = -A / 3 + (S + T);
      t[1] = -A / 3 - (S + T) / 2;
      t[2] = -A / 3 - (S + T) / 2;
      if (Math.abs(Math.sqrt(3) * (S - T) / 2) !== 0) {
        t[1] = -1;
        t[2] = -1;
      }
    } else
    {
      var th = Math.acos(R / Math.sqrt(-Math.pow(Q, 3)));
      t[0] = 2 * Math.sqrt(-Q) * Math.cos(th / 3) - A / 3;
      t[1] = 2 * Math.sqrt(-Q) * Math.cos((th + 2 * Math.PI) / 3) - A / 3;
      t[2] = 2 * Math.sqrt(-Q) * Math.cos((th + 4 * Math.PI) / 3) - A / 3;
    }
  for (var i = 0; i < 3; i++) {
    if (t[i] < 0 || t[i] > 1.0) {
      t[i] = -1;
    }
  }
  return t;
}

var _this = undefined;
function _translateLocation(_curve, location, absolute) {
  if (absolute) {
    location = locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);
  }
  return location;
}
function _pointOnPath(curve, location, absolute) {
  location = _translateLocation(curve, location, absolute);
  return pointOnCurve(curve, location);
}
function _gradientAtPoint(curve, location, absolute) {
  location = _translateLocation(curve, location, absolute);
  return gradientAtPoint(curve, location);
}
function _pointAlongPathFrom(curve, location, distance, absolute) {
  location = _translateLocation(curve, location, absolute);
  return pointAlongCurveFrom(curve, location, distance);
}
function createCubicSegment(params) {
  return {
    type: SEGMENT_TYPE_CUBIC_BEZIER,
    length: 0,
    x1: params.x1,
    x2: params.x2,
    y1: params.y1,
    y2: params.y2,
    cp1x: params.cp1x,
    cp1y: params.cp1y,
    cp2x: params.cp2x,
    cp2y: params.cp2y,
    curve: [{
      x: params.x1,
      y: params.y1
    }, {
      x: params.cp1x,
      y: params.cp1y
    }, {
      x: params.cp2x,
      y: params.cp2y
    }, {
      x: params.x2,
      y: params.y2
    }],
    extents: {
      xmin: Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
      ymin: Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
      xmax: Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
      ymax: Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
    }
  };
}
function createQuadraticSegment(params) {
  return {
    type: SEGMENT_TYPE_QUADRATIC_BEZIER,
    length: 0,
    x1: params.x1,
    x2: params.x2,
    y1: params.y1,
    y2: params.y2,
    cpx: params.cpx,
    cpy: params.cpy,
    curve: [{
      x: params.x1,
      y: params.y1
    }, {
      x: params.cpx,
      y: params.cpy
    }, {
      x: params.x2,
      y: params.y2
    }],
    extents: {
      xmin: Math.min(params.x1, params.x2, params.cpx),
      ymin: Math.min(params.y1, params.y2, params.cpy),
      xmax: Math.max(params.x1, params.x2, params.cpx),
      ymax: Math.max(params.y1, params.y2, params.cpy)
    }
  };
}
var SEGMENT_TYPE_CUBIC_BEZIER = "CubicBezier";
var SEGMENT_TYPE_QUADRATIC_BEZIER = "QuadraticBezier";
var BezierSegmentHandler = {
  pointOnPath: function pointOnPath(segment, location, absolute) {
    return _pointOnPath(segment.curve, location, absolute);
  },
  gradientAtPoint: function gradientAtPoint(segment, location, absolute) {
    return _gradientAtPoint(segment.curve, location, absolute);
  },
  pointAlongPathFrom: function pointAlongPathFrom(segment, location, distance, absolute) {
    return _pointAlongPathFrom(segment.curve, location, distance, absolute);
  },
  getLength: function getLength(segment) {
    return computeBezierLength(segment.curve);
  },
  findClosestPointOnPath: function findClosestPointOnPath(segment, x, y) {
    var p = nearestPointOnCurve({
      x: x,
      y: y
    }, segment.curve);
    return {
      d: Math.sqrt(Math.pow(p.point.x - x, 2) + Math.pow(p.point.y - y, 2)),
      x: p.point.x,
      y: p.point.y,
      l: 1 - p.location,
      s: _this,
      x1: null,
      y1: null,
      x2: null,
      y2: null
    };
  },
  lineIntersection: function lineIntersection(segment, x1, y1, x2, y2) {
    return bezierLineIntersection(x1, y1, x2, y2, segment.curve);
  },
  getPath: function getPath(segment, isFirstSegment) {
    if (segment.type === SEGMENT_TYPE_CUBIC_BEZIER) {
      var cb = segment;
      return (isFirstSegment ? "M " + cb.x2 + " " + cb.y2 + " " : "") + "C " + cb.cp2x + " " + cb.cp2y + " " + cb.cp1x + " " + cb.cp1y + " " + cb.x1 + " " + cb.y1;
    } else if (segment.type === SEGMENT_TYPE_QUADRATIC_BEZIER) {
      var qb = segment;
      return (isFirstSegment ? "M " + qb.x2 + " " + qb.y2 + " " : "") + "Q " + qb.cpx + " " + qb.cpy + " " + qb.x1 + " " + qb.y1;
    }
  },
  create: function create(segmentType, params) {
    if (segmentType === SEGMENT_TYPE_CUBIC_BEZIER) {
      return createCubicSegment(params);
    } else if (segmentType === SEGMENT_TYPE_QUADRATIC_BEZIER) {
      return createQuadraticSegment(params);
    }
  },
  boundingBoxIntersection: function boundingBoxIntersection(segment, box) {
    return common.defaultSegmentHandler.boundingBoxIntersection(this, segment, box);
  },
  boxIntersection: function boxIntersection(s, x, y, w, h) {
    return common.defaultSegmentHandler.boxIntersection(this, s, x, y, w, h);
  }
};
core.Segments.register(SEGMENT_TYPE_CUBIC_BEZIER, BezierSegmentHandler);
core.Segments.register(SEGMENT_TYPE_QUADRATIC_BEZIER, BezierSegmentHandler);

function _segment(x1, y1, x2, y2) {
  if (x1 <= x2 && y2 <= y1) {
    return 1;
  } else if (x1 <= x2 && y1 <= y2) {
    return 2;
  } else if (x2 <= x1 && y2 >= y1) {
    return 3;
  }
  return 4;
}
function _findControlPoint$1(midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
  if (distance <= proximityLimit) {
    return {
      x: midx,
      y: midy
    };
  }
  if (segment === 1) {
    if (sourceEdge.curY <= 0 && targetEdge.curY >= 1) {
      return {
        x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
        y: midy
      };
    } else if (sourceEdge.curX >= 1 && targetEdge.curX <= 0) {
      return {
        x: midx,
        y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
      };
    } else {
      return {
        x: midx + -1 * dx,
        y: midy + -1 * dy
      };
    }
  } else if (segment === 2) {
    if (sourceEdge.curY >= 1 && targetEdge.curY <= 0) {
      return {
        x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
        y: midy
      };
    } else if (sourceEdge.curX >= 1 && targetEdge.curX <= 0) {
      return {
        x: midx,
        y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
      };
    } else {
      return {
        x: midx + dx,
        y: midy + -1 * dy
      };
    }
  } else if (segment === 3) {
    if (sourceEdge.curY >= 1 && targetEdge.curY <= 0) {
      return {
        x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
        y: midy
      };
    } else if (sourceEdge.curX <= 0 && targetEdge.curX >= 1) {
      return {
        x: midx,
        y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
      };
    } else {
      return {
        x: midx + -1 * dx,
        y: midy + -1 * dy
      };
    }
  } else if (segment === 4) {
    if (sourceEdge.curY <= 0 && targetEdge.curY >= 1) {
      return {
        x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
        y: midy
      };
    } else if (sourceEdge.curX <= 0 && targetEdge.curX >= 1) {
      return {
        x: midx,
        y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
      };
    } else {
      return {
        x: midx + dx,
        y: midy + -1 * dy
      };
    }
  }
}
function _computeBezier$1(connector, paintInfo, params, sp, tp, w, h) {
  var _sx = sp.curX < tp.curX ? 0 : w,
      _sy = sp.curY < tp.curY ? 0 : h,
      _tx = sp.curX < tp.curX ? w : 0,
      _ty = sp.curY < tp.curY ? h : 0;
  if (sp.x === 0) {
    _sx -= connector.margin;
  }
  if (sp.x === 1) {
    _sx += connector.margin;
  }
  if (sp.y === 0) {
    _sy -= connector.margin;
  }
  if (sp.y === 1) {
    _sy += connector.margin;
  }
  if (tp.x === 0) {
    _tx -= connector.margin;
  }
  if (tp.x === 1) {
    _tx += connector.margin;
  }
  if (tp.y === 0) {
    _ty -= connector.margin;
  }
  if (tp.y === 1) {
    _ty += connector.margin;
  }
  if (connector.edited !== true) {
    var _midx = (_sx + _tx) / 2,
        _midy = (_sy + _ty) / 2,
        segment = _segment(_sx, _sy, _tx, _ty),
        distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2));
    connector._controlPoint = _findControlPoint$1(_midx, _midy, segment, params.sourcePos, params.targetPos, connector.curviness, connector.curviness, distance, connector.proximityLimit);
  } else {
    connector._controlPoint = connector.geometry.controlPoint;
  }
  var cpx, cpy;
  cpx = connector._controlPoint.x;
  cpy = connector._controlPoint.y;
  connector.geometry = {
    controlPoint: connector._controlPoint,
    source: params.sourcePos,
    target: params.targetPos
  };
  core._addSegment(connector, SEGMENT_TYPE_QUADRATIC_BEZIER, {
    x1: _tx,
    y1: _ty,
    x2: _sx,
    y2: _sy,
    cpx: cpx,
    cpy: cpy
  });
}
var CONNECTOR_TYPE_STATE_MACHINE = "StateMachine";
var CONNECTOR_TYPE_QUADRATIC_BEZIER = "QuadraticBezier";
var StateMachineConnectorHandler = {
  _compute: function _compute$1(connector, paintInfo, p) {
    _compute(connector, paintInfo, p, _computeBezier$1);
  },
  create: function create(connection, connectorType, params) {
    params = params || {};
    var base = createBezierConnectorBase(connectorType, connection, params, [0, 0]);
    return util.extend(base, {
      curviness: params.curviness || 10,
      margin: params.margin || 5,
      proximityLimit: params.proximityLimit || 80,
      clockwise: params.orientation && params.orientation === "clockwise"
    });
  },
  exportGeometry: function exportGeometry(connector) {
    if (connector.geometry == null) {
      return null;
    } else {
      return {
        controlPoint: util.extend({}, connector.geometry.controlPoint),
        source: util.extend({}, connector.geometry.source),
        target: util.extend({}, connector.geometry.target)
      };
    }
  },
  importGeometry: function importGeometry(connector, geometry) {
    if (geometry != null) {
      if (geometry.controlPoint == null) {
        util.log("jsPlumb StateMachine: cannot import geometry; controlPoint missing");
        core.setGeometry(connector, null, true);
        return false;
      }
      if (geometry.source == null || geometry.source.curX == null || geometry.source.curY == null) {
        util.log("jsPlumb StateMachine: cannot import geometry; source missing or malformed");
        core.setGeometry(connector, null, true);
        return false;
      }
      if (geometry.target == null || geometry.target.curX == null || geometry.target.curY == null) {
        util.log("jsPlumb StateMachine: cannot import geometry; target missing or malformed");
        core.setGeometry(connector, null, true);
        return false;
      }
      core.setGeometry(connector, geometry, false);
      return true;
    } else {
      return false;
    }
  },
  transformGeometry: function transformGeometry(connector, g, dx, dy) {
    return {
      controlPoints: [{
        x: g.controlPoints[0].x + dx,
        y: g.controlPoints[0].y + dy
      }, {
        x: g.controlPoints[1].x + dx,
        y: g.controlPoints[1].y + dy
      }],
      source: core.transformAnchorPlacement(g.source, dx, dy),
      target: core.transformAnchorPlacement(g.target, dx, dy)
    };
  },
  setAnchorOrientation: function setAnchorOrientation(connector, idx, orientation) {}
};

var CONNECTOR_TYPE_BEZIER = "Bezier";
var CONNECTOR_TYPE_CUBIC_BEZIER = "CubicBezier";
function _computeBezier(connector, paintInfo, p, sp, tp, _w, _h) {
  var _CP,
      _CP2,
      _sx = sp.curX < tp.curX ? _w : 0,
      _sy = sp.curY < tp.curY ? _h : 0,
      _tx = sp.curX < tp.curX ? 0 : _w,
      _ty = sp.curY < tp.curY ? 0 : _h;
  if (connector.edited !== true) {
    _CP = _findControlPoint(connector, {
      x: _sx,
      y: _sy
    }, sp, tp, paintInfo.so, paintInfo.to);
    _CP2 = _findControlPoint(connector, {
      x: _tx,
      y: _ty
    }, tp, sp, paintInfo.to, paintInfo.so);
  } else {
    _CP = connector.geometry.controlPoints[0];
    _CP2 = connector.geometry.controlPoints[1];
  }
  connector.geometry = {
    controlPoints: [_CP, _CP2],
    source: p.sourcePos,
    target: p.targetPos
  };
  core._addSegment(connector, SEGMENT_TYPE_CUBIC_BEZIER, {
    x1: _sx,
    y1: _sy,
    x2: _tx,
    y2: _ty,
    cp1x: _CP.x,
    cp1y: _CP.y,
    cp2x: _CP2.x,
    cp2y: _CP2.y
  });
}
function _findControlPoint(connector, point, sourceAnchorPosition, targetAnchorPosition, soo, too) {
  var perpendicular = soo[0] !== too[0] || soo[1] === too[1],
      p = {
    x: 0,
    y: 0
  };
  if (!perpendicular) {
    if (soo[0] === 0) {
      p.x = sourceAnchorPosition.curX < targetAnchorPosition.curX ? point.x + connector.minorAnchor : point.x - connector.minorAnchor;
    } else {
      p.x = point.x - connector.majorAnchor * soo[0];
    }
    if (soo[1] === 0) {
      p.y = sourceAnchorPosition.curY < targetAnchorPosition.curY ? point.y + connector.minorAnchor : point.y - connector.minorAnchor;
    } else {
      p.y = point.y + connector.majorAnchor * too[1];
    }
  } else {
    if (too[0] === 0) {
      p.x = targetAnchorPosition.curX < sourceAnchorPosition.curX ? point.x + connector.minorAnchor : point.x - connector.minorAnchor;
    } else {
      p.x = point.x + connector.majorAnchor * too[0];
    }
    if (too[1] === 0) {
      p.y = targetAnchorPosition.curY < sourceAnchorPosition.curY ? point.y + connector.minorAnchor : point.y - connector.minorAnchor;
    } else {
      p.y = point.y + connector.majorAnchor * soo[1];
    }
  }
  return p;
}
var BezierConnectorHandler = {
  _compute: function _compute$1(connector, paintInfo, p) {
    _compute(connector, paintInfo, p, _computeBezier);
  },
  create: function create(connection, connectorType, params) {
    params = params || {};
    var base = createBezierConnectorBase(connectorType, connection, params, [0, 0]);
    return util.extend(base, {
      majorAnchor: params.curviness || 150,
      minorAnchor: 10
    });
  },
  exportGeometry: function exportGeometry(connector) {
    if (connector.geometry == null) {
      return null;
    } else {
      return {
        controlPoints: [util.extend({}, connector.geometry.controlPoints[0]), util.extend({}, connector.geometry.controlPoints[1])],
        source: util.extend({}, connector.geometry.source),
        target: util.extend({}, connector.geometry.target)
      };
    }
  },
  importGeometry: function importGeometry(connector, geometry) {
    if (geometry != null) {
      if (geometry.controlPoints == null || geometry.controlPoints.length != 2) {
        util.log("jsPlumb Bezier: cannot import geometry; controlPoints missing or does not have length 2");
        core.setGeometry(connector, null, true);
        return false;
      }
      if (geometry.controlPoints[0].x == null || geometry.controlPoints[0].y == null || geometry.controlPoints[1].x == null || geometry.controlPoints[1].y == null) {
        util.log("jsPlumb Bezier: cannot import geometry; controlPoints malformed");
        core.setGeometry(connector, null, true);
        return false;
      }
      if (geometry.source == null || geometry.source.curX == null || geometry.source.curY == null) {
        util.log("jsPlumb Bezier: cannot import geometry; source missing or malformed");
        core.setGeometry(connector, null, true);
        return false;
      }
      if (geometry.target == null || geometry.target.curX == null || geometry.target.curY == null) {
        util.log("jsPlumb Bezier: cannot import geometry; target missing or malformed");
        core.setGeometry(connector, null, true);
        return false;
      }
      core.setGeometry(connector, geometry, false);
      return true;
    } else {
      return false;
    }
  },
  transformGeometry: function transformGeometry(connector, g, dx, dy) {
    return {
      controlPoints: [{
        x: g.controlPoints[0].x + dx,
        y: g.controlPoints[0].y + dy
      }, {
        x: g.controlPoints[1].x + dx,
        y: g.controlPoints[1].y + dy
      }],
      source: core.transformAnchorPlacement(g.source, dx, dy),
      target: core.transformAnchorPlacement(g.target, dx, dy)
    };
  },
  setAnchorOrientation: function setAnchorOrientation(connector, idx, orientation) {}
};

core.Connectors.register(CONNECTOR_TYPE_STATE_MACHINE, StateMachineConnectorHandler);
core.Connectors.register(CONNECTOR_TYPE_QUADRATIC_BEZIER, StateMachineConnectorHandler);
core.Connectors.register(CONNECTOR_TYPE_BEZIER, BezierConnectorHandler);
core.Connectors.register(CONNECTOR_TYPE_CUBIC_BEZIER, BezierConnectorHandler);

exports.BezierConnectorHandler = BezierConnectorHandler;
exports.CONNECTOR_TYPE_BEZIER = CONNECTOR_TYPE_BEZIER;
exports.CONNECTOR_TYPE_CUBIC_BEZIER = CONNECTOR_TYPE_CUBIC_BEZIER;
exports.CONNECTOR_TYPE_QUADRATIC_BEZIER = CONNECTOR_TYPE_QUADRATIC_BEZIER;
exports.CONNECTOR_TYPE_STATE_MACHINE = CONNECTOR_TYPE_STATE_MACHINE;
exports.SEGMENT_TYPE_CUBIC_BEZIER = SEGMENT_TYPE_CUBIC_BEZIER;
exports.SEGMENT_TYPE_QUADRATIC_BEZIER = SEGMENT_TYPE_QUADRATIC_BEZIER;
exports.StateMachineConnectorHandler = StateMachineConnectorHandler;
exports._compute = _compute;
exports.bezierLineIntersection = bezierLineIntersection;
exports.boundingBoxIntersection = boundingBoxIntersection;
exports.boxIntersection = boxIntersection;
exports.computeBezierLength = computeBezierLength;
exports.createBezierConnectorBase = createBezierConnectorBase;
exports.dist = dist;
exports.distanceFromCurve = distanceFromCurve;
exports.gradientAtPoint = gradientAtPoint;
exports.gradientAtPointAlongPathFrom = gradientAtPointAlongPathFrom;
exports.isPoint = isPoint;
exports.locationAlongCurveFrom = locationAlongCurveFrom;
exports.nearestPointOnCurve = nearestPointOnCurve;
exports.perpendicularToPathAt = perpendicularToPathAt;
exports.pointAlongCurveFrom = pointAlongCurveFrom;
exports.pointAlongPath = pointAlongPath;
exports.pointOnCurve = pointOnCurve;
