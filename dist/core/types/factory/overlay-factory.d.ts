import { OverlayBase } from '../overlay/overlay';
import { PointXY } from '@jsplumb/util';
import { JsPlumbInstance } from "../core";
import { Component } from '../component/component';
import { PaintStyle } from "@jsplumb/common";
export interface OverlayHandler<OptionsClass> {
    draw(overlay: OverlayBase, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY): any;
    create(instance: JsPlumbInstance, component: Component, options: OptionsClass): OverlayBase;
    updateFrom(overlay: OverlayBase, d: any): void;
}
export declare const OverlayFactory: {
    get(instance: JsPlumbInstance, name: string, component: Component, params: any): OverlayBase;
    register(name: string, overlay: OverlayHandler<any>): void;
    updateFrom(overlay: OverlayBase, d: any): void;
    draw(overlay: OverlayBase, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY): any;
};
//# sourceMappingURL=overlay-factory.d.ts.map