'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('@jsplumb/util');
var common = require('@jsplumb/common');

var endpointComputers = {};
var handlers = {};
var EndpointFactory = {
  get: function get(ep, name, params) {
    var e = handlers[name];
    if (!e) {
      throw {
        message: "jsPlumb: unknown endpoint type '" + name + "'"
      };
    } else {
      return e.create(ep, params);
    }
  },
  clone: function clone(epr) {
    var handler = handlers[epr.type];
    return EndpointFactory.get(epr.endpoint, epr.type, handler.getParams(epr));
  },
  compute: function compute(endpoint, anchorPoint, orientation, endpointStyle) {
    var c = endpointComputers[endpoint.type];
    if (c != null) {
      return c(endpoint, anchorPoint, orientation, endpointStyle);
    } else {
      util.log("jsPlumb: cannot find endpoint calculator for endpoint of type ", endpoint.type);
    }
  },
  registerHandler: function registerHandler(eph) {
    handlers[eph.type] = eph;
    endpointComputers[eph.type] = eph.compute;
  }
};

function cls() {
  for (var _len = arguments.length, className = new Array(_len), _key = 0; _key < _len; _key++) {
    className[_key] = arguments[_key];
  }
  return className.map(function (cn) {
    return "." + cn;
  }).join(",");
}
function classList() {
  for (var _len2 = arguments.length, className = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    className[_key2] = arguments[_key2];
  }
  return className.join(" ");
}
function att() {
  for (var _len3 = arguments.length, attName = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    attName[_key3] = arguments[_key3];
  }
  return attName.map(function (an) {
    return "[" + an + "]";
  }).join(",");
}
var SOURCE = "source";
var TARGET = "target";
var BLOCK = "block";
var NONE = "none";
var SOURCE_INDEX = 0;
var TARGET_INDEX = 1;
var ABSOLUTE = "absolute";
var FIXED = "fixed";
var STATIC = "static";
var ATTRIBUTE_GROUP = "data-jtk-group";
var ATTRIBUTE_MANAGED = "data-jtk-managed";
var ATTRIBUTE_NOT_DRAGGABLE = "data-jtk-not-draggable";
var ATTRIBUTE_TABINDEX = "tabindex";
var ATTRIBUTE_SCOPE = "data-jtk-scope";
var ATTRIBUTE_SCOPE_PREFIX = ATTRIBUTE_SCOPE + "-";
var CHECK_CONDITION = "checkCondition";
var CHECK_DROP_ALLOWED = "checkDropAllowed";
var CLASS_CONNECTOR = "jtk-connector";
var CLASS_CONNECTOR_OUTLINE = "jtk-connector-outline";
var CLASS_CONNECTED = "jtk-connected";
var CLASS_ENDPOINT = "jtk-endpoint";
var CLASS_ENDPOINT_CONNECTED = "jtk-endpoint-connected";
var CLASS_ENDPOINT_FULL = "jtk-endpoint-full";
var CLASS_ENDPOINT_FLOATING = "jtk-floating-endpoint";
var CLASS_ENDPOINT_DROP_ALLOWED = "jtk-endpoint-drop-allowed";
var CLASS_ENDPOINT_DROP_FORBIDDEN = "jtk-endpoint-drop-forbidden";
var CLASS_ENDPOINT_ANCHOR_PREFIX = "jtk-endpoint-anchor";
var CLASS_GROUP_COLLAPSED = "jtk-group-collapsed";
var CLASS_GROUP_EXPANDED = "jtk-group-expanded";
var CLASS_OVERLAY = "jtk-overlay";
var EVENT_ANCHOR_CHANGED = "anchor:changed";
var EVENT_CONNECTION = "connection";
var EVENT_INTERNAL_CONNECTION = "internal.connection";
var EVENT_CONNECTION_DETACHED = "connection:detach";
var EVENT_CONNECTION_MOVED = "connection:move";
var EVENT_CONTAINER_CHANGE = "container:change";
var EVENT_ENDPOINT_REPLACED = "endpoint:replaced";
var EVENT_INTERNAL_ENDPOINT_UNREGISTERED = "internal.endpoint:unregistered";
var EVENT_INTERNAL_CONNECTION_DETACHED = "internal.connection:detached";
var EVENT_MANAGE_ELEMENT = "element:manage";
var EVENT_GROUP_ADDED = "group:added";
var EVENT_GROUP_COLLAPSE = "group:collapse";
var EVENT_GROUP_EXPAND = "group:expand";
var EVENT_GROUP_MEMBER_ADDED = "group:member:added";
var EVENT_GROUP_MEMBER_REMOVED = "group:member:removed";
var EVENT_GROUP_REMOVED = "group:removed";
var EVENT_MAX_CONNECTIONS = "maxConnections";
var EVENT_NESTED_GROUP_ADDED = "group:nested:added";
var EVENT_NESTED_GROUP_REMOVED = "group:nested:removed";
var EVENT_UNMANAGE_ELEMENT = "element:unmanage";
var EVENT_ZOOM = "zoom";
var IS_DETACH_ALLOWED = "isDetachAllowed";
var INTERCEPT_BEFORE_DRAG = "beforeDrag";
var INTERCEPT_BEFORE_DROP = "beforeDrop";
var INTERCEPT_BEFORE_DETACH = "beforeDetach";
var INTERCEPT_BEFORE_START_DETACH = "beforeStartDetach";
var SELECTOR_MANAGED_ELEMENT = att(ATTRIBUTE_MANAGED);
var ERROR_SOURCE_ENDPOINT_FULL = "Cannot establish connection: source endpoint is full";
var ERROR_TARGET_ENDPOINT_FULL = "Cannot establish connection: target endpoint is full";
var ERROR_SOURCE_DOES_NOT_EXIST = "Cannot establish connection: source does not exist";
var ERROR_TARGET_DOES_NOT_EXIST = "Cannot establish connection: target does not exist";
var KEY_CONNECTION_OVERLAYS = "connectionOverlays";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function isFullOverlaySpec(o) {
  return o.type != null && o.options != null;
}
function convertToFullOverlaySpec(spec) {
  var o = null;
  if (util.isString(spec)) {
    o = {
      type: spec,
      options: {}
    };
  } else {
    o = spec;
  }
  o.options.id = o.options.id || util.uuid();
  return o;
}
function createOverlayBase(instance, component, p) {
  p = p || {};
  var id = p.id || util.uuid();
  var cssClass = p.cssClass || "";
  var attributes = p.attributes || {};
  var events = p.events || {};
  var overlayBase = {
    type: null,
    instance: instance,
    id: id,
    cssClass: cssClass,
    attributes: attributes,
    component: component,
    visible: true,
    _listeners: {},
    location: 0.5
  };
  for (var event in events) {
    util.Events.subscribe(overlayBase, event, events[event]);
  }
  Overlays.setLocation(overlayBase, p.location);
  return overlayBase;
}
var Overlays = {
  setLocation: function setLocation(overlay, l) {
    var newLocation = overlay.location == null ? 0.5 : overlay.location;
    if (l != null) {
      try {
        var _l = typeof l === "string" ? parseFloat(l) : l;
        if (!isNaN(_l)) {
          newLocation = _l;
        }
      } catch (e) {
      }
    }
    overlay.location = newLocation;
  },
  setVisible: function setVisible(overlay, v) {
    overlay.visible = v;
    overlay.instance.setOverlayVisible(overlay, v);
  }
};

var overlayMap = {};
var OverlayFactory = {
  get: function get(instance, name, component, params) {
    var c = overlayMap[name];
    if (!c) {
      throw {
        message: "jsPlumb: unknown overlay type '" + name + "'"
      };
    } else {
      return c.create(instance, component, params);
    }
  },
  register: function register(name, overlay) {
    overlayMap[name] = overlay;
  },
  updateFrom: function updateFrom(overlay, d) {
    var handler = overlayMap[overlay.type];
    if (handler) {
      handler.updateFrom(overlay, d);
    }
  },
  draw: function draw(overlay, component, currentConnectionPaintStyle, absolutePosition) {
    var handler = overlayMap[overlay.type];
    if (handler) {
      return handler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition);
    }
  }
};

var TYPE_OVERLAY_LABEL = "Label";
function isLabelOverlay(o) {
  return o.type === TYPE_OVERLAY_LABEL;
}
var LabelOverlayHandler = {
  create: function create(instance, component, options) {
    options = options || {
      label: ""
    };
    var overlayBase = createOverlayBase(instance, component, options);
    var labelOverlay = util.extend(overlayBase, {
      label: options.label,
      labelText: "",
      cachedDimensions: null,
      type: TYPE_OVERLAY_LABEL
    });
    Labels.setLabel(labelOverlay, options.label);
    return labelOverlay;
  },
  draw: function draw(overlay, component, currentConnectionPaintStyle, absolutePosition) {},
  updateFrom: function updateFrom(overlay, d) {
    if (d.label != null) {
      Labels.setLabel(overlay, d.label);
    }
    if (d.location != null) {
      Overlays.setLocation(overlay, d.location);
      overlay.instance.updateLabel(overlay);
    }
  }
};
OverlayFactory.register(TYPE_OVERLAY_LABEL, LabelOverlayHandler);
var Labels = {
  setLabel: function setLabel(overlay, l) {
    overlay.label = l;
    overlay.labelText = null;
    overlay.instance.updateLabel(overlay);
  },
  getLabel: function getLabel(overlay) {
    if (util.isFunction(overlay.label)) {
      return overlay.label(overlay);
    } else {
      return overlay.labelText;
    }
  }
};

var connectorHandlerMap = {};
var defaultConnectorHandler = {
  exportGeometry: function exportGeometry(connector) {
    return connector.geometry;
  },
  importGeometry: function importGeometry(connector, g) {
    connector.geometry = g;
    return true;
  }
};
var Connectors = {
  register: function register(connectorType, connectorHandler) {
    connectorHandlerMap[connectorType] = connectorHandler;
  },
  get: function get(connectorType) {
    var sh = connectorHandlerMap[connectorType];
    if (!sh) {
      throw {
        message: "jsPlumb: no connector handler found for connector type '" + connectorType + "'"
      };
    } else {
      return sh;
    }
  },
  exportGeometry: function exportGeometry(connector) {
    return this.get(connector.type).exportGeometry(connector);
  },
  importGeometry: function importGeometry(connector, g) {
    return this.get(connector.type).importGeometry(connector, g);
  },
  transformGeometry: function transformGeometry(connector, g, dx, dy) {
    return this.get(connector.type).transformGeometry(connector, g, dx, dy);
  },
  create: function create(connection, name, args) {
    return this.get(name).create(connection, name, args);
  },
  setAnchorOrientation: function setAnchorOrientation(connector, idx, orientation) {
    this.get(connector.type).setAnchorOrientation(connector, idx, orientation);
  }
};

var _opposites, _clockwiseOptions, _antiClockwiseOptions;
var FaceValues;
(function (FaceValues) {
  FaceValues["top"] = "top";
  FaceValues["left"] = "left";
  FaceValues["right"] = "right";
  FaceValues["bottom"] = "bottom";
})(FaceValues || (FaceValues = {}));
var TOP = FaceValues.top;
var LEFT = FaceValues.left;
var RIGHT = FaceValues.right;
var BOTTOM = FaceValues.bottom;
var X_AXIS_FACES = [LEFT, RIGHT];
var Y_AXIS_FACES = [TOP, BOTTOM];
var LightweightFloatingAnchor = function () {
  function LightweightFloatingAnchor(instance, element, elementId) {
    _classCallCheck(this, LightweightFloatingAnchor);
    this.instance = instance;
    this.element = element;
    _defineProperty(this, "isFloating", true);
    _defineProperty(this, "isContinuous", void 0);
    _defineProperty(this, "isDynamic", void 0);
    _defineProperty(this, "locations", []);
    _defineProperty(this, "currentLocation", 0);
    _defineProperty(this, "locked", false);
    _defineProperty(this, "cssClass", '');
    _defineProperty(this, "timestamp", null);
    _defineProperty(this, "type", "Floating");
    _defineProperty(this, "id", util.uuid());
    _defineProperty(this, "orientation", [0, 0]);
    _defineProperty(this, "size", void 0);
    this.size = instance.viewport.getPosition(elementId);
    this.locations.push({
      x: 0.5,
      y: 0.5,
      ox: this.orientation[0],
      oy: this.orientation[1],
      offx: 0,
      offy: 0,
      iox: this.orientation[0],
      ioy: this.orientation[1],
      cls: ''
    });
  }
  _createClass(LightweightFloatingAnchor, [{
    key: "_updateOrientationInRouter",
    value: function _updateOrientationInRouter() {
      this.instance.router.setAnchorOrientation(this, [this.locations[0].ox, this.locations[0].oy]);
    }
  }, {
    key: "over",
    value: function over(endpoint) {
      this.orientation = this.instance.router.getEndpointOrientation(endpoint);
      this.locations[0].ox = this.orientation[0];
      this.locations[0].oy = this.orientation[1];
      this._updateOrientationInRouter();
    }
  }, {
    key: "out",
    value: function out() {
      this.orientation = null;
      this.locations[0].ox = this.locations[0].iox;
      this.locations[0].oy = this.locations[0].ioy;
      this._updateOrientationInRouter();
    }
  }]);
  return LightweightFloatingAnchor;
}();
var opposites = (_opposites = {}, _defineProperty(_opposites, TOP, BOTTOM), _defineProperty(_opposites, RIGHT, LEFT), _defineProperty(_opposites, LEFT, RIGHT), _defineProperty(_opposites, BOTTOM, TOP), _opposites);
var clockwiseOptions = (_clockwiseOptions = {}, _defineProperty(_clockwiseOptions, TOP, RIGHT), _defineProperty(_clockwiseOptions, RIGHT, BOTTOM), _defineProperty(_clockwiseOptions, LEFT, TOP), _defineProperty(_clockwiseOptions, BOTTOM, LEFT), _clockwiseOptions);
var antiClockwiseOptions = (_antiClockwiseOptions = {}, _defineProperty(_antiClockwiseOptions, TOP, LEFT), _defineProperty(_antiClockwiseOptions, RIGHT, TOP), _defineProperty(_antiClockwiseOptions, LEFT, BOTTOM), _defineProperty(_antiClockwiseOptions, BOTTOM, RIGHT), _antiClockwiseOptions);
function getDefaultFace(a) {
  return a.faces.length === 0 ? TOP : a.faces[0];
}
function _isFaceAvailable(a, face) {
  return a.faces.indexOf(face) !== -1;
}
function _secondBest(a, edge) {
  return (a.clockwise ? clockwiseOptions : antiClockwiseOptions)[edge];
}
function _lastChoice(a, edge) {
  return (a.clockwise ? antiClockwiseOptions : clockwiseOptions)[edge];
}
function isEdgeSupported(a, edge) {
  return a.lockedAxis == null ? a.lockedFace == null ? _isFaceAvailable(a, edge) === true : a.lockedFace === edge : a.lockedAxis.indexOf(edge) !== -1;
}
function verifyFace(a, edge) {
  if (_isFaceAvailable(a, edge)) {
    return edge;
  } else if (_isFaceAvailable(a, opposites[edge])) {
    return opposites[edge];
  } else {
    var secondBest = _secondBest(a, edge);
    if (_isFaceAvailable(a, secondBest)) {
      return secondBest;
    } else {
      var lastChoice = _lastChoice(a, edge);
      if (_isFaceAvailable(a, lastChoice)) {
        return lastChoice;
      }
    }
  }
  return edge;
}
var _top = {
  x: 0.5,
  y: 0,
  ox: 0,
  oy: -1,
  offx: 0,
  offy: 0
},
    _bottom = {
  x: 0.5,
  y: 1,
  ox: 0,
  oy: 1,
  offx: 0,
  offy: 0
},
    _left = {
  x: 0,
  y: 0.5,
  ox: -1,
  oy: 0,
  offx: 0,
  offy: 0
},
    _right = {
  x: 1,
  y: 0.5,
  ox: 1,
  oy: 0,
  offx: 0,
  offy: 0
},
    _topLeft = {
  x: 0,
  y: 0,
  ox: 0,
  oy: -1,
  offx: 0,
  offy: 0
},
    _topRight = {
  x: 1,
  y: 0,
  ox: 1,
  oy: -1,
  offx: 0,
  offy: 0
},
    _bottomLeft = {
  x: 0,
  y: 1,
  ox: 0,
  oy: 1,
  offx: 0,
  offy: 0
},
    _bottomRight = {
  x: 1,
  y: 1,
  ox: 0,
  oy: 1,
  offx: 0,
  offy: 0
},
    _center = {
  x: 0.5,
  y: 0.5,
  ox: 0,
  oy: 0,
  offx: 0,
  offy: 0
};
var namedValues = {
  "Top": [_top],
  "Bottom": [_bottom],
  "Left": [_left],
  "Right": [_right],
  "TopLeft": [_topLeft],
  "TopRight": [_topRight],
  "BottomLeft": [_bottomLeft],
  "BottomRight": [_bottomRight],
  "Center": [_center],
  "AutoDefault": [_top, _left, _bottom, _right]
};
var namedContinuousValues = {
  "Continuous": {
    faces: [TOP, LEFT, BOTTOM, RIGHT]
  },
  "ContinuousTop": {
    faces: [TOP]
  },
  "ContinuousRight": {
    faces: [RIGHT]
  },
  "ContinuousBottom": {
    faces: [BOTTOM]
  },
  "ContinuousLeft": {
    faces: [LEFT]
  },
  "ContinuousLeftRight": {
    faces: [LEFT, RIGHT]
  },
  "ContinuousTopBottom": {
    faces: [TOP, BOTTOM]
  }
};
function getNamedAnchor(name, params) {
  params = params || {};
  if (name === common.AnchorLocations.Perimeter) {
    return _createPerimeterAnchor(params);
  }
  var a = namedValues[name];
  if (a != null) {
    return _createAnchor(name, util.map(a, function (_a) {
      return util.extend({
        iox: _a.ox,
        ioy: _a.oy
      }, _a);
    }), params);
  }
  a = namedContinuousValues[name];
  if (a != null) {
    return _createContinuousAnchor(name, a.faces, params);
  }
  throw {
    message: "jsPlumb: unknown anchor type '" + name + "'"
  };
}
function _createAnchor(type, locations, params) {
  return {
    type: type,
    locations: locations,
    currentLocation: 0,
    locked: false,
    id: util.uuid(),
    isFloating: false,
    isContinuous: false,
    isDynamic: locations.length > 1,
    timestamp: null,
    cssClass: params.cssClass || ""
  };
}
function createFloatingAnchor(instance, element, elementId) {
  return new LightweightFloatingAnchor(instance, element, elementId);
}
var PROPERTY_CURRENT_FACE = "currentFace";
function _createContinuousAnchor(type, faces, params) {
  var ca = {
    type: type,
    locations: [],
    currentLocation: 0,
    locked: false,
    id: util.uuid(),
    cssClass: params.cssClass || "",
    isFloating: false,
    isContinuous: true,
    timestamp: null,
    faces: params.faces || faces,
    lockedFace: null,
    lockedAxis: null,
    clockwise: !(params.clockwise === false),
    __currentFace: null
  };
  Object.defineProperty(ca, PROPERTY_CURRENT_FACE, {
    get: function get() {
      return this.__currentFace;
    },
    set: function set(f) {
      this.__currentFace = verifyFace(this, f);
    }
  });
  return ca;
}
function isPrimitiveAnchorSpec(sa) {
  return sa.length < 7 && sa.every(util.isNumber) || sa.length === 7 && sa.slice(0, 5).every(util.isNumber) && util.isString(sa[6]);
}
function makeLightweightAnchorFromSpec(spec) {
  if (util.isString(spec)) {
    return getNamedAnchor(spec, null);
  } else if (Array.isArray(spec)) {
    if (isPrimitiveAnchorSpec(spec)) {
      var _spec = spec;
      return _createAnchor(null, [{
        x: _spec[0],
        y: _spec[1],
        ox: _spec[2],
        oy: _spec[3],
        offx: _spec[4] == null ? 0 : _spec[4],
        offy: _spec[5] == null ? 0 : _spec[5],
        iox: _spec[2],
        ioy: _spec[3],
        cls: _spec[6] || ""
      }], {
        cssClass: _spec[6] || ""
      });
    } else {
      var locations = util.map(spec, function (aSpec) {
        if (util.isString(aSpec)) {
          var a = namedValues[aSpec];
          return a != null ? util.extend({
            iox: a[0].ox,
            ioy: a[0].oy,
            cls: ""
          }, a[0]) : null;
        } else if (isPrimitiveAnchorSpec(aSpec)) {
          return {
            x: aSpec[0],
            y: aSpec[1],
            ox: aSpec[2],
            oy: aSpec[3],
            offx: aSpec[4] == null ? 0 : aSpec[4],
            offy: aSpec[5] == null ? 0 : aSpec[5],
            iox: aSpec[2],
            ioy: aSpec[3],
            cls: aSpec[6] || ""
          };
        }
      }).filter(function (ar) {
        return ar != null;
      });
      return _createAnchor("Dynamic", locations, {});
    }
  } else {
    var sa = spec;
    return getNamedAnchor(sa.type, sa.options);
  }
}
function circleGenerator(anchorCount) {
  var r = 0.5,
      step = Math.PI * 2 / anchorCount,
      a = [];
  var current = 0;
  for (var i = 0; i < anchorCount; i++) {
    var x = r + r * Math.sin(current),
        y = r + r * Math.cos(current);
    a.push({
      x: x,
      y: y,
      ox: 0,
      oy: 0,
      offx: 0,
      offy: 0,
      iox: 0,
      ioy: 0,
      cls: ''
    });
    current += step;
  }
  return a;
}
function _path(segments, anchorCount) {
  var anchorsPerFace = anchorCount / segments.length,
      a = [],
      _computeFace = function _computeFace(x1, y1, x2, y2, fractionalLength, ox, oy) {
    anchorsPerFace = anchorCount * fractionalLength;
    var dx = (x2 - x1) / anchorsPerFace,
        dy = (y2 - y1) / anchorsPerFace;
    for (var i = 0; i < anchorsPerFace; i++) {
      a.push({
        x: x1 + dx * i,
        y: y1 + dy * i,
        ox: ox == null ? 0 : ox,
        oy: oy == null ? 0 : oy,
        offx: 0,
        offy: 0,
        iox: 0,
        ioy: 0,
        cls: ''
      });
    }
  };
  for (var i = 0; i < segments.length; i++) {
    _computeFace.apply(null, segments[i]);
  }
  return a;
}
function shapeGenerator(faces, anchorCount) {
  var s = [];
  for (var i = 0; i < faces.length; i++) {
    s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length, faces[i][4], faces[i][5]]);
  }
  return _path(s, anchorCount);
}
function rectangleGenerator(anchorCount) {
  return shapeGenerator([[0, 0, 1, 0, 0, -1], [1, 0, 1, 1, 1, 0], [1, 1, 0, 1, 0, 1], [0, 1, 0, 0, -1, 0]], anchorCount);
}
function diamondGenerator(anchorCount) {
  return shapeGenerator([[0.5, 0, 1, 0.5], [1, 0.5, 0.5, 1], [0.5, 1, 0, 0.5], [0, 0.5, 0.5, 0]], anchorCount);
}
function triangleGenerator(anchorCount) {
  return shapeGenerator([[0.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0.5, 0]], anchorCount);
}
function rotate$1(points, amountInDegrees) {
  var o = [],
      theta = amountInDegrees / 180 * Math.PI;
  for (var i = 0; i < points.length; i++) {
    var _x = points[i].x - 0.5,
        _y = points[i].y - 0.5;
    o.push({
      x: 0.5 + (_x * Math.cos(theta) - _y * Math.sin(theta)),
      y: 0.5 + (_x * Math.sin(theta) + _y * Math.cos(theta)),
      ox: points[i].ox,
      oy: points[i].oy,
      offx: 0,
      offy: 0,
      iox: 0,
      ioy: 0,
      cls: ''
    });
  }
  return o;
}
var anchorGenerators = new Map();
anchorGenerators.set(common.PerimeterAnchorShapes.Circle, circleGenerator);
anchorGenerators.set(common.PerimeterAnchorShapes.Ellipse, circleGenerator);
anchorGenerators.set(common.PerimeterAnchorShapes.Rectangle, rectangleGenerator);
anchorGenerators.set(common.PerimeterAnchorShapes.Square, rectangleGenerator);
anchorGenerators.set(common.PerimeterAnchorShapes.Diamond, diamondGenerator);
anchorGenerators.set(common.PerimeterAnchorShapes.Triangle, triangleGenerator);
function _createPerimeterAnchor(params) {
  params = params || {};
  var anchorCount = params.anchorCount || 60,
      shape = params.shape;
  if (!shape) {
    throw new Error("no shape supplied to Perimeter Anchor type");
  }
  if (!anchorGenerators.has(shape)) {
    throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");
  }
  var da = anchorGenerators.get(shape)(anchorCount);
  if (params.rotation) {
    da = rotate$1(da, params.rotation);
  }
  var a = _createAnchor(common.AnchorLocations.Perimeter, da, params);
  var aa = util.extend(a, {
    shape: shape
  });
  return aa;
}

var TYPE_ID_CONNECTION = "_jsplumb_connection";
var ID_PREFIX_CONNECTION = "_jsPlumb_c";
var TYPE_DESCRIPTOR_CONNECTION = "connection";
var DEFAULT_LABEL_LOCATION_CONNECTION = 0.5;

