import { OverlayBase } from "./overlay";
import { Component } from '../component/component';
import { OverlayOptions } from "@jsplumb/common";
export declare const TYPE_OVERLAY_CUSTOM = "Custom";
/**
 * @public
 */
export interface CustomOverlayOptions extends OverlayOptions {
    create: (c: Component) => any;
}
export interface CustomOverlay extends OverlayBase {
    create: (c: Component) => any;
}
export declare function isCustomOverlay(o: OverlayBase): o is CustomOverlay;
//# sourceMappingURL=custom-overlay.d.ts.map