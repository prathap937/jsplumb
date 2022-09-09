import { Segment, SegmentParams } from "@jsplumb/common";
/**
 * @internal
 */
export declare type StraightSegmentCoordinates = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
/**
 * @internal
 */
export interface StraightSegmentParams extends SegmentParams {
}
/**
 * Identifier for straight segments.
 * @public
 */
export declare const SEGMENT_TYPE_STRAIGHT = "Straight";
/**
 * Defines a straight segment.
 * @interna;
 */
export interface StraightSegment extends Segment {
    length: number;
    m: number;
    m2: number;
}
//# sourceMappingURL=straight-segment.d.ts.map