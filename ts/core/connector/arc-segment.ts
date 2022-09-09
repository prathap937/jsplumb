import {defaultSegmentHandler, PointNearPath, Segment, SegmentParams} from "@jsplumb/common"
import {normal, theta, TWO_PI, PointXY, BoundingBox} from '@jsplumb/util'
import {SegmentHandler, Segments} from "./segments"

const VERY_SMALL_VALUE = 0.0000000001

/**
 * @internal
 */
function gentleRound (n:number):number {
    let f = Math.floor(n), r = Math.ceil(n)
    if (n - f < VERY_SMALL_VALUE) {
        return f
    }
    else if (r - n < VERY_SMALL_VALUE) {
        return r
    }
    return n
}

/**
 * @internal
 */
function _calcAngleForLocation (segment:ArcSegment, location:number):number {
    if (segment.anticlockwise) {
        let sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
            s = Math.abs(sa - segment.endAngle)
        return sa - (s * location)
    }
    else {
        let ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
            ss = Math.abs(ea - segment.startAngle)

        return segment.startAngle + (ss * location)
    }
}

/**
 * @internal
 */
function _calcAngle (cx:number, cy:number, _x:number, _y:number):number {
    return theta({x:cx, y:cy}, {x:_x, y:_y})
}

/**
 * @internal
 */
function _getPath(segment:ArcSegment, isFirstSegment: boolean): string {
    let laf = segment.sweep > Math.PI ? 1 : 0,
        sf = segment.anticlockwise ? 0 : 1

    return (isFirstSegment ? "M" + segment.x1 + " " + segment.y1 + " " : "") + "A " + segment.radius + " " + segment.radius + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2
}

/**
 * @internal
 */
function _getLength (segment:ArcSegment):number {
    return segment.length
}

/**
 * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
 * 0 to 1 inclusive.
 * @internal
 */
function _pointOnPath(segment:ArcSegment, location:number, absolute?:boolean):PointXY {

    if (location === 0) {
        return { x: segment.x1, y: segment.y1, theta: segment.startAngle }
    }
    else if (location === 1) {
        return { x: segment.x2, y: segment.y2, theta: segment.endAngle }
    }

    if (absolute) {
        location = location / segment.length
    }

    let angle = _calcAngleForLocation(segment, location),
        _x = segment.cx + (segment.radius * Math.cos(angle)),
        _y = segment.cy + (segment.radius * Math.sin(angle))

    return { x: gentleRound(_x), y: gentleRound(_y), theta: angle }
}

/**
 * returns the gradient of the segment at the given point.
 */
function _gradientAtPoint (segment:ArcSegment, location:number, absolute?:boolean):number {
    let p = _pointOnPath(segment, location, absolute)
    let m = normal({x:segment.cx, y:segment.cy }, p)
    if (!segment.anticlockwise && (m === Infinity || m === -Infinity)) {
        m *= -1
    }
    return m
}

/**
 * @internal
 */
function _pointAlongPathFrom (segment:ArcSegment, location:number, distance:number, absolute?:boolean):PointXY {
    let p = _pointOnPath(segment, location, absolute),
        arcSpan = distance / segment.circumference * 2 * Math.PI,
        dir = segment.anticlockwise ? -1 : 1,
        startAngle = p.theta + (dir * arcSpan),
        startX = segment.cx + (segment.radius * Math.cos(startAngle)),
        startY = segment.cy + (segment.radius * Math.sin(startAngle))

    return {x: startX, y: startY}
}

/**
 * @internal
 */
export interface ArcSegmentParams extends SegmentParams {
    cx:number
    cy:number
    r:number
    ac:boolean
    startAngle?:number
    endAngle?:number
}

/**
 * Identifer for arc segments.
 * @public
 */
export const SEGMENT_TYPE_ARC = "Arc"

/**
 * @internal
 */
function _createArcSegment(params:ArcSegmentParams):ArcSegment {

    let startAngle:number,
        endAngle:number,
        x1 = params.x1,
        x2 = params.x2,
        y1 = params.y1,
        y2 = params.y2,
        cx = params.cx,
        cy = params.cy,
        radius = params.r,
        anticlockwise = params.ac

    if (params.startAngle && params.endAngle) {

        startAngle = params.startAngle
        endAngle = params.endAngle

        x1 = cx + (radius * Math.cos(startAngle))
        y1 = cy + (radius * Math.sin(startAngle))
        x2 = cx + (radius * Math.cos(endAngle))
        y2 = cy + (radius * Math.sin(endAngle))
    }
    else {
        startAngle = _calcAngle(cx, cy, x1, y1)
        endAngle = _calcAngle(cx, cy, x2, y2)
    }

    if (endAngle < 0) {
        endAngle += TWO_PI
    }
    if (startAngle < 0) {
        startAngle += TWO_PI
    }

    let ea = endAngle < startAngle ? endAngle + TWO_PI : endAngle
    let sweep = Math.abs(ea - startAngle)
    if (anticlockwise) {
        sweep = TWO_PI - sweep
    }

    let circumference = 2 * Math.PI * radius
    let frac = sweep / TWO_PI
    let length = circumference * frac

    let extents = {
        xmin: cx - radius,
        xmax: cx + radius,
        ymin: cy - radius,
        ymax: cy + radius
    }

    return {
        x1, x2, y1, y2, startAngle, endAngle, cx, cy, radius, anticlockwise, sweep, circumference, frac, length, extents, type:SEGMENT_TYPE_ARC
    }
}

/**
 * @internal
 */
export interface ArcSegment extends Segment {

    cx:number
    cy:number

    radius:number
    anticlockwise:boolean
    startAngle:number
    endAngle:number

    sweep:number
    length:number
    circumference:number
    frac:number
}

const ArcSegmentHandler:SegmentHandler<ArcSegment>  = {
    create(segmentType: string, params: ArcSegmentParams): ArcSegment {
        return _createArcSegment(params)
    },
    findClosestPointOnPath(s: ArcSegment, x: number, y: number): PointNearPath {
        return defaultSegmentHandler.findClosestPointOnPath(this, s, x, y)
    },
    getLength(s: ArcSegment): number {
        return _getLength(s)
    },
    getPath(s: ArcSegment, isFirstSegment: boolean): string {
        return _getPath(s, isFirstSegment)
    },
    gradientAtPoint(s: ArcSegment, location: number, absolute?: boolean): number {
        return _gradientAtPoint(s, location, absolute)
    },
    lineIntersection(s: ArcSegment, x1: number, y1: number, x2: number, y2: number): Array<PointXY> {
        // TODO: lineIntersection
        return defaultSegmentHandler.lineIntersection(this, x1, y1, x2, y2)
    },
    pointAlongPathFrom(s: ArcSegment, location: number, distance: number, absolute?: boolean): PointXY {
        return _pointAlongPathFrom(s, location, distance, absolute)
    },
    pointOnPath(s: ArcSegment, location: number, absolute?: boolean): PointXY {
        return _pointOnPath(s, location, absolute)
    },
    boxIntersection (s:ArcSegment, x:number, y:number, w:number, h:number):Array<PointXY> {
        // TODO: boxIntersection
        return defaultSegmentHandler.boxIntersection(this, s, x, y, w, h)
    },
    boundingBoxIntersection(s:ArcSegment, box:BoundingBox):Array<PointXY> {
        // TODO: boundingBoxIntersection
        return defaultSegmentHandler.boundingBoxIntersection(this, s, box)
    }

}

Segments.register(SEGMENT_TYPE_ARC, ArcSegmentHandler)
