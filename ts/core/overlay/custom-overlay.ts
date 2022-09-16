import {createOverlayBase, OverlayBase} from "./overlay"
import { JsPlumbInstance } from "../core"
import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {OverlayOptions, PaintStyle} from "@jsplumb/common"
import {extend, PointXY} from "@jsplumb/util"

export const TYPE_OVERLAY_CUSTOM = "Custom"

/**
 * @public
 */
export interface CustomOverlayOptions extends OverlayOptions {
    create:(c:Component) => any
}

export interface CustomOverlay extends OverlayBase {
    create:(c:Component) => any
}

export function isCustomOverlay(o:OverlayBase):o is CustomOverlay {
    return o.type === TYPE_OVERLAY_CUSTOM
}

const CustomOverlayHandler:OverlayHandler<CustomOverlayOptions> = {
    create: function(instance: JsPlumbInstance, component: Component, options: CustomOverlayOptions):CustomOverlay {
        const overlayBase = createOverlayBase(instance, component, options)
        return extend(overlayBase as any, {
            create:options.create,
            type:TYPE_OVERLAY_CUSTOM
        }) as CustomOverlay
    },
    draw: function (overlay: CustomOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {

    },
    updateFrom(d: any): void { }
}

OverlayFactory.register(TYPE_OVERLAY_CUSTOM, CustomOverlayHandler)
