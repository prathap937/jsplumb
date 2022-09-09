import {AbstractSegment, defaultSegmentHandler, PointNearPath, SegmentParams} from "@jsplumb/common"
import {normal, theta, TWO_PI, PointXY, BoundingBox} from '@jsplumb/util'
import {SegmentHandler, Segments} from "./segments"

const VERY_SMALL_VALUE = 0.0000000001

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

function _calcAngle (segment:ArcSegment, _x:number, _y:number):number {
    return theta({x:segment.cx, y:segment.cy}, {x:_x, y:_y})
}

function _getPath(segment:ArcSegment, isFirstSegment: boolean): string {
    let laf = segment.sweep > Math.PI ? 1 : 0,
        sf = segment.anticlockwise ? 0 : 1

    return (isFirstSegment ? "M" + segment.x1 + " " + segment.y1 + " " : "") + "A " + segment.radius + " " + segment.radius + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2
}

function _getLength (segment:ArcSegment):number {
    return segment.length
}

/**
 * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
 * 0 to 1 inclusive.
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
 * @internal
 */
export class ArcSegment extends AbstractSegment {

    static segmentType:string = "Arc"
    type = ArcSegment.segmentType

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

    constructor(params:ArcSegmentParams) {

        super(params)

        this.cx = params.cx
        this.cy = params.cy
        this.radius = params.r
        this.anticlockwise = params.ac

        if (params.startAngle && params.endAngle) {

            this.startAngle = params.startAngle
            this.endAngle = params.endAngle

            this.x1 = this.cx + (this.radius * Math.cos(this.startAngle))
            this.y1 = this.cy + (this.radius * Math.sin(this.startAngle))
            this.x2 = this.cx + (this.radius * Math.cos(this.endAngle))
            this.y2 = this.cy + (this.radius * Math.sin(this.endAngle))
        }
        else {
            this.startAngle = _calcAngle(this, this.x1, this.y1)
            this.endAngle = _calcAngle(this, this.x2, this.y2)
        }

        if (this.endAngle < 0) {
            this.endAngle += TWO_PI
        }
        if (this.startAngle < 0) {
            this.startAngle += TWO_PI
        }

        let ea = this.endAngle < this.startAngle ? this.endAngle + TWO_PI : this.endAngle
        this.sweep = Math.abs(ea - this.startAngle)
        if (this.anticlockwise) {
            this.sweep = TWO_PI - this.sweep
        }

        this.circumference = 2 * Math.PI * this.radius
        this.frac = this.sweep / TWO_PI
        this.length = this.circumference * this.frac

        this.extents = {
            xmin: this.cx - this.radius,
            xmax: this.cx + this.radius,
            ymin: this.cy - this.radius,
            ymax: this.cy + this.radius
        }
    }





    // TODO: lineIntersection
}

const ArcSegmentHandler:SegmentHandler<ArcSegment>  = {
    create(segmentType: string, params: any): ArcSegment {
        return new ArcSegment(params)
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
        return defaultSegmentHandler.lineIntersection(this, x1, y1, x2, y2)
    },
    pointAlongPathFrom(s: ArcSegment, location: number, distance: number, absolute?: boolean): PointXY {
        return _pointAlongPathFrom(s, location, distance, absolute)
    },
    pointOnPath(s: ArcSegment, location: number, absolute?: boolean): PointXY {
        return _pointOnPath(s, location, absolute)
    },
    boxIntersection (s:ArcSegment, x:number, y:number, w:number, h:number):Array<PointXY> {
        return defaultSegmentHandler.boxIntersection(this, s, x, y, w, h)
    },
    boundingBoxIntersection(s:ArcSegment, box:BoundingBox):Array<PointXY> {
        return defaultSegmentHandler.boundingBoxIntersection(this, s, box)
    }

}

Segments.register(ArcSegment.segmentType, ArcSegmentHandler)
