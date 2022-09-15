
import {quadrant, log, PointXY, Extents} from "@jsplumb/util"

import { Connection} from './connection-impl'
import { Orientation} from '../factory/anchor-record-factory'
import { Endpoint} from '../endpoint/endpoint'

import { ViewportElement } from "../viewport"
import {
    AnchorPlacement,
    ConnectorOptions,
    PaintAxis,
    EMPTY_BOUNDS,
    Segment,
    Connector,
    Geometry,
    SegmentParams
} from "@jsplumb/common"
import {SegmentHandler, Segments} from "./segments"
import {Connectors} from "./connectors"

/**
 * @internal
 */
type SegmentForPoint = { d: number, s: Segment, x: number, y: number, l: number, x1:number, y1:number, x2:number, y2:number, index:number, connectorLocation: number }

export type ConnectorComputeParams = {
    sourcePos: AnchorPlacement,
    targetPos: AnchorPlacement,
    sourceEndpoint: Endpoint,
    targetEndpoint: Endpoint,
    strokeWidth: number,
    sourceInfo: ViewportElement<any>,
    targetInfo: ViewportElement<any>
}

/**
 * @internal
 */
export interface PaintGeometry {
    sx: number
    sy: number
    tx: number
    ty: number
    xSpan: number
    ySpan: number
    mx: number
    my: number
    so: Orientation
    to: Orientation
    x: number
    y: number
    w: number
    h: number
    segment: number
    startStubX: number
    startStubY: number
    endStubX: number
    endStubY: number
    isXGreaterThanStubTimes2: boolean
    isYGreaterThanStubTimes2: boolean
    opposite: boolean
    perpendicular: boolean
    orthogonal: boolean
    sourceAxis: PaintAxis
    points: [ number, number, number, number, number, number, number, number ]
    stubs:[number, number]
    anchorOrientation?:string
}

function _getHandler(segment:Segment):SegmentHandler<any> {
    return Segments.get(segment.type)
}

function _getSegmentLength(segment:Segment):number {
    return _getHandler(segment).getLength(segment)
}

/**
 * Transform the given anchor placement by dx,dy
 * @internal
 * @param a
 * @param dx
 * @param dy
 */
export function transformAnchorPlacement(a:AnchorPlacement, dx:number, dy:number):AnchorPlacement {
    return {
        x:a.x,
        y:a.y,
        ox:a.ox,
        oy:a.oy,
        curX:a.curX + dx,
        curY:a.curY + dy
    }
}

/**
 * Function: findSegmentForPoint
 * Returns the segment that is closest to the given [x,y],
 * null if nothing found.  This function returns a JS
 * object with:
 *
 *   d   -   distance from segment
 *   l   -   proportional location in segment
 *   x   -   x point on the segment
 *   y   -   y point on the segment
 *   s   -   the segment itself.
 */
export function findSegmentForPoint (connector:ConnectorBase, x:number, y:number):SegmentForPoint {

    let out:SegmentForPoint = { d: Infinity, s: null, x: null, y: null, l: null, x1:null, y1:null, x2:null, y2:null, index:null, connectorLocation:null }
    for (let i = 0; i < connector.segments.length; i++) {
        let _s =_getHandler(connector.segments[i]).findClosestPointOnPath(connector.segments[i], x, y)
        if (_s.d < out.d) {
            out.d = _s.d
            out.l = _s.l
            out.x = _s.x
            out.y = _s.y
            out.s = connector.segments[i]
            out.x1 = _s.x1
            out.x2 = _s.x2
            out.y1 = _s.y1
            out.y2 = _s.y2
            out.index = i
            out.connectorLocation = connector.segmentProportions[i][0] + (_s.l * (connector.segmentProportions[i][1] - connector.segmentProportions[i][0]))
        }
    }

    return out
}

export function lineIntersection (connector:ConnectorBase, x1:number, y1:number, x2:number, y2:number):Array<PointXY> {
    let out:Array<PointXY> = []
    for (let i = 0; i < connector.segments.length; i++) {
        out.push.apply(out, _getHandler(connector.segments[i]).lineIntersection(connector.segments[i], x1, y1, x2, y2))
    }
    return out
}

