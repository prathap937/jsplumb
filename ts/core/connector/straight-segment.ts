
import {BoundingBox, gradient, lineLength, pointOnLine, PointXY} from '@jsplumb/util'
import {PointNearPath, Segment, SegmentParams} from "@jsplumb/common"
import {SegmentHandler, Segments} from "./segments"

/**
 * @internal
 */
export type StraightSegmentCoordinates = { x1:number, y1:number, x2:number, y2:number}

/**
 * @internal
 */
export interface StraightSegmentParams extends SegmentParams {}

/**
 *
 * @param q
 * @param p1
 * @param p2
 * @internal
 */
function _pointLiesBetween (q:number, p1:number, p2:number):boolean {
    return (p2 > p1) ? (p1 <= q && q <= p2) : (p1 >= q && q >= p2)
}

/**
 * is c between a and b?
 * @param a
 * @param b
 * @param c
 * @internal
 */
function _within (a:number, b:number, c:number):boolean {
    return c >= Math.min(a, b) && c <= Math.max(a, b)
}

/**
 * find which of a and b is closest to c
 * @internal
 */

function _closest (a:number, b:number, c:number):number {
    return Math.abs(c - a) < Math.abs(c - b) ? a : b
}

/**
 *
 * @param segment
 * @param _x1
 * @param _y1
 * @param _x2
 * @param _y2
 * @internal
 */
function _lineIntersection (segment:StraightSegment, _x1:number, _y1:number, _x2:number, _y2:number):Array<PointXY> {
    let m2 = Math.abs(gradient({x: _x1, y: _y1}, {x: _x2, y: _y2})),
    m1 = Math.abs(segment.m),
    b = m1 === Infinity ? segment.x1 : segment.y1 - (m1 * segment.x1),
    out:Array<PointXY> = [],
    b2 = m2 === Infinity ? _x1 : _y1 - (m2 * _x1)

    // if lines parallel, no intersection
    if  (m2 !== m1) {
        // perpendicular, segment horizontal
        if(m2 === Infinity  && m1 === 0) {
            if (_pointLiesBetween(_x1, segment.x1, segment.x2) && _pointLiesBetween(segment.y1, _y1, _y2)) {
                out.push({x: _x1, y:segment.y1 })  // we return X on the incident line and Y from the segment
            }
        } else if(m2 === 0 && m1 === Infinity) {
            // perpendicular, segment vertical
            if(_pointLiesBetween(_y1, segment.y1, segment.y2) && _pointLiesBetween(segment.x1, _x1, _x2)) {
                out.push({x:segment.x1, y:_y1})  // we return X on the segment and Y from the incident line
            }
        } else {
            let X, Y
            if (m2 === Infinity) {
                // test line is a vertical line. where does it cross the segment?
                X = _x1
                if (_pointLiesBetween(X, segment.x1, segment.x2)) {
                    Y = (m1 * _x1) + b
                    if (_pointLiesBetween(Y, _y1, _y2)) {
                        out.push({x: X, y:Y })
                    }
                }
            } else if (m2 === 0) {
                Y = _y1
                // test line is a horizontal line. where does it cross the segment?
                if (_pointLiesBetween(Y, segment.y1, segment.y2)) {
                    X = (_y1 - b) / m1
                    if (_pointLiesBetween(X, _x1, _x2)) {
                        out.push({x: X, y:Y })
                    }
                }
            } else {
                // mX + b = m2X + b2
                // mX - m2X = b2 - b
                // X(m - m2) = b2 - b
                // X = (b2 - b) / (m - m2)
                // Y = mX + b
                X = (b2 - b) / (m1 - m2)
                Y = (m1 * X) + b
                if(_pointLiesBetween(X, segment.x1, segment.x2) && _pointLiesBetween(Y, segment.y1, segment.y2)) {
                    out.push({x: X, y:Y})
                }
            }
        }
    }

    return out
}

/**
 *
 * @param segment
 * @param x
 * @param y
 * @param w
 * @param h
 * @internal
 */
