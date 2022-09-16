import { jsPlumbDOMElement } from './element-facade';
import { Component, JsPlumbInstance, OverlayBase } from "@jsplumb/core";
import { Size } from "@jsplumb/util";
interface HTMLElementOverlayHolder extends OverlayBase {
    canvas: jsPlumbDOMElement;
    cachedDimensions: Size;
}
export declare class HTMLElementOverlay {
    instance: JsPlumbInstance;
    overlay: OverlayBase;
    protected htmlElementOverlay: HTMLElementOverlayHolder;
    constructor(instance: JsPlumbInstance, overlay: OverlayBase);
    static getElement(o: HTMLElementOverlayHolder, component?: Component, elementCreator?: (c: Component) => Element): Element;
    static destroy(o: HTMLElementOverlayHolder): void;
    static _getDimensions(o: HTMLElementOverlayHolder, forceRefresh?: boolean): Size;
}
export {};
//# sourceMappingURL=html-element-overlay.d.ts.map