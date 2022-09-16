import {ArrowOverlay, ArrowOverlayHandler} from "./arrow-overlay"
import {JsPlumbInstance} from "../core"
import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {ArrowOverlayOptions, PaintStyle} from "@jsplumb/common"
import {OverlayBase} from "./overlay"
import {PointXY} from "@jsplumb/util"

export const TYPE_OVERLAY_PLAIN_ARROW = "PlainArrow"

export interface PlainArrowOverlay extends ArrowOverlay { }

export function isPlainArrowOverlay(o:OverlayBase):o is PlainArrowOverlay {
    return o.type === TYPE_OVERLAY_PLAIN_ARROW
}

const PlainArrowOverlayHandler:OverlayHandler<ArrowOverlayOptions> = {
    create: function(p1: JsPlumbInstance, p2: Component, options: ArrowOverlayOptions):PlainArrowOverlay {
        options = options || {}
        options.foldback = 1
        const arrowOverlay = ArrowOverlayHandler.create(p1, p2, options) as PlainArrowOverlay
        arrowOverlay.type = TYPE_OVERLAY_PLAIN_ARROW
        return arrowOverlay
    },
    draw: function (overlay: PlainArrowOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {
        return ArrowOverlayHandler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition)
    },
    updateFrom(d: any): void { }

}

OverlayFactory.register(TYPE_OVERLAY_PLAIN_ARROW, PlainArrowOverlayHandler)
