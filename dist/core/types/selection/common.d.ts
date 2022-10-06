import { PaintStyle, OverlaySpec } from '@jsplumb/common';
import { Component } from "../component/component";
import { JsPlumbInstance } from "../core";
/**
 * Base class for selections of endpoints or connections.
 * @public
 */
export declare class SelectionBase<T extends Component> {
    protected instance: JsPlumbInstance;
    protected entries: Array<T>;
    constructor(instance: JsPlumbInstance, entries: Array<T>);
    get length(): number;
    each(handler: (arg0: T) => void): SelectionBase<T>;
    get(index: number): T;
    addClass(clazz: string, cascade?: boolean): SelectionBase<T>;
    removeClass(clazz: string, cascade?: boolean): SelectionBase<T>;
    removeAllOverlays(): SelectionBase<T>;
    setLabel(label: string): SelectionBase<T>;
    clear(): this;
    map<Q>(fn: (entry: T) => Q): Array<Q>;
    addOverlay(spec: OverlaySpec): SelectionBase<T>;
    removeOverlay(id: string): SelectionBase<T>;
    removeOverlays(): SelectionBase<T>;
    showOverlay(id: string): SelectionBase<T>;
    hideOverlay(id: string): SelectionBase<T>;
    setPaintStyle(style: PaintStyle): SelectionBase<T>;
    setHoverPaintStyle(style: PaintStyle): SelectionBase<T>;
    setParameter(name: string, value: string): SelectionBase<T>;
    setParameters(p: Record<string, string>): SelectionBase<T>;
    setVisible(v: boolean): SelectionBase<T>;
    addType(name: string): SelectionBase<T>;
    toggleType(name: string): SelectionBase<T>;
    removeType(name: string): SelectionBase<T>;
    setHover(h: boolean): SelectionBase<T>;
}
//# sourceMappingURL=common.d.ts.map