function prepareEndpoint(conn, existing, index, anchor, element, elementId, endpoint) {
  var e;
  if (existing) {
    conn.endpoints[index] = existing;
    Endpoints.addConnection(existing, conn);
  } else {
    var ep = endpoint || conn.endpointSpec || conn.endpointsSpec[index] || conn.instance.defaults.endpoints[index] || conn.instance.defaults.endpoint;
    var es = conn.endpointStyles[index] || conn.endpointStyle || conn.instance.defaults.endpointStyles[index] || conn.instance.defaults.endpointStyle;
    if (es.fill == null && conn.paintStyle != null) {
      es.fill = conn.paintStyle.stroke;
    }
    if (es.outlineStroke == null && conn.paintStyle != null) {
      es.outlineStroke = conn.paintStyle.outlineStroke;
    }
    if (es.outlineWidth == null && conn.paintStyle != null) {
      es.outlineWidth = conn.paintStyle.outlineWidth;
    }
    var ehs = conn.endpointHoverStyles[index] || conn.endpointHoverStyle || conn.endpointHoverStyle || conn.instance.defaults.endpointHoverStyles[index] || conn.instance.defaults.endpointHoverStyle;
    if (conn.hoverPaintStyle != null) {
      if (ehs == null) {
        ehs = {};
      }
      if (ehs.fill == null) {
        ehs.fill = conn.hoverPaintStyle.stroke;
      }
    }
    var u = conn.uuids ? conn.uuids[index] : null;
    anchor = anchor != null ? anchor : conn.instance.defaults.anchors != null ? conn.instance.defaults.anchors[index] : conn.instance.defaults.anchor;
    e = conn.instance._internal_newEndpoint({
      paintStyle: es,
      hoverPaintStyle: ehs,
      endpoint: ep,
      connections: [conn],
      uuid: u,
      element: element,
      scope: conn.scope,
      anchor: anchor,
      reattachConnections: conn.reattach || conn.instance.defaults.reattachConnections,
      connectionsDetachable: conn.detachable || conn.instance.defaults.connectionsDetachable
    });
    conn.instance._refreshEndpoint(e);
    if (existing == null) {
      e.deleteOnEmpty = true;
    }
    conn.endpoints[index] = e;
  }
  return e;
}
var TYPE_ITEM_ANCHORS = "anchors";
var TYPE_ITEM_CONNECTOR = "connector";
function setPreparedConnector(connection, connector, doNotRepaint, doNotChangeListenerComponent, typeId) {
  if (connection.connector !== connector) {
    var instance = connection.instance;
    var previous,
        previousClasses = "";
    if (connection.connector != null) {
      previous = connection.connector;
      previousClasses = instance.getConnectorClass(connection.connector);
      instance.destroyConnector(connection);
    }
    connection.connector = connector;
    if (typeId) {
      Components.cacheTypeItem(connection, TYPE_ITEM_CONNECTOR, connector, typeId);
    }
    Connections.addClass(connection, previousClasses);
    if (previous != null) {
      var o = connection.overlays;
      for (var i in o) {
        instance.reattachOverlay(o[i], connection);
      }
    }
    if (!doNotRepaint) {
      instance._paintConnection(connection);
    }
  }
}
function createConnection(instance, params) {
  var componentBase = createComponentBase(instance, ID_PREFIX_CONNECTION, TYPE_DESCRIPTOR_CONNECTION, KEY_CONNECTION_OVERLAYS, {}, DEFAULT_LABEL_LOCATION_CONNECTION, params);
  var previousConnection = params.previousConnection;
  var source = params.source;
  var target = params.target;
  var sourceId, targetId;
  if (params.sourceEndpoint) {
    source = params.sourceEndpoint.element;
    sourceId = params.sourceEndpoint.elementId;
  } else {
    sourceId = instance.getId(source);
  }
  if (params.targetEndpoint) {
    target = params.targetEndpoint.element;
    targetId = params.targetEndpoint.elementId;
  } else {
    targetId = instance.getId(target);
  }
  var scope = params.scope;
  var sourceAnchor = params.anchors ? params.anchors[0] : params.anchor;
  var targetAnchor = params.anchors ? params.anchors[1] : params.anchor;
  instance.manage(source);
  instance.manage(target);
  var cParams = {
    cssClass: params.cssClass,
    hoverClass: params.hoverClass,
    "pointer-events": params["pointer-events"],
    overlays: params.overlays
  };
  if (params.type) {
    params.endpoints = params.endpoints || instance._deriveEndpointAndAnchorSpec(params.type).endpoints;
  }
  var endpointSpec = params.endpoint;
  var endpointsSpec = params.endpoints || [null, null];
  var endpointStyle = params.endpointStyle;
  var endpointHoverStyle = params.endpointHoverStyle;
  var endpointStyles = params.endpointStyles || [null, null];
  var endpointHoverStyles = params.endpointHoverStyles || [null, null];
  var paintStyle = params.paintStyle;
  var hoverPaintStyle = params.hoverPaintStyle;
  var uuids = params.uuids;
  var connection = util.extend(componentBase, {
    previousConnection: previousConnection,
    source: source,
    target: target,
    sourceId: sourceId,
    targetId: targetId,
    scope: scope,
    params: cParams,
    lastPaintedAt: null,
    endpointSpec: endpointSpec,
    endpointsSpec: endpointsSpec,
    endpointStyle: endpointStyle,
    endpointHoverStyle: endpointHoverStyle,
    endpointStyles: endpointStyles,
    endpointHoverStyles: endpointHoverStyles,
    paintStyle: paintStyle,
    hoverPaintStyle: hoverPaintStyle,
    uuids: uuids,
    deleted: false,
    idPrefix: ID_PREFIX_CONNECTION,
    typeId: TYPE_ID_CONNECTION,
    defaultOverlayKey: KEY_CONNECTION_OVERLAYS,
    detachable: true,
    reattach: true,
    cost: 1,
    directed: false,
    endpoints: [null, null],
    proxies: []
  });
  Connections.makeEndpoint(connection, true, connection.source, connection.sourceId, sourceAnchor, params.sourceEndpoint);
  Connections.makeEndpoint(connection, false, connection.target, connection.targetId, targetAnchor, params.targetEndpoint);
  if (!connection.scope) {
    connection.scope = connection.endpoints[0].scope;
  }
  if (params.deleteEndpointsOnEmpty != null) {
    connection.endpoints[0].deleteOnEmpty = params.deleteEndpointsOnEmpty;
    connection.endpoints[1].deleteOnEmpty = params.deleteEndpointsOnEmpty;
  }
  var _detachable = instance.defaults.connectionsDetachable;
  if (params.detachable === false) {
    _detachable = false;
  }
  if (connection.endpoints[0].connectionsDetachable === false) {
    _detachable = false;
  }
  if (connection.endpoints[1].connectionsDetachable === false) {
    _detachable = false;
  }
  var _reattach = params.reattach || connection.endpoints[0].reattachConnections || connection.endpoints[1].reattachConnections || instance.defaults.reattachConnections;
  var initialPaintStyle = util.extend({}, connection.endpoints[0].connectorStyle || connection.endpoints[1].connectorStyle || params.paintStyle || instance.defaults.paintStyle);
  Components.appendToDefaultType(connection, {
    detachable: _detachable,
    reattach: _reattach,
    paintStyle: initialPaintStyle,
    hoverPaintStyle: util.extend({}, connection.endpoints[0].connectorHoverStyle || connection.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || instance.defaults.hoverPaintStyle)
  });
  if (params.outlineWidth) {
    initialPaintStyle.outlineWidth = params.outlineWidth;
  }
  if (params.outlineColor) {
    initialPaintStyle.outlineStroke = params.outlineColor;
  }
  if (params.lineWidth) {
    initialPaintStyle.strokeWidth = params.lineWidth;
  }
  if (params.color) {
    initialPaintStyle.stroke = params.color;
  }
  if (!instance._suspendDrawing) {
    var initialTimestamp = instance._suspendedAt || util.uuid();
    instance._paintEndpoint(connection.endpoints[0], {
      timestamp: initialTimestamp
    });
    instance._paintEndpoint(connection.endpoints[1], {
      timestamp: initialTimestamp
    });
  }
  connection.cost = params.cost || connection.endpoints[0].connectionCost;
  connection.directed = params.directed;
  if (params.directed == null) {
    connection.directed = connection.endpoints[0].connectionsDirected;
  }
  var _p = util.extend({}, connection.endpoints[1].parameters);
  util.extend(_p, connection.endpoints[0].parameters);
  util.extend(_p, connection.parameters);
  connection.parameters = _p;
  connection.paintStyleInUse = connection.paintStyle || {};
  Connections.setConnector(connection, connection.endpoints[0].connector || connection.endpoints[1].connector || params.connector || instance.defaults.connector, true);
  var data = params.data == null || !util.isObject(params.data) ? {} : params.data;
  Components.setData(connection, data);
  var _types = [common.DEFAULT, connection.endpoints[0].edgeType, connection.endpoints[1].edgeType, params.type].join(" ");
  if (/[^\s]/.test(_types)) {
    Components.addType(connection, _types, params.data);
  }
  connection.getXY = function () {
    return {
      x: this.connector.x,
      y: this.connector.y
    };
  };
  return connection;
}
var Connections = {
  isReattach: function isReattach(connection, alsoCheckForced) {
    var ra = connection.reattach === true || connection.endpoints[0].reattachConnections === true || connection.endpoints[1].reattachConnections === true;
    var fa = alsoCheckForced ? connection._forceReattach : false;
    return ra || fa;
  },
  isDetachable: function isDetachable(connection, ep) {
    return connection.detachable === false ? false : ep != null ? ep.connectionsDetachable === true : connection.detachable === true;
  },
  setDetachable: function setDetachable(connection, detachable) {
    connection.detachable = detachable === true;
  },
  setReattach: function setReattach(connection, reattach) {
    connection.reattach = reattach === true;
  },
  prepareConnector: function prepareConnector(connection, connectorSpec, typeId) {
    var connectorArgs = {
      cssClass: connection.params.cssClass,
      hoverClass: connection.params.hoverClass,
      "pointer-events": connection.params["pointer-events"]
    },
        connector;
    if (util.isString(connectorSpec)) {
      connector = Connectors.create(connection, connectorSpec, connectorArgs);
    } else {
      var co = connectorSpec;
      connector = Connectors.create(connection, co.type, util.merge(co.options || {}, connectorArgs));
    }
    if (typeId != null) {
      connector.typeId = typeId;
    }
    return connector;
  },
  setConnector: function setConnector(connection, connectorSpec, doNotRepaint, doNotChangeListenerComponent, typeId) {
    var connector = Connections.prepareConnector(connection, connectorSpec, typeId);
    setPreparedConnector(connection, connector, doNotRepaint, doNotChangeListenerComponent, typeId);
  },
  getUuids: function getUuids(connection) {
    return [connection.endpoints[0].uuid, connection.endpoints[1].uuid];
  },
  replaceEndpoint: function replaceEndpoint(connection, idx, endpointDef) {
    var current = connection.endpoints[idx],
        elId = current.elementId,
        ebe = connection.instance.getEndpoints(current.element),
        _idx = ebe.indexOf(current),
        _new = prepareEndpoint(connection, null, idx, null, current.element, elId, endpointDef);
    connection.endpoints[idx] = _new;
    ebe.splice(_idx, 1, _new);
    Endpoints.detachFromConnection(current, connection);
    connection.instance.deleteEndpoint(current);
    connection.instance.fire(EVENT_ENDPOINT_REPLACED, {
      previous: current,
      current: _new
    });
  },
  makeEndpoint: function makeEndpoint(connection, isSource, el, elId, anchor, ep) {
    elId = elId || connection.instance.getId(el);
    return prepareEndpoint(connection, ep, isSource ? 0 : 1, anchor, el);
  },
  applyType: function applyType(connection, t, typeMap) {
    var _connector = null;
    if (t.connector != null) {
      _connector = Components.getCachedTypeItem(connection, TYPE_ITEM_CONNECTOR, typeMap.connector);
      if (_connector == null) {
        _connector = Connections.prepareConnector(connection, t.connector, typeMap.connector);
        Components.cacheTypeItem(connection, TYPE_ITEM_CONNECTOR, _connector, typeMap.connector);
      }
      setPreparedConnector(connection, _connector);
    }
    Components.applyBaseType(connection, t, typeMap);
    if (t.detachable != null) {
      Connections.setDetachable(connection, t.detachable);
    }
    if (t.reattach != null) {
      Connections.setReattach(connection, t.reattach);
    }
    if (t.scope) {
      connection.scope = t.scope;
    }
    var _anchors = null;
    if (t.anchor) {
      _anchors = Components.getCachedTypeItem(connection, TYPE_ITEM_ANCHORS, typeMap.anchor);
      if (_anchors == null) {
        _anchors = [makeLightweightAnchorFromSpec(t.anchor), makeLightweightAnchorFromSpec(t.anchor)];
        Components.cacheTypeItem(connection, TYPE_ITEM_ANCHORS, _anchors, typeMap.anchor);
      }
    } else if (t.anchors) {
      _anchors = this.getCachedTypeItem(TYPE_ITEM_ANCHORS, typeMap.anchors);
      if (_anchors == null) {
        _anchors = [makeLightweightAnchorFromSpec(t.anchors[0]), makeLightweightAnchorFromSpec(t.anchors[1])];
        Components.cacheTypeItem(connection, TYPE_ITEM_ANCHORS, _anchors, typeMap.anchors);
      }
    }
    if (_anchors != null) {
      connection.instance.router.setConnectionAnchors(connection, _anchors);
      if (connection.instance.router.isDynamicAnchor(connection.endpoints[1])) {
        connection.instance.repaint(connection.endpoints[1].element);
      }
    }
    connection.instance.applyConnectorType(connection.connector, t);
  },
  destroy: function destroy(connection) {
    Components.destroy(connection);
    connection.endpoints = null;
    connection.endpointStyles = null;
    connection.source = null;
    connection.target = null;
    connection.instance.destroyConnector(connection);
    connection.connector = null;
    connection.deleted = true;
  },
  setVisible: function setVisible(connection, v) {
    Components._setComponentVisible(connection, v);
    if (connection.connector) {
      connection.instance.setConnectorVisible(connection.connector, v);
    }
    connection.instance._paintConnection(connection);
  },
  addClass: function addClass(connection, c, cascade) {
    Components.addBaseClass(connection, c);
    if (cascade) {
      Endpoints.addClass(connection.endpoints[0], c);
      Endpoints.addClass(connection.endpoints[1], c);
      if (connection.suspendedEndpoint) {
        Endpoints.addClass(connection.suspendedEndpoint, c);
      }
    }
    if (connection.connector) {
      connection.instance.addConnectorClass(connection.connector, c);
    }
  },
  removeClass: function removeClass(connection, c, cascade) {
    Components.removeBaseClass(connection, c);
    if (cascade) {
      Endpoints.removeClass(connection.endpoints[0], c);
      Endpoints.removeClass(connection.endpoints[1], c);
      if (connection.suspendedEndpoint) {
        Endpoints.removeClass(connection.suspendedEndpoint, c);
      }
    }
    if (connection.connector) {
      connection.instance.removeConnectorClass(connection.connector, c);
    }
  },
  isConnection: function isConnection(component) {
    return component._typeDescriptor != null && component._typeDescriptor == TYPE_DESCRIPTOR_CONNECTION;
  },
  create: function create(instance, params) {
    return createConnection(instance, params);
  }
};

function _splitType(t) {
  return t == null ? null : t.split(" ").filter(function (t) {
    return t != null && t.length > 0;
  });
}
function _mapType(map, obj, typeId) {
  for (var i in obj) {
    map[i] = typeId;
  }
}
var CONNECTOR = "connector";
var MERGE_STRATEGY_OVERRIDE = "override";
var CSS_CLASS = "cssClass";
var DEFAULT_TYPE_KEY = "__default";
var ANCHOR = "anchor";
var ANCHORS = "anchors";
var _internalLabelOverlayId = "__label";
var _internalLabelOverlayClass = "jtk-default-label";
var TYPE_ITEM_OVERLAY = "overlay";
var LOCATION_ATTRIBUTE = "labelLocation";
var ACTION_ADD = "add";
var ACTION_REMOVE = "remove";
function _applyTypes(component, params) {
  var td = component._typeDescriptor,
      map = {};
  var defType = component._defaultType;
  var o = util.extend({}, defType);
  _mapType(map, defType, DEFAULT_TYPE_KEY);
  component._types.forEach(function (tid) {
    if (tid !== DEFAULT_TYPE_KEY) {
      var _t = component.instance.getType(tid, td);
      if (_t != null) {
        var overrides = new Set([CONNECTOR, ANCHOR, ANCHORS]);
        if (_t.mergeStrategy === MERGE_STRATEGY_OVERRIDE) {
          for (var k in _t) {
            overrides.add(k);
          }
        }
        o = util.merge(o, _t, [CSS_CLASS], util.setToArray(overrides));
        _mapType(map, _t, tid);
      }
    }
  });
  if (params) {
    o = util.populate(o, params, "_");
  }
  Components.applyType(component, o, map);
}
function _removeTypeCssHelper(component, typeId) {
  var type = component.instance.getType(typeId, component._typeDescriptor);
  if (type != null && type.cssClass) {
    Components.removeClass(component, type.cssClass);
  }
}
function _updateHoverStyle(component) {
  if (component.paintStyle && component.hoverPaintStyle) {
    var mergedHoverStyle = {};
    util.extend(mergedHoverStyle, component.paintStyle);
    util.extend(mergedHoverStyle, component.hoverPaintStyle);
    component.hoverPaintStyle = mergedHoverStyle;
  }
}
var ADD_CLASS_ACTION = "add";
var REMOVE_CLASS_ACTION = "remove";
function _makeLabelOverlay(component, params) {
  var _params = {
    cssClass: params.cssClass,
    id: _internalLabelOverlayId,
    component: component
  },
      mergedParams = util.extend(_params, params);
  return OverlayFactory.get(component.instance, TYPE_OVERLAY_LABEL, component, mergedParams);
}
function _processOverlay(component, o) {
  var _newOverlay = null;
  if (util.isString(o)) {
    _newOverlay = OverlayFactory.get(component.instance, o, component, {});
  } else if (o.type != null && o.options != null) {
    var oa = o;
    var p = util.extend({}, oa.options);
    _newOverlay = OverlayFactory.get(component.instance, oa.type, component, p);
  } else {
    _newOverlay = o;
  }
  _newOverlay.id = _newOverlay.id || util.uuid();
  Components.cacheTypeItem(component, TYPE_ITEM_OVERLAY, _newOverlay, _newOverlay.id);
  component.overlays[_newOverlay.id] = _newOverlay;
  return _newOverlay;
}
function createComponentBase(instance, idPrefix, typeDescriptor, defaultOverlayKey, defaultType, defaultLabelLocation, params) {
  params = params || {};
  var cssClass = params.cssClass || "";
  var hoverClass = params.hoverClass || instance.defaults.hoverClass;
  var beforeDetach = params.beforeDetach;
  var beforeDrop = params.beforeDrop;
  var _types = new Set();
  var _typeCache = {};
  var parameters = util.clone(params.parameters || {});
  var cParams = {};
  var data = {};
  var id = params.id || idPrefix + new Date().getTime();
  var _defaultType = {
    parameters: params.parameters,
    scope: params.scope || instance.defaultScope,
    overlays: {}
  };
  util.extend(_defaultType, defaultType || {});
  var overlays = {};
  var overlayPositions = {};
  var overlayPlacements = {};
  var o = params.overlays || [],
      oo = {};
  if (defaultOverlayKey) {
    var defaultOverlays = instance.defaults[defaultOverlayKey];
    if (defaultOverlays) {
      o.push.apply(o, _toConsumableArray(defaultOverlays));
    }
    for (var i = 0; i < o.length; i++) {
      var fo = convertToFullOverlaySpec(o[i]);
      oo[fo.options.id] = fo;
    }
  }
  _defaultType.overlays = oo;
  if (params.label) {
    _defaultType.overlays[_internalLabelOverlayId] = {
      type: TYPE_OVERLAY_LABEL,
      options: {
        label: params.label,
        location: params.labelLocation || defaultLabelLocation,
        id: _internalLabelOverlayId,
        cssClass: _internalLabelOverlayClass
      }
    };
  }
  return {
    cssClass: cssClass,
    hoverClass: hoverClass,
    beforeDetach: beforeDetach,
    beforeDrop: beforeDrop,
    _typeDescriptor: typeDescriptor,
    _types: _types,
    _typeCache: _typeCache,
    parameters: parameters,
    id: id,
    overlays: overlays,
    overlayPositions: overlayPositions,
    overlayPlacements: overlayPlacements,
    instance: instance,
    visible: true,
    getIdPrefix: function getIdPrefix() {
      return idPrefix;
    },
    getDefaultOverlayKey: function getDefaultOverlayKey() {
      return defaultOverlayKey;
    },
    getXY: function getXY() {
      return {
        x: 0,
        y: 0
      };
    },
    deleted: false,
    _hover: false,
    paintStyle: {},
    hoverPaintStyle: {},
    paintStyleInUse: {},
    lastPaintedAt: null,
    data: data,
    params: cParams,
    _defaultType: _defaultType
  };
}
function _clazzManip(component, action, clazz) {
  for (var i in component.overlays) {
    if (action === ACTION_ADD) {
      component.instance.addOverlayClass(component.overlays[i], clazz);
    } else if (action === ACTION_REMOVE) {
      component.instance.removeOverlayClass(component.overlays[i], clazz);
    }
  }
}
var Components = {
  applyType: function applyType(component, t, params) {
    if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
      Endpoints.applyType(component, t, params);
    } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
      Connections.applyType(component, t, params);
    }
  },
  applyBaseType: function applyBaseType(component, t, params) {
    this.setPaintStyle(component, t.paintStyle);
    this.setHoverPaintStyle(component, t.hoverPaintStyle);
    this.mergeParameters(component, t.parameters);
    component.paintStyleInUse = component.paintStyle;
    if (t.overlays) {
      var keep = {},
          i;
      for (i in t.overlays) {
        var existing = component.overlays[t.overlays[i].options.id];
        if (existing) {
          OverlayFactory.updateFrom(existing, t.overlays[i].options);
          keep[t.overlays[i].options.id] = true;
          component.instance.reattachOverlay(existing, component);
        } else {
          var _c = this.getCachedTypeItem(component, TYPE_ITEM_OVERLAY, t.overlays[i].options.id);
          if (_c != null) {
            component.instance.reattachOverlay(_c, component);
            Overlays.setVisible(_c, true);
            OverlayFactory.updateFrom(_c, t.overlays[i].options);
            component.overlays[_c.id] = _c;
          } else {
            _c = this.addOverlay(component, t.overlays[i]);
          }
          keep[_c.id] = true;
        }
      }
      for (i in component.overlays) {
        if (keep[component.overlays[i].id] == null) {
          this.removeOverlay(component, component.overlays[i].id, true);
        }
      }
    }
  },
  destroy: function destroy(component) {
    for (var i in component.overlays) {
      component.instance.destroyOverlay(component.overlays[i]);
    }
    component.overlays = {};
    component.overlayPositions = {};
  },
  _setComponentVisible: function _setComponentVisible(component, v) {
    component.visible = v;
    if (v) {
      this.showOverlays(component);
    } else {
      this.hideOverlays(component);
    }
  },
  setVisible: function setVisible(component, v) {
    if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
      Endpoints.setVisible(component, v);
    } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
      Connections.setVisible(component, v);
    }
  },
  isVisible: function isVisible(component) {
    return component.visible;
  },
  addBaseClass: function addBaseClass(component, clazz, cascade) {
    var parts = (component.cssClass || "").split(" ");
    parts.push(clazz);
    component.cssClass = parts.join(" ");
    _clazzManip(component, ACTION_ADD, clazz);
  },
  removeBaseClass: function removeBaseClass(component, clazz, cascade) {
    var parts = (component.cssClass || "").split(" ");
    component.cssClass = parts.filter(function (p) {
      return p !== clazz;
    }).join(" ");
    _clazzManip(component, ACTION_REMOVE, clazz);
  },
  addClass: function addClass(component, clazz, cascade) {
    if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
      Endpoints.addClass(component, clazz, cascade);
    } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
      Connections.addClass(component, clazz, cascade);
    }
  },
  removeClass: function removeClass(component, clazz, cascade) {
    if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
      Endpoints.removeClass(component, clazz, cascade);
    } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
      Connections.removeClass(component, clazz, cascade);
    }
  },
  showOverlays: function showOverlays(component) {
    for (var _len = arguments.length, ids = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      ids[_key - 1] = arguments[_key];
    }
    ids = ids || [];
    for (var i in component.overlays) {
      if (ids.length === 0 || ids.indexOf(i) !== -1) {
        Overlays.setVisible(component.overlays[i], true);
      }
    }
  },
  hideOverlays: function hideOverlays(component) {
    for (var _len2 = arguments.length, ids = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      ids[_key2 - 1] = arguments[_key2];
    }
    ids = ids || [];
    for (var i in component.overlays) {
      if (ids.length === 0 || ids.indexOf(i) !== -1) {
        Overlays.setVisible(component.overlays[i], false);
      }
    }
  },
  setPaintStyle: function setPaintStyle(component, style) {
    component.paintStyle = style;
    component.paintStyleInUse = component.paintStyle;
    _updateHoverStyle(component);
  },
  setHoverPaintStyle: function setHoverPaintStyle(component, style) {
    component.hoverPaintStyle = style;
    _updateHoverStyle(component);
  },
  mergeParameters: function mergeParameters(component, p) {
    if (p != null) {
      util.extend(component.parameters, p);
    }
  },
  addOverlay: function addOverlay(component, overlay) {
    var o = _processOverlay(component, overlay);
    if (component.data != null && o.type === TYPE_OVERLAY_LABEL && !util.isString(overlay)) {
      var d = component.data,
          p = overlay.options;
      if (d) {
        var locationAttribute = p.labelLocationAttribute || LOCATION_ATTRIBUTE;
        var loc = d[locationAttribute];
        if (loc) {
          o.location = loc;
        }
      }
    }
    return o;
  },
  getOverlay: function getOverlay(component, id) {
    return component.overlays[id];
  },
  hideOverlay: function hideOverlay(component, id) {
    var o = this.getOverlay(component, id);
    if (o) {
      Overlays.setVisible(o, false);
    }
  },
  showOverlay: function showOverlay(component, id) {
    var o = this.getOverlay(component, id);
    if (o) {
      Overlays.setVisible(o, true);
    }
  },
  removeAllOverlays: function removeAllOverlays(component) {
    for (var i in component.overlays) {
      component.instance.destroyOverlay(component.overlays[i]);
    }
    component.overlays = {};
    component.overlayPositions = null;
    component.overlayPlacements = {};
  },
  removeOverlay: function removeOverlay(component, overlayId, dontCleanup) {
    var o = component.overlays[overlayId];
    if (o) {
      Overlays.setVisible(o, false);
      if (!dontCleanup) {
        component.instance.destroyOverlay(o);
      }
      delete component.overlays[overlayId];
      if (component.overlayPositions) {
        delete component.overlayPositions[overlayId];
      }
      if (component.overlayPlacements) {
        delete component.overlayPlacements[overlayId];
      }
    }
  },
  removeOverlays: function removeOverlays(component) {
    for (var i = 0, j = arguments.length <= 1 ? 0 : arguments.length - 1; i < j; i++) {
      this.removeOverlay(component, i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
    }
  },
  getLabel: function getLabel(component) {
    var lo = this.getLabelOverlay(component);
    return lo != null ? Labels.getLabel(lo) : null;
  },
  getLabelOverlay: function getLabelOverlay(component) {
    return this.getOverlay(component, _internalLabelOverlayId);
  },
  setLabel: function setLabel(component, l) {
    var lo = this.getLabelOverlay(component);
    if (!lo) {
      var _params2 = util.isString(l) || util.isFunction(l) ? {
        label: l
      } : l;
      lo = _makeLabelOverlay(component, _params2);
      component.overlays[_internalLabelOverlayId] = lo;
    } else {
      if (util.isString(l) || util.isFunction(l)) {
        Labels.setLabel(lo, l);
      } else {
        var ll = l;
        if (ll.label) {
          Labels.setLabel(lo, ll.label);
        }
        if (ll.location) {
          lo.location = ll.location;
        }
      }
    }
  },
  getDefaultType: function getDefaultType(component) {
    return component._defaultType;
  },
  appendToDefaultType: function appendToDefaultType(component, obj) {
    for (var i in obj) {
      component._defaultType[i] = obj[i];
    }
  },
  cacheTypeItem: function cacheTypeItem(component, key, item, typeId) {
    component._typeCache[typeId] = component._typeCache[typeId] || {};
    component._typeCache[typeId][key] = item;
  },
  getCachedTypeItem: function getCachedTypeItem(component, key, typeId) {
    return component._typeCache[typeId] ? component._typeCache[typeId][key] : null;
  },
  setType: function setType(component, typeId, params) {
    this.clearTypes(component);
    (_splitType(typeId) || []).forEach(component._types.add, component._types);
    _applyTypes(component, params);
  },
  getType: function getType(component) {
    return Array.from(component._types.keys());
  },
  reapplyTypes: function reapplyTypes(component, params) {
    _applyTypes(component, params);
  },
  hasType: function hasType(component, typeId) {
    return component._types.has(typeId);
  },
  addType: function addType(component, typeId, params) {
    var t = _splitType(typeId),
        _somethingAdded = false;
    if (t != null) {
      for (var i = 0, j = t.length; i < j; i++) {
        if (!component._types.has(t[i])) {
          component._types.add(t[i]);
          _somethingAdded = true;
        }
      }
      if (_somethingAdded) {
        _applyTypes(component, params);
      }
    }
  },
  removeType: function removeType(component, typeId, params) {
    var t = _splitType(typeId),
        _cont = false,
        _one = function _one(tt) {
      if (component._types.has(tt)) {
        _removeTypeCssHelper(component, tt);
        component._types["delete"](tt);
        return true;
      }
      return false;
    };
    if (t != null) {
      for (var i = 0, j = t.length; i < j; i++) {
        _cont = _one(t[i]) || _cont;
      }
      if (_cont) {
        _applyTypes(component, params);
      }
    }
  },
  clearTypes: function clearTypes(component, params) {
    component._types.forEach(function (t) {
      _removeTypeCssHelper(component, t);
    });
    component._types.clear();
    _applyTypes(component, params);
  },
  toggleType: function toggleType(component, typeId, params) {
    var t = _splitType(typeId);
    if (t != null) {
      for (var i = 0, j = t.length; i < j; i++) {
        if (component._types.has(t[i])) {
          _removeTypeCssHelper(component, t[i]);
          component._types["delete"](t[i]);
        } else {
          component._types.add(t[i]);
        }
      }
      _applyTypes(component, params);
    }
  },
  isDetachAllowed: function isDetachAllowed(component, connection) {
    var r = true;
    if (component.beforeDetach) {
      try {
        r = component.beforeDetach(connection);
      } catch (e) {
        util.log("jsPlumb: beforeDetach callback failed", e);
      }
    }
    return r;
  },
  isDropAllowed: function isDropAllowed(component, sourceId, targetId, scope, connection, dropEndpoint) {
    var r;
    var payload = {
      sourceId: sourceId,
      targetId: targetId,
      scope: scope,
      connection: connection,
      dropEndpoint: dropEndpoint
    };
    if (component.beforeDrop) {
      try {
        r = component.beforeDrop(payload);
      } catch (e) {
        util.log("jsPlumb: beforeDrop callback failed", e);
      }
    } else {
      r = component.instance.checkCondition(INTERCEPT_BEFORE_DROP, payload);
    }
    return r;
  },
  getData: function getData(component) {
    if (component.data = null) {
      component.data = {};
    }
    return component.data;
  },
  setData: function setData(component, d) {
    component.data = d || {};
  },
  mergeData: function mergeData(component, d) {
    component.data = util.extend(component.data, d);
  },
  setAbsoluteOverlayPosition: function setAbsoluteOverlayPosition(component, overlay, xy) {
    component.overlayPositions[overlay.id] = xy;
  },
  getAbsoluteOverlayPosition: function getAbsoluteOverlayPosition(component, overlay) {
    return component.overlayPositions ? component.overlayPositions[overlay.id] : null;
  }
};

var TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION = "endpoint-representation";
function isEndpointRepresentation(ep) {
  return ep.typeDescriptor != null && ep.typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION;
}
function createBaseRepresentation(type, endpoint, params) {
  params = params || {};
  var classes = [];
  if (endpoint.cssClass) {
    classes.push(endpoint.cssClass);
  }
  if (params.cssClass) {
    classes.push(params.cssClass);
  }
  return {
    typeId: null,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    classes: classes,
    type: type,
    bounds: common.EMPTY_BOUNDS(),
    instance: endpoint.instance,
    canvas: null,
    endpoint: endpoint,
    computedValue: null,
    typeDescriptor: TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION
  };
}
var TYPE_DESCRIPTOR_ENDPOINT = "endpoint";
var typeParameters = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"];
var Endpoints = {
  applyType: function applyType(endpoint, t, typeMap) {
    Components.applyBaseType(endpoint, t, typeMap);
    Components.setPaintStyle(endpoint, t.endpointStyle || t.paintStyle);
    Components.setHoverPaintStyle(endpoint, t.endpointHoverStyle || t.hoverPaintStyle);
    endpoint.connectorStyle = t.connectorStyle;
    endpoint.connectorHoverStyle = t.connectorHoverStyle;
    endpoint.connector = t.connector;
    endpoint.connectorOverlays = t.connectorOverlays;
    endpoint.edgeType = t.edgeType;
    if (t.maxConnections != null) {
      endpoint.maxConnections = t.maxConnections;
    }
    if (t.scope) {
      endpoint.scope = t.scope;
    }
    util.extend(t, typeParameters);
    endpoint.instance.applyEndpointType(endpoint, t);
  },
  destroy: function destroy(endpoint) {
    Components.destroy(endpoint);
    endpoint.deleted = true;
    if (endpoint.representation != null) {
      endpoint.instance.destroyEndpoint(endpoint);
    }
  },
  setVisible: function setVisible(endpoint, v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
    Components._setComponentVisible(endpoint, v);
    endpoint.instance.setEndpointVisible(endpoint, v);
    if (v) {
      Components.showOverlays(endpoint);
    } else {
      Components.hideOverlays(endpoint);
    }
    if (!doNotChangeConnections) {
      for (var i = 0; i < endpoint.connections.length; i++) {
        Connections.setVisible(endpoint.connections[i], v);
        if (!doNotNotifyOtherEndpoint) {
          var oIdx = endpoint === endpoint.connections[i].endpoints[0] ? 1 : 0;
          if (endpoint.connections[i].endpoints[oIdx].connections.length === 1) {
            Endpoints.setVisible(endpoint.connections[i].endpoints[oIdx], v, true, true);
          }
        }
      }
    }
  },
  addClass: function addClass(endpoint, clazz, cascade) {
    Components.addBaseClass(endpoint, clazz, cascade);
    if (endpoint.representation != null) {
      endpoint.representation.classes.push(clazz);
      endpoint.instance.addEndpointClass(endpoint, clazz);
    }
  },
  removeClass: function removeClass(endpoint, clazz, cascade) {
    Components.removeBaseClass(endpoint, clazz, cascade);
    if (endpoint.representation != null) {
      endpoint.representation.classes = endpoint.representation.classes.filter(function (_c) {
        return _c !== clazz;
      });
      endpoint.instance.removeEndpointClass(endpoint, clazz);
    }
  },
  _setPreparedAnchor: function _setPreparedAnchor(endpoint, anchor) {
    endpoint.instance.router.setAnchor(endpoint, anchor);
    this._updateAnchorClass(endpoint);
    return endpoint;
  },
  _updateAnchorClass: function _updateAnchorClass(endpoint) {
    var ac = endpoint._anchor && endpoint._anchor.cssClass;
    if (ac != null && ac.length > 0) {
      var oldAnchorClass = endpoint.instance.endpointAnchorClassPrefix + "-" + endpoint.currentAnchorClass;
      endpoint.currentAnchorClass = ac;
      var anchorClass = endpoint.instance.endpointAnchorClassPrefix + (endpoint.currentAnchorClass ? "-" + endpoint.currentAnchorClass : "");
      if (oldAnchorClass !== anchorClass) {
        this.removeClass(endpoint, oldAnchorClass);
        this.addClass(endpoint, anchorClass);
        endpoint.instance.removeClass(endpoint.element, oldAnchorClass);
        endpoint.instance.addClass(endpoint.element, anchorClass);
      }
    }
  },
  _anchorLocationChanged: function _anchorLocationChanged(endpoint, currentAnchor) {
    endpoint.instance.fire(EVENT_ANCHOR_CHANGED, {
      endpoint: endpoint,
      anchor: currentAnchor
    });
    this._updateAnchorClass(endpoint);
  },
  setAnchor: function setAnchor(endpoint, anchorParams) {
    var a = endpoint.instance.router.prepareAnchor(anchorParams);
    this._setPreparedAnchor(endpoint, a);
    return endpoint;
  },
  addConnection: function addConnection(endpoint, conn) {
    endpoint.connections.push(conn);
    endpoint.instance._refreshEndpoint(endpoint);
  },
  deleteEveryConnection: function deleteEveryConnection(endpoint, params) {
    var c = endpoint.connections.length;
    for (var i = 0; i < c; i++) {
      endpoint.instance.deleteConnection(endpoint.connections[0], params);
    }
  },
  detachFrom: function detachFrom(endpoint, otherEndpoint) {
    var c = [];
    for (var i = 0; i < endpoint.connections.length; i++) {
      if (endpoint.connections[i].endpoints[1] === otherEndpoint || endpoint.connections[i].endpoints[0] === otherEndpoint) {
        c.push(endpoint.connections[i]);
      }
    }
    for (var j = 0, count = c.length; j < count; j++) {
      endpoint.instance.deleteConnection(c[0]);
    }
    return endpoint;
  },
  detachFromConnection: function detachFromConnection(endpoint, connection, idx, transientDetach) {
    idx = idx == null ? endpoint.connections.indexOf(connection) : idx;
    if (idx >= 0) {
      endpoint.connections.splice(idx, 1);
      endpoint.instance._refreshEndpoint(endpoint);
    }
    if (!transientDetach && endpoint.deleteOnEmpty && endpoint.connections.length === 0) {
      endpoint.instance.deleteEndpoint(endpoint);
    }
  },
  isFull: function isFull(endpoint) {
    return endpoint.maxConnections === 0 ? true : !(this.isFloating(endpoint) || endpoint.maxConnections < 0 || endpoint.connections.length < endpoint.maxConnections);
  },
  isFloating: function isFloating(endpoint) {
    return endpoint.instance.router.isFloating(endpoint);
  },
  isConnectedTo: function isConnectedTo(endpoint, otherEndpoint) {
    var found = false;
    if (otherEndpoint) {
      for (var i = 0; i < endpoint.connections.length; i++) {
        if (endpoint.connections[i].endpoints[1] === otherEndpoint || endpoint.connections[i].endpoints[0] === otherEndpoint) {
          found = true;
          break;
        }
      }
    }
    return found;
  },
  isEndpoint: function isEndpoint(component) {
    return component._typeDescriptor != null && component._typeDescriptor == TYPE_DESCRIPTOR_ENDPOINT;
  },
  prepareEndpoint: function prepareEndpoint(endpoint, ep, typeId) {
    var endpointArgs = {
      cssClass: endpoint.cssClass,
      endpoint: endpoint
    };
    var endpointRep;
    if (isEndpointRepresentation(ep)) {
      var epr = ep;
      endpointRep = EndpointFactory.clone(epr);
      endpointRep.classes = endpointArgs.cssClass.split(" ");
    } else if (util.isString(ep)) {
      endpointRep = EndpointFactory.get(endpoint, ep, endpointArgs);
    } else {
      var fep = ep;
      util.extend(endpointArgs, fep.options || {});
      endpointRep = EndpointFactory.get(endpoint, fep.type, endpointArgs);
    }
    endpointRep.typeId = typeId;
    return endpointRep;
  },
  setEndpoint: function setEndpoint(endpoint, ep) {
    var _ep = this.prepareEndpoint(endpoint, ep);
    this.setPreparedEndpoint(endpoint, _ep);
  },
  setPreparedEndpoint: function setPreparedEndpoint(endpoint, ep) {
    if (endpoint.representation != null) {
      endpoint.instance.destroyEndpoint(endpoint);
    }
    endpoint.representation = ep;
  },
  compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
    ep.computedValue = EndpointFactory.compute(ep, anchorPoint, orientation, endpointStyle);
    ep.bounds.xmin = ep.x;
    ep.bounds.ymin = ep.y;
    ep.bounds.xmax = ep.x + ep.w;
    ep.bounds.ymax = ep.y + ep.h;
  }
};

