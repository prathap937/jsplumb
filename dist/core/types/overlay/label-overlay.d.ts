import { OverlayBase } from "./overlay";
import { Size } from "@jsplumb/util";
export declare const TYPE_OVERLAY_LABEL = "Label";
export interface LabelOverlay extends OverlayBase {
    label: string | Function;
    labelText: string;
    cachedDimensions: Size;
}
export declare function isLabelOverlay(o: OverlayBase): o is LabelOverlay;
export declare const Labels: {
    setLabel(overlay: LabelOverlay, l: string | Function): void;
    getLabel(overlay: LabelOverlay): string;
};
//# sourceMappingURL=label-overlay.d.ts.map