function _boxIntersection(segment:StraightSegment, x:number, y:number, w:number, h:number) {
    let a:Array<PointXY> = []
    a.push.apply(a, _lineIntersection(segment, x, y, x + w, y))
    a.push.apply(a, _lineIntersection(segment, x + w, y, x + w, y + h))
    a.push.apply(a, _lineIntersection(segment, x + w, y + h, x, y + h))
    a.push.apply(a, _lineIntersection(segment, x, y + h, x, y))
    return a
}

/**
 *
 * @param segment
 * @param x
 * @param y
 * @internal
 */
function _findClosestPointOnPath (segment:StraightSegment, x:number, y:number):PointNearPath {
    let out:PointNearPath = {
        d: Infinity,
        x: null,
        y: null,
        l: null,
        x1: segment.x1,
        x2: segment.x2,
        y1: segment.y1,
        y2: segment.y2
    }

    if (segment.m === 0) {
        out.y = segment.y1
        out.x = _within(segment.x1, segment.x2, x) ? x : _closest(segment.x1, segment.x2, x)
    }
    else if (segment.m === Infinity || segment.m === -Infinity) {
        out.x = segment.x1
        out.y = _within(segment.y1, segment.y2, y) ? y : _closest(segment.y1, segment.y2, y)
    }
    else {
        // closest point lies on normal from given point to this line.
        let b = segment.y1 - (segment.m * segment.x1),
            b2 = y - (segment.m2 * x),
            // y1 = m.x1 + b and y1 = m2.x1 + b2
            // so m.x1 + b = m2.x1 + b2
            // x1(m - m2) = b2 - b
            // x1 = (b2 - b) / (m - m2)
            _x1 = (b2 - b) / (segment.m - segment.m2),
            _y1 = (segment.m * _x1) + b

        out.x = _within(segment.x1, segment.x2, _x1) ? _x1 : _closest(segment.x1, segment.x2, _x1);//_x1
        out.y = _within(segment.y1, segment.y2, _y1) ? _y1 : _closest(segment.y1, segment.y2, _y1);//_y1
    }

    let fractionInSegment = lineLength({x:out.x, y:out.y }, { x:segment.x1, y:segment.y1 })
    out.d = lineLength({x:x, y:y}, out)
    out.l = fractionInSegment / length
    return out
}

/**
 *
 * @param segment
 * @internal
 */
function _getLength(segment:StraightSegment):number {
    return segment.length
}

/**
 *
 * @param segment
 * @internal
 */
function _getGradient(segment:StraightSegment):number {
    return segment.m
}

/**
 *
 * @param segment
 * @param isFirstSegment
 * @internal
 */
function _getPath(segment:StraightSegment, isFirstSegment:boolean):string {
    return (isFirstSegment ? "M " + segment.x1 + " " + segment.y1 + " " : "") + "L " + segment.x2 + " " + segment.y2
}

/**
 *
 * @param segment
 * @internal
 */
function _recalc (segment:StraightSegment):void {
    segment.length = Math.sqrt(Math.pow(segment.x2 - segment.x1, 2) + Math.pow(segment.y2 - segment.y1, 2))
    segment.m = gradient({x: segment.x1, y: segment.y1}, {x: segment.x2, y: segment.y2})
    segment.m2 = -1 / segment.m

    segment.extents = {
        xmin: Math.min(segment.x1, segment.x2),
        ymin: Math.min(segment.y1, segment.y2),
        xmax: Math.max(segment.x1, segment.x2),
        ymax: Math.max(segment.y1, segment.y2)
    }
}

/**
 * @internal
 * @param segment
 * @param coords
 */
function _setCoordinates (segment:StraightSegment, coords:StraightSegmentCoordinates):void {
    segment.x1 = coords.x1
    segment.y1 = coords.y1
    segment.x2 = coords.x2
    segment.y2 = coords.y2
    _recalc(segment)
}

/**
 * @internal
 * @param segment
 * @param location
 * @param absolute
 */
