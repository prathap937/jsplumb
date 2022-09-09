import {defaultSegmentHandler, PointNearPath, Segment, SegmentParams} from "@jsplumb/common"

import {BoundingBox, PointXY} from '@jsplumb/util'

import {
    computeBezierLength,
    Curve,
    gradientAtPoint, bezierLineIntersection,
    locationAlongCurveFrom,
    nearestPointOnCurve,
    pointAlongCurveFrom,
    pointOnCurve
} from "./bezier"
import {SegmentHandler, Segments} from "@jsplumb/core"

export interface CubicBezierSegmentParams extends SegmentParams {
    cp1x:number
    cp1y:number
    cp2x:number
    cp2y:number
}

export interface QuadraticBezierSegmentParams extends SegmentParams {
    cpx:number
    cpy:number
}

function _translateLocation (_curve:Curve, location:number, absolute?:boolean):number {
    if (absolute) {
        location = locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location)
    }
    return location
}

function _pointOnPath(curve:Curve, location:number, absolute?:boolean):PointXY {
    location = _translateLocation(curve, location, absolute)
    return pointOnCurve(curve, location)
}

function _gradientAtPoint (curve:Curve, location:number, absolute?:boolean):number {
    location = _translateLocation(curve, location, absolute)
    return gradientAtPoint(curve, location)
}

function _pointAlongPathFrom (curve:Curve, location:number, distance:number, absolute?:boolean):PointXY {
    location = _translateLocation(curve, location, absolute)
    return pointAlongCurveFrom(curve, location, distance)
}

function createCubicSegment(params:CubicBezierSegmentParams):CubicBezierSegment {
    return {
        type:SEGMENT_TYPE_CUBIC_BEZIER,
        length:0,
        x1:params.x1,
        x2:params.x2,
        y1:params.y1,
        y2:params.y2,
        cp1x:params.cp1x,
        cp1y:params.cp1y,
        cp2x:params.cp2x,
        cp2y:params.cp2y,
        curve:[
            {x: params.x1, y: params.y1},
            {x: params.cp1x, y: params.cp1y},
            {x: params.cp2x, y: params.cp2y},
            {x: params.x2, y: params.y2}
        ],
        extents :{
            xmin: Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
            ymin: Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
            xmax: Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
            ymax: Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
        }
    }

}

function createQuadraticSegment(params:QuadraticBezierSegmentParams):QuadraticBezierSegment {
    return {
        type:SEGMENT_TYPE_QUADRATIC_BEZIER,
        length:0,
        x1:params.x1,
        x2:params.x2,
        y1:params.y1,
        y2:params.y2,
        cpx:params.cpx,
        cpy:params.cpy,
        curve:[
            {x: params.x1, y: params.y1},
            {x: params.cpx, y: params.cpy},
            {x: params.x2, y: params.y2}
        ],
        extents: {
            xmin: Math.min(params.x1, params.x2, params.cpx),
            ymin: Math.min(params.y1, params.y2, params.cpy),
            xmax: Math.max(params.x1, params.x2, params.cpx),
            ymax: Math.max(params.y1, params.y2, params.cpy)
        }
    }
}

export const SEGMENT_TYPE_CUBIC_BEZIER = "CubicBezier"
export const SEGMENT_TYPE_QUADRATIC_BEZIER = "QuadraticBezier"

export interface BezierSegment extends Segment {
    length:number
    curve: Curve
}

export interface CubicBezierSegment extends BezierSegment {
    cp1x: number
    cp1y: number
    cp2x:number
    cp2y:number
}

export interface QuadraticBezierSegment extends BezierSegment {
    cpx: number
    cpy: number
}

const BezierSegmentHandler:SegmentHandler<BezierSegment> = {
    /**
     * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
     * 0 to 1 inclusive.
     */
    pointOnPath:(segment:BezierSegment, location:number, absolute?:boolean):PointXY => {
        return _pointOnPath(segment.curve, location, absolute)
    },

    /**
     * returns the gradient of the segment at the given point.
     */
    gradientAtPoint:(segment:BezierSegment, location:number, absolute?:boolean):number  => {
        return _gradientAtPoint(segment.curve, location, absolute)
    },

    pointAlongPathFrom:(segment:BezierSegment, location:number, distance:number, absolute?:boolean):PointXY => {
        return _pointAlongPathFrom(segment.curve, location, distance, absolute)
    },

    getLength:(segment:BezierSegment):number => {
        return computeBezierLength(segment.curve)
    },

    findClosestPointOnPath:(segment:BezierSegment, x:number, y:number):PointNearPath  => {
        let p = nearestPointOnCurve({x:x,y:y}, segment.curve)
        return {
            d:Math.sqrt(Math.pow(p.point.x - x, 2) + Math.pow(p.point.y - y, 2)),
            x:p.point.x,
            y:p.point.y,
            l:1 - p.location,
            s:this,
            x1:null,
            y1:null,
            x2:null,
            y2:null
        }
    },

    lineIntersection:(segment:BezierSegment, x1:number, y1:number, x2:number, y2:number):Array<PointXY> => {
        return bezierLineIntersection(x1, y1, x2, y2, segment.curve)
    },

    getPath:(segment:BezierSegment, isFirstSegment: boolean): string => {
        if (segment.type === SEGMENT_TYPE_CUBIC_BEZIER) {
            const cb = (segment as CubicBezierSegment)
            return (isFirstSegment ? "M " + cb.x2 + " " + cb.y2 + " " : "") +
                "C " + cb.cp2x + " " + cb.cp2y + " " + cb.cp1x + " " + cb.cp1y + " " + cb.x1 + " " + cb.y1
        } else if (segment.type === SEGMENT_TYPE_QUADRATIC_BEZIER) {
            const qb = (segment as QuadraticBezierSegment)
            return (isFirstSegment ? "M " + qb.x2 + " " + qb.y2 + " " : "") +
                "Q " +  qb.cpx + " " + qb.cpy + " " + qb.x1 + " " + qb.y1
        }

    },

    create:(segmentType:string, params:any) => {
        if (segmentType === SEGMENT_TYPE_CUBIC_BEZIER) {
            return createCubicSegment(params as CubicBezierSegmentParams)
        } else if (segmentType === SEGMENT_TYPE_QUADRATIC_BEZIER) {
            return createQuadraticSegment(params as QuadraticBezierSegmentParams)
        }
    },
    boundingBoxIntersection(segment: BezierSegment, box: BoundingBox): Array<PointXY> {
        return defaultSegmentHandler.boundingBoxIntersection(this, segment, box)
    },
    boxIntersection(s: BezierSegment, x: number, y: number, w: number, h: number): Array<PointXY> {
        return defaultSegmentHandler.boxIntersection(this, s, x, y, w, h)
    }
}

Segments.register(SEGMENT_TYPE_CUBIC_BEZIER, BezierSegmentHandler)
Segments.register(SEGMENT_TYPE_QUADRATIC_BEZIER, BezierSegmentHandler)
