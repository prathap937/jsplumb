import { AbstractSegment, PointNearPath, SegmentParams } from "@jsplumb/common";
import { PointXY } from '@jsplumb/util';
import { Curve } from "./bezier";
export interface BezierSegmentParams extends SegmentParams {
    cp1x: number;
    cp1y: number;
}
export interface CubicBezierSegmentParams extends BezierSegmentParams {
    cp2x: number;
    cp2y: number;
}
export interface QuadraticBezierSegmentParams extends BezierSegmentParams {
}
export declare abstract class BezierSegment extends AbstractSegment {
    curve: Curve;
    cp1x: number;
    cp1y: number;
    length: number;
    constructor(params: BezierSegmentParams);
    /**
     * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
     * 0 to 1 inclusive.
     */
    pointOnPath(location: number, absolute?: boolean): PointXY;
    /**
     * returns the gradient of the segment at the given point.
     */
    gradientAtPoint(location: number, absolute?: boolean): number;
    pointAlongPathFrom(location: number, distance: number, absolute?: boolean): PointXY;
    getLength(): number;
    findClosestPointOnPath(x: number, y: number): PointNearPath;
    lineIntersection(x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
}
export declare class QuadraticBezierSegment extends BezierSegment {
    constructor(params: QuadraticBezierSegmentParams);
    static segmentType: string;
    type: string;
    getPath(isFirstSegment: boolean): string;
}
export declare class CubicBezierSegment extends BezierSegment {
    cp2x: number;
    cp2y: number;
    constructor(params: CubicBezierSegmentParams);
    static segmentType: string;
    type: string;
    getPath(isFirstSegment: boolean): string;
}
//# sourceMappingURL=bezier-segment.d.ts.map