export function connectorBoxIntersection (connector:ConnectorBase, x:number, y:number, w:number, h:number):Array<PointXY> {
    let out:Array<PointXY> = []
    for (let i = 0; i < connector.segments.length; i++) {
        out.push.apply(out, _getHandler(connector.segments[i]).boxIntersection(connector.segments[i], x, y, w, h))
    }
    return out
}

export function connectorBoundingBoxIntersection (connector:ConnectorBase, box:any):Array<PointXY> {
    let out:Array<PointXY> = []
    for (let i = 0; i < connector.segments.length; i++) {
        out.push.apply(out, _getHandler(connector.segments[i]).boundingBoxIntersection(connector.segments[i], box))
    }
    return out
}

/**
 * returns [segment, proportion of travel in segment, segment index] for the segment
 * that contains the point which is 'location' distance along the entire path, where
 * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
 * are made up of a list of segments, each of which contributes some fraction to
 * the total length.
 * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
 * as the absolute distance in pixels, rather than a proportion of the total path.
 */
export function _findSegmentForLocation (connector:ConnectorBase, location:number, absolute?:boolean):{segment:Segment, proportion:number, index:number } {

    let idx, i, inSegmentProportion

    if (absolute) {
        location = location > 0 ? location / connector.totalLength : (connector.totalLength + location) / connector.totalLength
    }

    // if location 1 we know its the last segment
    if (location === 1) {
        idx = connector.segments.length - 1
        inSegmentProportion = 1
    } else if (location === 0) {
        // if location 0 we know its the first segment
        inSegmentProportion = 0
        idx = 0
    } else {

        // if location >= 0.5, traverse backwards (of course not exact, who knows the segment proportions. but
        // an educated guess at least)
        if (location >= 0.5) {

            idx = 0
            inSegmentProportion = 0
            for (i = connector.segmentProportions.length - 1; i > -1; i--) {
                if (connector.segmentProportions[i][1] >= location && connector.segmentProportions[i][0] <= location) {
                    idx = i
                    inSegmentProportion = (location - connector.segmentProportions[i][0]) / connector.segmentProportionalLengths[i]
                    break
                }
            }

        } else {
            idx = connector.segmentProportions.length - 1
            inSegmentProportion = 1
            for (i = 0; i < connector.segmentProportions.length; i++) {
                if (connector.segmentProportions[i][1] >= location) {
                    idx = i
                    inSegmentProportion = (location - connector.segmentProportions[i][0]) / connector.segmentProportionalLengths[i]
                    break
                }
            }
        }
    }

    return { segment: connector.segments[idx], proportion: inSegmentProportion, index: idx }
}

export function pointOnComponentPath (connector:ConnectorBase, location:number, absolute?:boolean):PointXY {
    let seg = _findSegmentForLocation(connector, location, absolute)
    return seg.segment && _getHandler(seg.segment).pointOnPath(seg.segment, seg.proportion, false) || {x:0, y:0}
}

export function gradientAtComponentPoint (connector:ConnectorBase, location:number, absolute?:boolean):number {
    let seg = _findSegmentForLocation(connector, location, absolute)
    return seg.segment && _getHandler(seg.segment).gradientAtPoint(seg.segment, seg.proportion, false) || 0
}

export function pointAlongComponentPathFrom (connector:ConnectorBase, location:number, distance:number, absolute?:boolean):PointXY {
    let seg = _findSegmentForLocation(connector, location, absolute)
    // TODO what happens if this crosses to the next segment?
    return seg.segment && Segments.get(seg.segment.type).pointAlongPathFrom(seg.segment, seg.proportion, distance, false) || {x:0, y:0}
}

export function  _updateSegmentProportions (connector:ConnectorBase) {
    let curLoc = 0
    for (let i = 0; i < connector.segments.length; i++) {
        let sl = _getSegmentLength(connector.segments[i])
        connector.segmentProportionalLengths[i] = sl / connector.totalLength
        connector.segmentProportions[i] = [curLoc, (curLoc += (sl / connector.totalLength)) ]
    }
}

