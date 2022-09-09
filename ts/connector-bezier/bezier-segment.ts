import {AbstractSegment, defaultSegmentHandler, PointNearPath, SegmentParams} from "@jsplumb/common"

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

export interface BezierSegmentParams extends SegmentParams {
    cp1x:number
    cp1y:number

}

export interface CubicBezierSegmentParams extends BezierSegmentParams {
    cp2x:number
    cp2y:number
}

export interface QuadraticBezierSegmentParams extends BezierSegmentParams { }

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

export abstract class BezierSegment extends AbstractSegment {

    curve: Curve
    cp1x: number
    cp1y: number

    length: number = 0

    constructor(params:BezierSegmentParams) {
        super(params)

        this.cp1x = params.cp1x
        this.cp1y = params.cp1y

        this.x1 = params.x1
        this.x2 = params.x2
        this.y1 = params.y1
        this.y2 = params.y2
    }

    /**
     * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
     * 0 to 1 inclusive.
     */
    pointOnPath(location:number, absolute?:boolean):PointXY {
        return _pointOnPath(this.curve, location, absolute)
    }

    /**
     * returns the gradient of the segment at the given point.
     */
    gradientAtPoint (location:number, absolute?:boolean):number {
        return _gradientAtPoint(this.curve, location, absolute)
    }

    pointAlongPathFrom (location:number, distance:number, absolute?:boolean):PointXY {
        return _pointAlongPathFrom(this.curve, location, distance, absolute)
    }

    getLength ():number {
        if (this.length == null || this.length === 0) {
            this.length = computeBezierLength(this.curve)
        }
        return this.length
    }

    findClosestPointOnPath (x:number, y:number):PointNearPath {
        let p = nearestPointOnCurve({x:x,y:y}, this.curve)
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
    }

    lineIntersection (x1:number, y1:number, x2:number, y2:number):Array<PointXY> {
        return bezierLineIntersection(x1, y1, x2, y2, this.curve)
    }
}

export class QuadraticBezierSegment extends BezierSegment {

    constructor(params:QuadraticBezierSegmentParams) {
        super(params)

        this.curve = [
            {x: this.x1, y: this.y1},
            {x: this.cp1x, y: this.cp1y},
            {x: this.x2, y: this.y2}
        ]

        // although this is not a strictly rigorous determination of bounds
        // of a bezier curve, it works for the types of curves that this segment
        // type produces.
        this.extents = {
            xmin: Math.min(this.x1, this.x2, this.cp1x),
            ymin: Math.min(this.y1, this.y2, this.cp1y),
            xmax: Math.max(this.x1, this.x2, this.cp1x),
            ymax: Math.max(this.y1, this.y2, this.cp1y)
        }
    }

    static segmentType:string = "QuadraticBezier"
    type = QuadraticBezierSegment.segmentType


    getPath(isFirstSegment: boolean): string {
        return (isFirstSegment ? "M " + this.x2 + " " + this.y2 + " " : "") +
            "Q " +  this.cp1x + " " + this.cp1y + " " + this.x1 + " " + this.y1
    }

}

export class CubicBezierSegment extends BezierSegment {


    cp2x:number
    cp2y:number

    constructor(params:CubicBezierSegmentParams) {
        super(params)

        this.cp2x = params.cp2x
        this.cp2y = params.cp2y

        this.curve = [
            {x: this.x1, y: this.y1},
            {x: this.cp1x, y: this.cp1y},
            {x: this.cp2x, y: this.cp2y},
            {x: this.x2, y: this.y2}
        ]

        // although this is not a strictly rigorous determination of bounds
        // of a bezier curve, it works for the types of curves that this segment
        // type produces.
        this.extents = {
            xmin: Math.min(this.x1, this.x2, this.cp1x, this.cp2x),
            ymin: Math.min(this.y1, this.y2, this.cp1y, this.cp2y),
            xmax: Math.max(this.x1, this.x2, this.cp1x, this.cp2x),
            ymax: Math.max(this.y1, this.y2, this.cp1y, this.cp2y)
        }
    }

    static segmentType:string = "CubicBezier"
    type = CubicBezierSegment.segmentType


    getPath(isFirstSegment: boolean): string {
        return (isFirstSegment ? "M " + this.x2 + " " + this.y2 + " " : "") +
            "C " + this.cp2x + " " + this.cp2y + " " + this.cp1x + " " + this.cp1y + " " + this.x1 + " " + this.y1
    }


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
        return segment.length
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
        if (segment.type === CubicBezierSegment.segmentType) {
            const cb = (segment as CubicBezierSegment)
            return (isFirstSegment ? "M " + cb.x2 + " " + cb.y2 + " " : "") +
                "C " + cb.cp2x + " " + cb.cp2y + " " + cb.cp1x + " " + cb.cp1y + " " + cb.x1 + " " + cb.y1
        } else if (segment.type === QuadraticBezierSegment.segmentType) {
            const qb = (segment as QuadraticBezierSegment)
            return (isFirstSegment ? "M " + qb.x2 + " " + qb.y2 + " " : "") +
                "Q " +  qb.cp1x + " " + qb.cp1y + " " + qb.x1 + " " + qb.y1
        }

    },

    create:(segmentType:string, params:any) => {
        if (segmentType === CubicBezierSegment.segmentType) {
            return new CubicBezierSegment(params)
        } else if (segmentType === QuadraticBezierSegment.segmentType) {
            return new QuadraticBezierSegment(params)
        }
    },
    boundingBoxIntersection(segment: BezierSegment, box: BoundingBox): Array<PointXY> {
        return defaultSegmentHandler.boundingBoxIntersection(this, segment, box)
    },
    boxIntersection(s: BezierSegment, x: number, y: number, w: number, h: number): Array<PointXY> {
        return defaultSegmentHandler.boxIntersection(this, s, x, y, w, h)
    }


}

Segments.register(QuadraticBezierSegment.segmentType, BezierSegmentHandler)
Segments.register(CubicBezierSegment.segmentType, BezierSegmentHandler)
