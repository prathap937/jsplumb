import { Size } from '@jsplumb/util';
import { OverlayBase } from "./overlay";
import { OverlayHandler } from '../factory/overlay-factory';
import { PaintStyle, ArrowOverlayOptions } from '@jsplumb/common';
export declare const DEFAULT_LENGTH = 20;
export declare const TYPE_OVERLAY_ARROW = "Arrow";
export interface ArrowOverlay extends OverlayBase {
    width: number;
    length: number;
    foldback: number;
    direction: number;
    location: number;
    paintStyle: PaintStyle;
    cachedDimensions: Size;
}
export declare function isArrowOverlay(o: OverlayBase): o is ArrowOverlay;
export declare const ArrowOverlayHandler: OverlayHandler<ArrowOverlayOptions>;
//# sourceMappingURL=arrow-overlay.d.ts.map