export function updateBounds (connector:ConnectorBase, segment:Segment):void {
    let segBounds = segment.extents
    connector.bounds.xmin = Math.min(connector.bounds.xmin, segBounds.xmin)
    connector.bounds.xmax = Math.max(connector.bounds.xmax, segBounds.xmax)
    connector.bounds.ymin = Math.min(connector.bounds.ymin, segBounds.ymin)
    connector.bounds.ymax = Math.max(connector.bounds.ymax, segBounds.ymax)
}

export function _addSegment<T extends SegmentParams>(connector:ConnectorBase, segmentType:string, params:T) {
    if (params.x1 === params.x2 && params.y1 === params.y2) {
        return
    }

    const handler = Segments.get(segmentType)
    let s = handler.create(segmentType, params)
    connector.segments.push(s)
    connector.totalLength += handler.getLength(s)
    updateBounds(connector, s)
}

export function _clearSegments (connector:ConnectorBase) {
    connector.totalLength = 0
    connector.segments.length = 0
    connector.segmentProportions.length = 0
    connector.segmentProportionalLengths.length = 0
}

function _prepareCompute (connector:ConnectorBase, params:ConnectorComputeParams):PaintGeometry {
    connector.strokeWidth = params.strokeWidth
    let x1 = params.sourcePos.curX,
        x2 = params.targetPos.curX,
        y1 = params.sourcePos.curY,
        y2 = params.targetPos.curY,

        segment = quadrant({x:x1, y:y1}, {x:x2, y:y2}),
        swapX = x2 < x1,
        swapY = y2 < y1,
        so:Orientation = [ params.sourcePos.ox, params.sourcePos.oy ],
        to:Orientation = [ params.targetPos.ox, params.targetPos.oy ],
        x = swapX ? x2 : x1,
        y = swapY ? y2 : y1,
        w = Math.abs(x2 - x1),
        h = Math.abs(y2 - y1)

    // check that a valid orientation exists for both source and target. if one or both lacks an orientation,
    // compute one where missing by deriving it from the element's relative positions. the axis for the derived
    // orientation is the one in which the two elements are further apart. Previously, we'd use this computed
    // orientation for both anchors, but from 5.4.0 we only use it for an anchor that had [0,0]. This results in
    // a better new connection dragging experience when using the flowchart connectors.
    const noSourceOrientation = so[0] === 0 && so[1] === 0
    const noTargetOrientation = to[0] === 0 && to[1] === 0

    if (noSourceOrientation || noTargetOrientation) {
        let index = w > h ? 0 : 1,
            oIndex = [1, 0][index],
            v1 = index === 0 ? x1 : y1,
            v2 = index === 0 ? x2 : y2

        if (noSourceOrientation) {
            so[index] = v1 > v2 ? -1 : 1
            so[oIndex] = 0
        }

        if (noTargetOrientation) {
            to[index] = v1 > v2 ? 1 : -1
            to[oIndex] = 0
        }
    }

    let sx = swapX ? w + (connector.sourceGap * so[0]) : connector.sourceGap * so[0],
        sy = swapY ? h + (connector.sourceGap * so[1]) : connector.sourceGap * so[1],
        tx = swapX ? connector.targetGap * to[0] : w + (connector.targetGap * to[0]),
        ty = swapY ? connector.targetGap * to[1] : h + (connector.targetGap * to[1]),
        oProduct = ((so[0] * to[0]) + (so[1] * to[1]))

    let result:PaintGeometry = {
        sx: sx, sy: sy, tx: tx, ty: ty,
        xSpan: Math.abs(tx - sx),
        ySpan: Math.abs(ty - sy),
        mx: (sx + tx) / 2,
        my: (sy + ty) / 2,
        so: so, to: to, x: x, y: y, w: w, h: h,
        segment: segment,
        startStubX: sx + (so[0] * connector.sourceStub),
        startStubY: sy + (so[1] * connector.sourceStub),
        endStubX: tx + (to[0] * connector.targetStub),
        endStubY: ty + (to[1] * connector.targetStub),
        isXGreaterThanStubTimes2: Math.abs(sx - tx) > (connector.sourceStub + connector.targetStub),
        isYGreaterThanStubTimes2: Math.abs(sy - ty) > (connector.sourceStub + connector.targetStub),
        opposite: oProduct === -1,
        perpendicular: oProduct === 0,
        orthogonal: oProduct === 1,
        sourceAxis: so[0] === 0 ? "y" : "x",
        points: [x, y, w, h, sx, sy, tx, ty ],
        stubs:[connector.sourceStub, connector.targetStub]
    }
    result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular"
    return result
}

