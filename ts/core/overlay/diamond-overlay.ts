import {ArrowOverlay, ArrowOverlayHandler, DEFAULT_LENGTH} from "./arrow-overlay"
import {JsPlumbInstance} from "../core"
import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {Overlay} from "./overlay"
import {ArrowOverlayOptions, PaintStyle} from "@jsplumb/common"
import {PointXY} from "@jsplumb/util"
import {PlainArrowOverlay} from "@jsplumb/core"

export const TYPE_OVERLAY_DIAMOND = "Diamond"

export class DiamondOverlay extends ArrowOverlay {

    static type = "Diamond"
    type:string = DiamondOverlay.type

    constructor(public instance: JsPlumbInstance, component: Component, p: ArrowOverlayOptions) {
        super(instance, component, p)

        this.length = this.length / 2
        this.foldback = 2
    }
}

export function isDiamondOverlay(o:Overlay):o is DiamondOverlay {
    return o.type === DiamondOverlay.type
}

OverlayFactory.register(DiamondOverlay.type, DiamondOverlay)

const DiamondOverlayHandler:OverlayHandler<ArrowOverlayOptions> = {
    create: function(p1: JsPlumbInstance, p2: Component, options: ArrowOverlayOptions):PlainArrowOverlay {
        options = options || {}
        options.foldback = 2
        const l = options.length || DEFAULT_LENGTH
        options.length = l / 2
        return ArrowOverlayHandler.create(p1, p2, options) as DiamondOverlay
    },
    draw: function (overlay: DiamondOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {
        return ArrowOverlayHandler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition)
    },
    updateFrom(d: any): void { }


}