function _pointOnPath(segment:StraightSegment, location:number, absolute?:boolean):PointXY {
    if (location === 0 && !absolute) {
        return { x: segment.x1, y: segment.y1 }
    }
    else if (location === 1 && !absolute) {
        return { x: segment.x2, y: segment.y2 }
    }
    else {
        let l = absolute ? location > 0 ? location : segment.length + location : location * segment.length
        return pointOnLine({x: segment.x1, y: segment.y1}, {x: segment.x2, y: segment.y2}, l)
    }
}

/**
 * returns the gradient of the segment at the given point - which for us is constant.
 * @internal
 */
function _gradientAtPoint (segment:StraightSegment, location:number, absolute?:boolean):number {
    return segment.m
}

/**
 * returns the point on the segment's path that is 'distance' along the length of the path from 'location', where
 * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.
 * this hands off to jsPlumbUtil to do the maths, supplying two points and the distance.
 * @internal
 */
function _pointAlongPathFrom (segment:StraightSegment, location:number, distance:number, absolute?:boolean):PointXY {
    let p = _pointOnPath(segment, location, absolute),
        farAwayPoint = distance <= 0 ? {x: segment.x1, y: segment.y1} : {x: segment.x2, y: segment.y2 }

    if (distance <= 0 && Math.abs(distance) > 1) {
        distance *= -1
    }

    return pointOnLine(p, farAwayPoint, distance)
}

/**
 * @internal
 */
function blankStraightSegment():StraightSegment {
    return {
        type:SEGMENT_TYPE_STRAIGHT,
        m:0,
        length:0,
        m2:0,
        x1:0,
        x2:0,
        y1:0,
        y2:0,
        extents:{
            xmin:0, xmax:0, ymin:0, ymax:0
        }
    }
}

/**
 * @internal
 * @param params
 */
function _createStraightSegment(params:StraightSegmentParams):StraightSegment {
    const s = blankStraightSegment()
    _setCoordinates(s, params)
    return s
}

/**
 * Identifier for straight segments.
 * @public
 */
export const SEGMENT_TYPE_STRAIGHT = "Straight"

/**
 * Defines a straight segment.
 * @interna;
 */
export interface StraightSegment extends Segment {
    length:number
    m:number
    m2:number
}

const StraightSegmentHandler:SegmentHandler<StraightSegment>  = {
    create(segmentType: string, params: StraightSegmentParams): StraightSegment {
        return _createStraightSegment(params)
    },
    findClosestPointOnPath(s: StraightSegment, x: number, y: number): PointNearPath {
        return _findClosestPointOnPath(s, x, y)
    },
    getLength(s: StraightSegment): number {
        return _getLength(s)
    },
    getPath(s: StraightSegment, isFirstSegment: boolean): string {
        return _getPath(s, isFirstSegment)
    },
    gradientAtPoint(s: StraightSegment, location: number, absolute?: boolean): number {
        return _gradientAtPoint(s, location, absolute)
    },
    lineIntersection(s: StraightSegment, x1: number, y1: number, x2: number, y2: number): Array<PointXY> {
        return _lineIntersection(s, x1, y1, x2, y2)
    },
    pointAlongPathFrom(s: StraightSegment, location: number, distance: number, absolute?: boolean): PointXY {
        return _pointAlongPathFrom(s, location, distance, absolute)
    },
    pointOnPath(s: StraightSegment, location: number, absolute?: boolean): PointXY {
        return _pointOnPath(s, location, absolute)
    },
    boxIntersection (s:StraightSegment, x:number, y:number, w:number, h:number):Array<PointXY> {
        return _boxIntersection(s, x, y, w, h)
    },
    boundingBoxIntersection(s:StraightSegment, box:BoundingBox):Array<PointXY> {
        return _boxIntersection(s, box.x, box.y, box.w, box.h)
    }
}

Segments.register(SEGMENT_TYPE_STRAIGHT, StraightSegmentHandler)