export function resetBounds(connector:ConnectorBase):void {
    connector.bounds = EMPTY_BOUNDS()
}

export function resetGeometry(connector:ConnectorBase):void {
    connector.geometry = null
    connector.edited = false
}

export function compute (connector:ConnectorBase, params:ConnectorComputeParams):void {
    connector.paintInfo = _prepareCompute(connector, params)
    _clearSegments(connector)

    Connectors.get(connector.type)._compute(connector, connector.paintInfo, params)

    connector.x = connector.paintInfo.points[0]
    connector.y = connector.paintInfo.points[1]
    connector.w = connector.paintInfo.points[2]
    connector.h = connector.paintInfo.points[3]
    connector.segment = connector.paintInfo.segment
    _updateSegmentProportions(connector)
}

export function dumpSegmentsToConsole(connector:ConnectorBase):void {
    log("SEGMENTS:")
    for (let i = 0; i < this.segments.length; i++) {
        log(this.segments[i].type, "" + _getSegmentLength(this.segments[i]), "" + this.segmentProportions[i])
    }
}

/**
 * Sets the geometry on some connector, and the `edited` flag if appropriate.
 * @param connector
 * @param g
 * @param internal
 */
export function setGeometry(connector:ConnectorBase, g:Geometry, internal:boolean) {
    connector.geometry = g
    connector.edited = g != null && !internal
}

/**
 * Base interface for connectors. In connector implementations, use createConnectorBase(..) to get
 * one of these and then extend your concrete implementation into it.
 * @internal
 */
export interface ConnectorBase extends Connector {
    edited:boolean
    connection:Connection
    stub:number | number[]
    sourceStub:number
    targetStub:number
    maxStub:number

    typeId:string

    gap:number
    sourceGap:number
    targetGap:number
    segments:Array<Segment>
    totalLength:number
    segmentProportions:Array<[number,number]>
    segmentProportionalLengths:Array<number>
    paintInfo:PaintGeometry
    strokeWidth:number
    x:number
    y:number
    w:number
    h:number
    segment:number
    bounds:Extents
    cssClass:string
    hoverClass:string
    geometry:Geometry,
    getTypeDescriptor ():string,
    getIdPrefix():string
}

export const TYPE_DESCRIPTOR_CONNECTOR = "connector"

/**
 * factory method to create a ConnectorBase
 */
export function createConnectorBase(type:string, connection:Connection, params:ConnectorOptions, defaultStubs:[number, number]):ConnectorBase {

    const stub = params.stub || defaultStubs
    const sourceStub = Array.isArray(stub) ? stub[0] : stub
    const targetStub = Array.isArray(stub) ? stub[1] : stub
    const gap = params.gap || 0
    const sourceGap = Array.isArray(gap) ? gap[0] : gap
    const targetGap = Array.isArray(gap) ? gap[1] : gap
    const maxStub = Math.max(sourceStub, targetStub)
    const cssClass = params.cssClass || ""
    const hoverClass = params.hoverClass || ""
    return {
        stub,
        sourceStub,
        targetStub,
        gap,
        sourceGap,
        targetGap,
        maxStub,
        cssClass,
        hoverClass,
        connection,
        segments:[],
        segmentProportions:[],
        segmentProportionalLengths:[],
        x:0, y:0, w:0, h:0,
        edited:false,
        typeId:null,
        totalLength:0,
        segment:0,
        type,
        bounds:EMPTY_BOUNDS(),
        geometry:null,
        strokeWidth:1,
        paintInfo:null,
        getTypeDescriptor ():string {
            return TYPE_DESCRIPTOR_CONNECTOR
        },
        getIdPrefix () { return  "_jsplumb_connector"; }
    }
}


