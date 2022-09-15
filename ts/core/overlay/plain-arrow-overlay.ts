import {ArrowOverlay, ArrowOverlayHandler} from "./arrow-overlay"
import {JsPlumbInstance} from "../core"
import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {ArrowOverlayOptions, PaintStyle} from "@jsplumb/common"
import {Overlay} from "./overlay"
import {PointXY} from "@jsplumb/util"

export const TYPE_OVERLAY_PLAIN_ARROW = "PlainArrow"

export class PlainArrowOverlay extends ArrowOverlay {

    static type = "PlainArrow"
    type:string = PlainArrowOverlay.type

    constructor(public instance:JsPlumbInstance, component: Component, p: ArrowOverlayOptions) {
        super(instance, component, p)
        this.foldback = 1
    }
}

export function isPlainArrowOverlay(o:Overlay):o is PlainArrowOverlay {
    return o.type === PlainArrowOverlay.type
}

OverlayFactory.register(TYPE_OVERLAY_PLAIN_ARROW, PlainArrowOverlay)

const PlainArrowOverlayHandler:OverlayHandler<ArrowOverlayOptions> = {
    create: function(p1: JsPlumbInstance, p2: Component, options: ArrowOverlayOptions):PlainArrowOverlay {
        options = options || {}
        options.foldback = 1
        return ArrowOverlayHandler.create(p1, p2, options) as PlainArrowOverlay
    },
    draw: function (overlay: PlainArrowOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {
        return ArrowOverlayHandler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition)
    },
    updateFrom(d: any): void { }

}
