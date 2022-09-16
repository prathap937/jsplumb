import { JsPlumbInstance } from "../core";
import { Component } from "../component/component";
import { OverlaySpec, FullOverlaySpec, OverlayOptions } from "@jsplumb/common";
/**
 * Returns whether or not the given overlay spec is a 'full' overlay spec, ie. has a `type` and some `options`, or is just an overlay name.
 * @param o
 */
export declare function isFullOverlaySpec(o: OverlaySpec): o is FullOverlaySpec;
/**
 * Convert the given input into an object in the form of a `FullOverlaySpec`
 * @param spec
 */
export declare function convertToFullOverlaySpec(spec: string | OverlaySpec): FullOverlaySpec;
export interface OverlayBase {
    type: string;
    id: string;
    component: Component;
    cssClass: string;
    attributes: Record<string, string>;
    visible: boolean;
    _listeners: Record<string, Array<Function>>;
    location: number | Array<number>;
    instance: JsPlumbInstance;
}
export declare function createOverlayBase(instance: JsPlumbInstance, component: Component, p: OverlayOptions): OverlayBase;
export declare const Overlays: {
    setLocation(overlay: OverlayBase, l: number | string): void;
    setVisible(overlay: OverlayBase, v: boolean): void;
};
export interface OverlayMouseEventParams {
    e: Event;
    overlay: OverlayBase;
}
//# sourceMappingURL=overlay.d.ts.map