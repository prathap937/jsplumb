import {PointXY, extend} from "@jsplumb/util"

import {
    Connection,
    ConnectorComputeParams,
    PaintGeometry,
    SEGMENT_TYPE_ARC,
    _addSegment,
    ConnectorBase,
    createConnectorBase
} from "@jsplumb/core"

import {AnchorPlacement, ConnectorOptions, Geometry} from "@jsplumb/common"

export interface BaseBezierConnectorGeometry extends Geometry {
    source:AnchorPlacement,
    target:AnchorPlacement
}

/**
 * The bezier connector's internal representation of a path.
 * @public
 */
export interface BezierConnectorGeometry extends BaseBezierConnectorGeometry {
    controlPoints:[
        PointXY, PointXY
    ]
}

/**
 * Base options interface for StateMachine and Bezier connectors.
 * @public
 */
export interface AbstractBezierOptions extends ConnectorOptions {
    /**
     * Whether or not to show connections whose source and target is the same element.
     */
    showLoopback?:boolean
    /**
     * A measure of how "curvy" the bezier is. In terms of maths what this translates to is how far from the curve the control points are positioned.
     */
    curviness?:number
    margin?:number
    proximityLimit?:number
    orientation?:string
    loopbackRadius?:number
}

export function _compute (connector:BezierConnectorBase, paintInfo:PaintGeometry, p:ConnectorComputeParams, _computeBezier:(connector:BezierConnectorBase, paintInfo:PaintGeometry, p:ConnectorComputeParams, sp:AnchorPlacement, tp:AnchorPlacement, _w:number, _h:number)=>void) {

    let sp = p.sourcePos,
        tp = p.targetPos,
        _w = Math.abs(sp.curX - tp.curX),
        _h = Math.abs(sp.curY - tp.curY)

    if (!connector.showLoopback || (p.sourceEndpoint.elementId !== p.targetEndpoint.elementId)) {
        connector.isLoopbackCurrently = false
        _computeBezier(connector, paintInfo, p, sp, tp, _w, _h)
    } else {
        connector.isLoopbackCurrently = true
        // a loopback connector.  draw an arc from one anchor to the other.
        let x1 = p.sourcePos.curX, y1 = p.sourcePos.curY - connector.margin,
            cx = x1, cy = y1 - connector.loopbackRadius,
            // canvas sizing stuff, to ensure the whole painted area is visible.
            _x = cx - connector.loopbackRadius,
            _y = cy - connector.loopbackRadius

        _w = 2 * connector.loopbackRadius
        _h = 2 * connector.loopbackRadius

        paintInfo.points[0] = _x
        paintInfo.points[1] = _y
        paintInfo.points[2] = _w
        paintInfo.points[3] = _h

        // ADD AN ARC SEGMENT.
        _addSegment(connector, SEGMENT_TYPE_ARC, {
            loopback: true,
            x1: (x1 - _x) + 4,
            y1: y1 - _y,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            r: connector.loopbackRadius,
            ac: !connector.clockwise,
            x2: (x1 - _x) - 4,
            y2: y1 - _y,
            cx: cx - _x,
            cy: cy - _y
        })
    }
}

/**
 * Defines the common properties of a bezier connector.
 * @internal
 */
export interface BezierConnectorBase extends ConnectorBase {
    showLoopback:boolean
    curviness:number
    margin:number
    proximityLimit:number
    orientation:string
    loopbackRadius:number
    clockwise:boolean
    isLoopbackCurrently:boolean
}

/**
 * Create a base bezier connector, shared by Bezier and StateMachine.
 * @param type
 * @param connection
 * @param params
 * @param defaultStubs
 * @internal
 */
export function createBezierConnectorBase(type:string, connection:Connection, params:ConnectorOptions, defaultStubs:[number, number]) {
    const base = createConnectorBase(type, connection, params, defaultStubs)

    params = params || {}
    const bezier = extend(base as any, {
        showLoopback : params.showLoopback !== false,
        curviness : params.curviness || 10,
        margin : params.margin || 5,
        proximityLimit : params.proximityLimit || 80,
        clockwise : params.orientation && params.orientation === "clockwise",
        loopbackRadius : params.loopbackRadius || 25,
        isLoopbackCurrently : false
    }) as BezierConnectorBase

    return bezier
}