var TYPE_ENDPOINT_DOT = "Dot";
var DotEndpointHandler = {
  type: TYPE_ENDPOINT_DOT,
  create: function create(endpoint, params) {
    var base = createBaseRepresentation(TYPE_ENDPOINT_DOT, endpoint, params);
    var radius = params.radius || 5;
    return util.extend(base, {
      type: TYPE_ENDPOINT_DOT,
      radius: radius,
      defaultOffset: 0.5 * radius,
      defaultInnerRadius: radius / 3
    });
  },
  compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
    var x = anchorPoint.curX - ep.radius,
        y = anchorPoint.curY - ep.radius,
        w = ep.radius * 2,
        h = ep.radius * 2;
    if (endpointStyle && endpointStyle.stroke) {
      var lw = endpointStyle.strokeWidth || 1;
      x -= lw;
      y -= lw;
      w += lw * 2;
      h += lw * 2;
    }
    ep.x = x;
    ep.y = y;
    ep.w = w;
    ep.h = h;
    return [x, y, w, h, ep.radius];
  },
  getParams: function getParams(ep) {
    return {
      radius: ep.radius
    };
  }
};

var TYPE_ENDPOINT_BLANK = "Blank";
var BlankEndpointHandler = {
  type: TYPE_ENDPOINT_BLANK,
  create: function create(endpoint, params) {
    var base = createBaseRepresentation(TYPE_ENDPOINT_BLANK, endpoint, params);
    return util.extend(base, {
      type: TYPE_ENDPOINT_BLANK
    });
  },
  compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
    ep.x = anchorPoint.curX;
    ep.y = anchorPoint.curY;
    ep.w = 10;
    ep.h = 0;
    return [anchorPoint.curX, anchorPoint.curY, 10, 0];
  },
  getParams: function getParams(ep) {
    return {};
  }
};

var TYPE_ENDPOINT_RECTANGLE = "Rectangle";
var RectangleEndpointHandler = {
  type: TYPE_ENDPOINT_RECTANGLE,
  create: function create(endpoint, params) {
    var base = createBaseRepresentation(TYPE_ENDPOINT_RECTANGLE, endpoint, params);
    return util.extend(base, {
      type: TYPE_ENDPOINT_RECTANGLE,
      width: params.width || 10,
      height: params.height || 10
    });
  },
  compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
    var width = endpointStyle.width || ep.width,
        height = endpointStyle.height || ep.height,
        x = anchorPoint.curX - width / 2,
        y = anchorPoint.curY - height / 2;
    ep.x = x;
    ep.y = y;
    ep.w = width;
    ep.h = height;
    return [x, y, width, height];
  },
  getParams: function getParams(ep) {
    return {
      width: ep.width,
      height: ep.height
    };
  }
};

var DEFAULT_KEY_ALLOW_NESTED_GROUPS = "allowNestedGroups";
var DEFAULT_KEY_ANCHOR = "anchor";
var DEFAULT_KEY_ANCHORS = "anchors";
var DEFAULT_KEY_CONNECTION_OVERLAYS = "connectionOverlays";
var DEFAULT_KEY_CONNECTIONS_DETACHABLE = "connectionsDetachable";
var DEFAULT_KEY_CONNECTOR = "connector";
var DEFAULT_KEY_CONTAINER = "container";
var DEFAULT_KEY_ENDPOINT = "endpoint";
var DEFAULT_KEY_ENDPOINT_OVERLAYS = "endpointOverlays";
var DEFAULT_KEY_ENDPOINTS = "endpoints";
var DEFAULT_KEY_ENDPOINT_STYLE = "endpointStyle";
var DEFAULT_KEY_ENDPOINT_STYLES = "endpointStyles";
var DEFAULT_KEY_ENDPOINT_HOVER_STYLE = "endpointHoverStyle";
var DEFAULT_KEY_ENDPOINT_HOVER_STYLES = "endpointHoverStyles";
var DEFAULT_KEY_HOVER_CLASS = "hoverClass";
var DEFAULT_KEY_HOVER_PAINT_STYLE = "hoverPaintStyle";
var DEFAULT_KEY_LIST_STYLE = "listStyle";
var DEFAULT_KEY_MAX_CONNECTIONS = "maxConnections";
var DEFAULT_KEY_PAINT_STYLE = "paintStyle";
var DEFAULT_KEY_REATTACH_CONNECTIONS = "reattachConnections";
var DEFAULT_KEY_SCOPE = "scope";

var ID_PREFIX_ENDPOINT = "_jsplumb_e";
var DEFAULT_OVERLAY_KEY_ENDPOINTS = "endpointOverlays";
var DEFAULT_LABEL_LOCATION_ENDPOINT = [0.5, 0.5];
function createEndpoint(instance, params) {
  var baseComponent = createComponentBase(instance, ID_PREFIX_ENDPOINT, TYPE_DESCRIPTOR_ENDPOINT, DEFAULT_OVERLAY_KEY_ENDPOINTS, {
    edgeType: params.edgeType,
    maxConnections: params.maxConnections == null ? instance.defaults.maxConnections : params.maxConnections,
    paintStyle: params.paintStyle || instance.defaults.endpointStyle,
    hoverPaintStyle: params.hoverPaintStyle || instance.defaults.endpointHoverStyle,
    connectorStyle: params.connectorStyle,
    connectorHoverStyle: params.connectorHoverStyle,
    connectorClass: params.connectorClass,
    connectorHoverClass: params.connectorHoverClass,
    connectorOverlays: params.connectorOverlays,
    connector: params.connector
  }, DEFAULT_LABEL_LOCATION_ENDPOINT, params);
  var enabled = !(params.enabled === false);
  var visible = true;
  var element = params.element;
  var uuid = params.uuid;
  var portId = params.portId;
  var elementId = params.elementId;
  var connectionCost = params.connectionCost == null ? 1 : params.connectionCost;
  var connectionsDirected = params.connectionsDirected;
  var currentAnchorClass = "";
  var events = {};
  var connectorOverlays = params.connectorOverlays;
  var connectorStyle = params.connectorStyle;
  var connectorHoverStyle = params.connectorHoverStyle;
  var connector = params.connector;
  var edgeType = params.edgeType;
  var connectorClass = params.connectorClass;
  var connectorHoverClass = params.connectorHoverClass;
  var deleteOnEmpty = params.deleteOnEmpty === true;
  var isSource = params.source || false;
  var isTemporarySource = params.isTemporarySource || false;
  var isTarget = params.target || false;
  var connections = params.connections || [];
  var scope = params.scope || instance.defaultScope;
  var timestamp = null;
  var reattachConnections = params.reattachConnections || instance.defaults.reattachConnections;
  var connectionsDetachable = instance.defaults.connectionsDetachable;
  if (params.connectionsDetachable === false) {
    connectionsDetachable = false;
  }
  var dragAllowedWhenFull = params.dragAllowedWhenFull !== false;
  var endpoint = util.extend(baseComponent, {
    enabled: enabled,
    visible: visible,
    element: element,
    uuid: uuid,
    portId: portId,
    elementId: elementId,
    connectionCost: connectionCost,
    connectionsDirected: connectionsDirected,
    currentAnchorClass: currentAnchorClass,
    events: events,
    connectorOverlays: connectorOverlays,
    connectorStyle: connectorStyle,
    connectorHoverStyle: connectorHoverStyle,
    connector: connector,
    edgeType: edgeType,
    connectorClass: connectorClass,
    connectorHoverClass: connectorHoverClass,
    deleteOnEmpty: deleteOnEmpty,
    isSource: isSource,
    isTemporarySource: isTemporarySource,
    isTarget: isTarget,
    connections: connections,
    scope: scope,
    timestamp: timestamp,
    reattachConnections: reattachConnections,
    connectionsDetachable: connectionsDetachable,
    dragAllowedWhenFull: dragAllowedWhenFull,
    connectorSelector: function connectorSelector() {
      return this.connections[0];
    },
    getXY: function getXY() {
      return {
        x: this.representation.x,
        y: this.representation.y
      };
    }
  });
  var ep = params.endpoint || params.existingEndpoint || instance.defaults.endpoint;
  Endpoints.setEndpoint(endpoint, ep);
  if (params.preparedAnchor != null) {
    Endpoints._setPreparedAnchor(endpoint, params.preparedAnchor);
  } else {
    var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : instance.defaults.anchor || common.AnchorLocations.Top;
    Endpoints.setAnchor(endpoint, anchorParamsToUse);
  }
  var type = [common.DEFAULT, params.type || ""].join(" ");
  Components.addType(endpoint, type, params.data);
  return endpoint;
}

