import {Extents , BoundingBox, PointXY} from "@jsplumb/util"
import {SegmentHandler} from "@jsplumb/core"

/**
 * @internal
 */
export interface SegmentParams {
    x1:number
    x2:number
    y1:number
    y2:number
}

/**
 * @internal
 */
export type PointNearPath = {
    s?:Segment
    d:number
    x:number
    y:number
    l:number
    x1:number
    x2:number
    y1:number
    y2:number
}

/**
 * no such point found.
 * @internal
 */
function noSuchPoint():PointNearPath {
    return {
        d: Infinity,
        x: null,
        y: null,
        l: null,
        x1:null,
        y1:null,
        x2:null,
        y2:null
    }
}

/**
 * Returns an empty bounds object, used in certain initializers internally.
 * @internal
 */
export function EMPTY_BOUNDS():Extents { return  { xmin:Infinity, xmax:-Infinity, ymin:Infinity, ymax:-Infinity }; }

/**
 * Definition of a segment. This is an internal class that users of the API need not access.
 * @internal
 */
export interface Segment {
    x1:number
    x2:number
    y1:number
    y2:number
    type:string
    extents:Extents
}

/**
 * Fallback methods for segment handlers that havent got their own implementation of some method.
 * @internal
 */
export const defaultSegmentHandler = {
    boxIntersection(handler:SegmentHandler<any>, segment:Segment, x:number, y:number, w:number, h:number):Array<PointXY> {
        let a:Array<PointXY> = []
        a.push.apply(a, handler.lineIntersection(segment, x, y, x + w, y))
        a.push.apply(a, handler.lineIntersection(segment, x + w, y, x + w, y + h))
        a.push.apply(a, handler.lineIntersection(segment, x + w, y + h, x, y + h))
        a.push.apply(a, handler.lineIntersection(segment, x, y + h, x, y))
        return a
    },
    boundingBoxIntersection(handler:SegmentHandler<any>, segment:Segment, box:BoundingBox):Array<PointXY> {
        return this.boxIntersection(handler, segment, box.x, box.y, box.w, box.h)
    },
    lineIntersection(handler:SegmentHandler<any>, x1:number, y1:number, x2:number, y2:number):Array<PointXY> {
        return []
    },
    findClosestPointOnPath(handler:SegmentHandler<any>, segment:Segment, x:number, y:number):PointNearPath {
        return noSuchPoint()
    }
}
