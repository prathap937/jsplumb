import {createOverlayBase, Overlay} from "./overlay"
import { JsPlumbInstance } from "../core"
import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {ArrowOverlayOptions, OverlayOptions, PaintStyle} from "@jsplumb/common"
import {ArrowOverlayHandler, DEFAULT_LENGTH, DiamondOverlay, PlainArrowOverlay} from "@jsplumb/core"
import {extend, PointXY} from "@jsplumb/util"

export const TYPE_OVERLAY_CUSTOM = "Custom"

/**
 * @public
 */
export interface CustomOverlayOptions extends OverlayOptions {
    create:(c:Component) => any
}

export class CustomOverlay extends Overlay {

    create:(c:Component) => any

    constructor(public instance:JsPlumbInstance, public component:Component,
                p:CustomOverlayOptions) {

        super(instance, component, p)
        this.create = p.create
    }

    static type = "Custom"
    type:string = CustomOverlay.type

    updateFrom(d: any): void { }

}

export function isCustomOverlay(o:Overlay):o is CustomOverlay {
    return o.type === CustomOverlay.type
}

OverlayFactory.register(TYPE_OVERLAY_CUSTOM, CustomOverlay)

const CustomOverlayHandler:OverlayHandler<CustomOverlayOptions> = {
    create: function(instance: JsPlumbInstance, component: Component, options: CustomOverlayOptions):CustomOverlay {
        const overlayBase = createOverlayBase(instance, component, options)
        return extend(overlayBase as any, {
            create:options.create
        }) as CustomOverlay
    },
    draw: function (overlay: DiamondOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {

    },
    updateFrom(d: any): void { }


}
