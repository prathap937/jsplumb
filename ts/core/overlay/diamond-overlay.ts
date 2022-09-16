import {ArrowOverlay, ArrowOverlayHandler, DEFAULT_LENGTH} from "./arrow-overlay"
import {JsPlumbInstance} from "../core"
import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {OverlayBase} from "./overlay"
import {ArrowOverlayOptions, PaintStyle} from "@jsplumb/common"
import {PointXY} from "@jsplumb/util"

export const TYPE_OVERLAY_DIAMOND = "Diamond"

export interface DiamondOverlay extends ArrowOverlay { }

export function isDiamondOverlay(o:OverlayBase):o is DiamondOverlay {
    return o.type === TYPE_OVERLAY_DIAMOND
}

const DiamondOverlayHandler:OverlayHandler<ArrowOverlayOptions> = {
    create: function(p1: JsPlumbInstance, p2: Component, options: ArrowOverlayOptions):DiamondOverlay {
        options = options || {}
        options.foldback = 2
        const l = options.length || DEFAULT_LENGTH
        options.length = l / 2
        const arrow = ArrowOverlayHandler.create(p1, p2, options) as DiamondOverlay
        arrow.type = TYPE_OVERLAY_DIAMOND
        return arrow
    },
    draw: function (overlay: DiamondOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {
        return ArrowOverlayHandler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition)
    },
    updateFrom(d: any): void { }
}

OverlayFactory.register(TYPE_OVERLAY_DIAMOND, DiamondOverlayHandler)
