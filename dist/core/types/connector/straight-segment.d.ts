import { AbstractSegment, SegmentParams } from "@jsplumb/common";
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
 * @internal
 */
export declare class StraightSegment extends AbstractSegment {
    length: number;
    m: number;
    m2: number;
    constructor(params: StraightSegmentParams);
    static segmentType: string;
    type: string;
}
//# sourceMappingURL=straight-segment.d.ts.map