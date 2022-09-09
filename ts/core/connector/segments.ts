import {Segment, PointNearPath} from "@jsplumb/common"
import {BoundingBox, PointXY} from "@jsplumb/util"

const segmentMap:Record<string, SegmentHandler<any>> = {}

export interface SegmentHandler<T extends Segment> {
    getLength(s:T):number
    getPath(s:T, isFirstSegment: boolean): string
    gradientAtPoint (s:T, location:number, absolute?:boolean):number
    pointAlongPathFrom (s:T, location:number, distance:number, absolute?:boolean):PointXY
    gradientAtPoint (s:T, location:number, absolute?:boolean):number
    pointOnPath(s:T, location:number, absolute?:boolean):PointXY
    findClosestPointOnPath (s:T, x:number, y:number):PointNearPath
    lineIntersection (s:T, x1:number, y1:number, x2:number, y2:number):Array<PointXY>
    boxIntersection (s:T, x:number, y:number, w:number, h:number):Array<PointXY>
    boundingBoxIntersection (segment:T, box:BoundingBox):Array<PointXY>
    create(segmentType:string, params:any):T
}

export const Segments = {
    register:(segmentType:string, segmentHandler:SegmentHandler<any>) => {
        segmentMap[segmentType] = segmentHandler
    },
    get:(segmentType:string):SegmentHandler<any> => {
        const sh = segmentMap[segmentType]
        if (!sh) {
            throw {message:"jsPlumb: no segment handler found for segment type '" + segmentType+ "'"}
        } else {
            return sh
        }
    }
}
