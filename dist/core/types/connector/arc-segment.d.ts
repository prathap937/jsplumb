import { AbstractSegment, SegmentParams } from "@jsplumb/common";
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
 * @internal
 */
export declare class ArcSegment extends AbstractSegment {
    static segmentType: string;
    type: string;
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
    constructor(params: ArcSegmentParams);
}
//# sourceMappingURL=arc-segment.d.ts.map