import {OverlayBase} from '../overlay/overlay'
import {PointXY} from '@jsplumb/util'
import { JsPlumbInstance } from "../core"
import {Component} from '../component/component'
import {PaintStyle} from "@jsplumb/common"

const overlayMap:Record<string, OverlayHandler<any>> = {}

export interface OverlayHandler<OptionsClass> {
    draw(overlay:OverlayBase, component:Component, currentConnectionPaintStyle:PaintStyle, absolutePosition?: PointXY):any
    create(instance:JsPlumbInstance, component:Component, options:OptionsClass):OverlayBase
    updateFrom(overlay: OverlayBase, d: any): void
}

export const OverlayFactory = {
    get(instance:JsPlumbInstance, name:string, component:Component, params:any):OverlayBase {

        let c:OverlayHandler<any> = overlayMap[name]
        if (!c) {
            throw {message:"jsPlumb: unknown overlay type '" + name + "'"}
        } else {
            return c.create(instance, component, params)
        }
    },

    register(name:string, overlay:OverlayHandler<any>) {
        overlayMap[name] = overlay
    },
    updateFrom(overlay: OverlayBase, d: any): void {
        const handler = overlayMap[overlay.type]
        if (handler) {
            handler.updateFrom(overlay, d)
        }
    },
    draw(overlay:OverlayBase, component:Component, currentConnectionPaintStyle:PaintStyle, absolutePosition?: PointXY):any {
        const handler = overlayMap[overlay.type]
        if (handler) {
            return handler.draw(overlay, component, currentConnectionPaintStyle, absolutePosition)
        }
    }
}
