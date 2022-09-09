import { Segment, SegmentParams } from "@jsplumb/common";
/**
 * @internal
 */
export interface ArcSegmentParams extends SegmentParams {
    cx: number;
    cy: number;
    r: number;
    ac: boolean;
    startAngle?: number;
    endAngle?: number;
}
/**
 * Identifer for arc segments.
 * @public
 */
export declare const SEGMENT_TYPE_ARC = "Arc";
/**
 * @internal
 */
export interface ArcSegment extends Segment {
    cx: number;
    cy: number;
    radius: number;
    anticlockwise: boolean;
    startAngle: number;
    endAngle: number;
    sweep: number;
    length: number;
    circumference: number;
    frac: number;
}
//# sourceMappingURL=arc-segment.d.ts.map