var UINode = function UINode(instance, el) {
  _classCallCheck(this, UINode);
  this.instance = instance;
  this.el = el;
  _defineProperty(this, "group", void 0);
};
var UIGroup = function (_UINode) {
  _inherits(UIGroup, _UINode);
  var _super = _createSuper(UIGroup);
  function UIGroup(instance, el, options) {
    var _this;
    _classCallCheck(this, UIGroup);
    _this = _super.call(this, instance, el);
    _this.instance = instance;
    _defineProperty(_assertThisInitialized(_this), "children", []);
    _defineProperty(_assertThisInitialized(_this), "collapsed", false);
    _defineProperty(_assertThisInitialized(_this), "droppable", void 0);
    _defineProperty(_assertThisInitialized(_this), "enabled", void 0);
    _defineProperty(_assertThisInitialized(_this), "orphan", void 0);
    _defineProperty(_assertThisInitialized(_this), "constrain", void 0);
    _defineProperty(_assertThisInitialized(_this), "proxied", void 0);
    _defineProperty(_assertThisInitialized(_this), "ghost", void 0);
    _defineProperty(_assertThisInitialized(_this), "revert", void 0);
    _defineProperty(_assertThisInitialized(_this), "prune", void 0);
    _defineProperty(_assertThisInitialized(_this), "dropOverride", void 0);
    _defineProperty(_assertThisInitialized(_this), "anchor", void 0);
    _defineProperty(_assertThisInitialized(_this), "endpoint", void 0);
    _defineProperty(_assertThisInitialized(_this), "connections", {
      source: [],
      target: [],
      internal: []
    });
    _defineProperty(_assertThisInitialized(_this), "manager", void 0);
    _defineProperty(_assertThisInitialized(_this), "id", void 0);
    _defineProperty(_assertThisInitialized(_this), "elId", void 0);
    var jel = _this.el;
    jel._isJsPlumbGroup = true;
    jel._jsPlumbGroup = _assertThisInitialized(_this);
    _this.elId = instance.getId(el);
    _this.orphan = options.orphan === true;
    _this.revert = _this.orphan === true ? false : options.revert !== false;
    _this.droppable = options.droppable !== false;
    _this.ghost = options.ghost === true;
    _this.enabled = options.enabled !== false;
    _this.prune = _this.orphan !== true && options.prune === true;
    _this.constrain = _this.ghost || options.constrain === true;
    _this.proxied = options.proxied !== false;
    _this.id = options.id || util.uuid();
    _this.dropOverride = options.dropOverride === true;
    _this.anchor = options.anchor;
    _this.endpoint = options.endpoint;
    _this.anchor = options.anchor;
    instance.setAttribute(el, ATTRIBUTE_GROUP, "");
    return _this;
  }
  _createClass(UIGroup, [{
    key: "contentArea",
    get: function get() {
      return this.instance.getGroupContentArea(this);
    }
  }, {
    key: "overrideDrop",
    value: function overrideDrop(el, targetGroup) {
      return this.dropOverride && (this.revert || this.prune || this.orphan);
    }
  }, {
    key: "getAnchor",
    value: function getAnchor(conn, endpointIndex) {
      return this.anchor || "Continuous";
    }
  }, {
    key: "getEndpoint",
    value: function getEndpoint(conn, endpointIndex) {
      return this.endpoint || {
        type: TYPE_ENDPOINT_DOT,
        options: {
          radius: 10
        }
      };
    }
  }, {
    key: "add",
    value: function add(_el, doNotFireEvent) {
      var dragArea = this.instance.getGroupContentArea(this);
      var __el = _el;
      if (__el._jsPlumbParentGroup != null) {
        if (__el._jsPlumbParentGroup === this) {
          return;
        } else {
          __el._jsPlumbParentGroup.remove(_el, true, doNotFireEvent, false);
        }
      }
      __el._jsPlumbParentGroup = this;
      this.children.push(new UINode(this.instance, _el));
      this.instance._appendElement(__el, dragArea);
      this.manager._updateConnectionsForGroup(this);
    }
  }, {
    key: "resolveNode",
    value: function resolveNode(el) {
      return el == null ? null : util.getWithFunction(this.children, function (u) {
        return u.el === el;
      });
    }
  }, {
    key: "remove",
    value: function remove(el, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup) {
      var uiNode = this.resolveNode(el);
      if (uiNode != null) {
        this._doRemove(uiNode, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup);
      }
    }
  }, {
    key: "_doRemove",
    value: function _doRemove(child, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup) {
      var __el = child.el;
      delete __el._jsPlumbParentGroup;
      util.removeWithFunction(this.children, function (e) {
        return e === child;
      });
      if (manipulateDOM) {
        try {
          this.instance.getGroupContentArea(this).removeChild(__el);
        } catch (e) {
          util.log("Could not remove element from Group " + e);
        }
      }
      if (!doNotFireEvent) {
        var p = {
          group: this,
          el: __el
        };
        if (targetGroup) {
          p.targetGroup = targetGroup;
        }
        this.instance.fire(EVENT_GROUP_MEMBER_REMOVED, p);
      }
      if (!doNotUpdateConnections) {
        this.manager._updateConnectionsForGroup(this);
      }
    }
  }, {
    key: "removeAll",
    value: function removeAll(manipulateDOM, doNotFireEvent) {
      for (var i = 0, l = this.children.length; i < l; i++) {
        var child = this.children[0];
        this._doRemove(child, manipulateDOM, doNotFireEvent, true);
        this.instance.unmanage(child.el, true);
      }
      this.children.length = 0;
      this.manager._updateConnectionsForGroup(this);
    }
  }, {
    key: "orphanAll",
    value: function orphanAll() {
      var orphanedPositions = {};
      for (var i = 0; i < this.children.length; i++) {
        var newPosition = this.manager.orphan(this.children[i].el, false);
        orphanedPositions[newPosition.id] = newPosition.pos;
      }
      this.children.length = 0;
      return orphanedPositions;
    }
  }, {
    key: "addGroup",
    value: function addGroup(group) {
      if (this.instance.allowNestedGroups && group !== this) {
        if (this.instance.groupManager.isAncestor(this, group)) {
          return false;
        }
        if (group.group != null) {
          group.group.removeGroup(group);
        }
        var groupElId = this.instance.getId(group.el);
        var entry = this.instance.getManagedElements()[groupElId];
        entry.group = this.elId;
        var elpos = this.instance.getOffsetRelativeToRoot(group.el);
        var cpos = this.collapsed ? this.instance.getOffsetRelativeToRoot(this.el) : this.instance.getOffsetRelativeToRoot(this.instance.getGroupContentArea(this));
        group.el._jsPlumbParentGroup = this;
        this.children.push(group);
        this.instance._appendElementToGroup(this, group.el);
        group.group = this;
        var newPosition = {
          x: elpos.x - cpos.x,
          y: elpos.y - cpos.y
        };
        this.instance.setPosition(group.el, newPosition);
        this.instance.fire(EVENT_NESTED_GROUP_ADDED, {
          parent: this,
          child: group
        });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "removeGroup",
    value: function removeGroup(group) {
      if (group.group === this) {
        var jel = group.el;
        var d = this.instance.getGroupContentArea(this);
        if (d === jel.parentNode) {
          d.removeChild(group.el);
        }
        var groupElId = this.instance.getId(group.el);
        var entry = this.instance.getManagedElements()[groupElId];
        if (entry) {
          delete entry.group;
        }
        this.children = this.children.filter(function (cg) {
          return cg.id !== group.id;
        });
        delete group.group;
        delete jel._jsPlumbParentGroup;
        this.instance.fire(EVENT_NESTED_GROUP_REMOVED, {
          parent: this,
          child: group
        });
      }
    }
  }, {
    key: "getGroups",
    value: function getGroups() {
      return this.children.filter(function (cg) {
        return cg.constructor === UIGroup;
      });
    }
  }, {
    key: "getNodes",
    value: function getNodes() {
      return this.children.filter(function (cg) {
        return cg.constructor === UINode;
      });
    }
  }, {
    key: "collapseParent",
    get: function get() {
      var cg = null;
      if (this.group == null) {
        return null;
      } else {
        var g = this.group;
        while (g != null) {
          if (g.collapsed) {
            cg = g;
          }
          g = g.group;
        }
        return cg;
      }
    }
  }]);
  return UIGroup;
}(UINode);

var GroupManager = function () {
  function GroupManager(instance) {
    var _this = this;
    _classCallCheck(this, GroupManager);
    this.instance = instance;
    _defineProperty(this, "groupMap", {});
    _defineProperty(this, "_connectionSourceMap", {});
    _defineProperty(this, "_connectionTargetMap", {});
    instance.bind(EVENT_INTERNAL_CONNECTION, function (p) {
      var sourceGroup = _this.getGroupFor(p.source);
      var targetGroup = _this.getGroupFor(p.target);
      if (sourceGroup != null && targetGroup != null && sourceGroup === targetGroup) {
        _this._connectionSourceMap[p.connection.id] = sourceGroup;
        _this._connectionTargetMap[p.connection.id] = sourceGroup;
        util.suggest(sourceGroup.connections.internal, p.connection);
      } else {
        if (sourceGroup != null) {
          if (p.target._jsPlumbGroup === sourceGroup) {
            util.suggest(sourceGroup.connections.internal, p.connection);
          } else {
            util.suggest(sourceGroup.connections.source, p.connection);
          }
          _this._connectionSourceMap[p.connection.id] = sourceGroup;
        }
        if (targetGroup != null) {
          if (p.source._jsPlumbGroup === targetGroup) {
            util.suggest(targetGroup.connections.internal, p.connection);
          } else {
            util.suggest(targetGroup.connections.target, p.connection);
          }
          _this._connectionTargetMap[p.connection.id] = targetGroup;
        }
      }
    });
    instance.bind(EVENT_INTERNAL_CONNECTION_DETACHED, function (p) {
      _this._cleanupDetachedConnection(p.connection);
    });
    instance.bind(EVENT_CONNECTION_MOVED, function (p) {
      var originalElement = p.originalEndpoint.element,
          originalGroup = _this.getGroupFor(originalElement),
          newEndpoint = p.connection.endpoints[p.index],
          newElement = newEndpoint.element,
          newGroup = _this.getGroupFor(newElement),
          connMap = p.index === 0 ? _this._connectionSourceMap : _this._connectionTargetMap,
          otherConnMap = p.index === 0 ? _this._connectionTargetMap : _this._connectionSourceMap;
      if (newGroup != null) {
        connMap[p.connection.id] = newGroup;
        if (p.connection.source === p.connection.target) {
          otherConnMap[p.connection.id] = newGroup;
        }
      } else {
        delete connMap[p.connection.id];
        if (p.connection.source === p.connection.target) {
          delete otherConnMap[p.connection.id];
        }
      }
      if (originalGroup != null) {
        _this._updateConnectionsForGroup(originalGroup);
      }
      if (newGroup != null) {
        _this._updateConnectionsForGroup(newGroup);
      }
    });
  }
  _createClass(GroupManager, [{
    key: "_cleanupDetachedConnection",
    value: function _cleanupDetachedConnection(conn) {
      conn.proxies.length = 0;
      var group = this._connectionSourceMap[conn.id],
          f;
      if (group != null) {
        f = function f(c) {
          return c.id === conn.id;
        };
        util.removeWithFunction(group.connections.source, f);
        util.removeWithFunction(group.connections.target, f);
        util.removeWithFunction(group.connections.internal, f);
        delete this._connectionSourceMap[conn.id];
      }
      group = this._connectionTargetMap[conn.id];
      if (group != null) {
        f = function f(c) {
          return c.id === conn.id;
        };
        util.removeWithFunction(group.connections.source, f);
        util.removeWithFunction(group.connections.target, f);
        util.removeWithFunction(group.connections.internal, f);
        delete this._connectionTargetMap[conn.id];
      }
    }
  }, {
    key: "addGroup",
    value: function addGroup(params) {
      var jel = params.el;
      if (this.groupMap[params.id] != null) {
        throw new Error("cannot create Group [" + params.id + "]; a Group with that ID exists");
      }
      if (jel._isJsPlumbGroup != null) {
        throw new Error("cannot create Group [" + params.id + "]; the given element is already a Group");
      }
      var group = new UIGroup(this.instance, params.el, params);
      this.groupMap[group.id] = group;
      if (params.collapsed) {
        this.collapseGroup(group);
      }
      this.instance.manage(group.el);
      this.instance.addClass(group.el, CLASS_GROUP_EXPANDED);
      group.manager = this;
      this._updateConnectionsForGroup(group);
      this.instance.fire(EVENT_GROUP_ADDED, {
        group: group
      });
      return group;
    }
  }, {
    key: "getGroup",
    value: function getGroup(groupId) {
      var group = groupId;
      if (util.isString(groupId)) {
        group = this.groupMap[groupId];
        if (group == null) {
          throw new Error("No such group [" + groupId + "]");
        }
      }
      return group;
    }
  }, {
    key: "getGroupFor",
    value: function getGroupFor(el) {
      var jel = el;
      var c = this.instance.getContainer();
      var abort = false,
          g = null;
      while (!abort) {
        if (jel == null || jel === c) {
          abort = true;
        } else {
          if (jel._jsPlumbParentGroup) {
            g = jel._jsPlumbParentGroup;
            abort = true;
          } else {
            jel = jel.parentNode;
          }
        }
      }
      return g;
    }
  }, {
    key: "getGroups",
    value: function getGroups() {
      var g = [];
      for (var key in this.groupMap) {
        g.push(this.groupMap[key]);
      }
      return g;
    }
  }, {
    key: "removeGroup",
    value: function removeGroup(group, deleteMembers, manipulateView, doNotFireEvent) {
      var _this2 = this;
      var actualGroup = this.getGroup(group);
      this.expandGroup(actualGroup, true);
      var newPositions = {};
      util.forEach(actualGroup.children, function (uiNode) {
        var entry = _this2.instance.getManagedElements()[_this2.instance.getId(uiNode.el)];
        if (entry) {
          delete entry.group;
        }
      });
      if (deleteMembers) {
        util.forEach(actualGroup.getGroups(), function (cg) {
          return _this2.removeGroup(cg, deleteMembers, manipulateView);
        });
        actualGroup.removeAll(manipulateView, doNotFireEvent);
      } else {
        if (actualGroup.group) {
          util.forEach(actualGroup.children, function (c) {
            return actualGroup.group.add(c.el);
          });
        }
        newPositions = actualGroup.orphanAll();
      }
      if (actualGroup.group) {
        actualGroup.group.removeGroup(actualGroup);
      }
      this.instance.unmanage(actualGroup.el, true);
      delete this.groupMap[actualGroup.id];
      this.instance.fire(EVENT_GROUP_REMOVED, {
        group: actualGroup
      });
      return newPositions;
    }
  }, {
    key: "removeAllGroups",
    value: function removeAllGroups(deleteMembers, manipulateView, doNotFireEvent) {
      for (var _g in this.groupMap) {
        this.removeGroup(this.groupMap[_g], deleteMembers, manipulateView, doNotFireEvent);
      }
    }
  }, {
    key: "forEach",
    value: function forEach(f) {
      for (var key in this.groupMap) {
        f(this.groupMap[key]);
      }
    }
  }, {
    key: "orphan",
    value: function orphan(el, doNotTransferToAncestor) {
      var jel = el;
      if (jel._jsPlumbParentGroup) {
        var currentParent = jel._jsPlumbParentGroup;
        var id = this.instance.getId(jel);
        var pos = this.instance.getOffset(el);
        if (doNotTransferToAncestor !== true && currentParent.group) {
          this.instance._appendElementToGroup(currentParent.group, el);
        } else {
          this.instance._appendElementToContainer(el);
        }
        this.instance.setPosition(el, pos);
        delete jel._jsPlumbParentGroup;
        return {
          id: id,
          pos: pos
        };
      }
    }
  }, {
    key: "_updateConnectionsForGroup",
    value: function _updateConnectionsForGroup(group) {
      var _this3 = this;
      group.connections.source.length = 0;
      group.connections.target.length = 0;
      group.connections.internal.length = 0;
      var members = group.children.slice().map(function (cn) {
        return cn.el;
      });
      var childMembers = [];
      util.forEach(members, function (member) {
        Array.prototype.push.apply(childMembers, _this3.instance.getSelector(member, SELECTOR_MANAGED_ELEMENT));
      });
      Array.prototype.push.apply(members, childMembers);
      if (members.length > 0) {
        var c1 = this.instance.getConnections({
          source: members,
          scope: common.WILDCARD
        }, true);
        var c2 = this.instance.getConnections({
          target: members,
          scope: common.WILDCARD
        }, true);
        var processed = {};
        var gs, gt;
        var oneSet = function oneSet(c) {
          for (var i = 0; i < c.length; i++) {
            if (processed[c[i].id]) {
              continue;
            }
            processed[c[i].id] = true;
            gs = _this3.getGroupFor(c[i].source);
            gt = _this3.getGroupFor(c[i].target);
            if (c[i].source === group.el && gt === group || c[i].target === group.el && gs === group) {
              group.connections.internal.push(c[i]);
            } else if (gs === group) {
              if (gt !== group) {
                group.connections.source.push(c[i]);
              } else {
                group.connections.internal.push(c[i]);
              }
              _this3._connectionSourceMap[c[i].id] = group;
            } else if (gt === group) {
              group.connections.target.push(c[i]);
              _this3._connectionTargetMap[c[i].id] = group;
            }
          }
        };
        oneSet(c1);
        oneSet(c2);
      }
    }
  }, {
    key: "_collapseConnection",
    value: function _collapseConnection(conn, index, group) {
      var otherEl = conn.endpoints[index === 0 ? 1 : 0].element;
      if (otherEl._jsPlumbParentGroup && !otherEl._jsPlumbParentGroup.proxied && otherEl._jsPlumbParentGroup.collapsed) {
        return false;
      }
      var es = conn.endpoints[0].element,
          esg = es._jsPlumbParentGroup,
          esgcp = esg != null ? esg.collapseParent || esg : null,
          et = conn.endpoints[1].element,
          etg = et._jsPlumbParentGroup,
          etgcp = etg != null ? etg.collapseParent || etg : null;
      if (esgcp == null || etgcp == null || esgcp.id !== etgcp.id) {
        var groupEl = group.el;
            this.instance.getId(groupEl);
        this.instance.proxyConnection(conn, index, groupEl,
        function (conn, index) {
          return group.getEndpoint(conn, index);
        }, function (conn, index) {
          return group.getAnchor(conn, index);
        });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "_expandConnection",
    value: function _expandConnection(c, index, group) {
      this.instance.unproxyConnection(c, index);
    }
  }, {
    key: "isElementDescendant",
    value: function isElementDescendant(el, parentEl) {
      var c = this.instance.getContainer();
      var abort = false;
      while (!abort) {
        if (el == null || el === c) {
          return false;
        } else {
          if (el === parentEl) {
            return true;
          } else {
            el = el.parentNode;
          }
        }
      }
    }
  }, {
    key: "collapseGroup",
    value: function collapseGroup(group) {
      var _this4 = this;
      var actualGroup = this.getGroup(group);
      if (actualGroup == null || actualGroup.collapsed) {
        return;
      }
      var groupEl = actualGroup.el;
      if (actualGroup.collapseParent == null) {
        this.instance.setGroupVisible(actualGroup, false);
        actualGroup.collapsed = true;
        this.instance.removeClass(groupEl, CLASS_GROUP_EXPANDED);
        this.instance.addClass(groupEl, CLASS_GROUP_COLLAPSED);
        if (actualGroup.proxied) {
          var collapsedConnectionIds = new Set();
          var _collapseSet = function _collapseSet(conns, index) {
            for (var i = 0; i < conns.length; i++) {
              var c = conns[i];
              if (_this4._collapseConnection(c, index, actualGroup) === true) {
                collapsedConnectionIds.add(c.id);
              }
            }
          };
          _collapseSet(actualGroup.connections.source, 0);
          _collapseSet(actualGroup.connections.target, 1);
          util.forEach(actualGroup.getGroups(), function (cg) {
            _this4.cascadeCollapse(actualGroup, cg, collapsedConnectionIds);
          });
        }
        this.instance.revalidate(groupEl);
        this.repaintGroup(actualGroup);
        this.instance.fire(EVENT_GROUP_COLLAPSE, {
          group: actualGroup
        });
      } else {
        actualGroup.collapsed = true;
        this.instance.removeClass(groupEl, CLASS_GROUP_EXPANDED);
        this.instance.addClass(groupEl, CLASS_GROUP_COLLAPSED);
      }
    }
  }, {
    key: "cascadeCollapse",
    value: function cascadeCollapse(collapsedGroup, targetGroup, collapsedIds) {
      var _this5 = this;
      if (collapsedGroup.proxied) {
        var _collapseSet = function _collapseSet(conns, index) {
          for (var i = 0; i < conns.length; i++) {
            var c = conns[i];
            if (!collapsedIds.has(c.id)) {
              if (_this5._collapseConnection(c, index, collapsedGroup) === true) {
                collapsedIds.add(c.id);
              }
            }
          }
        };
        _collapseSet(targetGroup.connections.source, 0);
        _collapseSet(targetGroup.connections.target, 1);
      }
      util.forEach(targetGroup.getGroups(), function (cg) {
        _this5.cascadeCollapse(collapsedGroup, cg, collapsedIds);
      });
    }
  }, {
    key: "expandGroup",
    value: function expandGroup(group, doNotFireEvent) {
      var _this6 = this;
      var actualGroup = this.getGroup(group);
      if (actualGroup == null) {
        return;
      }
      var groupEl = actualGroup.el;
      if (actualGroup.collapseParent == null) {
        this.instance.setGroupVisible(actualGroup, true);
        actualGroup.collapsed = false;
        this.instance.addClass(groupEl, CLASS_GROUP_EXPANDED);
        this.instance.removeClass(groupEl, CLASS_GROUP_COLLAPSED);
        if (actualGroup.proxied) {
          var _expandSet = function _expandSet(conns, index) {
            for (var i = 0; i < conns.length; i++) {
              var c = conns[i];
              _this6._expandConnection(c, index, actualGroup);
            }
          };
          _expandSet(actualGroup.connections.source, 0);
          _expandSet(actualGroup.connections.target, 1);
          var _expandNestedGroup = function _expandNestedGroup(group, ignoreCollapsedStateForNested) {
            if (ignoreCollapsedStateForNested || group.collapsed) {
              var _collapseSet = function _collapseSet(conns, index) {
                for (var i = 0; i < conns.length; i++) {
                  var c = conns[i];
                  _this6._collapseConnection(c, index, group.collapseParent || group);
                }
              };
              _collapseSet(group.connections.source, 0);
              _collapseSet(group.connections.target, 1);
              util.forEach(group.connections.internal, function (c) {
                return Connections.setVisible(c, false);
              });
              util.forEach(group.getGroups(), function (g) {
                return _expandNestedGroup(g, true);
              });
            } else {
              _this6.expandGroup(group, true);
            }
          };
          util.forEach(actualGroup.getGroups(), _expandNestedGroup);
        }
        this.instance.revalidate(groupEl);
        this.repaintGroup(actualGroup);
        if (!doNotFireEvent) {
          this.instance.fire(EVENT_GROUP_EXPAND, {
            group: actualGroup
          });
        }
      } else {
        actualGroup.collapsed = false;
        this.instance.addClass(groupEl, CLASS_GROUP_EXPANDED);
        this.instance.removeClass(groupEl, CLASS_GROUP_COLLAPSED);
      }
    }
  }, {
    key: "toggleGroup",
    value: function toggleGroup(group) {
      group = this.getGroup(group);
      if (group != null) {
        if (group.collapsed) {
          this.expandGroup(group);
        } else {
          this.collapseGroup(group);
        }
      }
    }
  }, {
    key: "repaintGroup",
    value: function repaintGroup(group) {
      var actualGroup = this.getGroup(group);
      var m = actualGroup.children;
      for (var i = 0; i < m.length; i++) {
        this.instance.revalidate(m[i].el);
      }
    }
  }, {
    key: "addToGroup",
    value: function addToGroup(group, doNotFireEvent) {
      var _this7 = this;
      var actualGroup = this.getGroup(group);
      if (actualGroup) {
        var groupEl = actualGroup.el;
        for (var _len = arguments.length, el = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          el[_key - 2] = arguments[_key];
        }
        el.forEach(function (_el) {
          var jel = _el;
          var isGroup = jel._isJsPlumbGroup != null,
              droppingGroup = jel._jsPlumbGroup,
              currentGroup = jel._jsPlumbParentGroup;
          if (currentGroup !== actualGroup) {
            var entry = _this7.instance.manage(_el);
            var elpos = _this7.instance.getOffset(_el);
            var cpos = actualGroup.collapsed ? _this7.instance.getOffsetRelativeToRoot(groupEl) : _this7.instance.getOffset(_this7.instance.getGroupContentArea(actualGroup));
            entry.group = actualGroup.elId;
            if (currentGroup != null) {
              currentGroup.remove(_el, false, doNotFireEvent, false, actualGroup);
              _this7._updateConnectionsForGroup(currentGroup);
            }
            if (isGroup) {
              actualGroup.addGroup(droppingGroup);
            } else {
              actualGroup.add(_el, doNotFireEvent);
            }
            var handleDroppedConnections = function handleDroppedConnections(list, index) {
              var oidx = index === 0 ? 1 : 0;
              list.each(function (c) {
                Connections.setVisible(c, false);
                if (c.endpoints[oidx].element._jsPlumbGroup === actualGroup) {
                  Endpoints.setVisible(c.endpoints[oidx], false);
                  _this7._expandConnection(c, oidx, actualGroup);
                } else {
                  Endpoints.setVisible(c.endpoints[index], false);
                  _this7._collapseConnection(c, index, actualGroup);
                }
              });
            };
            if (actualGroup.collapsed) {
              handleDroppedConnections(_this7.instance.select({
                source: _el
              }), 0);
              handleDroppedConnections(_this7.instance.select({
                target: _el
              }), 1);
            }
            var newPosition = {
              x: elpos.x - cpos.x,
              y: elpos.y - cpos.y
            };
            _this7.instance.setPosition(_el, newPosition);
            _this7._updateConnectionsForGroup(actualGroup);
            _this7.instance.revalidate(_el);
            if (!doNotFireEvent) {
              var p = {
                group: actualGroup,
                el: jel,
                pos: newPosition
              };
              if (currentGroup) {
                p.sourceGroup = currentGroup;
              }
              _this7.instance.fire(EVENT_GROUP_MEMBER_ADDED, p);
            }
          }
        });
      }
    }
  }, {
    key: "removeFromGroup",
    value: function removeFromGroup(group, doNotFireEvent) {
      var _this8 = this;
      var actualGroup = this.getGroup(group);
      if (actualGroup) {
        var _one = function _one(_el) {
          if (actualGroup.collapsed) {
            var _expandSet = function _expandSet(conns, index) {
              for (var i = 0; i < conns.length; i++) {
                var c = conns[i];
                if (c.proxies) {
                  for (var j = 0; j < c.proxies.length; j++) {
                    if (c.proxies[j] != null) {
                      var proxiedElement = c.proxies[j].originalEp.element;
                      if (proxiedElement === _el || _this8.isElementDescendant(proxiedElement, _el)) {
                        _this8._expandConnection(c, index, actualGroup);
                      }
                    }
                  }
                }
              }
            };
            _expandSet(actualGroup.connections.source.slice(), 0);
            _expandSet(actualGroup.connections.target.slice(), 1);
          }
          actualGroup.remove(_el, null, doNotFireEvent);
          var entry = _this8.instance.getManagedElements()[_this8.instance.getId(_el)];
          if (entry) {
            delete entry.group;
          }
        };
        for (var _len2 = arguments.length, el = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          el[_key2 - 2] = arguments[_key2];
        }
        util.forEach(el, _one);
      }
    }
  }, {
    key: "getAncestors",
    value: function getAncestors(group) {
      var ancestors = [];
      var p = group.group;
      while (p != null) {
        ancestors.push(p);
        p = p.group;
      }
      return ancestors;
    }
  }, {
    key: "isAncestor",
    value: function isAncestor(group, possibleAncestor) {
      if (group == null || possibleAncestor == null) {
        return false;
      }
      return this.getAncestors(group).indexOf(possibleAncestor) !== -1;
    }
  }, {
    key: "getDescendants",
    value: function getDescendants(group) {
      var d = [];
      var _one = function _one(g) {
        var childGroups = g.getGroups();
        d.push.apply(d, _toConsumableArray(childGroups));
        util.forEach(childGroups, _one);
      };
      _one(group);
      return d;
    }
  }, {
    key: "isDescendant",
    value: function isDescendant(possibleDescendant, ancestor) {
      if (possibleDescendant == null || ancestor == null) {
        return false;
      }
      return this.getDescendants(ancestor).indexOf(possibleDescendant) !== -1;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._connectionSourceMap = {};
      this._connectionTargetMap = {};
      this.groupMap = {};
    }
  }]);
  return GroupManager;
}();

var SelectionBase = function () {
  function SelectionBase(instance, entries) {
    _classCallCheck(this, SelectionBase);
    this.instance = instance;
    this.entries = entries;
  }
  _createClass(SelectionBase, [{
    key: "length",
    get: function get() {
      return this.entries.length;
    }
  }, {
    key: "each",
    value: function each(handler) {
      util.forEach(this.entries, function (e) {
        return handler(e);
      });
      return this;
    }
  }, {
    key: "get",
    value: function get(index) {
      return this.entries[index];
    }
  }, {
    key: "addClass",
    value: function addClass(clazz, cascade) {
      this.each(function (c) {
        return Components.addClass(c, clazz, cascade);
      });
      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass(clazz, cascade) {
      this.each(function (c) {
        return Components.removeClass(c, clazz, cascade);
      });
      return this;
    }
  }, {
    key: "removeAllOverlays",
    value: function removeAllOverlays() {
      this.each(function (c) {
        return Components.removeAllOverlays(c);
      });
      return this;
    }
  }, {
    key: "setLabel",
    value: function setLabel(label) {
      this.each(function (c) {
        return Components.setLabel(c, label);
      });
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.entries.length = 0;
      return this;
    }
  }, {
    key: "map",
    value: function map(fn) {
      var a = [];
      this.each(function (e) {
        return a.push(fn(e));
      });
      return a;
    }
  }, {
    key: "addOverlay",
    value: function addOverlay(spec) {
      this.each(function (c) {
        return Components.addOverlay(c, spec);
      });
      return this;
    }
  }, {
    key: "removeOverlay",
    value: function removeOverlay(id) {
      this.each(function (c) {
        return Components.removeOverlay(c, id);
      });
      return this;
    }
  }, {
    key: "removeOverlays",
    value: function removeOverlays() {
      this.each(function (c) {
        return Components.removeOverlays(c);
      });
      return this;
    }
  }, {
    key: "showOverlay",
    value: function showOverlay(id) {
      this.each(function (c) {
        return Components.showOverlay(c, id);
      });
      return this;
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay(id) {
      this.each(function (c) {
        return Components.hideOverlay(c, id);
      });
      return this;
    }
  }, {
    key: "setPaintStyle",
    value: function setPaintStyle(style) {
      this.each(function (c) {
        return Components.setPaintStyle(c, style);
      });
      return this;
    }
  }, {
    key: "setHoverPaintStyle",
    value: function setHoverPaintStyle(style) {
      this.each(function (c) {
        return Components.setHoverPaintStyle(c, style);
      });
      return this;
    }
  }, {
    key: "setParameter",
    value: function setParameter(name, value) {
      this.each(function (c) {
        return c.parameters[name] = value;
      });
      return this;
    }
  }, {
    key: "setParameters",
    value: function setParameters(p) {
      this.each(function (c) {
        return c.parameters = p;
      });
      return this;
    }
  }, {
    key: "setVisible",
    value: function setVisible(v) {
      this.each(function (c) {
        return Components.setVisible(c, v);
      });
      return this;
    }
  }, {
    key: "addType",
    value: function addType(name) {
      this.each(function (c) {
        return Components.addType(c, name);
      });
      return this;
    }
  }, {
    key: "toggleType",
    value: function toggleType(name) {
      this.each(function (c) {
        return Components.toggleType(c, name);
      });
      return this;
    }
  }, {
    key: "removeType",
    value: function removeType(name) {
      this.each(function (c) {
        return Components.removeType(c, name);
      });
      return this;
    }
  }, {
    key: "setHover",
    value: function setHover(h) {
      var _this = this;
      this.each(function (c) {
        return _this.instance.setHover(c, h);
      });
      return this;
    }
  }]);
  return SelectionBase;
}();

var EndpointSelection = function (_SelectionBase) {
  _inherits(EndpointSelection, _SelectionBase);
  var _super = _createSuper(EndpointSelection);
  function EndpointSelection() {
    _classCallCheck(this, EndpointSelection);
    return _super.apply(this, arguments);
  }
  _createClass(EndpointSelection, [{
    key: "setEnabled",
    value: function setEnabled(e) {
      this.each(function (ep) {
        return ep.enabled = e;
      });
      return this;
    }
  }, {
    key: "setAnchor",
    value: function setAnchor(a) {
      this.each(function (ep) {
        return Endpoints.setAnchor(ep, a);
      });
      return this;
    }
  }, {
    key: "deleteEveryConnection",
    value: function deleteEveryConnection() {
      this.each(function (ep) {
        return Endpoints.deleteEveryConnection(ep);
      });
      return this;
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      var _this = this;
      this.each(function (ep) {
        return _this.instance.deleteEndpoint(ep);
      });
      this.clear();
      return this;
    }
  }]);
  return EndpointSelection;
}(SelectionBase);

var ConnectionSelection = function (_SelectionBase) {
  _inherits(ConnectionSelection, _SelectionBase);
  var _super = _createSuper(ConnectionSelection);
  function ConnectionSelection() {
    _classCallCheck(this, ConnectionSelection);
    return _super.apply(this, arguments);
  }
  _createClass(ConnectionSelection, [{
    key: "setDetachable",
    value: function setDetachable(d) {
      this.each(function (c) {
        return Connections.setDetachable(c, d);
      });
      return this;
    }
  }, {
    key: "setReattach",
    value: function setReattach(d) {
      this.each(function (c) {
        return Connections.setReattach(c, d);
      });
      return this;
    }
  }, {
    key: "setConnector",
    value: function setConnector(spec) {
      this.each(function (c) {
        return Connections.setConnector(c, spec);
      });
      return this;
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      var _this = this;
      this.each(function (c) {
        return _this.instance.deleteConnection(c);
      });
      this.clear();
    }
  }, {
    key: "repaint",
    value: function repaint() {
      var _this2 = this;
      this.each(function (c) {
        return _this2.instance._paintConnection(c);
      });
      return this;
    }
  }]);
  return ConnectionSelection;
}(SelectionBase);

var Transaction = function Transaction() {
  _classCallCheck(this, Transaction);
  _defineProperty(this, "affectedElements", new Set());
};
function EMPTY_POSITION() {
  return {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    r: 0,
    c: {
      x: 0,
      y: 0
    },
    x2: 0,
    y2: 0,
    t: {
      x: 0,
      y: 0,
      c: {
        x: 0,
        y: 0
      },
      w: 0,
      h: 0,
      r: 0,
      x2: 0,
      y2: 0,
      cr: 0,
      sr: 0
    },
    dirty: true
  };
}
function rotate(x, y, w, h, r) {
  var center = {
    x: x + w / 2,
    y: y + h / 2
  },
      cr = Math.cos(r / 360 * Math.PI * 2),
      sr = Math.sin(r / 360 * Math.PI * 2),
      _point = function _point(x, y) {
    return {
      x: center.x + Math.round((x - center.x) * cr - (y - center.y) * sr),
      y: center.y + Math.round((y - center.y) * cr - (x - center.x) * sr)
    };
  };
  var p1 = _point(x, y),
      p2 = _point(x + w, y),
      p3 = _point(x + w, y + h),
      p4 = _point(x, y + h),
      c = _point(x + w / 2, y + h / 2);
  var xmin = Math.min(p1.x, p2.x, p3.x, p4.x),
      xmax = Math.max(p1.x, p2.x, p3.x, p4.x),
      ymin = Math.min(p1.y, p2.y, p3.y, p4.y),
      ymax = Math.max(p1.y, p2.y, p3.y, p4.y);
  return {
    x: xmin,
    y: ymin,
    w: xmax - xmin,
    h: ymax - ymin,
    c: c,
    r: r,
    x2: xmax,
    y2: ymax,
    cr: cr,
    sr: sr
  };
}
var entryComparator = function entryComparator(value, arrayEntry) {
  var c = 0;
  if (arrayEntry[1] > value[1]) {
    c = -1;
  } else if (arrayEntry[1] < value[1]) {
    c = 1;
  }
  return c;
};
var reverseEntryComparator = function reverseEntryComparator(value, arrayEntry) {
  return entryComparator(value, arrayEntry) * -1;
};
function _updateElementIndex(id, value, array, sortDescending) {
  util.insertSorted([id, value], array, entryComparator, sortDescending);
}
function _clearElementIndex(id, array) {
  var idx = util.findWithFunction(array, function (entry) {
    return entry[0] === id;
  });
  if (idx > -1) {
    array.splice(idx, 1);
  }
}
var Viewport = function (_EventGenerator) {
  _inherits(Viewport, _EventGenerator);
  var _super = _createSuper(Viewport);
  function Viewport(instance) {
    var _this;
    _classCallCheck(this, Viewport);
    _this = _super.call(this);
    _this.instance = instance;
    _defineProperty(_assertThisInitialized(_this), "_currentTransaction", null);
    _defineProperty(_assertThisInitialized(_this), "_sortedElements", {
      xmin: [],
      xmax: [],
      ymin: [],
      ymax: []
    });
    _defineProperty(_assertThisInitialized(_this), "_elementMap", new Map());
    _defineProperty(_assertThisInitialized(_this), "_transformedElementMap", new Map());
    _defineProperty(_assertThisInitialized(_this), "_bounds", {
      minx: 0,
      maxx: 0,
      miny: 0,
      maxy: 0
    });
    return _this;
  }
  _createClass(Viewport, [{
    key: "_updateBounds",
    value: function _updateBounds(id, updatedElement, doNotRecalculateBounds) {
      if (updatedElement != null) {
        _clearElementIndex(id, this._sortedElements.xmin);
        _clearElementIndex(id, this._sortedElements.xmax);
        _clearElementIndex(id, this._sortedElements.ymin);
        _clearElementIndex(id, this._sortedElements.ymax);
        _updateElementIndex(id, updatedElement.t.x, this._sortedElements.xmin, false);
        _updateElementIndex(id, updatedElement.t.x + updatedElement.t.w, this._sortedElements.xmax, true);
        _updateElementIndex(id, updatedElement.t.y, this._sortedElements.ymin, false);
        _updateElementIndex(id, updatedElement.t.y + updatedElement.t.h, this._sortedElements.ymax, true);
        if (doNotRecalculateBounds !== true) {
          this._recalculateBounds();
        }
      }
    }
  }, {
    key: "_recalculateBounds",
    value: function _recalculateBounds() {
      this._bounds.minx = this._sortedElements.xmin.length > 0 ? this._sortedElements.xmin[0][1] : 0;
      this._bounds.maxx = this._sortedElements.xmax.length > 0 ? this._sortedElements.xmax[0][1] : 0;
      this._bounds.miny = this._sortedElements.ymin.length > 0 ? this._sortedElements.ymin[0][1] : 0;
      this._bounds.maxy = this._sortedElements.ymax.length > 0 ? this._sortedElements.ymax[0][1] : 0;
    }
  }, {
    key: "recomputeBounds",
    value: function recomputeBounds() {
      var _this2 = this;
      this._sortedElements.xmin.length = 0;
      this._sortedElements.xmax.length = 0;
      this._sortedElements.ymin.length = 0;
      this._sortedElements.ymax.length = 0;
      this._elementMap.forEach(function (vp, id) {
        _this2._sortedElements.xmin.push([id, vp.t.x]);
        _this2._sortedElements.xmax.push([id, vp.t.x + vp.t.w]);
        _this2._sortedElements.ymin.push([id, vp.t.y]);
        _this2._sortedElements.ymax.push([id, vp.t.y + vp.t.h]);
      });
      this._sortedElements.xmin.sort(entryComparator);
      this._sortedElements.ymin.sort(entryComparator);
      this._sortedElements.xmax.sort(reverseEntryComparator);
      this._sortedElements.ymax.sort(reverseEntryComparator);
      this._recalculateBounds();
    }
  }, {
    key: "_finaliseUpdate",
    value: function _finaliseUpdate(id, e, doNotRecalculateBounds) {
      e.t = rotate(e.x, e.y, e.w, e.h, e.r);
      this._transformedElementMap.set(id, e.t);
      if (doNotRecalculateBounds !== true) {
        this._updateBounds(id, e, doNotRecalculateBounds);
      }
    }
  }, {
    key: "shouldFireEvent",
    value: function shouldFireEvent(event, value, originalEvent) {
      return true;
    }
  }, {
    key: "startTransaction",
    value: function startTransaction() {
      if (this._currentTransaction != null) {
        throw new Error("Viewport: cannot start transaction; a transaction is currently active.");
      }
      this._currentTransaction = new Transaction();
    }
  }, {
    key: "endTransaction",
    value: function endTransaction() {
      var _this3 = this;
      if (this._currentTransaction != null) {
        this._currentTransaction.affectedElements.forEach(function (id) {
          var entry = _this3.getPosition(id);
          _this3._finaliseUpdate(id, entry, true);
        });
        this.recomputeBounds();
        this._currentTransaction = null;
      }
    }
  }, {
    key: "updateElements",
    value: function updateElements(entries) {
      var _this4 = this;
      util.forEach(entries, function (e) {
        return _this4.updateElement(e.id, e.x, e.y, e.width, e.height, e.rotation);
      });
    }
  }, {
    key: "updateElement",
    value: function updateElement(id, x, y, width, height, rotation, doNotRecalculateBounds) {
      var e = util.getsert(this._elementMap, id, EMPTY_POSITION);
      e.dirty = x == null && e.x == null || y == null && e.y == null || width == null && e.w == null || height == null && e.h == null;
      if (x != null) {
        e.x = x;
      }
      if (y != null) {
        e.y = y;
      }
      if (width != null) {
        e.w = width;
      }
      if (height != null) {
        e.h = height;
      }
      if (rotation != null) {
        e.r = rotation || 0;
      }
      e.c.x = e.x + e.w / 2;
      e.c.y = e.y + e.h / 2;
      e.x2 = e.x + e.w;
      e.y2 = e.y + e.h;
      if (this._currentTransaction == null) {
        this._finaliseUpdate(id, e, doNotRecalculateBounds);
      } else {
        this._currentTransaction.affectedElements.add(id);
      }
      return e;
    }
  }, {
    key: "refreshElement",
    value: function refreshElement(elId, doNotRecalculateBounds) {
      var me = this.instance.getManagedElements();
      var s = me[elId] ? me[elId].el : null;
      if (s != null) {
        var size = this.getSize(s);
        var offset = this.getOffset(s);
        return this.updateElement(elId, offset.x, offset.y, size.w, size.h, null, doNotRecalculateBounds);
      } else {
        return null;
      }
    }
  }, {
    key: "getSize",
    value: function getSize(el) {
      return this.instance.getSize(el);
    }
  }, {
    key: "getOffset",
    value: function getOffset(el) {
      return this.instance.getOffset(el);
    }
  }, {
    key: "registerElement",
    value: function registerElement(id, doNotRecalculateBounds) {
      return this.updateElement(id, 0, 0, 0, 0, 0, doNotRecalculateBounds);
    }
  }, {
    key: "addElement",
    value: function addElement(id, x, y, width, height, rotation) {
      return this.updateElement(id, x, y, width, height, rotation);
    }
  }, {
    key: "rotateElement",
    value: function rotateElement(id, rotation) {
      var e = util.getsert(this._elementMap, id, EMPTY_POSITION);
      e.r = rotation || 0;
      this._finaliseUpdate(id, e);
      return e;
    }
  }, {
    key: "getBoundsWidth",
    value: function getBoundsWidth() {
      return this._bounds.maxx - this._bounds.minx;
    }
  }, {
    key: "getBoundsHeight",
    value: function getBoundsHeight() {
      return this._bounds.maxy - this._bounds.miny;
    }
  }, {
    key: "getX",
    value: function getX() {
      return this._bounds.minx;
    }
  }, {
    key: "getY",
    value: function getY() {
      return this._bounds.miny;
    }
  }, {
    key: "setSize",
    value: function setSize(id, w, h) {
      if (this._elementMap.has(id)) {
        return this.updateElement(id, null, null, w, h, null);
      }
    }
  }, {
    key: "setPosition",
    value: function setPosition(id, x, y) {
      if (this._elementMap.has(id)) {
        return this.updateElement(id, x, y, null, null, null);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._sortedElements.xmin.length = 0;
      this._sortedElements.xmax.length = 0;
      this._sortedElements.ymin.length = 0;
      this._sortedElements.ymax.length = 0;
      this._elementMap.clear();
      this._transformedElementMap.clear();
      this._recalculateBounds();
    }
  }, {
    key: "remove",
    value: function remove(id) {
      _clearElementIndex(id, this._sortedElements.xmin);
      _clearElementIndex(id, this._sortedElements.xmax);
      _clearElementIndex(id, this._sortedElements.ymin);
      _clearElementIndex(id, this._sortedElements.ymax);
      this._elementMap["delete"](id);
      this._transformedElementMap["delete"](id);
      this._recalculateBounds();
    }
  }, {
    key: "getPosition",
    value: function getPosition(id) {
      return this._elementMap.get(id);
    }
  }, {
    key: "getElements",
    value: function getElements() {
      return this._elementMap;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._elementMap.size === 0;
    }
  }]);
  return Viewport;
}(util.EventGenerator);

var segmentMap = {};
var Segments = {
  register: function register(segmentType, segmentHandler) {
    segmentMap[segmentType] = segmentHandler;
  },
  get: function get(segmentType) {
    var sh = segmentMap[segmentType];
    if (!sh) {
      throw {
        message: "jsPlumb: no segment handler found for segment type '" + segmentType + "'"
      };
    } else {
      return sh;
    }
  }
};

function _getHandler(segment) {
  return Segments.get(segment.type);
}
function _getSegmentLength(segment) {
  return _getHandler(segment).getLength(segment);
}
function transformAnchorPlacement(a, dx, dy) {
  return {
    x: a.x,
    y: a.y,
    ox: a.ox,
    oy: a.oy,
    curX: a.curX + dx,
    curY: a.curY + dy
  };
}
function findSegmentForPoint(connector, x, y) {
  var out = {
    d: Infinity,
    s: null,
    x: null,
    y: null,
    l: null,
    x1: null,
    y1: null,
    x2: null,
    y2: null,
    index: null,
    connectorLocation: null
  };
  for (var i = 0; i < connector.segments.length; i++) {
    var _s = _getHandler(connector.segments[i]).findClosestPointOnPath(connector.segments[i], x, y);
    if (_s.d < out.d) {
      out.d = _s.d;
      out.l = _s.l;
      out.x = _s.x;
      out.y = _s.y;
      out.s = connector.segments[i];
      out.x1 = _s.x1;
      out.x2 = _s.x2;
      out.y1 = _s.y1;
      out.y2 = _s.y2;
      out.index = i;
      out.connectorLocation = connector.segmentProportions[i][0] + _s.l * (connector.segmentProportions[i][1] - connector.segmentProportions[i][0]);
    }
  }
  return out;
}
function lineIntersection(connector, x1, y1, x2, y2) {
  var out = [];
  for (var i = 0; i < connector.segments.length; i++) {
    out.push.apply(out, _getHandler(connector.segments[i]).lineIntersection(connector.segments[i], x1, y1, x2, y2));
  }
  return out;
}
function connectorBoxIntersection(connector, x, y, w, h) {
  var out = [];
  for (var i = 0; i < connector.segments.length; i++) {
    out.push.apply(out, _getHandler(connector.segments[i]).boxIntersection(connector.segments[i], x, y, w, h));
  }
  return out;
}
function connectorBoundingBoxIntersection(connector, box) {
  var out = [];
  for (var i = 0; i < connector.segments.length; i++) {
    out.push.apply(out, _getHandler(connector.segments[i]).boundingBoxIntersection(connector.segments[i], box));
  }
  return out;
}
function _findSegmentForLocation(connector, location, absolute) {
  var idx, i, inSegmentProportion;
  if (absolute) {
    location = location > 0 ? location / connector.totalLength : (connector.totalLength + location) / connector.totalLength;
  }
  if (location === 1) {
    idx = connector.segments.length - 1;
    inSegmentProportion = 1;
  } else if (location === 0) {
    inSegmentProportion = 0;
    idx = 0;
  } else {
    if (location >= 0.5) {
      idx = 0;
      inSegmentProportion = 0;
      for (i = connector.segmentProportions.length - 1; i > -1; i--) {
        if (connector.segmentProportions[i][1] >= location && connector.segmentProportions[i][0] <= location) {
          idx = i;
          inSegmentProportion = (location - connector.segmentProportions[i][0]) / connector.segmentProportionalLengths[i];
          break;
        }
      }
    } else {
      idx = connector.segmentProportions.length - 1;
      inSegmentProportion = 1;
      for (i = 0; i < connector.segmentProportions.length; i++) {
        if (connector.segmentProportions[i][1] >= location) {
          idx = i;
          inSegmentProportion = (location - connector.segmentProportions[i][0]) / connector.segmentProportionalLengths[i];
          break;
        }
      }
    }
  }
  return {
    segment: connector.segments[idx],
    proportion: inSegmentProportion,
    index: idx
  };
}
function pointOnComponentPath(connector, location, absolute) {
  var seg = _findSegmentForLocation(connector, location, absolute);
  return seg.segment && _getHandler(seg.segment).pointOnPath(seg.segment, seg.proportion, false) || {
    x: 0,
    y: 0
  };
}
function gradientAtComponentPoint(connector, location, absolute) {
  var seg = _findSegmentForLocation(connector, location, absolute);
  return seg.segment && _getHandler(seg.segment).gradientAtPoint(seg.segment, seg.proportion, false) || 0;
}
function pointAlongComponentPathFrom(connector, location, distance, absolute) {
  var seg = _findSegmentForLocation(connector, location, absolute);
  return seg.segment && Segments.get(seg.segment.type).pointAlongPathFrom(seg.segment, seg.proportion, distance, false) || {
    x: 0,
    y: 0
  };
}
function _updateSegmentProportions(connector) {
  var curLoc = 0;
  for (var i = 0; i < connector.segments.length; i++) {
    var sl = _getSegmentLength(connector.segments[i]);
    connector.segmentProportionalLengths[i] = sl / connector.totalLength;
    connector.segmentProportions[i] = [curLoc, curLoc += sl / connector.totalLength];
  }
}
function updateBounds(connector, segment) {
  var segBounds = segment.extents;
  connector.bounds.xmin = Math.min(connector.bounds.xmin, segBounds.xmin);
  connector.bounds.xmax = Math.max(connector.bounds.xmax, segBounds.xmax);
  connector.bounds.ymin = Math.min(connector.bounds.ymin, segBounds.ymin);
  connector.bounds.ymax = Math.max(connector.bounds.ymax, segBounds.ymax);
}
function _addSegment(connector, segmentType, params) {
  if (params.x1 === params.x2 && params.y1 === params.y2) {
    return;
  }
  var handler = Segments.get(segmentType);
  var s = handler.create(segmentType, params);
  connector.segments.push(s);
  connector.totalLength += handler.getLength(s);
  updateBounds(connector, s);
}
function _clearSegments(connector) {
  connector.totalLength = 0;
  connector.segments.length = 0;
  connector.segmentProportions.length = 0;
  connector.segmentProportionalLengths.length = 0;
}
function _prepareCompute(connector, params) {
  connector.strokeWidth = params.strokeWidth;
  var x1 = params.sourcePos.curX,
      x2 = params.targetPos.curX,
      y1 = params.sourcePos.curY,
      y2 = params.targetPos.curY,
      segment = util.quadrant({
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  }),
      swapX = x2 < x1,
      swapY = y2 < y1,
      so = [params.sourcePos.ox, params.sourcePos.oy],
      to = [params.targetPos.ox, params.targetPos.oy],
      x = swapX ? x2 : x1,
      y = swapY ? y2 : y1,
      w = Math.abs(x2 - x1),
      h = Math.abs(y2 - y1);
  var noSourceOrientation = so[0] === 0 && so[1] === 0;
  var noTargetOrientation = to[0] === 0 && to[1] === 0;
  if (noSourceOrientation || noTargetOrientation) {
    var index = w > h ? 0 : 1,
        oIndex = [1, 0][index],
        v1 = index === 0 ? x1 : y1,
        v2 = index === 0 ? x2 : y2;
    if (noSourceOrientation) {
      so[index] = v1 > v2 ? -1 : 1;
      so[oIndex] = 0;
    }
    if (noTargetOrientation) {
      to[index] = v1 > v2 ? 1 : -1;
      to[oIndex] = 0;
    }
  }
  var sx = swapX ? w + connector.sourceGap * so[0] : connector.sourceGap * so[0],
      sy = swapY ? h + connector.sourceGap * so[1] : connector.sourceGap * so[1],
      tx = swapX ? connector.targetGap * to[0] : w + connector.targetGap * to[0],
      ty = swapY ? connector.targetGap * to[1] : h + connector.targetGap * to[1],
      oProduct = so[0] * to[0] + so[1] * to[1];
  var result = {
    sx: sx,
    sy: sy,
    tx: tx,
    ty: ty,
    xSpan: Math.abs(tx - sx),
    ySpan: Math.abs(ty - sy),
    mx: (sx + tx) / 2,
    my: (sy + ty) / 2,
    so: so,
    to: to,
    x: x,
    y: y,
    w: w,
    h: h,
    segment: segment,
    startStubX: sx + so[0] * connector.sourceStub,
    startStubY: sy + so[1] * connector.sourceStub,
    endStubX: tx + to[0] * connector.targetStub,
    endStubY: ty + to[1] * connector.targetStub,
    isXGreaterThanStubTimes2: Math.abs(sx - tx) > connector.sourceStub + connector.targetStub,
    isYGreaterThanStubTimes2: Math.abs(sy - ty) > connector.sourceStub + connector.targetStub,
    opposite: oProduct === -1,
    perpendicular: oProduct === 0,
    orthogonal: oProduct === 1,
    sourceAxis: so[0] === 0 ? "y" : "x",
    points: [x, y, w, h, sx, sy, tx, ty],
    stubs: [connector.sourceStub, connector.targetStub]
  };
  result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
  return result;
}
function resetBounds(connector) {
  connector.bounds = common.EMPTY_BOUNDS();
}
function resetGeometry(connector) {
  connector.geometry = null;
  connector.edited = false;
}
function compute(connector, params) {
  connector.paintInfo = _prepareCompute(connector, params);
  _clearSegments(connector);
  Connectors.get(connector.type)._compute(connector, connector.paintInfo, params);
  connector.x = connector.paintInfo.points[0];
  connector.y = connector.paintInfo.points[1];
  connector.w = connector.paintInfo.points[2];
  connector.h = connector.paintInfo.points[3];
  connector.segment = connector.paintInfo.segment;
  _updateSegmentProportions(connector);
}
function dumpSegmentsToConsole(connector) {
  util.log("SEGMENTS:");
  for (var i = 0; i < this.segments.length; i++) {
    util.log(this.segments[i].type, "" + _getSegmentLength(this.segments[i]), "" + this.segmentProportions[i]);
  }
}
function setGeometry(connector, g, internal) {
  connector.geometry = g;
  connector.edited = g != null && !internal;
}
var TYPE_DESCRIPTOR_CONNECTOR = "connector";
function createConnectorBase(type, connection, params, defaultStubs) {
  var stub = params.stub || defaultStubs;
  var sourceStub = Array.isArray(stub) ? stub[0] : stub;
  var targetStub = Array.isArray(stub) ? stub[1] : stub;
  var gap = params.gap || 0;
  var sourceGap = Array.isArray(gap) ? gap[0] : gap;
  var targetGap = Array.isArray(gap) ? gap[1] : gap;
  var maxStub = Math.max(sourceStub, targetStub);
  var cssClass = params.cssClass || "";
  var hoverClass = params.hoverClass || "";
  return {
    stub: stub,
    sourceStub: sourceStub,
    targetStub: targetStub,
    gap: gap,
    sourceGap: sourceGap,
    targetGap: targetGap,
    maxStub: maxStub,
    cssClass: cssClass,
    hoverClass: hoverClass,
    connection: connection,
    segments: [],
    segmentProportions: [],
    segmentProportionalLengths: [],
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    edited: false,
    typeId: null,
    totalLength: 0,
    segment: 0,
    type: type,
    bounds: common.EMPTY_BOUNDS(),
    geometry: null,
    strokeWidth: 1,
    paintInfo: null,
    getTypeDescriptor: function getTypeDescriptor() {
      return TYPE_DESCRIPTOR_CONNECTOR;
    },
    getIdPrefix: function getIdPrefix() {
      return "_jsplumb_connector";
    }
  };
}

var _edgeSortFunctions;
function _placeAnchorsOnLine(element, connections, horizontal, otherMultiplier, reverse) {
  var sizeInAxis = horizontal ? element.w : element.h;
  var sizeInOtherAxis = horizontal ? element.h : element.w;
  var a = [],
      step = sizeInAxis / (connections.length + 1);
  for (var i = 0; i < connections.length; i++) {
    var val = (i + 1) * step,
        other = otherMultiplier * sizeInOtherAxis;
    if (reverse) {
      val = sizeInAxis - val;
    }
    var dx = horizontal ? val : other,
        x = element.x + dx,
        xp = dx / element.w;
    var dy = horizontal ? other : val,
        y = element.y + dy,
        yp = dy / element.h;
    if (element.r !== 0 && element.r != null) {
      var rotated = util.rotatePoint({
        x: x,
        y: y
      }, element.c, element.r);
      x = rotated.x;
      y = rotated.y;
    }
    a.push({
      x: x,
      y: y,
      xLoc: xp,
      yLoc: yp,
      c: connections[i].c
    });
  }
  return a;
}
function _rightAndBottomSort(a, b) {
  return b.theta - a.theta;
}
function _leftAndTopSort(a, b) {
  var p1 = a.theta < 0 ? -Math.PI - a.theta : Math.PI - a.theta,
      p2 = b.theta < 0 ? -Math.PI - b.theta : Math.PI - b.theta;
  return p1 - p2;
}
var edgeSortFunctions = (_edgeSortFunctions = {}, _defineProperty(_edgeSortFunctions, TOP, _leftAndTopSort), _defineProperty(_edgeSortFunctions, RIGHT, _rightAndBottomSort), _defineProperty(_edgeSortFunctions, BOTTOM, _rightAndBottomSort), _defineProperty(_edgeSortFunctions, LEFT, _leftAndTopSort), _edgeSortFunctions);
function isContinuous(a) {
  return a.isContinuous === true;
}
function _isFloating(a) {
  return a.isContinuous === true;
}
function isDynamic(a) {
  return a.locations.length > 1;
}
function getCurrentLocation(anchor) {
  return [anchor.currentLocation, anchor.locations[anchor.currentLocation]];
}
var LightweightRouter = function () {
  function LightweightRouter(instance) {
    var _this = this;
    _classCallCheck(this, LightweightRouter);
    this.instance = instance;
    _defineProperty(this, "anchorLists", new Map());
    _defineProperty(this, "anchorLocations", new Map());
    instance.bind(EVENT_INTERNAL_CONNECTION_DETACHED, function (p) {
      if (p.sourceEndpoint._anchor.isContinuous) {
        _this._removeEndpointFromAnchorLists(p.sourceEndpoint);
      }
      if (p.targetEndpoint._anchor.isContinuous) {
        _this._removeEndpointFromAnchorLists(p.targetEndpoint);
      }
    });
    instance.bind(EVENT_INTERNAL_ENDPOINT_UNREGISTERED, function (ep) {
      _this._removeEndpointFromAnchorLists(ep);
    });
  }
  _createClass(LightweightRouter, [{
    key: "getAnchorOrientation",
    value: function getAnchorOrientation(anchor) {
      var loc = this.anchorLocations.get(anchor.id);
      return loc ? [loc.ox, loc.oy] : [0, 0];
    }
  }, {
    key: "_distance",
    value: function _distance(anchor, cx, cy, xy, wh, rotation, targetRotation) {
      var ax = xy.x + anchor.x * wh.w,
          ay = xy.y + anchor.y * wh.h,
          acx = xy.x + wh.w / 2,
          acy = xy.y + wh.h / 2;
      if (rotation != null && rotation.length > 0) {
        var rotated = this.instance._applyRotations([ax, ay, 0, 0], rotation);
        ax = rotated.x;
        ay = rotated.y;
      }
      return Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) + Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2));
    }
  }, {
    key: "_anchorSelector",
    value: function _anchorSelector(xy, wh, txy, twh, rotation, targetRotation, locations) {
      var cx = txy.x + twh.w / 2,
          cy = txy.y + twh.h / 2;
      var minIdx = -1,
          minDist = Infinity;
      for (var i = 0; i < locations.length; i++) {
        var d = this._distance(locations[i], cx, cy, xy, wh, rotation, targetRotation);
        if (d < minDist) {
          minIdx = i + 0;
          minDist = d;
        }
      }
      return [minIdx, locations[minIdx]];
    }
  }, {
    key: "_floatingAnchorCompute",
    value: function _floatingAnchorCompute(anchor, params) {
      var xy = params.xy;
      var pos = {
        curX: xy.x + anchor.size.w / 2,
        curY: xy.y + anchor.size.h / 2,
        x: 0,
        y: 0,
        ox: 0,
        oy: 0
      };
      return this._setComputedPosition(anchor, pos);
    }
  }, {
    key: "_setComputedPosition",
    value: function _setComputedPosition(anchor, pos, timestamp) {
      this.anchorLocations.set(anchor.id, pos);
      anchor.computedPosition = pos;
      if (timestamp) {
        anchor.timestamp = timestamp;
      }
      return pos;
    }
  }, {
    key: "_computeSingleLocation",
    value: function _computeSingleLocation(loc, xy, wh, params) {
      var pos;
      var rotation = params.rotation;
      var candidate = {
        curX: xy.x + loc.x * wh.w + loc.offx,
        curY: xy.y + loc.y * wh.h + loc.offy,
        x: loc.x,
        y: loc.y,
        ox: 0,
        oy: 0
      };
      if (rotation != null && rotation.length > 0) {
        var o = [loc.iox, loc.ioy],
            current = {
          x: candidate.curX,
          y: candidate.curY,
          cr: 0,
          sr: 0
        };
        util.forEach(rotation, function (r) {
          current = util.rotatePoint(current, r.c, r.r);
          var _o = [Math.round(o[0] * current.cr - o[1] * current.sr), Math.round(o[1] * current.cr + o[0] * current.sr)];
          o = _o.slice();
        });
        loc.ox = o[0];
        loc.oy = o[1];
        pos = {
          curX: current.x,
          curY: current.y,
          x: loc.x,
          y: loc.y,
          ox: o[0],
          oy: o[1]
        };
      } else {
        loc.ox = loc.iox;
        loc.oy = loc.ioy;
        pos = util.extend({
          ox: loc.iox,
          oy: loc.ioy
        }, candidate);
      }
      return pos;
    }
  }, {
    key: "_singleAnchorCompute",
    value: function _singleAnchorCompute(anchor, params) {
      var xy = params.xy,
          wh = params.wh,
          timestamp = params.timestamp,
          pos = this.anchorLocations.get(anchor.id);
      if (pos != null && timestamp && timestamp === anchor.timestamp) {
        return pos;
      }
      var _getCurrentLocation = getCurrentLocation(anchor),
          _getCurrentLocation2 = _slicedToArray(_getCurrentLocation, 2);
          _getCurrentLocation2[0];
          var currentLoc = _getCurrentLocation2[1];
      pos = this._computeSingleLocation(currentLoc, xy, wh, params);
      return this._setComputedPosition(anchor, pos, timestamp);
    }
  }, {
    key: "_defaultAnchorCompute",
    value: function _defaultAnchorCompute(anchor, params) {
      var pos;
      if (anchor.locations.length === 1) {
        return this._singleAnchorCompute(anchor, params);
      }
      var xy = params.xy,
          wh = params.wh,
          txy = params.txy,
          twh = params.twh;
      var _getCurrentLocation3 = getCurrentLocation(anchor),
          _getCurrentLocation4 = _slicedToArray(_getCurrentLocation3, 2),
          currentIdx = _getCurrentLocation4[0],
          currentLoc = _getCurrentLocation4[1];
      if (anchor.locked || txy == null || twh == null) {
        pos = this._computeSingleLocation(currentLoc, xy, wh, params);
      } else {
        var _this$_anchorSelector = this._anchorSelector(xy, wh, txy, twh, params.rotation, params.tRotation, anchor.locations),
            _this$_anchorSelector2 = _slicedToArray(_this$_anchorSelector, 2),
            newIdx = _this$_anchorSelector2[0],
            newLoc = _this$_anchorSelector2[1];
        anchor.currentLocation = newIdx;
        if (newIdx !== currentIdx) {
          anchor.cssClass = newLoc.cls || anchor.cssClass;
          Endpoints._anchorLocationChanged(params.element, anchor);
        }
        pos = this._computeSingleLocation(newLoc, xy, wh, params);
      }
      return this._setComputedPosition(anchor, pos, params.timestamp);
    }
  }, {
    key: "_placeAnchors",
    value: function _placeAnchors(elementId, _anchorLists) {
      var _this2 = this;
      var cd = this.instance.viewport.getPosition(elementId),
          placeSomeAnchors = function placeSomeAnchors(desc, element, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
        if (unsortedConnections.length > 0) {
          var sc = unsortedConnections.sort(edgeSortFunctions[desc]),
          reverse = desc === RIGHT || desc === TOP,
              anchors = _placeAnchorsOnLine(cd, sc, isHorizontal, otherMultiplier, reverse);
          for (var i = 0; i < anchors.length; i++) {
            var c = anchors[i].c,
                weAreSource = c.endpoints[0].elementId === elementId,
                ep = weAreSource ? c.endpoints[0] : c.endpoints[1];
            _this2._setComputedPosition(ep._anchor, {
              curX: anchors[i].x,
              curY: anchors[i].y,
              x: anchors[i].xLoc,
              y: anchors[i].yLoc,
              ox: orientation[0],
              oy: orientation[1]
            });
          }
        }
      };
      placeSomeAnchors(BOTTOM, cd, _anchorLists.bottom, true, 1, [0, 1]);
      placeSomeAnchors(TOP, cd, _anchorLists.top, true, 0, [0, -1]);
      placeSomeAnchors(LEFT, cd, _anchorLists.left, false, 0, [-1, 0]);
      placeSomeAnchors(RIGHT, cd, _anchorLists.right, false, 1, [1, 0]);
    }
  }, {
    key: "_updateAnchorList",
    value: function _updateAnchorList(lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, connsToPaint, endpointsToPaint) {
      var endpoint = conn.endpoints[idx],
          endpointId = endpoint.id,
          oIdx = [1, 0][idx],
          values = {
        theta: theta,
        order: order,
        c: conn,
        b: aBoolean,
        elId: otherElId,
        epId: endpointId
      },
          listToAddTo = lists[edgeId],
          listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null,
          candidate;
      if (listToRemoveFrom) {
        var rIdx = util.findWithFunction(listToRemoveFrom, function (e) {
          return e.epId === endpointId;
        });
        if (rIdx !== -1) {
          listToRemoveFrom.splice(rIdx, 1);
          for (var i = 0; i < listToRemoveFrom.length; i++) {
            candidate = listToRemoveFrom[i].c;
            if (candidate.placeholder !== true) {
              connsToPaint.add(candidate);
            }
            endpointsToPaint.add(listToRemoveFrom[i].c.endpoints[idx]);
            endpointsToPaint.add(listToRemoveFrom[i].c.endpoints[oIdx]);
          }
        }
      }
      for (var _i = 0; _i < listToAddTo.length; _i++) {
        candidate = listToAddTo[_i].c;
        if (candidate.placeholder !== true) {
          connsToPaint.add(candidate);
        }
        endpointsToPaint.add(listToAddTo[_i].c.endpoints[idx]);
        endpointsToPaint.add(listToAddTo[_i].c.endpoints[oIdx]);
      }
      {
        var insertIdx = reverse ? 0 : listToAddTo.length;
        listToAddTo.splice(insertIdx, 0, values);
      }
      endpoint._continuousAnchorEdge = edgeId;
    }
  }, {
    key: "_removeEndpointFromAnchorLists",
    value: function _removeEndpointFromAnchorLists(endpoint) {
      var listsForElement = this.anchorLists.get(endpoint.elementId);
      var total = 0;
      (function (list, eId) {
        if (list) {
          var f = function f(e) {
            return e.epId === eId;
          };
          util.removeWithFunction(list.top, f);
          util.removeWithFunction(list.left, f);
          util.removeWithFunction(list.bottom, f);
          util.removeWithFunction(list.right, f);
          total += list.top.length;
          total += list.left.length;
          total += list.bottom.length;
          total += list.right.length;
        }
      })(listsForElement, endpoint.id);
      if (total === 0) {
        this.anchorLists["delete"](endpoint.elementId);
      }
      this.anchorLocations["delete"](endpoint._anchor.id);
    }
  }, {
    key: "computeAnchorLocation",
    value: function computeAnchorLocation(anchor, params) {
      var pos;
      if (isContinuous(anchor)) {
        pos = this.anchorLocations.get(anchor.id) || {
          curX: 0,
          curY: 0,
          x: 0,
          y: 0,
          ox: 0,
          oy: 0
        };
      } else if (_isFloating(anchor)) {
        pos = this._floatingAnchorCompute(anchor, params);
      } else {
        pos = this._defaultAnchorCompute(anchor, params);
      }
      anchor.timestamp = params.timestamp;
      return pos;
    }
  }, {
    key: "computePath",
    value: function computePath(connection, timestamp) {
      var sourceInfo = this.instance.viewport.getPosition(connection.sourceId),
          targetInfo = this.instance.viewport.getPosition(connection.targetId),
          sE = connection.endpoints[0],
          tE = connection.endpoints[1];
      var sAnchorP = this.getEndpointLocation(sE, {
        xy: sourceInfo,
        wh: sourceInfo,
        element: sE,
        timestamp: timestamp,
        rotation: this.instance._getRotations(connection.sourceId)
      }),
          tAnchorP = this.getEndpointLocation(tE, {
        xy: targetInfo,
        wh: targetInfo,
        element: tE,
        timestamp: timestamp,
        rotation: this.instance._getRotations(connection.targetId)
      });
      resetBounds(connection.connector);
      compute(connection.connector, {
        sourcePos: sAnchorP,
        targetPos: tAnchorP,
        sourceEndpoint: connection.endpoints[0],
        targetEndpoint: connection.endpoints[1],
        strokeWidth: connection.paintStyleInUse.strokeWidth,
        sourceInfo: sourceInfo,
        targetInfo: targetInfo
      });
    }
  }, {
    key: "getEndpointLocation",
    value: function getEndpointLocation(endpoint, params) {
      params = params || {};
      var anchor = endpoint._anchor;
      var pos = this.anchorLocations.get(anchor.id);
      if (pos == null || params.timestamp != null && anchor.timestamp !== params.timestamp) {
        pos = this.computeAnchorLocation(anchor, params);
        this._setComputedPosition(anchor, pos, params.timestamp);
      }
      return pos;
    }
  }, {
    key: "getEndpointOrientation",
    value: function getEndpointOrientation(ep) {
      return ep._anchor ? this.getAnchorOrientation(ep._anchor) : [0, 0];
    }
  }, {
    key: "setAnchorOrientation",
    value: function setAnchorOrientation(anchor, orientation) {
      var anchorLoc = this.anchorLocations.get(anchor.id);
      if (anchorLoc != null) {
        anchorLoc.ox = orientation[0];
        anchorLoc.oy = orientation[1];
      }
    }
  }, {
    key: "isDynamicAnchor",
    value: function isDynamicAnchor(ep) {
      return ep._anchor ? !isContinuous(ep._anchor) && ep._anchor.locations.length > 1 : false;
    }
  }, {
    key: "isFloating",
    value: function isFloating(ep) {
      return ep._anchor ? _isFloating(ep._anchor) : false;
    }
  }, {
    key: "prepareAnchor",
    value: function prepareAnchor(params) {
      return makeLightweightAnchorFromSpec(params);
    }
  }, {
    key: "redraw",
    value: function redraw(elementId, timestamp, offsetToUI) {
      var _this3 = this;
      var connectionsToPaint = new Set(),
          endpointsToPaint = new Set(),
          anchorsToUpdate = new Set();
      if (!this.instance._suspendDrawing) {
        var ep = this.instance.endpointsByElement[elementId] || [];
        timestamp = timestamp || util.uuid();
        var orientationCache = {},
            a,
            anEndpoint;
        for (var i = 0; i < ep.length; i++) {
          anEndpoint = ep[i];
          endpointsToPaint.add(anEndpoint);
          a = anEndpoint._anchor;
          if (anEndpoint.connections.length === 0) {
            if (isContinuous(a)) {
              if (!this.anchorLists.has(elementId)) {
                this.anchorLists.set(elementId, {
                  top: [],
                  right: [],
                  bottom: [],
                  left: []
                });
              }
              this._updateAnchorList(this.anchorLists.get(elementId), -Math.PI / 2, 0, {
                endpoints: [anEndpoint, anEndpoint],
                placeholder: true
              }, false, elementId, 0, false, getDefaultFace(a), connectionsToPaint, endpointsToPaint);
              anchorsToUpdate.add(elementId);
            }
          } else {
            for (var _i2 = 0; _i2 < anEndpoint.connections.length; _i2++) {
              var conn = anEndpoint.connections[_i2],
                  sourceId = conn.sourceId,
                  targetId = conn.targetId,
                  sourceContinuous = isContinuous(conn.endpoints[0]._anchor),
                  targetContinuous = isContinuous(conn.endpoints[1]._anchor);
              if (sourceContinuous || targetContinuous) {
                var c1 = (conn.endpoints[0]._anchor.faces || []).join("-"),
                    c2 = (conn.endpoints[1]._anchor.faces || []).join("-"),
                    oKey = [sourceId, c1, targetId, c2].join("-"),
                    o = orientationCache[oKey],
                    oIdx = conn.sourceId === elementId ? 1 : 0;
                if (sourceContinuous && !this.anchorLists.has(sourceId)) {
                  this.anchorLists.set(sourceId, {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                  });
                }
                if (targetContinuous && !this.anchorLists.has(targetId)) {
                  this.anchorLists.set(targetId, {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                  });
                }
                var td = this.instance.viewport.getPosition(targetId),
                    sd = this.instance.viewport.getPosition(sourceId);
                if (targetId === sourceId && (sourceContinuous || targetContinuous)) {
                  this._updateAnchorList(this.anchorLists.get(sourceId), -Math.PI / 2, 0, conn, false, targetId, 0, false, TOP, connectionsToPaint, endpointsToPaint);
                  this._updateAnchorList(this.anchorLists.get(targetId), -Math.PI / 2, 0, conn, false, sourceId, 1, false, TOP, connectionsToPaint, endpointsToPaint);
                } else {
                  var sourceRotation = this.instance._getRotations(sourceId);
                  var targetRotation = this.instance._getRotations(targetId);
                  if (!o) {
                    o = this._calculateOrientation(sourceId, targetId, sd, td, conn.endpoints[0]._anchor, conn.endpoints[1]._anchor, sourceRotation, targetRotation);
                    orientationCache[oKey] = o;
                  }
                  if (sourceContinuous) {
                    this._updateAnchorList(this.anchorLists.get(sourceId), o.theta, 0, conn, false, targetId, 0, false, o.a[0], connectionsToPaint, endpointsToPaint);
                  }
                  if (targetContinuous) {
                    this._updateAnchorList(this.anchorLists.get(targetId), o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], connectionsToPaint, endpointsToPaint);
                  }
                }
                if (sourceContinuous) {
                  anchorsToUpdate.add(sourceId);
                }
                if (targetContinuous) {
                  anchorsToUpdate.add(targetId);
                }
                connectionsToPaint.add(conn);
                if (sourceContinuous && oIdx === 0 || targetContinuous && oIdx === 1) {
                  endpointsToPaint.add(conn.endpoints[oIdx]);
                }
              } else {
                var otherEndpoint = anEndpoint.connections[_i2].endpoints[conn.sourceId === elementId ? 1 : 0],
                    otherAnchor = otherEndpoint._anchor;
                if (isDynamic(otherAnchor)) {
                  this.instance._paintEndpoint(otherEndpoint, {
                    elementWithPrecedence: elementId,
                    timestamp: timestamp
                  });
                  connectionsToPaint.add(anEndpoint.connections[_i2]);
                  for (var k = 0; k < otherEndpoint.connections.length; k++) {
                    if (otherEndpoint.connections[k] !== anEndpoint.connections[_i2]) {
                      connectionsToPaint.add(otherEndpoint.connections[k]);
                    }
                  }
                } else {
                  connectionsToPaint.add(anEndpoint.connections[_i2]);
                }
              }
            }
          }
        }
        anchorsToUpdate.forEach(function (anchor) {
          _this3._placeAnchors(anchor, _this3.anchorLists.get(anchor));
        });
        endpointsToPaint.forEach(function (ep) {
          var cd = _this3.instance.viewport.getPosition(ep.elementId);
          _this3.instance._paintEndpoint(ep, {
            timestamp: timestamp,
            offset: cd
          });
        });
        connectionsToPaint.forEach(function (c) {
          _this3.instance._paintConnection(c, {
            timestamp: timestamp
          });
        });
      }
      return {
        c: connectionsToPaint,
        e: endpointsToPaint
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      this.anchorLocations.clear();
      this.anchorLists.clear();
    }
  }, {
    key: "setAnchor",
    value: function setAnchor(endpoint, anchor) {
      if (anchor != null) {
        endpoint._anchor = anchor;
      }
    }
  }, {
    key: "setConnectionAnchors",
    value: function setConnectionAnchors(conn, anchors) {
      conn.endpoints[0]._anchor = anchors[0];
      conn.endpoints[1]._anchor = anchors[1];
    }
  }, {
    key: "_calculateOrientation",
    value: function _calculateOrientation(sourceId, targetId, sd, td, sourceAnchor, targetAnchor, sourceRotation, targetRotation) {
      var _this4 = this;
      var Orientation = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        DIAGONAL: "diagonal",
        IDENTITY: "identity"
      };
      if (sourceId === targetId) {
        return {
          orientation: Orientation.IDENTITY,
          a: [TOP, TOP]
        };
      }
      var theta = Math.atan2(td.c.y - sd.c.y, td.c.x - sd.c.x),
          theta2 = Math.atan2(sd.c.y - td.c.y, sd.c.x - td.c.x);
      var candidates = [],
          midpoints = {};
      (function (types, dim) {
        for (var i = 0; i < types.length; i++) {
          var _midpoints$types$i;
          midpoints[types[i]] = (_midpoints$types$i = {}, _defineProperty(_midpoints$types$i, LEFT, {
            x: dim[i][0].x,
            y: dim[i][0].c.y
          }), _defineProperty(_midpoints$types$i, RIGHT, {
            x: dim[i][0].x + dim[i][0].w,
            y: dim[i][0].c.y
          }), _defineProperty(_midpoints$types$i, TOP, {
            x: dim[i][0].c.x,
            y: dim[i][0].y
          }), _defineProperty(_midpoints$types$i, BOTTOM, {
            x: dim[i][0].c.x,
            y: dim[i][0].y + dim[i][0].h
          }), _midpoints$types$i);
          if (dim[i][1] != null && dim[i][1].length > 0) {
            for (var axis in midpoints[types[i]]) {
              midpoints[types[i]][axis] = _this4.instance._applyRotationsXY(midpoints[types[i]][axis], dim[i][1]);
            }
          }
        }
      })([SOURCE, TARGET], [[sd, sourceRotation], [td, targetRotation]]);
      var FACES = [TOP, LEFT, RIGHT, BOTTOM];
      for (var sf = 0; sf < FACES.length; sf++) {
        for (var tf = 0; tf < FACES.length; tf++) {
          candidates.push({
            source: FACES[sf],
            target: FACES[tf],
            dist: util.lineLength(midpoints.source[FACES[sf]], midpoints.target[FACES[tf]])
          });
        }
      }
      candidates.sort(function (a, b) {
        if (a.dist < b.dist) {
          return -1;
        } else if (b.dist < a.dist) {
          return 1;
        } else {
          var _axisIndices;
          var axisIndices = (_axisIndices = {}, _defineProperty(_axisIndices, LEFT, 0), _defineProperty(_axisIndices, TOP, 1), _defineProperty(_axisIndices, RIGHT, 2), _defineProperty(_axisIndices, BOTTOM, 3), _axisIndices),
              ais = axisIndices[a.source],
              bis = axisIndices[b.source],
              ait = axisIndices[a.target],
              bit = axisIndices[b.target];
          return ais < bis ? -1 : bis < ais ? 1 : ait < bit ? -1 : bit < ait ? 1 : 0;
        }
      });
      var sourceEdge = candidates[0].source,
          targetEdge = candidates[0].target;
      for (var i = 0; i < candidates.length; i++) {
        if (isContinuous(sourceAnchor) && sourceAnchor.locked) {
          sourceEdge = sourceAnchor.currentFace;
        } else if (!sourceAnchor.isContinuous || isEdgeSupported(sourceAnchor, candidates[i].source)) {
          sourceEdge = candidates[i].source;
        } else {
          sourceEdge = null;
        }
        if (targetAnchor.isContinuous && targetAnchor.locked) {
          targetEdge = targetAnchor.currentFace;
        } else if (!targetAnchor.isContinuous || isEdgeSupported(targetAnchor, candidates[i].target)) {
          targetEdge = candidates[i].target;
        } else {
          targetEdge = null;
        }
        if (sourceEdge != null && targetEdge != null) {
          break;
        }
      }
      if (sourceAnchor.isContinuous) {
        this.setCurrentFace(sourceAnchor, sourceEdge);
      }
      if (targetAnchor.isContinuous) {
        this.setCurrentFace(targetAnchor, targetEdge);
      }
      return {
        a: [sourceEdge, targetEdge],
        theta: theta,
        theta2: theta2
      };
    }
  }, {
    key: "setCurrentFace",
    value: function setCurrentFace(a, face, overrideLock) {
      a.currentFace = face;
      if (overrideLock && a.lockedFace != null) {
        a.lockedFace = a.currentFace;
      }
    }
  }, {
    key: "lock",
    value: function lock(a) {
      a.locked = true;
      if (isContinuous(a)) {
        a.lockedFace = a.currentFace;
      }
    }
  }, {
    key: "unlock",
    value: function unlock(a) {
      a.locked = false;
      if (isContinuous(a)) {
        a.lockedFace = null;
      }
    }
  }, {
    key: "selectAnchorLocation",
    value: function selectAnchorLocation(a, coords) {
      var idx = util.findWithFunction(a.locations, function (loc) {
        return loc.x === coords.x && loc.y === coords.y;
      });
      if (idx !== -1) {
        a.currentLocation = idx;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "lockCurrentAxis",
    value: function lockCurrentAxis(a) {
      if (a.currentFace != null) {
        a.lockedAxis = a.currentFace === LEFT || a.currentFace === RIGHT ? X_AXIS_FACES : Y_AXIS_FACES;
      }
    }
  }, {
    key: "unlockCurrentAxis",
    value: function unlockCurrentAxis(a) {
      a.lockedAxis = null;
    }
  }, {
    key: "anchorsEqual",
    value: function anchorsEqual(a1, a2) {
      if (!a1 || !a2) {
        return false;
      }
      var l1 = a1.locations[a1.currentLocation],
          l2 = a2.locations[a2.currentLocation];
      return l1.x === l2.x && l1.y === l2.y && l1.offx === l2.offx && l1.offy === l2.offy && l1.ox === l2.ox && l1.oy === l2.oy;
    }
  }]);
  return LightweightRouter;
}();

function _pointLiesBetween(q, p1, p2) {
  return p2 > p1 ? p1 <= q && q <= p2 : p1 >= q && q >= p2;
}
function _within(a, b, c) {
  return c >= Math.min(a, b) && c <= Math.max(a, b);
}
function _closest(a, b, c) {
  return Math.abs(c - a) < Math.abs(c - b) ? a : b;
}
function _lineIntersection(segment, _x1, _y1, _x2, _y2) {
  var m2 = Math.abs(util.gradient({
    x: _x1,
    y: _y1
  }, {
    x: _x2,
    y: _y2
  })),
      m1 = Math.abs(segment.m),
      b = m1 === Infinity ? segment.x1 : segment.y1 - m1 * segment.x1,
      out = [],
      b2 = m2 === Infinity ? _x1 : _y1 - m2 * _x1;
  if (m2 !== m1) {
    if (m2 === Infinity && m1 === 0) {
      if (_pointLiesBetween(_x1, segment.x1, segment.x2) && _pointLiesBetween(segment.y1, _y1, _y2)) {
        out.push({
          x: _x1,
          y: segment.y1
        });
      }
    } else if (m2 === 0 && m1 === Infinity) {
      if (_pointLiesBetween(_y1, segment.y1, segment.y2) && _pointLiesBetween(segment.x1, _x1, _x2)) {
        out.push({
          x: segment.x1,
          y: _y1
        });
      }
    } else {
      var X, Y;
      if (m2 === Infinity) {
        X = _x1;
        if (_pointLiesBetween(X, segment.x1, segment.x2)) {
          Y = m1 * _x1 + b;
          if (_pointLiesBetween(Y, _y1, _y2)) {
            out.push({
              x: X,
              y: Y
            });
          }
        }
      } else if (m2 === 0) {
        Y = _y1;
        if (_pointLiesBetween(Y, segment.y1, segment.y2)) {
          X = (_y1 - b) / m1;
          if (_pointLiesBetween(X, _x1, _x2)) {
            out.push({
              x: X,
              y: Y
            });
          }
        }
      } else {
        X = (b2 - b) / (m1 - m2);
        Y = m1 * X + b;
        if (_pointLiesBetween(X, segment.x1, segment.x2) && _pointLiesBetween(Y, segment.y1, segment.y2)) {
          out.push({
            x: X,
            y: Y
          });
        }
      }
    }
  }
  return out;
}
function _boxIntersection(segment, x, y, w, h) {
  var a = [];
  a.push.apply(a, _lineIntersection(segment, x, y, x + w, y));
  a.push.apply(a, _lineIntersection(segment, x + w, y, x + w, y + h));
  a.push.apply(a, _lineIntersection(segment, x + w, y + h, x, y + h));
  a.push.apply(a, _lineIntersection(segment, x, y + h, x, y));
  return a;
}
function _findClosestPointOnPath(segment, x, y) {
  var out = {
    d: Infinity,
    x: null,
    y: null,
    l: null,
    x1: segment.x1,
    x2: segment.x2,
    y1: segment.y1,
    y2: segment.y2
  };
  if (segment.m === 0) {
    out.y = segment.y1;
    out.x = _within(segment.x1, segment.x2, x) ? x : _closest(segment.x1, segment.x2, x);
  } else if (segment.m === Infinity || segment.m === -Infinity) {
    out.x = segment.x1;
    out.y = _within(segment.y1, segment.y2, y) ? y : _closest(segment.y1, segment.y2, y);
  } else {
    var b = segment.y1 - segment.m * segment.x1,
        b2 = y - segment.m2 * x,
    _x1 = (b2 - b) / (segment.m - segment.m2),
        _y1 = segment.m * _x1 + b;
    out.x = _within(segment.x1, segment.x2, _x1) ? _x1 : _closest(segment.x1, segment.x2, _x1);
    out.y = _within(segment.y1, segment.y2, _y1) ? _y1 : _closest(segment.y1, segment.y2, _y1);
  }
  var fractionInSegment = util.lineLength({
    x: out.x,
    y: out.y
  }, {
    x: segment.x1,
    y: segment.y1
  });
  out.d = util.lineLength({
    x: x,
    y: y
  }, out);
  out.l = fractionInSegment / length;
  return out;
}
function _getLength$1(segment) {
  return segment.length;
}
function _getPath$1(segment, isFirstSegment) {
  return (isFirstSegment ? "M " + segment.x1 + " " + segment.y1 + " " : "") + "L " + segment.x2 + " " + segment.y2;
}
function _recalc(segment) {
  segment.length = Math.sqrt(Math.pow(segment.x2 - segment.x1, 2) + Math.pow(segment.y2 - segment.y1, 2));
  segment.m = util.gradient({
    x: segment.x1,
    y: segment.y1
  }, {
    x: segment.x2,
    y: segment.y2
  });
  segment.m2 = -1 / segment.m;
  segment.extents = {
    xmin: Math.min(segment.x1, segment.x2),
    ymin: Math.min(segment.y1, segment.y2),
    xmax: Math.max(segment.x1, segment.x2),
    ymax: Math.max(segment.y1, segment.y2)
  };
}
function _setCoordinates(segment, coords) {
  segment.x1 = coords.x1;
  segment.y1 = coords.y1;
  segment.x2 = coords.x2;
  segment.y2 = coords.y2;
  _recalc(segment);
}
function _pointOnPath$1(segment, location, absolute) {
  if (location === 0 && !absolute) {
    return {
      x: segment.x1,
      y: segment.y1
    };
  } else if (location === 1 && !absolute) {
    return {
      x: segment.x2,
      y: segment.y2
    };
  } else {
    var l = absolute ? location > 0 ? location : segment.length + location : location * segment.length;
    return util.pointOnLine({
      x: segment.x1,
      y: segment.y1
    }, {
      x: segment.x2,
      y: segment.y2
    }, l);
  }
}
function _gradientAtPoint$1(segment, location, absolute) {
  return segment.m;
}
function _pointAlongPathFrom$1(segment, location, distance, absolute) {
  var p = _pointOnPath$1(segment, location, absolute),
      farAwayPoint = distance <= 0 ? {
    x: segment.x1,
    y: segment.y1
  } : {
    x: segment.x2,
    y: segment.y2
  };
  if (distance <= 0 && Math.abs(distance) > 1) {
    distance *= -1;
  }
  return util.pointOnLine(p, farAwayPoint, distance);
}
function blankStraightSegment() {
  return {
    type: SEGMENT_TYPE_STRAIGHT,
    m: 0,
    length: 0,
    m2: 0,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    extents: {
      xmin: 0,
      xmax: 0,
      ymin: 0,
      ymax: 0
    }
  };
}
function _createStraightSegment(params) {
  var s = blankStraightSegment();
  _setCoordinates(s, params);
  return s;
}
var SEGMENT_TYPE_STRAIGHT = "Straight";
var StraightSegmentHandler = {
  create: function create(segmentType, params) {
    return _createStraightSegment(params);
  },
  findClosestPointOnPath: function findClosestPointOnPath(s, x, y) {
    return _findClosestPointOnPath(s, x, y);
  },
  getLength: function getLength(s) {
    return _getLength$1(s);
  },
  getPath: function getPath(s, isFirstSegment) {
    return _getPath$1(s, isFirstSegment);
  },
  gradientAtPoint: function gradientAtPoint(s, location, absolute) {
    return _gradientAtPoint$1(s);
  },
  lineIntersection: function lineIntersection(s, x1, y1, x2, y2) {
    return _lineIntersection(s, x1, y1, x2, y2);
  },
  pointAlongPathFrom: function pointAlongPathFrom(s, location, distance, absolute) {
    return _pointAlongPathFrom$1(s, location, distance, absolute);
  },
  pointOnPath: function pointOnPath(s, location, absolute) {
    return _pointOnPath$1(s, location, absolute);
  },
  boxIntersection: function boxIntersection(s, x, y, w, h) {
    return _boxIntersection(s, x, y, w, h);
  },
  boundingBoxIntersection: function boundingBoxIntersection(s, box) {
    return _boxIntersection(s, box.x, box.y, box.w, box.h);
  }
};
Segments.register(SEGMENT_TYPE_STRAIGHT, StraightSegmentHandler);

var CONNECTOR_TYPE_STRAIGHT = "Straight";
var StraightConnectorHandler = {
  _compute: function _compute(connector, paintInfo, p) {
    _addSegment(connector, SEGMENT_TYPE_STRAIGHT, {
      x1: paintInfo.sx,
      y1: paintInfo.sy,
      x2: paintInfo.startStubX,
      y2: paintInfo.startStubY
    });
    _addSegment(connector, SEGMENT_TYPE_STRAIGHT, {
      x1: paintInfo.startStubX,
      y1: paintInfo.startStubY,
      x2: paintInfo.endStubX,
      y2: paintInfo.endStubY
    });
    _addSegment(connector, SEGMENT_TYPE_STRAIGHT, {
      x1: paintInfo.endStubX,
      y1: paintInfo.endStubY,
      x2: paintInfo.tx,
      y2: paintInfo.ty
    });
    connector.geometry = {
      source: p.sourcePos,
      target: p.targetPos
    };
  },
  create: function create(connection, connectorType, params) {
    var base = createConnectorBase(connectorType, connection, params, [0, 0]);
    return util.extend(base, {
      type: CONNECTOR_TYPE_STRAIGHT
    });
  },
  exportGeometry: function exportGeometry(connector) {
    return defaultConnectorHandler.exportGeometry(connector);
  },
  importGeometry: function importGeometry(connector, g) {
    return defaultConnectorHandler.importGeometry(connector, g);
  },
  transformGeometry: function transformGeometry(connector, g, dx, dy) {
    return {
      source: transformAnchorPlacement(g.source, dx, dy),
      target: transformAnchorPlacement(g.target, dx, dy)
    };
  },
  setAnchorOrientation: function setAnchorOrientation(connector, idx, orientation) {}
};
Connectors.register(CONNECTOR_TYPE_STRAIGHT, StraightConnectorHandler);

var ConnectionDragSelector = function () {
  function ConnectionDragSelector(selector, def) {
    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _classCallCheck(this, ConnectionDragSelector);
    this.selector = selector;
    this.def = def;
    this.exclude = exclude;
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "redrop", void 0);
    this.id = util.uuid();
    this.redrop = def.def.redrop || REDROP_POLICY_STRICT;
  }
  _createClass(ConnectionDragSelector, [{
    key: "setEnabled",
    value: function setEnabled(enabled) {
      this.def.enabled = enabled;
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.def.enabled !== false;
    }
  }]);
  return ConnectionDragSelector;
}();
var REDROP_POLICY_STRICT = "strict";
var REDROP_POLICY_ANY = "any";
var REDROP_POLICY_ANY_SOURCE = "anySource";
var REDROP_POLICY_ANY_TARGET = "anyTarget";
var REDROP_POLICY_ANY_SOURCE_OR_TARGET = "anySourceOrTarget";

function _scopeMatch(e1, e2) {
  var s1 = e1.scope.split(/\s/),
      s2 = e2.scope.split(/\s/);
  for (var i = 0; i < s1.length; i++) {
    for (var j = 0; j < s2.length; j++) {
      if (s2[j] === s1[i]) {
        return true;
      }
    }
  }
  return false;
}
function prepareList(instance, input, doNotGetIds) {
  var r = [];
  var _resolveId = function _resolveId(i) {
    if (util.isString(i)) {
      return i;
    } else {
      return instance.getId(i);
    }
  };
  if (input) {
    if (typeof input === 'string') {
      if (input === "*") {
        return input;
      }
      r.push(input);
    } else {
      if (doNotGetIds) {
        r = input;
      } else {
        if (input.length != null) {
          var _r;
          (_r = r).push.apply(_r, _toConsumableArray(_toConsumableArray(input).map(_resolveId)));
        } else {
          r.push(_resolveId(input));
        }
      }
    }
  }
  return r;
}
function addManagedEndpoint(managedElement, ep) {
  if (managedElement != null) {
    managedElement.endpoints.push(ep);
  }
}
function removeManagedEndpoint(managedElement, endpoint) {
  if (managedElement != null) {
    util.removeWithFunction(managedElement.endpoints, function (ep) {
      return ep === endpoint;
    });
  }
}
function addManagedConnection(connection, sourceEl, targetEl) {
  if (sourceEl != null) {
    sourceEl.connections.push(connection);
    if (sourceEl.connections.length === 1) {
      connection.instance.addClass(connection.source, connection.instance.connectedClass);
    }
  }
  if (targetEl != null) {
    if (sourceEl == null || connection.sourceId !== connection.targetId) {
      targetEl.connections.push(connection);
      if (targetEl.connections.length === 1) {
        connection.instance.addClass(connection.target, connection.instance.connectedClass);
      }
    }
  }
}
function removeManagedConnection(connection, sourceEl, targetEl) {
  if (sourceEl != null) {
    var sourceCount = sourceEl.connections.length;
    util.removeWithFunction(sourceEl.connections, function (_c) {
      return connection.id === _c.id;
    });
    if (sourceCount > 0 && sourceEl.connections.length === 0) {
      connection.instance.removeClass(connection.source, connection.instance.connectedClass);
    }
  }
  if (targetEl != null) {
    var targetCount = targetEl.connections.length;
    if (sourceEl == null || connection.sourceId !== connection.targetId) {
      util.removeWithFunction(targetEl.connections, function (_c) {
        return connection.id === _c.id;
      });
    }
    if (targetCount > 0 && targetEl.connections.length === 0) {
      connection.instance.removeClass(connection.target, connection.instance.connectedClass);
    }
  }
}
var JsPlumbInstance = function (_EventGenerator) {
  _inherits(JsPlumbInstance, _EventGenerator);
  var _super = _createSuper(JsPlumbInstance);
  function JsPlumbInstance(_instanceIndex, defaults) {
    var _this;
    _classCallCheck(this, JsPlumbInstance);
    _this = _super.call(this);
    _this._instanceIndex = _instanceIndex;
    _defineProperty(_assertThisInitialized(_this), "defaults", void 0);
    _defineProperty(_assertThisInitialized(_this), "_initialDefaults", {});
    _defineProperty(_assertThisInitialized(_this), "isConnectionBeingDragged", false);
    _defineProperty(_assertThisInitialized(_this), "currentlyDragging", false);
    _defineProperty(_assertThisInitialized(_this), "hoverSuspended", false);
    _defineProperty(_assertThisInitialized(_this), "_suspendDrawing", false);
    _defineProperty(_assertThisInitialized(_this), "_suspendedAt", null);
    _defineProperty(_assertThisInitialized(_this), "connectorClass", CLASS_CONNECTOR);
    _defineProperty(_assertThisInitialized(_this), "connectorOutlineClass", CLASS_CONNECTOR_OUTLINE);
    _defineProperty(_assertThisInitialized(_this), "connectedClass", CLASS_CONNECTED);
    _defineProperty(_assertThisInitialized(_this), "endpointClass", CLASS_ENDPOINT);
    _defineProperty(_assertThisInitialized(_this), "endpointConnectedClass", CLASS_ENDPOINT_CONNECTED);
    _defineProperty(_assertThisInitialized(_this), "endpointFullClass", CLASS_ENDPOINT_FULL);
    _defineProperty(_assertThisInitialized(_this), "endpointFloatingClass", CLASS_ENDPOINT_FLOATING);
    _defineProperty(_assertThisInitialized(_this), "endpointDropAllowedClass", CLASS_ENDPOINT_DROP_ALLOWED);
    _defineProperty(_assertThisInitialized(_this), "endpointDropForbiddenClass", CLASS_ENDPOINT_DROP_FORBIDDEN);
    _defineProperty(_assertThisInitialized(_this), "endpointAnchorClassPrefix", CLASS_ENDPOINT_ANCHOR_PREFIX);
    _defineProperty(_assertThisInitialized(_this), "overlayClass", CLASS_OVERLAY);
    _defineProperty(_assertThisInitialized(_this), "connections", []);
    _defineProperty(_assertThisInitialized(_this), "endpointsByElement", {});
    _defineProperty(_assertThisInitialized(_this), "endpointsByUUID", new Map());
    _defineProperty(_assertThisInitialized(_this), "sourceSelectors", []);
    _defineProperty(_assertThisInitialized(_this), "targetSelectors", []);
    _defineProperty(_assertThisInitialized(_this), "allowNestedGroups", void 0);
    _defineProperty(_assertThisInitialized(_this), "_curIdStamp", 1);
    _defineProperty(_assertThisInitialized(_this), "viewport", new Viewport(_assertThisInitialized(_this)));
    _defineProperty(_assertThisInitialized(_this), "router", void 0);
    _defineProperty(_assertThisInitialized(_this), "groupManager", void 0);
    _defineProperty(_assertThisInitialized(_this), "_connectionTypes", new Map());
    _defineProperty(_assertThisInitialized(_this), "_endpointTypes", new Map());
    _defineProperty(_assertThisInitialized(_this), "_container", void 0);
    _defineProperty(_assertThisInitialized(_this), "_managedElements", {});
    _defineProperty(_assertThisInitialized(_this), "DEFAULT_SCOPE", void 0);
    _defineProperty(_assertThisInitialized(_this), "_zoom", 1);
    _this.defaults = {
      anchor: common.AnchorLocations.Bottom,
      anchors: [null, null],
      connectionsDetachable: true,
      connectionOverlays: [],
      connector: CONNECTOR_TYPE_STRAIGHT,
      container: null,
      endpoint: TYPE_ENDPOINT_DOT,
      endpointOverlays: [],
      endpoints: [null, null],
      endpointStyle: {
        fill: "#456"
      },
      endpointStyles: [null, null],
      endpointHoverStyle: null,
      endpointHoverStyles: [null, null],
      hoverPaintStyle: null,
      listStyle: {},
      maxConnections: 1,
      paintStyle: {
        strokeWidth: 2,
        stroke: "#456"
      },
      reattachConnections: false,
      scope: "jsplumb_defaultscope",
      allowNestedGroups: true
    };
    if (defaults) {
      util.extend(_this.defaults, defaults);
    }
    util.extend(_this._initialDefaults, _this.defaults);
    if (_this._initialDefaults[DEFAULT_KEY_PAINT_STYLE] != null) {
      _this._initialDefaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth = _this._initialDefaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth || 2;
    }
    _this.DEFAULT_SCOPE = _this.defaults[DEFAULT_KEY_SCOPE];
    _this.allowNestedGroups = _this._initialDefaults[DEFAULT_KEY_ALLOW_NESTED_GROUPS] !== false;
    _this.router = new LightweightRouter(_assertThisInitialized(_this));
    _this.groupManager = new GroupManager(_assertThisInitialized(_this));
    _this.setContainer(_this._initialDefaults.container);
    return _this;
  }
  _createClass(JsPlumbInstance, [{
    key: "defaultScope",
    get: function get() {
      return this.DEFAULT_SCOPE;
    }
  }, {
    key: "currentZoom",
    get: function get() {
      return this._zoom;
    }
  }, {
    key: "areDefaultAnchorsSet",
    value: function areDefaultAnchorsSet() {
      return this.validAnchorsSpec(this.defaults.anchors);
    }
  }, {
    key: "validAnchorsSpec",
    value: function validAnchorsSpec(anchors) {
      return anchors != null && anchors[0] != null && anchors[1] != null;
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this._container;
    }
  }, {
    key: "setZoom",
    value: function setZoom(z, repaintEverything) {
      this._zoom = z;
      this.fire(EVENT_ZOOM, this._zoom);
      if (repaintEverything) {
        this.repaintEverything();
      }
      return true;
    }
  }, {
    key: "_idstamp",
    value: function _idstamp() {
      return "" + this._curIdStamp++;
    }
  }, {
    key: "checkCondition",
    value: function checkCondition(conditionName, args) {
      var l = this.getListener(conditionName),
          r = true;
      if (l && l.length > 0) {
        var values = Array.prototype.slice.call(arguments, 1);
        try {
          for (var i = 0, j = l.length; i < j; i++) {
            r = r && l[i].apply(l[i], values);
          }
        } catch (e) {
          util.log("cannot check condition [" + conditionName + "]" + e);
        }
      }
      return r;
    }
  }, {
    key: "getId",
    value: function getId(element, uuid) {
      if (element == null) {
        return null;
      }
      var id = this.getAttribute(element, ATTRIBUTE_MANAGED);
      if (!id || id === "undefined") {
        if (arguments.length === 2 && arguments[1] !== undefined) {
          id = uuid;
        } else if (arguments.length === 1 || arguments.length === 3 && !arguments[2]) {
          id = "jsplumb-" + this._instanceIndex + "-" + this._idstamp();
        }
        this.setAttribute(element, ATTRIBUTE_MANAGED, id);
      }
      return id;
    }
  }, {
    key: "getConnections",
    value: function getConnections(options, flat) {
      if (!options) {
        options = {};
      } else if (options.constructor === String) {
        options = {
          "scope": options
        };
      }
      var scope = options.scope || this.defaultScope,
          scopes = prepareList(this, scope, true),
          sources = prepareList(this, options.source),
          targets = prepareList(this, options.target),
          results = !flat && scopes.length > 1 ? {} : [],
          _addOne = function _addOne(scope, obj) {
        if (!flat && scopes.length > 1) {
          var ss = results[scope];
          if (ss == null) {
            ss = results[scope] = [];
          }
          ss.push(obj);
        } else {
          results.push(obj);
        }
      };
      for (var j = 0, jj = this.connections.length; j < jj; j++) {
        var _c2 = this.connections[j],
            sourceId = _c2.proxies && _c2.proxies[0] ? _c2.proxies[0].originalEp.elementId : _c2.sourceId,
            targetId = _c2.proxies && _c2.proxies[1] ? _c2.proxies[1].originalEp.elementId : _c2.targetId;
        if (util.filterList(scopes, _c2.scope) && util.filterList(sources, sourceId) && util.filterList(targets, targetId)) {
          _addOne(_c2.scope, _c2);
        }
      }
      return results;
    }
  }, {
    key: "select",
    value: function select(params) {
      params = params || {};
      params.scope = params.scope || "*";
      return new ConnectionSelection(this, params.connections || this.getConnections(params, true));
    }
  }, {
    key: "selectEndpoints",
    value: function selectEndpoints(params) {
      params = params || {};
      params.scope = params.scope || common.WILDCARD;
      var noElementFilters = !params.element && !params.source && !params.target,
          elements = noElementFilters ? common.WILDCARD : prepareList(this, params.element),
          sources = noElementFilters ? common.WILDCARD : prepareList(this, params.source),
          targets = noElementFilters ? common.WILDCARD : prepareList(this, params.target),
          scopes = prepareList(this, params.scope, true);
      var ep = [];
      for (var _el2 in this.endpointsByElement) {
        var either = util.filterList(elements, _el2, true),
            source = util.filterList(sources, _el2, true),
            sourceMatchExact = sources !== "*",
            target = util.filterList(targets, _el2, true),
            targetMatchExact = targets !== "*";
        if (either || source || target) {
          inner: for (var i = 0, ii = this.endpointsByElement[_el2].length; i < ii; i++) {
            var _ep = this.endpointsByElement[_el2][i];
            if (util.filterList(scopes, _ep.scope, true)) {
              var noMatchSource = sourceMatchExact && sources.length > 0 && !_ep.isSource,
                  noMatchTarget = targetMatchExact && targets.length > 0 && !_ep.isTarget;
              if (noMatchSource || noMatchTarget) {
                continue inner;
              }
              ep.push(_ep);
            }
          }
        }
      }
      return new EndpointSelection(this, ep);
    }
  }, {
    key: "setContainer",
    value: function setContainer(c) {
      this._container = c;
      this.fire(EVENT_CONTAINER_CHANGE, this._container);
    }
  }, {
    key: "_set",
    value: function _set(c, el, idx) {
      var stTypes = [{
        el: "source",
        elId: "sourceId"
      }, {
        el: "target",
        elId: "targetId"
      }];
      var ep,
          _st = stTypes[idx],
          cId = c[_st.elId],
          sid,
          oldEndpoint = c.endpoints[idx];
      var evtParams = {
        index: idx,
        originalEndpoint: oldEndpoint,
        originalSourceId: idx === 0 ? cId : c.sourceId,
        newSourceId: c.sourceId,
        originalTargetId: idx === 1 ? cId : c.targetId,
        newTargetId: c.targetId,
        connection: c,
        newEndpoint: oldEndpoint
      };
      if (Endpoints.isEndpoint(el)) {
        ep = el;
        Endpoints.addConnection(ep, c);
      } else {
        sid = this.getId(el);
        if (sid === c[_st.elId]) {
          ep = null;
        } else {
          ep = Connections.makeEndpoint(c, idx === 0, el, sid);
        }
      }
      if (ep != null) {
        evtParams.newEndpoint = ep;
        Endpoints.detachFromConnection(oldEndpoint, c);
        c.endpoints[idx] = ep;
        c[_st.el] = ep.element;
        c[_st.elId] = ep.elementId;
        evtParams[idx === 0 ? "newSourceId" : "newTargetId"] = ep.elementId;
        this.fireMoveEvent(evtParams);
        this._paintConnection(c);
      }
      return evtParams;
    }
  }, {
    key: "setSource",
    value: function setSource(connection, el) {
      removeManagedConnection(connection, this._managedElements[connection.sourceId]);
      var p = this._set(connection, el, 0);
      addManagedConnection(connection, this._managedElements[p.newSourceId]);
    }
  }, {
    key: "setTarget",
    value: function setTarget(connection, el) {
      removeManagedConnection(connection, this._managedElements[connection.targetId]);
      var p = this._set(connection, el, 1);
      addManagedConnection(connection, this._managedElements[p.newTargetId]);
    }
  }, {
    key: "setConnectionType",
    value: function setConnectionType(connection, type, params) {
      Components.setType(connection, type, params);
      this._paintConnection(connection);
    }
  }, {
    key: "isHoverSuspended",
    value: function isHoverSuspended() {
      return this.hoverSuspended;
    }
  }, {
    key: "setSuspendDrawing",
    value: function setSuspendDrawing(val, repaintAfterwards) {
      var curVal = this._suspendDrawing;
      this._suspendDrawing = val;
      if (val) {
        this._suspendedAt = "" + new Date().getTime();
      } else {
        this._suspendedAt = null;
        this.viewport.recomputeBounds();
      }
      if (repaintAfterwards) {
        this.repaintEverything();
      }
      return curVal;
    }
  }, {
    key: "getSuspendedAt",
    value: function getSuspendedAt() {
      return this._suspendedAt;
    }
  }, {
    key: "batch",
    value: function batch(fn, doNotRepaintAfterwards) {
      var _wasSuspended = this._suspendDrawing === true;
      if (!_wasSuspended) {
        this.setSuspendDrawing(true);
      }
      fn();
      if (!_wasSuspended) {
        this.setSuspendDrawing(false, !doNotRepaintAfterwards);
      }
    }
  }, {
    key: "each",
    value: function each(spec, fn) {
      if (spec == null) {
        return;
      }
      if (spec.length != null) {
        for (var i = 0; i < spec.length; i++) {
          fn(spec[i]);
        }
      } else {
        fn(spec);
      }
      return this;
    }
  }, {
    key: "updateOffset",
    value: function updateOffset(params) {
      var elId = params.elId;
      if (params.recalc) {
        return this.viewport.refreshElement(elId);
      } else {
        return this.viewport.getPosition(elId);
      }
    }
  }, {
    key: "deleteConnection",
    value: function deleteConnection(connection, params) {
      if (connection != null && connection.deleted !== true) {
        params = params || {};
        if (params.force || util.functionChain(true, false, [[Components, IS_DETACH_ALLOWED, [connection.endpoints[0], connection]], [Components, IS_DETACH_ALLOWED, [connection.endpoints[1], connection]], [Components, IS_DETACH_ALLOWED, [connection, connection]], [this, CHECK_CONDITION, [INTERCEPT_BEFORE_DETACH, connection]]])) {
          removeManagedConnection(connection, this._managedElements[connection.sourceId], this._managedElements[connection.targetId]);
          this.fireDetachEvent(connection, !connection.pending && params.fireEvent !== false, params.originalEvent);
          var _sourceEndpoint = connection.endpoints[0];
          var targetEndpoint = connection.endpoints[1];
          if (_sourceEndpoint !== params.endpointToIgnore) {
            Endpoints.detachFromConnection(_sourceEndpoint, connection, null, true);
          }
          if (targetEndpoint !== params.endpointToIgnore) {
            Endpoints.detachFromConnection(targetEndpoint, connection, null, true);
          }
          util.removeWithFunction(this.connections, function (_c) {
            return connection.id === _c.id;
          });
          Connections.destroy(connection);
          if (_sourceEndpoint !== params.endpointToIgnore && _sourceEndpoint.deleteOnEmpty && _sourceEndpoint.connections.length === 0) {
            this.deleteEndpoint(_sourceEndpoint);
          }
          if (targetEndpoint !== params.endpointToIgnore && targetEndpoint.deleteOnEmpty && targetEndpoint.connections.length === 0) {
            this.deleteEndpoint(targetEndpoint);
          }
          return true;
        }
      }
      return false;
    }
  }, {
    key: "deleteEveryConnection",
    value: function deleteEveryConnection(params) {
      var _this2 = this;
      params = params || {};
      var count = this.connections.length,
          deletedCount = 0;
      this.batch(function () {
        for (var i = 0; i < count; i++) {
          deletedCount += _this2.deleteConnection(_this2.connections[0], params) ? 1 : 0;
        }
      });
      return deletedCount;
    }
  }, {
    key: "deleteConnectionsForElement",
    value: function deleteConnectionsForElement(el, params) {
      var id = this.getId(el),
          m = this._managedElements[id];
      if (m) {
        var l = m.connections.length;
        for (var i = 0; i < l; i++) {
          this.deleteConnection(m.connections[0], params);
        }
      }
      return this;
    }
  }, {
    key: "fireDetachEvent",
    value: function fireDetachEvent(jpc, doFireEvent, originalEvent) {
      var argIsConnection = jpc.id != null,
          params = argIsConnection ? {
        connection: jpc,
        source: jpc.source,
        target: jpc.target,
        sourceId: jpc.sourceId,
        targetId: jpc.targetId,
        sourceEndpoint: jpc.endpoints[0],
        targetEndpoint: jpc.endpoints[1]
      } : jpc;
      if (doFireEvent) {
        this.fire(EVENT_CONNECTION_DETACHED, params, originalEvent);
      }
      this.fire(EVENT_INTERNAL_CONNECTION_DETACHED, params, originalEvent);
    }
  }, {
    key: "fireMoveEvent",
    value: function fireMoveEvent(params, evt) {
      this.fire(EVENT_CONNECTION_MOVED, params, evt);
    }
  }, {
    key: "manageAll",
    value: function manageAll(elements, recalc) {
      var nl = util.isString(elements) ? this.getSelector(this.getContainer(), elements) : elements;
      for (var i = 0; i < nl.length; i++) {
        this.manage(nl[i], null, recalc);
      }
    }
  }, {
    key: "manage",
    value: function manage(element, internalId, _recalc) {
      if (this.getAttribute(element, ATTRIBUTE_MANAGED) == null) {
        internalId = internalId || this.getAttribute(element, "id") || util.uuid();
        this.setAttribute(element, ATTRIBUTE_MANAGED, internalId);
      }
      var elId = this.getId(element);
      if (!this._managedElements[elId]) {
        var obj = {
          el: element,
          endpoints: [],
          connections: [],
          rotation: 0,
          data: {}
        };
        this._managedElements[elId] = obj;
        if (this._suspendDrawing) {
          obj.viewportElement = this.viewport.registerElement(elId, true);
        } else {
          obj.viewportElement = this.updateOffset({
            elId: elId,
            recalc: true
          });
        }
        this.fire(EVENT_MANAGE_ELEMENT, {
          el: element
        });
      } else {
        if (_recalc) {
          this._managedElements[elId].viewportElement = this.updateOffset({
            elId: elId,
            timestamp: null,
            recalc: true
          });
        }
      }
      return this._managedElements[elId];
    }
  }, {
    key: "getManagedData",
    value: function getManagedData(elementId, dataIdentifier, key) {
      if (this._managedElements[elementId]) {
        var data = this._managedElements[elementId].data[dataIdentifier];
        return data != null ? data[key] : null;
      }
    }
  }, {
    key: "setManagedData",
    value: function setManagedData(elementId, dataIdentifier, key, data) {
      if (this._managedElements[elementId]) {
        this._managedElements[elementId].data[dataIdentifier] = this._managedElements[elementId].data[dataIdentifier] || {};
        this._managedElements[elementId].data[dataIdentifier][key] = data;
      }
    }
  }, {
    key: "getManagedElement",
    value: function getManagedElement(id) {
      var _this$_managedElement;
      return (_this$_managedElement = this._managedElements[id]) === null || _this$_managedElement === void 0 ? void 0 : _this$_managedElement.el;
    }
  }, {
    key: "unmanage",
    value: function unmanage(el, removeElement) {
      var _this3 = this;
      this.removeAllEndpoints(el, true);
      var _one = function _one(_el) {
        var id = _this3.getId(_el);
        _this3.removeAttribute(_el, ATTRIBUTE_MANAGED);
        delete _this3._managedElements[id];
        _this3.viewport.remove(id);
        _this3.fire(EVENT_UNMANAGE_ELEMENT, {
          el: _el,
          id: id
        });
        if (_el && removeElement) {
          _this3._removeElement(_el);
        }
      };
      this._getAssociatedElements(el).map(_one);
      _one(el);
    }
  }, {
    key: "rotate",
    value: function rotate(element, rotation, _doNotRepaint) {
      var elementId = this.getId(element);
      if (this._managedElements[elementId]) {
        this._managedElements[elementId].rotation = rotation;
        this.viewport.rotateElement(elementId, rotation);
        if (_doNotRepaint !== true) {
          return this.revalidate(element);
        }
      }
      return {
        c: new Set(),
        e: new Set()
      };
    }
  }, {
    key: "_getRotation",
    value: function _getRotation(elementId) {
      var entry = this._managedElements[elementId];
      if (entry != null) {
        return entry.rotation || 0;
      } else {
        return 0;
      }
    }
  }, {
    key: "_getRotations",
    value: function _getRotations(elementId) {
      var _this4 = this;
      var rotations = [];
      var entry = this._managedElements[elementId];
      var _oneLevel = function _oneLevel(e) {
        if (e.group != null) {
          var gEntry = _this4._managedElements[e.group];
          if (gEntry != null) {
            rotations.push({
              r: gEntry.viewportElement.r,
              c: gEntry.viewportElement.c
            });
            _oneLevel(gEntry);
          }
        }
      };
      if (entry != null) {
        rotations.push({
          r: entry.viewportElement.r || 0,
          c: entry.viewportElement.c
        });
        _oneLevel(entry);
      }
      return rotations;
    }
  }, {
    key: "_applyRotations",
    value: function _applyRotations(point, rotations) {
      var sl = point.slice();
      var current = {
        x: sl[0],
        y: sl[1],
        cr: 0,
        sr: 0
      };
      util.forEach(rotations, function (rotation) {
        current = util.rotatePoint(current, rotation.c, rotation.r);
      });
      return current;
    }
  }, {
    key: "_applyRotationsXY",
    value: function _applyRotationsXY(point, rotations) {
      util.forEach(rotations, function (rotation) {
        point = util.rotatePoint(point, rotation.c, rotation.r);
      });
      return point;
    }
  }, {
    key: "_internal_newEndpoint",
    value: function _internal_newEndpoint(params) {
      var _p = util.extend({}, params);
      var managedElement = this.manage(_p.element);
      _p.elementId = this.getId(_p.element);
      _p.id = "ep_" + this._idstamp();
      var ep = createEndpoint(this, _p);
      addManagedEndpoint(managedElement, ep);
      if (params.uuid) {
        this.endpointsByUUID.set(params.uuid, ep);
      }
      util.addToDictionary(this.endpointsByElement, ep.elementId, ep);
      if (!this._suspendDrawing) {
        this._paintEndpoint(ep, {
          timestamp: this._suspendedAt
        });
      }
      return ep;
    }
  }, {
    key: "_deriveEndpointAndAnchorSpec",
    value: function _deriveEndpointAndAnchorSpec(type, dontPrependDefault) {
      var bits = ((dontPrependDefault ? "" : "default ") + type).split(/[\s]/),
          eps = null,
          ep = null,
          a = null,
          as = null;
      for (var i = 0; i < bits.length; i++) {
        var _t = this.getConnectionType(bits[i]);
        if (_t) {
          if (_t.endpoints) {
            eps = _t.endpoints;
          }
          if (_t.endpoint) {
            ep = _t.endpoint;
          }
          if (_t.anchors) {
            as = _t.anchors;
          }
          if (_t.anchor) {
            a = _t.anchor;
          }
        }
      }
      return {
        endpoints: eps ? eps : [ep, ep],
        anchors: as ? as : [a, a]
      };
    }
  }, {
    key: "revalidate",
    value: function revalidate(el, timestamp) {
      var elId = this.getId(el);
      this.updateOffset({
        elId: elId,
        recalc: true,
        timestamp: timestamp
      });
      return this.repaint(el);
    }
  }, {
    key: "repaintEverything",
    value: function repaintEverything() {
      var timestamp = util.uuid(),
          elId;
      for (elId in this._managedElements) {
        this.viewport.refreshElement(elId, true);
      }
      this.viewport.recomputeBounds();
      for (elId in this._managedElements) {
        this.repaint(this._managedElements[elId].el, timestamp, true);
      }
      return this;
    }
  }, {
    key: "setElementPosition",
    value: function setElementPosition(el, x, y) {
      var id = this.getId(el);
      this.viewport.setPosition(id, x, y);
      return this.repaint(el);
    }
  }, {
    key: "repaint",
    value: function repaint(el, timestamp, offsetsWereJustCalculated) {
      var r = {
        c: new Set(),
        e: new Set()
      };
      var _mergeRedraw = function _mergeRedraw(r2) {
        r2.c.forEach(function (c) {
          return r.c.add(c);
        });
        r2.e.forEach(function (e) {
          return r.e.add(e);
        });
      };
      if (!this._suspendDrawing) {
        var id = this.getId(el);
        if (el != null) {
          var repaintEls = this._getAssociatedElements(el);
          if (timestamp == null) {
            timestamp = util.uuid();
          }
          if (!offsetsWereJustCalculated) {
            for (var i = 0; i < repaintEls.length; i++) {
              this.updateOffset({
                elId: this.getId(repaintEls[i]),
                recalc: true,
                timestamp: timestamp
              });
            }
          }
          _mergeRedraw(this.router.redraw(id, timestamp, null));
          if (repaintEls.length > 0) {
            for (var j = 0; j < repaintEls.length; j++) {
              _mergeRedraw(this.router.redraw(this.getId(repaintEls[j]), timestamp, null));
            }
          }
        }
      }
      return r;
    }
  }, {
    key: "unregisterEndpoint",
    value: function unregisterEndpoint(endpoint) {
      var uuid = endpoint.uuid;
      if (uuid) {
        this.endpointsByUUID["delete"](uuid);
      }
      removeManagedEndpoint(this._managedElements[endpoint.elementId], endpoint);
      var ebe = this.endpointsByElement[endpoint.elementId];
      if (ebe != null) {
        if (ebe.length > 1) {
          this.endpointsByElement[endpoint.elementId] = ebe.filter(function (e) {
            return e !== endpoint;
          });
        } else {
          delete this.endpointsByElement[endpoint.elementId];
        }
      }
      this.fire(EVENT_INTERNAL_ENDPOINT_UNREGISTERED, endpoint);
    }
  }, {
    key: "_maybePruneEndpoint",
    value: function _maybePruneEndpoint(endpoint) {
      if (endpoint.deleteOnEmpty && endpoint.connections.length === 0) {
        this.deleteEndpoint(endpoint);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "deleteEndpoint",
    value: function deleteEndpoint(object) {
      var _this5 = this;
      var endpoint = typeof object === "string" ? this.endpointsByUUID.get(object) : object;
      if (endpoint) {
        var proxy = endpoint.proxiedBy;
        var connectionsToDelete = endpoint.connections.slice();
        util.forEach(connectionsToDelete, function (connection) {
          Endpoints.detachFromConnection(endpoint, connection, null, true);
        });
        this.unregisterEndpoint(endpoint);
        Endpoints.destroy(endpoint);
        util.forEach(connectionsToDelete, function (connection) {
          _this5.deleteConnection(connection, {
            force: true,
            endpointToIgnore: endpoint
          });
        });
        if (proxy != null) {
          this.deleteEndpoint(proxy);
        }
      }
      return this;
    }
  }, {
    key: "addEndpoint",
    value: function addEndpoint(el, params, referenceParams) {
      referenceParams = referenceParams || {};
      var p = util.extend({}, referenceParams);
      util.extend(p, params || {});
      var _p = util.extend({
        element: el
      }, p);
      return this._internal_newEndpoint(_p);
    }
  }, {
    key: "addEndpoints",
    value: function addEndpoints(el, endpoints, referenceParams) {
      var results = [];
      for (var i = 0, j = endpoints.length; i < j; i++) {
        results.push(this.addEndpoint(el, endpoints[i], referenceParams));
      }
      return results;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this6 = this;
      this.silently(function () {
        _this6.endpointsByElement = {};
        _this6._managedElements = {};
        _this6.endpointsByUUID.clear();
        _this6.viewport.reset();
        _this6.router.reset();
        _this6.groupManager.reset();
        _this6.connections.length = 0;
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.reset();
      this.unbind();
      this.sourceSelectors.length = 0;
      this.targetSelectors.length = 0;
      this._connectionTypes.clear();
      this._endpointTypes.clear();
    }
  }, {
    key: "getEndpoints",
    value: function getEndpoints(el) {
      return this.endpointsByElement[this.getId(el)] || [];
    }
  }, {
    key: "getEndpoint",
    value: function getEndpoint(uuid) {
      return this.endpointsByUUID.get(uuid);
    }
  }, {
    key: "setEndpointUuid",
    value: function setEndpointUuid(endpoint, uuid) {
      if (endpoint.uuid) {
        this.endpointsByUUID["delete"](endpoint.uuid);
      }
      endpoint.uuid = uuid;
      this.endpointsByUUID.set(uuid, endpoint);
    }
  }, {
    key: "connect",
    value: function connect(params, referenceParams) {
      try {
        var _p = this._prepareConnectionParams(params, referenceParams),
            jpc = this._newConnection(_p);
        this._finaliseConnection(jpc, _p);
        return jpc;
      } catch (errorMessage) {
        util.log(errorMessage);
        return;
      }
    }
  }, {
    key: "_prepareConnectionParams",
    value: function _prepareConnectionParams(params, referenceParams) {
      var temp = util.extend({}, params);
      if (referenceParams) {
        util.extend(temp, referenceParams);
      }
      var _p = temp;
      if (_p.source) {
        if (_p.source.representation) {
          _p.sourceEndpoint = _p.source;
        }
      }
      if (_p.target) {
        if (_p.target.representation) {
          _p.targetEndpoint = _p.target;
        }
      }
      if (params.uuids) {
        _p.sourceEndpoint = this.getEndpoint(params.uuids[0]);
        _p.targetEndpoint = this.getEndpoint(params.uuids[1]);
      }
      if (_p.sourceEndpoint != null) {
        if (Endpoints.isFull(_p.sourceEndpoint)) {
          throw ERROR_SOURCE_ENDPOINT_FULL;
        }
        if (!_p.type) {
          _p.type = _p.sourceEndpoint.edgeType;
        }
        if (_p.sourceEndpoint.connectorOverlays) {
          _p.overlays = _p.overlays || [];
          for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
            _p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
          }
        }
        if (_p.sourceEndpoint.scope) {
          _p.scope = _p.sourceEndpoint.scope;
        }
      } else {
        if (_p.source == null) {
          throw ERROR_SOURCE_DOES_NOT_EXIST;
        }
      }
      if (_p.targetEndpoint != null) {
        if (Endpoints.isFull(_p.targetEndpoint)) {
          throw ERROR_TARGET_ENDPOINT_FULL;
        }
      } else {
        if (_p.target == null) {
          throw ERROR_TARGET_DOES_NOT_EXIST;
        }
      }
      if (_p.sourceEndpoint && _p.targetEndpoint) {
        if (!_scopeMatch(_p.sourceEndpoint, _p.targetEndpoint)) {
          throw "Cannot establish connection: scopes do not match";
        }
      }
      return _p;
    }
  }, {
    key: "_newConnection",
    value: function _newConnection(params) {
      params.id = "con_" + this._idstamp();
      var c = Connections.create(this, params);
      addManagedConnection(c, this._managedElements[c.sourceId], this._managedElements[c.targetId]);
      this._paintConnection(c);
      return c;
    }
  }, {
    key: "_finaliseConnection",
    value: function _finaliseConnection(jpc, params, originalEvent) {
      params = params || {};
      if (!jpc.suspendedEndpoint) {
        this.connections.push(jpc);
      }
      jpc.pending = null;
      jpc.endpoints[0].isTemporarySource = false;
      this.repaint(jpc.source);
      var payload = {
        connection: jpc,
        source: jpc.source,
        target: jpc.target,
        sourceId: jpc.sourceId,
        targetId: jpc.targetId,
        sourceEndpoint: jpc.endpoints[0],
        targetEndpoint: jpc.endpoints[1]
      };
      this.fire(EVENT_INTERNAL_CONNECTION, payload, originalEvent);
      if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {
        this.fire(EVENT_CONNECTION, payload, originalEvent);
      }
    }
  }, {
    key: "removeAllEndpoints",
    value: function removeAllEndpoints(el, recurse) {
      var _this7 = this;
      var _one = function _one(_el) {
        var id = _this7.getId(_el),
            ebe = _this7.endpointsByElement[id],
            i,
            ii;
        if (ebe) {
          for (i = 0, ii = ebe.length; i < ii; i++) {
            _this7.deleteEndpoint(ebe[i]);
          }
        }
        delete _this7.endpointsByElement[id];
      };
      if (recurse) {
        this._getAssociatedElements(el).map(_one);
      }
      _one(el);
      return this;
    }
  }, {
    key: "_createSourceDefinition",
    value: function _createSourceDefinition(params, referenceParams) {
      var p = util.extend({}, referenceParams);
      util.extend(p, params);
      p.edgeType = p.edgeType || common.DEFAULT;
      var aae = this._deriveEndpointAndAnchorSpec(p.edgeType);
      p.endpoint = p.endpoint || aae.endpoints[0];
      p.anchor = p.anchor || aae.anchors[0];
      var maxConnections = p.maxConnections || -1;
      var _def = {
        def: util.extend({}, p),
        uniqueEndpoint: p.uniqueEndpoint,
        maxConnections: maxConnections,
        enabled: true,
        endpoint: null
      };
      return _def;
    }
  }, {
    key: "addSourceSelector",
    value: function addSourceSelector(selector, params) {
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _def = this._createSourceDefinition(params);
      var sel = new ConnectionDragSelector(selector, _def, exclude);
      this.sourceSelectors.push(sel);
      return sel;
    }
  }, {
    key: "removeSourceSelector",
    value: function removeSourceSelector(selector) {
      util.removeWithFunction(this.sourceSelectors, function (s) {
        return s === selector;
      });
    }
  }, {
    key: "removeTargetSelector",
    value: function removeTargetSelector(selector) {
      util.removeWithFunction(this.targetSelectors, function (s) {
        return s === selector;
      });
    }
  }, {
    key: "addTargetSelector",
    value: function addTargetSelector(selector, params) {
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _def = this._createTargetDefinition(params);
      var sel = new ConnectionDragSelector(selector, _def, exclude);
      this.targetSelectors.push(sel);
      return sel;
    }
  }, {
    key: "_createTargetDefinition",
    value: function _createTargetDefinition(params, referenceParams) {
      var p = util.extend({}, referenceParams);
      util.extend(p, params);
      p.edgeType = p.edgeType || common.DEFAULT;
      var maxConnections = p.maxConnections || -1;
      var _def = {
        def: util.extend({}, p),
        uniqueEndpoint: p.uniqueEndpoint,
        maxConnections: maxConnections,
        enabled: true,
        endpoint: null
      };
      return _def;
    }
  }, {
    key: "show",
    value: function show(el, changeEndpoints) {
      return this._setVisible(el, BLOCK, changeEndpoints);
    }
  }, {
    key: "hide",
    value: function hide(el, changeEndpoints) {
      return this._setVisible(el, NONE, changeEndpoints);
    }
  }, {
    key: "_setVisible",
    value: function _setVisible(el, state, alsoChangeEndpoints) {
      var visible = state === BLOCK;
      var endpointFunc = null;
      if (alsoChangeEndpoints) {
        endpointFunc = function endpointFunc(ep) {
          Endpoints.setVisible(ep, visible, true, true);
        };
      }
      var id = this.getId(el);
      this._operation(el, function (jpc) {
        if (visible && alsoChangeEndpoints) {
          var oidx = jpc.sourceId === id ? 1 : 0;
          if (jpc.endpoints[oidx].visible) {
            Connections.setVisible(jpc, true);
          }
        } else {
          Connections.setVisible(jpc, visible);
        }
      }, endpointFunc);
      return this;
    }
  }, {
    key: "toggleVisible",
    value: function toggleVisible(el, changeEndpoints) {
      var endpointFunc = null;
      if (changeEndpoints) {
        endpointFunc = function endpointFunc(ep) {
          var state = ep.visible;
          Endpoints.setVisible(ep, !state);
        };
      }
      this._operation(el, function (jpc) {
        var state = jpc.visible;
        Connections.setVisible(jpc, !state);
      }, endpointFunc);
    }
  }, {
    key: "_operation",
    value: function _operation(el, func, endpointFunc) {
      var elId = this.getId(el);
      var endpoints = this.endpointsByElement[elId];
      if (endpoints && endpoints.length) {
        for (var i = 0, ii = endpoints.length; i < ii; i++) {
          for (var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
            var retVal = func(endpoints[i].connections[j]);
            if (retVal) {
              return;
            }
          }
          if (endpointFunc) {
            endpointFunc(endpoints[i]);
          }
        }
      }
    }
  }, {
    key: "registerConnectionType",
    value: function registerConnectionType(id, type) {
      this._connectionTypes.set(id, util.extend({}, type));
      if (type.overlays) {
        var to = {};
        for (var i = 0; i < type.overlays.length; i++) {
          var fo = convertToFullOverlaySpec(type.overlays[i]);
          to[fo.options.id] = fo;
        }
        this._connectionTypes.get(id).overlays = to;
      }
    }
  }, {
    key: "registerConnectionTypes",
    value: function registerConnectionTypes(types) {
      for (var i in types) {
        this.registerConnectionType(i, types[i]);
      }
    }
  }, {
    key: "registerEndpointType",
    value: function registerEndpointType(id, type) {
      this._endpointTypes.set(id, util.extend({}, type));
      if (type.overlays) {
        var to = {};
        for (var i = 0; i < type.overlays.length; i++) {
          var fo = convertToFullOverlaySpec(type.overlays[i]);
          to[fo.options.id] = fo;
        }
        this._endpointTypes.get(id).overlays = to;
      }
    }
  }, {
    key: "registerEndpointTypes",
    value: function registerEndpointTypes(types) {
      for (var i in types) {
        this.registerEndpointType(i, types[i]);
      }
    }
  }, {
    key: "getType",
    value: function getType(id, typeDescriptor) {
      return typeDescriptor === "connection" ? this.getConnectionType(id) : this.getEndpointType(id);
    }
  }, {
    key: "getConnectionType",
    value: function getConnectionType(id) {
      return this._connectionTypes.get(id);
    }
  }, {
    key: "getEndpointType",
    value: function getEndpointType(id) {
      return this._endpointTypes.get(id);
    }
  }, {
    key: "importDefaults",
    value: function importDefaults(d) {
      for (var i in d) {
        this.defaults[i] = d[i];
      }
      if (this.defaults[DEFAULT_KEY_PAINT_STYLE] != null) {
        this.defaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth = this.defaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth || 2;
      }
      if (d.container) {
        this.setContainer(d.container);
      }
      return this;
    }
  }, {
    key: "restoreDefaults",
    value: function restoreDefaults() {
      this.defaults = util.extend({}, this._initialDefaults);
      return this;
    }
  }, {
    key: "getManagedElements",
    value: function getManagedElements() {
      return this._managedElements;
    }
  }, {
    key: "proxyConnection",
    value: function proxyConnection(connection, index, proxyEl, endpointGenerator, anchorGenerator) {
      var alreadyProxied = connection.proxies[index] != null,
          proxyEp,
          originalElementId = alreadyProxied ? connection.proxies[index].originalEp.elementId : connection.endpoints[index].elementId,
          originalEndpoint = alreadyProxied ? connection.proxies[index].originalEp : connection.endpoints[index],
          proxyElId = this.getId(proxyEl);
      if (connection.proxies[index]) {
        if (connection.proxies[index].ep.elementId === proxyElId) {
          proxyEp = connection.proxies[index].ep;
        } else {
          Endpoints.detachFromConnection(connection.proxies[index].ep, connection, index);
          proxyEp = this._internal_newEndpoint({
            element: proxyEl,
            endpoint: endpointGenerator(connection, index),
            anchor: anchorGenerator(connection, index),
            parameters: {
              isProxyEndpoint: true
            }
          });
        }
      } else {
        proxyEp = this._internal_newEndpoint({
          element: proxyEl,
          endpoint: endpointGenerator(connection, index),
          anchor: anchorGenerator(connection, index),
          parameters: {
            isProxyEndpoint: true
          }
        });
      }
      proxyEp.deleteOnEmpty = true;
      connection.proxies[index] = {
        ep: proxyEp,
        originalEp: originalEndpoint
      };
      this.sourceOrTargetChanged(originalElementId, proxyElId, connection, proxyEl, index);
      Endpoints.detachFromConnection(originalEndpoint, connection, null, true);
      proxyEp.connections = [connection];
      connection.endpoints[index] = proxyEp;
      originalEndpoint.proxiedBy = proxyEp;
      Endpoints.setVisible(originalEndpoint, false);
      Connections.setVisible(connection, true);
      this.revalidate(proxyEl);
    }
  }, {
    key: "unproxyConnection",
    value: function unproxyConnection(connection, index) {
      if (connection.proxies == null || connection.proxies[index] == null) {
        return;
      }
      var originalElement = connection.proxies[index].originalEp.element,
          originalElementId = connection.proxies[index].originalEp.elementId,
          proxyElId = connection.proxies[index].ep.elementId;
      connection.endpoints[index] = connection.proxies[index].originalEp;
      delete connection.proxies[index].originalEp.proxiedBy;
      this.sourceOrTargetChanged(proxyElId, originalElementId, connection, originalElement, index);
      Endpoints.detachFromConnection(connection.proxies[index].ep, connection, null);
      Endpoints.addConnection(connection.proxies[index].originalEp, connection);
      if (connection.visible) {
        Endpoints.setVisible(connection.proxies[index].originalEp, true);
      }
      connection.proxies[index] = null;
      if (util.findWithFunction(connection.proxies, function (p) {
        return p != null;
      }) === -1) {
        connection.proxies.length = 0;
      }
    }
  }, {
    key: "sourceOrTargetChanged",
    value: function sourceOrTargetChanged(originalId, newId, connection, newElement, index) {
      if (originalId !== newId) {
        if (index === 0) {
          connection.sourceId = newId;
          connection.source = newElement;
        } else if (index === 1) {
          connection.targetId = newId;
          connection.target = newElement;
        }
        removeManagedConnection(connection, this._managedElements[originalId]);
        addManagedConnection(connection, this._managedElements[newId]);
      }
    }
  }, {
    key: "getGroup",
    value:
    function getGroup(groupId) {
      return this.groupManager.getGroup(groupId);
    }
  }, {
    key: "getGroupFor",
    value: function getGroupFor(el) {
      return this.groupManager.getGroupFor(el);
    }
  }, {
    key: "addGroup",
    value: function addGroup(params) {
      return this.groupManager.addGroup(params);
    }
  }, {
    key: "addToGroup",
    value: function addToGroup(group) {
      var _this$groupManager;
      for (var _len = arguments.length, el = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        el[_key - 1] = arguments[_key];
      }
      return (_this$groupManager = this.groupManager).addToGroup.apply(_this$groupManager, [group, false].concat(el));
    }
  }, {
    key: "collapseGroup",
    value: function collapseGroup(group) {
      this.groupManager.collapseGroup(group);
    }
  }, {
    key: "expandGroup",
    value: function expandGroup(group) {
      this.groupManager.expandGroup(group);
    }
  }, {
    key: "toggleGroup",
    value: function toggleGroup(group) {
      this.groupManager.toggleGroup(group);
    }
  }, {
    key: "removeGroup",
    value: function removeGroup(group, deleteMembers, _manipulateView, _doNotFireEvent) {
      return this.groupManager.removeGroup(group, deleteMembers, _manipulateView, _doNotFireEvent);
    }
  }, {
    key: "removeAllGroups",
    value: function removeAllGroups(deleteMembers, _manipulateView) {
      this.groupManager.removeAllGroups(deleteMembers, _manipulateView, false);
    }
  }, {
    key: "removeFromGroup",
    value: function removeFromGroup(group, el, _doNotFireEvent) {
      this.groupManager.removeFromGroup(group, _doNotFireEvent, el);
      this._appendElement(el, this.getContainer());
      this.updateOffset({
        recalc: true,
        elId: this.getId(el)
      });
    }
  }, {
    key: "_paintEndpoint",
    value: function _paintEndpoint(endpoint, params) {
      function findConnectionToUseForDynamicAnchor(ep) {
        var idx = 0;
        if (params.elementWithPrecedence != null) {
          for (var i = 0; i < ep.connections.length; i++) {
            if (ep.connections[i].sourceId === params.elementWithPrecedence || ep.connections[i].targetId === params.elementWithPrecedence) {
              idx = i;
              break;
            }
          }
        }
        return ep.connections[idx];
      }
      params = params || {};
      var timestamp = params.timestamp,
          recalc = !(params.recalc === false);
      if (!timestamp || endpoint.timestamp !== timestamp) {
        var info = this.viewport.getPosition(endpoint.elementId);
        var xy = params.offset ? {
          x: params.offset.x,
          y: params.offset.y
        } : {
          x: info.x,
          y: info.y
        };
        if (xy != null) {
          var ap = params.anchorLoc;
          if (ap == null) {
            var anchorParams = {
              xy: xy,
              wh: info,
              element: endpoint,
              timestamp: timestamp
            };
            if (recalc && this.router.isDynamicAnchor(endpoint) && endpoint.connections.length > 0) {
              var _c3 = findConnectionToUseForDynamicAnchor(endpoint),
                  oIdx = _c3.endpoints[0] === endpoint ? 1 : 0,
                  oId = oIdx === 0 ? _c3.sourceId : _c3.targetId,
                  oInfo = this.viewport.getPosition(oId);
              anchorParams.index = oIdx === 0 ? 1 : 0;
              anchorParams.connection = _c3;
              anchorParams.txy = oInfo;
              anchorParams.twh = oInfo;
              anchorParams.tElement = _c3.endpoints[oIdx];
              anchorParams.tRotation = this._getRotations(oId);
            } else if (endpoint.connections.length > 0) {
              anchorParams.connection = endpoint.connections[0];
            }
            anchorParams.rotation = this._getRotations(endpoint.elementId);
            ap = this.router.computeAnchorLocation(endpoint._anchor, anchorParams);
          }
          Endpoints.compute(endpoint.representation, ap, this.router.getEndpointOrientation(endpoint), endpoint.paintStyleInUse);
          this.renderEndpoint(endpoint, endpoint.paintStyleInUse);
          endpoint.timestamp = timestamp;
          for (var i in endpoint.overlays) {
            if (endpoint.overlays.hasOwnProperty(i)) {
              var _o = endpoint.overlays[i];
              if (_o.visible) {
                endpoint.overlayPlacements[i] = this.drawOverlay(_o, endpoint, endpoint.paintStyleInUse, Components.getAbsoluteOverlayPosition(endpoint, _o));
                this._paintOverlay(_o, endpoint.overlayPlacements[i], {
                  xmin: 0,
                  ymin: 0
                });
              }
            }
          }
        }
      }
    }
  }, {
    key: "_paintConnection",
    value: function _paintConnection(connection, params) {
      if (!this._suspendDrawing && connection.visible !== false) {
        params = params || {};
        var timestamp = params.timestamp;
        if (timestamp != null && timestamp === connection.lastPaintedAt) {
          return;
        }
        if (timestamp == null || timestamp !== connection.lastPaintedAt) {
          this.router.computePath(connection, timestamp);
          var overlayExtents = {
            xmin: Infinity,
            ymin: Infinity,
            xmax: -Infinity,
            ymax: -Infinity
          };
          for (var i in connection.overlays) {
            if (connection.overlays.hasOwnProperty(i)) {
              var _o2 = connection.overlays[i];
              if (_o2.visible) {
                connection.overlayPlacements[i] = this.drawOverlay(_o2, connection, connection.paintStyleInUse, Components.getAbsoluteOverlayPosition(connection, _o2));
                overlayExtents.xmin = Math.min(overlayExtents.xmin, connection.overlayPlacements[i].xmin);
                overlayExtents.xmax = Math.max(overlayExtents.xmax, connection.overlayPlacements[i].xmax);
                overlayExtents.ymin = Math.min(overlayExtents.ymin, connection.overlayPlacements[i].ymin);
                overlayExtents.ymax = Math.max(overlayExtents.ymax, connection.overlayPlacements[i].ymax);
              }
            }
          }
          var lineWidth = parseFloat("" + connection.paintStyleInUse.strokeWidth || "1") / 2,
              outlineWidth = parseFloat("" + connection.paintStyleInUse.strokeWidth || "0"),
              _extents = {
            xmin: Math.min(connection.connector.bounds.xmin - (lineWidth + outlineWidth), overlayExtents.xmin),
            ymin: Math.min(connection.connector.bounds.ymin - (lineWidth + outlineWidth), overlayExtents.ymin),
            xmax: Math.max(connection.connector.bounds.xmax + (lineWidth + outlineWidth), overlayExtents.xmax),
            ymax: Math.max(connection.connector.bounds.ymax + (lineWidth + outlineWidth), overlayExtents.ymax)
          };
          this.paintConnector(connection.connector, connection.paintStyleInUse, _extents);
          for (var j in connection.overlays) {
            if (connection.overlays.hasOwnProperty(j)) {
              var _p2 = connection.overlays[j];
              if (_p2.visible) {
                this._paintOverlay(_p2, connection.overlayPlacements[j], _extents);
              }
            }
          }
        }
        connection.lastPaintedAt = timestamp;
      }
    }
  }, {
    key: "_refreshEndpoint",
    value: function _refreshEndpoint(endpoint) {
      if (!endpoint._anchor.isFloating) {
        if (endpoint.connections.length > 0) {
          this.addEndpointClass(endpoint, this.endpointConnectedClass);
        } else {
          this.removeEndpointClass(endpoint, this.endpointConnectedClass);
        }
        if (Endpoints.isFull(endpoint)) {
          this.addEndpointClass(endpoint, this.endpointFullClass);
        } else {
          this.removeEndpointClass(endpoint, this.endpointFullClass);
        }
      }
    }
  }, {
    key: "addOverlay",
    value: function addOverlay(component, overlay, doNotRevalidate) {
      Components.addOverlay(component, overlay);
      if (!doNotRevalidate) {
        var relatedElement = Endpoints.isEndpoint(component) ? component.element : component.source;
        this.revalidate(relatedElement);
      }
    }
  }, {
    key: "removeOverlay",
    value: function removeOverlay(component, overlayId) {
      Components.removeOverlay(component, overlayId);
      var relatedElement = Endpoints.isEndpoint(component) ? component.element : component.source;
      this.revalidate(relatedElement);
    }
  }, {
    key: "setOutlineColor",
    value: function setOutlineColor(conn, color) {
      conn.paintStyleInUse.outlineStroke = color;
      this._paintConnection(conn);
    }
  }, {
    key: "setOutlineWidth",
    value: function setOutlineWidth(conn, width) {
      conn.paintStyleInUse.outlineWidth = width;
      this._paintConnection(conn);
    }
  }, {
    key: "setColor",
    value: function setColor(conn, color) {
      conn.paintStyleInUse.stroke = color;
      this._paintConnection(conn);
    }
  }, {
    key: "setLineWidth",
    value: function setLineWidth(conn, width) {
      conn.paintStyleInUse.strokeWidth = width;
      this._paintConnection(conn);
    }
  }, {
    key: "setLineStyle",
    value: function setLineStyle(conn, style) {
      if (style.lineWidth != null) {
        conn.paintStyleInUse.strokeWidth = style.lineWidth;
      }
      if (style.outlineWidth != null) {
        conn.paintStyleInUse.outlineWidth = style.outlineWidth;
      }
      if (style.color != null) {
        conn.paintStyleInUse.stroke = style.color;
      }
      if (style.outlineColor != null) {
        conn.paintStyleInUse.outlineStroke = style.outlineColor;
      }
      this._paintConnection(conn);
    }
  }, {
    key: "getPathData",
    value:
    function getPathData(connector) {
      var p = "";
      for (var i = 0; i < connector.segments.length; i++) {
        p += Segments.get(connector.segments[i].type).getPath(connector.segments[i], i === 0);
        p += " ";
      }
      return p;
    }
  }]);
  return JsPlumbInstance;
}(util.EventGenerator);

var VERY_SMALL_VALUE = 0.0000000001;
function gentleRound(n) {
  var f = Math.floor(n),
      r = Math.ceil(n);
  if (n - f < VERY_SMALL_VALUE) {
    return f;
  } else if (r - n < VERY_SMALL_VALUE) {
    return r;
  }
  return n;
}
function _calcAngleForLocation(segment, location) {
  if (segment.anticlockwise) {
    var sa = segment.startAngle < segment.endAngle ? segment.startAngle + util.TWO_PI : segment.startAngle,
        s = Math.abs(sa - segment.endAngle);
    return sa - s * location;
  } else {
    var ea = segment.endAngle < segment.startAngle ? segment.endAngle + util.TWO_PI : segment.endAngle,
        ss = Math.abs(ea - segment.startAngle);
    return segment.startAngle + ss * location;
  }
}
function _calcAngle(cx, cy, _x, _y) {
  return util.theta({
    x: cx,
    y: cy
  }, {
    x: _x,
    y: _y
  });
}
function _getPath(segment, isFirstSegment) {
  var laf = segment.sweep > Math.PI ? 1 : 0,
      sf = segment.anticlockwise ? 0 : 1;
  return (isFirstSegment ? "M" + segment.x1 + " " + segment.y1 + " " : "") + "A " + segment.radius + " " + segment.radius + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
}
function _getLength(segment) {
  return segment.length;
}
function _pointOnPath(segment, location, absolute) {
  if (location === 0) {
    return {
      x: segment.x1,
      y: segment.y1,
      theta: segment.startAngle
    };
  } else if (location === 1) {
    return {
      x: segment.x2,
      y: segment.y2,
      theta: segment.endAngle
    };
  }
  if (absolute) {
    location = location / segment.length;
  }
  var angle = _calcAngleForLocation(segment, location),
      _x = segment.cx + segment.radius * Math.cos(angle),
      _y = segment.cy + segment.radius * Math.sin(angle);
  return {
    x: gentleRound(_x),
    y: gentleRound(_y),
    theta: angle
  };
}
function _gradientAtPoint(segment, location, absolute) {
  var p = _pointOnPath(segment, location, absolute);
  var m = util.normal({
    x: segment.cx,
    y: segment.cy
  }, p);
  if (!segment.anticlockwise && (m === Infinity || m === -Infinity)) {
    m *= -1;
  }
  return m;
}
function _pointAlongPathFrom(segment, location, distance, absolute) {
  var p = _pointOnPath(segment, location, absolute),
      arcSpan = distance / segment.circumference * 2 * Math.PI,
      dir = segment.anticlockwise ? -1 : 1,
      startAngle = p.theta + dir * arcSpan,
      startX = segment.cx + segment.radius * Math.cos(startAngle),
      startY = segment.cy + segment.radius * Math.sin(startAngle);
  return {
    x: startX,
    y: startY
  };
}
var SEGMENT_TYPE_ARC = "Arc";
function _createArcSegment(params) {
  var startAngle,
      endAngle,
      x1 = params.x1,
      x2 = params.x2,
      y1 = params.y1,
      y2 = params.y2,
      cx = params.cx,
      cy = params.cy,
      radius = params.r,
      anticlockwise = params.ac;
  if (params.startAngle && params.endAngle) {
    startAngle = params.startAngle;
    endAngle = params.endAngle;
    x1 = cx + radius * Math.cos(startAngle);
    y1 = cy + radius * Math.sin(startAngle);
    x2 = cx + radius * Math.cos(endAngle);
    y2 = cy + radius * Math.sin(endAngle);
  } else {
    startAngle = _calcAngle(cx, cy, x1, y1);
    endAngle = _calcAngle(cx, cy, x2, y2);
  }
  if (endAngle < 0) {
    endAngle += util.TWO_PI;
  }
  if (startAngle < 0) {
    startAngle += util.TWO_PI;
  }
  var ea = endAngle < startAngle ? endAngle + util.TWO_PI : endAngle;
  var sweep = Math.abs(ea - startAngle);
  if (anticlockwise) {
    sweep = util.TWO_PI - sweep;
  }
  var circumference = 2 * Math.PI * radius;
  var frac = sweep / util.TWO_PI;
  var length = circumference * frac;
  var extents = {
    xmin: cx - radius,
    xmax: cx + radius,
    ymin: cy - radius,
    ymax: cy + radius
  };
  return {
    x1: x1,
    x2: x2,
    y1: y1,
    y2: y2,
    startAngle: startAngle,
    endAngle: endAngle,
    cx: cx,
    cy: cy,
    radius: radius,
    anticlockwise: anticlockwise,
    sweep: sweep,
    circumference: circumference,
    frac: frac,
    length: length,
    extents: extents,
    type: SEGMENT_TYPE_ARC
  };
}
var ArcSegmentHandler = {
  create: function create(segmentType, params) {
    return _createArcSegment(params);
  },
  findClosestPointOnPath: function findClosestPointOnPath(s, x, y) {
    return common.defaultSegmentHandler.findClosestPointOnPath(this, s, x, y);
  },
  getLength: function getLength(s) {
    return _getLength(s);
  },
  getPath: function getPath(s, isFirstSegment) {
    return _getPath(s, isFirstSegment);
  },
  gradientAtPoint: function gradientAtPoint(s, location, absolute) {
    return _gradientAtPoint(s, location, absolute);
  },
  lineIntersection: function lineIntersection(s, x1, y1, x2, y2) {
    return common.defaultSegmentHandler.lineIntersection(this, x1, y1, x2, y2);
  },
  pointAlongPathFrom: function pointAlongPathFrom(s, location, distance, absolute) {
    return _pointAlongPathFrom(s, location, distance, absolute);
  },
  pointOnPath: function pointOnPath(s, location, absolute) {
    return _pointOnPath(s, location, absolute);
  },
  boxIntersection: function boxIntersection(s, x, y, w, h) {
    return common.defaultSegmentHandler.boxIntersection(this, s, x, y, w, h);
  },
  boundingBoxIntersection: function boundingBoxIntersection(s, box) {
    return common.defaultSegmentHandler.boundingBoxIntersection(this, s, box);
  }
};
Segments.register(SEGMENT_TYPE_ARC, ArcSegmentHandler);

var DEFAULT_WIDTH = 20;
var DEFAULT_LENGTH = 20;
var TYPE_OVERLAY_ARROW = "Arrow";
function isArrowOverlay(o) {
  return o.type === TYPE_OVERLAY_ARROW;
}
var ArrowOverlayHandler = {
  create: function create(p1, p2, options) {
    options = options || {};
    var overlayBase = createOverlayBase(p1, p2, options);
    var width = options.width || DEFAULT_WIDTH;
    var length = options.length || DEFAULT_LENGTH;
    var direction = (options.direction || 1) < 0 ? -1 : 1;
    var foldback = options.foldback || 0.623;
    var paintStyle = options.paintStyle || {
      "strokeWidth": 1
    };
    var location = options.location == null ? this.location : Array.isArray(options.location) ? options.location[0] : options.location;
    return util.extend(overlayBase, {
      width: width,
      length: length,
      direction: direction,
      foldback: foldback,
      paintStyle: paintStyle,
      location: location,
      type: TYPE_OVERLAY_ARROW
    });
  },
  draw: function draw(overlay, component, currentConnectionPaintStyle, absolutePosition) {
    if (Connections.isConnection(component)) {
      var connector = component.connector;
      var hxy, mid, txy, tail, cxy;
      if (overlay.location > 1 || overlay.location < 0) {
        var fromLoc = overlay.location < 0 ? 1 : 0;
        hxy = pointAlongComponentPathFrom(connector, fromLoc, overlay.location, false);
        mid = pointAlongComponentPathFrom(connector, fromLoc, overlay.location - overlay.direction * overlay.length / 2, false);
        txy = util.pointOnLine(hxy, mid, overlay.length);
      } else if (overlay.location === 1) {
        hxy = pointOnComponentPath(connector, overlay.location);
        mid = pointAlongComponentPathFrom(connector, overlay.location, -overlay.length);
        txy = util.pointOnLine(hxy, mid, overlay.length);
        if (overlay.direction === -1) {
          var _ = txy;
          txy = hxy;
          hxy = _;
        }
      } else if (overlay.location === 0) {
        txy = pointOnComponentPath(connector, overlay.location);
        mid = pointAlongComponentPathFrom(connector, overlay.location, overlay.length);
        hxy = util.pointOnLine(txy, mid, overlay.length);
        if (overlay.direction === -1) {
          var __ = txy;
          txy = hxy;
          hxy = __;
        }
      } else {
        hxy = pointAlongComponentPathFrom(connector, overlay.location, overlay.direction * overlay.length / 2);
        mid = pointOnComponentPath(connector, overlay.location);
        txy = util.pointOnLine(hxy, mid, overlay.length);
      }
      tail = util.perpendicularLineTo(hxy, txy, overlay.width);
      cxy = util.pointOnLine(hxy, txy, overlay.foldback * overlay.length);
      var d = {
        hxy: hxy,
        tail: tail,
        cxy: cxy
      },
          stroke = overlay.paintStyle.stroke || currentConnectionPaintStyle.stroke,
          fill = overlay.paintStyle.fill || currentConnectionPaintStyle.stroke,
          lineWidth = overlay.paintStyle.strokeWidth || currentConnectionPaintStyle.strokeWidth;
      return {
        component: component,
        d: d,
        "stroke-width": lineWidth,
        stroke: stroke,
        fill: fill,
        xmin: Math.min(hxy.x, tail[0].x, tail[1].x),
        xmax: Math.max(hxy.x, tail[0].x, tail[1].x),
        ymin: Math.min(hxy.y, tail[0].y, tail[1].y),
        ymax: Math.max(hxy.y, tail[0].y, tail[1].y)
      };
    }
  },
  updateFrom: function updateFrom(d) {}
};
OverlayFactory.register(TYPE_OVERLAY_ARROW, ArrowOverlayHandler);

var TYPE_OVERLAY_PLAIN_ARROW = "PlainArrow";
function isPlainArrowOverlay(o) {
  return o.type === TYPE_OVERLAY_PLAIN_ARROW;
}
var PlainArrowOverlayHandler = {
  create: function create(p1, p2, options) {
    options = options || {};
    options.foldback = 1;
    var arrowOverlay = ArrowOverlayHandler.create(p1, p2, options);
    arrowOverlay.type = TYPE_OVERLAY_PLAIN_ARROW;
    return arrowOverlay;
  },
  draw: function draw(overlay, component, currentConnectionPaintStyle, absolutePosition) {
    return ArrowOverlayHandler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition);
  },
  updateFrom: function updateFrom(d) {}
};
OverlayFactory.register(TYPE_OVERLAY_PLAIN_ARROW, PlainArrowOverlayHandler);

var TYPE_OVERLAY_DIAMOND = "Diamond";
function isDiamondOverlay(o) {
  return o.type === TYPE_OVERLAY_DIAMOND;
}
var DiamondOverlayHandler = {
  create: function create(p1, p2, options) {
    options = options || {};
    options.foldback = 2;
    var l = options.length || DEFAULT_LENGTH;
    options.length = l / 2;
    var arrow = ArrowOverlayHandler.create(p1, p2, options);
    arrow.type = TYPE_OVERLAY_DIAMOND;
    return arrow;
  },
  draw: function draw(overlay, component, currentConnectionPaintStyle, absolutePosition) {
    return ArrowOverlayHandler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition);
  },
  updateFrom: function updateFrom(d) {}
};
OverlayFactory.register(TYPE_OVERLAY_DIAMOND, DiamondOverlayHandler);

var TYPE_OVERLAY_CUSTOM = "Custom";
function isCustomOverlay(o) {
  return o.type === TYPE_OVERLAY_CUSTOM;
}
var CustomOverlayHandler = {
  create: function create(instance, component, options) {
    var overlayBase = createOverlayBase(instance, component, options);
    return util.extend(overlayBase, {
      create: options.create,
      type: TYPE_OVERLAY_CUSTOM
    });
  },
  draw: function draw(overlay, component, currentConnectionPaintStyle, absolutePosition) {},
  updateFrom: function updateFrom(d) {}
};
OverlayFactory.register(TYPE_OVERLAY_CUSTOM, CustomOverlayHandler);

EndpointFactory.registerHandler(DotEndpointHandler);
EndpointFactory.registerHandler(RectangleEndpointHandler);
EndpointFactory.registerHandler(BlankEndpointHandler);

exports.ABSOLUTE = ABSOLUTE;
exports.ADD_CLASS_ACTION = ADD_CLASS_ACTION;
exports.ATTRIBUTE_GROUP = ATTRIBUTE_GROUP;
exports.ATTRIBUTE_MANAGED = ATTRIBUTE_MANAGED;
exports.ATTRIBUTE_NOT_DRAGGABLE = ATTRIBUTE_NOT_DRAGGABLE;
exports.ATTRIBUTE_SCOPE = ATTRIBUTE_SCOPE;
exports.ATTRIBUTE_SCOPE_PREFIX = ATTRIBUTE_SCOPE_PREFIX;
exports.ATTRIBUTE_TABINDEX = ATTRIBUTE_TABINDEX;
exports.ArrowOverlayHandler = ArrowOverlayHandler;
exports.BLOCK = BLOCK;
exports.BOTTOM = BOTTOM;
exports.BlankEndpointHandler = BlankEndpointHandler;
exports.CHECK_CONDITION = CHECK_CONDITION;
exports.CHECK_DROP_ALLOWED = CHECK_DROP_ALLOWED;
exports.CLASS_CONNECTED = CLASS_CONNECTED;
exports.CLASS_CONNECTOR = CLASS_CONNECTOR;
exports.CLASS_CONNECTOR_OUTLINE = CLASS_CONNECTOR_OUTLINE;
exports.CLASS_ENDPOINT = CLASS_ENDPOINT;
exports.CLASS_ENDPOINT_ANCHOR_PREFIX = CLASS_ENDPOINT_ANCHOR_PREFIX;
exports.CLASS_ENDPOINT_CONNECTED = CLASS_ENDPOINT_CONNECTED;
exports.CLASS_ENDPOINT_DROP_ALLOWED = CLASS_ENDPOINT_DROP_ALLOWED;
exports.CLASS_ENDPOINT_DROP_FORBIDDEN = CLASS_ENDPOINT_DROP_FORBIDDEN;
exports.CLASS_ENDPOINT_FLOATING = CLASS_ENDPOINT_FLOATING;
exports.CLASS_ENDPOINT_FULL = CLASS_ENDPOINT_FULL;
exports.CLASS_GROUP_COLLAPSED = CLASS_GROUP_COLLAPSED;
exports.CLASS_GROUP_EXPANDED = CLASS_GROUP_EXPANDED;
exports.CLASS_OVERLAY = CLASS_OVERLAY;
exports.CONNECTOR_TYPE_STRAIGHT = CONNECTOR_TYPE_STRAIGHT;
exports.Components = Components;
exports.ConnectionDragSelector = ConnectionDragSelector;
exports.ConnectionSelection = ConnectionSelection;
exports.Connections = Connections;
exports.Connectors = Connectors;
exports.DEFAULT_KEY_ALLOW_NESTED_GROUPS = DEFAULT_KEY_ALLOW_NESTED_GROUPS;
exports.DEFAULT_KEY_ANCHOR = DEFAULT_KEY_ANCHOR;
exports.DEFAULT_KEY_ANCHORS = DEFAULT_KEY_ANCHORS;
exports.DEFAULT_KEY_CONNECTIONS_DETACHABLE = DEFAULT_KEY_CONNECTIONS_DETACHABLE;
exports.DEFAULT_KEY_CONNECTION_OVERLAYS = DEFAULT_KEY_CONNECTION_OVERLAYS;
exports.DEFAULT_KEY_CONNECTOR = DEFAULT_KEY_CONNECTOR;
exports.DEFAULT_KEY_CONTAINER = DEFAULT_KEY_CONTAINER;
exports.DEFAULT_KEY_ENDPOINT = DEFAULT_KEY_ENDPOINT;
exports.DEFAULT_KEY_ENDPOINTS = DEFAULT_KEY_ENDPOINTS;
exports.DEFAULT_KEY_ENDPOINT_HOVER_STYLE = DEFAULT_KEY_ENDPOINT_HOVER_STYLE;
exports.DEFAULT_KEY_ENDPOINT_HOVER_STYLES = DEFAULT_KEY_ENDPOINT_HOVER_STYLES;
exports.DEFAULT_KEY_ENDPOINT_OVERLAYS = DEFAULT_KEY_ENDPOINT_OVERLAYS;
exports.DEFAULT_KEY_ENDPOINT_STYLE = DEFAULT_KEY_ENDPOINT_STYLE;
exports.DEFAULT_KEY_ENDPOINT_STYLES = DEFAULT_KEY_ENDPOINT_STYLES;
exports.DEFAULT_KEY_HOVER_CLASS = DEFAULT_KEY_HOVER_CLASS;
exports.DEFAULT_KEY_HOVER_PAINT_STYLE = DEFAULT_KEY_HOVER_PAINT_STYLE;
exports.DEFAULT_KEY_LIST_STYLE = DEFAULT_KEY_LIST_STYLE;
exports.DEFAULT_KEY_MAX_CONNECTIONS = DEFAULT_KEY_MAX_CONNECTIONS;
exports.DEFAULT_KEY_PAINT_STYLE = DEFAULT_KEY_PAINT_STYLE;
exports.DEFAULT_KEY_REATTACH_CONNECTIONS = DEFAULT_KEY_REATTACH_CONNECTIONS;
exports.DEFAULT_KEY_SCOPE = DEFAULT_KEY_SCOPE;
exports.DEFAULT_LABEL_LOCATION_CONNECTION = DEFAULT_LABEL_LOCATION_CONNECTION;
exports.DEFAULT_LABEL_LOCATION_ENDPOINT = DEFAULT_LABEL_LOCATION_ENDPOINT;
exports.DEFAULT_LENGTH = DEFAULT_LENGTH;
exports.DEFAULT_OVERLAY_KEY_ENDPOINTS = DEFAULT_OVERLAY_KEY_ENDPOINTS;
exports.DotEndpointHandler = DotEndpointHandler;
exports.ERROR_SOURCE_DOES_NOT_EXIST = ERROR_SOURCE_DOES_NOT_EXIST;
exports.ERROR_SOURCE_ENDPOINT_FULL = ERROR_SOURCE_ENDPOINT_FULL;
exports.ERROR_TARGET_DOES_NOT_EXIST = ERROR_TARGET_DOES_NOT_EXIST;
exports.ERROR_TARGET_ENDPOINT_FULL = ERROR_TARGET_ENDPOINT_FULL;
exports.EVENT_ANCHOR_CHANGED = EVENT_ANCHOR_CHANGED;
exports.EVENT_CONNECTION = EVENT_CONNECTION;
exports.EVENT_CONNECTION_DETACHED = EVENT_CONNECTION_DETACHED;
exports.EVENT_CONNECTION_MOVED = EVENT_CONNECTION_MOVED;
exports.EVENT_CONTAINER_CHANGE = EVENT_CONTAINER_CHANGE;
exports.EVENT_ENDPOINT_REPLACED = EVENT_ENDPOINT_REPLACED;
exports.EVENT_GROUP_ADDED = EVENT_GROUP_ADDED;
exports.EVENT_GROUP_COLLAPSE = EVENT_GROUP_COLLAPSE;
exports.EVENT_GROUP_EXPAND = EVENT_GROUP_EXPAND;
exports.EVENT_GROUP_MEMBER_ADDED = EVENT_GROUP_MEMBER_ADDED;
exports.EVENT_GROUP_MEMBER_REMOVED = EVENT_GROUP_MEMBER_REMOVED;
exports.EVENT_GROUP_REMOVED = EVENT_GROUP_REMOVED;
exports.EVENT_INTERNAL_CONNECTION = EVENT_INTERNAL_CONNECTION;
exports.EVENT_INTERNAL_CONNECTION_DETACHED = EVENT_INTERNAL_CONNECTION_DETACHED;
exports.EVENT_INTERNAL_ENDPOINT_UNREGISTERED = EVENT_INTERNAL_ENDPOINT_UNREGISTERED;
exports.EVENT_MANAGE_ELEMENT = EVENT_MANAGE_ELEMENT;
exports.EVENT_MAX_CONNECTIONS = EVENT_MAX_CONNECTIONS;
exports.EVENT_NESTED_GROUP_ADDED = EVENT_NESTED_GROUP_ADDED;
exports.EVENT_NESTED_GROUP_REMOVED = EVENT_NESTED_GROUP_REMOVED;
exports.EVENT_UNMANAGE_ELEMENT = EVENT_UNMANAGE_ELEMENT;
exports.EVENT_ZOOM = EVENT_ZOOM;
exports.EndpointFactory = EndpointFactory;
exports.EndpointSelection = EndpointSelection;
exports.Endpoints = Endpoints;
exports.FIXED = FIXED;
exports.GroupManager = GroupManager;
exports.ID_PREFIX_CONNECTION = ID_PREFIX_CONNECTION;
exports.ID_PREFIX_ENDPOINT = ID_PREFIX_ENDPOINT;
exports.INTERCEPT_BEFORE_DETACH = INTERCEPT_BEFORE_DETACH;
exports.INTERCEPT_BEFORE_DRAG = INTERCEPT_BEFORE_DRAG;
exports.INTERCEPT_BEFORE_DROP = INTERCEPT_BEFORE_DROP;
exports.INTERCEPT_BEFORE_START_DETACH = INTERCEPT_BEFORE_START_DETACH;
exports.IS_DETACH_ALLOWED = IS_DETACH_ALLOWED;
exports.JsPlumbInstance = JsPlumbInstance;
exports.KEY_CONNECTION_OVERLAYS = KEY_CONNECTION_OVERLAYS;
exports.LEFT = LEFT;
exports.Labels = Labels;
exports.LightweightFloatingAnchor = LightweightFloatingAnchor;
exports.LightweightRouter = LightweightRouter;
exports.NONE = NONE;
exports.OverlayFactory = OverlayFactory;
exports.Overlays = Overlays;
exports.REDROP_POLICY_ANY = REDROP_POLICY_ANY;
exports.REDROP_POLICY_ANY_SOURCE = REDROP_POLICY_ANY_SOURCE;
exports.REDROP_POLICY_ANY_SOURCE_OR_TARGET = REDROP_POLICY_ANY_SOURCE_OR_TARGET;
exports.REDROP_POLICY_ANY_TARGET = REDROP_POLICY_ANY_TARGET;
exports.REDROP_POLICY_STRICT = REDROP_POLICY_STRICT;
exports.REMOVE_CLASS_ACTION = REMOVE_CLASS_ACTION;
exports.RIGHT = RIGHT;
exports.RectangleEndpointHandler = RectangleEndpointHandler;
exports.SEGMENT_TYPE_ARC = SEGMENT_TYPE_ARC;
exports.SEGMENT_TYPE_STRAIGHT = SEGMENT_TYPE_STRAIGHT;
exports.SELECTOR_MANAGED_ELEMENT = SELECTOR_MANAGED_ELEMENT;
exports.SOURCE = SOURCE;
exports.SOURCE_INDEX = SOURCE_INDEX;
exports.STATIC = STATIC;
exports.Segments = Segments;
exports.TARGET = TARGET;
exports.TARGET_INDEX = TARGET_INDEX;
exports.TOP = TOP;
exports.TYPE_DESCRIPTOR_CONNECTION = TYPE_DESCRIPTOR_CONNECTION;
exports.TYPE_DESCRIPTOR_CONNECTOR = TYPE_DESCRIPTOR_CONNECTOR;
exports.TYPE_DESCRIPTOR_ENDPOINT = TYPE_DESCRIPTOR_ENDPOINT;
exports.TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION = TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION;
exports.TYPE_ENDPOINT_BLANK = TYPE_ENDPOINT_BLANK;
exports.TYPE_ENDPOINT_DOT = TYPE_ENDPOINT_DOT;
exports.TYPE_ENDPOINT_RECTANGLE = TYPE_ENDPOINT_RECTANGLE;
exports.TYPE_ID_CONNECTION = TYPE_ID_CONNECTION;
exports.TYPE_ITEM_ANCHORS = TYPE_ITEM_ANCHORS;
exports.TYPE_ITEM_CONNECTOR = TYPE_ITEM_CONNECTOR;
exports.TYPE_OVERLAY_ARROW = TYPE_OVERLAY_ARROW;
exports.TYPE_OVERLAY_CUSTOM = TYPE_OVERLAY_CUSTOM;
exports.TYPE_OVERLAY_DIAMOND = TYPE_OVERLAY_DIAMOND;
exports.TYPE_OVERLAY_LABEL = TYPE_OVERLAY_LABEL;
exports.TYPE_OVERLAY_PLAIN_ARROW = TYPE_OVERLAY_PLAIN_ARROW;
exports.UIGroup = UIGroup;
exports.UINode = UINode;
exports.Viewport = Viewport;
exports.X_AXIS_FACES = X_AXIS_FACES;
exports.Y_AXIS_FACES = Y_AXIS_FACES;
exports._addSegment = _addSegment;
exports._clearSegments = _clearSegments;
exports._createPerimeterAnchor = _createPerimeterAnchor;
exports._findSegmentForLocation = _findSegmentForLocation;
exports._removeTypeCssHelper = _removeTypeCssHelper;
exports._updateHoverStyle = _updateHoverStyle;
exports._updateSegmentProportions = _updateSegmentProportions;
exports.att = att;
exports.classList = classList;
exports.cls = cls;
exports.compute = compute;
exports.connectorBoundingBoxIntersection = connectorBoundingBoxIntersection;
exports.connectorBoxIntersection = connectorBoxIntersection;
exports.convertToFullOverlaySpec = convertToFullOverlaySpec;
exports.createBaseRepresentation = createBaseRepresentation;
exports.createComponentBase = createComponentBase;
exports.createConnectorBase = createConnectorBase;
exports.createEndpoint = createEndpoint;
exports.createFloatingAnchor = createFloatingAnchor;
exports.createOverlayBase = createOverlayBase;
exports.defaultConnectorHandler = defaultConnectorHandler;
exports.dumpSegmentsToConsole = dumpSegmentsToConsole;
exports.findSegmentForPoint = findSegmentForPoint;
exports.getDefaultFace = getDefaultFace;
exports.gradientAtComponentPoint = gradientAtComponentPoint;
exports.isArrowOverlay = isArrowOverlay;
exports.isContinuous = isContinuous;
exports.isCustomOverlay = isCustomOverlay;
exports.isDiamondOverlay = isDiamondOverlay;
exports.isDynamic = isDynamic;
exports.isEdgeSupported = isEdgeSupported;
exports.isEndpointRepresentation = isEndpointRepresentation;
exports.isFloating = _isFloating;
exports.isFullOverlaySpec = isFullOverlaySpec;
exports.isLabelOverlay = isLabelOverlay;
exports.isPlainArrowOverlay = isPlainArrowOverlay;
exports.lineIntersection = lineIntersection;
exports.makeLightweightAnchorFromSpec = makeLightweightAnchorFromSpec;
exports.pointAlongComponentPathFrom = pointAlongComponentPathFrom;
exports.pointOnComponentPath = pointOnComponentPath;
exports.resetBounds = resetBounds;
exports.resetGeometry = resetGeometry;
exports.setGeometry = setGeometry;
exports.setPreparedConnector = setPreparedConnector;
exports.transformAnchorPlacement = transformAnchorPlacement;
exports.updateBounds = updateBounds;
