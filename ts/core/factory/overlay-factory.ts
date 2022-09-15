import {Overlay} from '../overlay/overlay'
import {Constructable, PointXY} from '@jsplumb/util'
import { JsPlumbInstance } from "../core"
import {Component} from '../component/component'
import {ArrowOverlayOptions, PaintStyle} from "@jsplumb/common"
import {LabelOverlay} from "@jsplumb/core"
const overlayMap:Record<string, Constructable<Overlay>> = {}

export interface OverlayHandler<OptionsClass> {
    draw(overlay:Overlay, component:Component, currentConnectionPaintStyle:PaintStyle, absolutePosition?: PointXY):any
    create(instance:JsPlumbInstance, component:Component, options:OptionsClass):any
    updateFrom(overlay: LabelOverlay, d: any): void
}

export const OverlayFactory = {
    get:(instance:JsPlumbInstance, name:string, component:Component, params:any):Overlay => {

        let c:Constructable<Overlay> = overlayMap[name]
        if (!c) {
            throw {message:"jsPlumb: unknown overlay type '" + name + "'"}
        } else {
            return new c(instance, component, params) as Overlay
        }
    },

    register:(name:string, overlay:Constructable<Overlay>) => {
        overlayMap[name] = overlay
    }
}
