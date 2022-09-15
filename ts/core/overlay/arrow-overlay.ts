import {extend, perpendicularLineTo, pointOnLine, PointXY, Size} from '@jsplumb/util'

import {createOverlayBase, Overlay} from "./overlay"
import {JsPlumbInstance} from "../core"

import {Component} from '../component/component'
import {OverlayFactory, OverlayHandler} from '../factory/overlay-factory'
import {
    ConnectorBase,
    pointAlongComponentPathFrom,
    pointOnComponentPath
} from "../connector/abstract-connector"
import { PaintStyle, ArrowOverlayOptions } from '@jsplumb/common'

const DEFAULT_WIDTH = 20
export const DEFAULT_LENGTH = 20

export const TYPE_OVERLAY_ARROW = "Arrow"

export class ArrowOverlay extends Overlay {

    width:number
    length:number
    foldback:number
    direction:number
    location:number = 0.5

    paintStyle:PaintStyle

    static type = "Arrow"
    type:string = ArrowOverlay.type

    cachedDimensions:Size

    constructor(public instance:JsPlumbInstance, public component:Component,
                p:ArrowOverlayOptions) {

        super(instance, component, p)
        p = p || {}

        this.width = p.width || DEFAULT_WIDTH
        this.length = p.length || DEFAULT_LENGTH
        this.direction = (p.direction || 1) < 0 ? -1 : 1
        this.foldback = p.foldback || 0.623
        this.paintStyle = p.paintStyle || { "strokeWidth": 1 }

        this.location = p.location == null ? this.location : Array.isArray(p.location) ? (p.location as number[])[0] : p.location as number
    }

    draw(component:Component, currentConnectionPaintStyle:PaintStyle, absolutePosition?: PointXY): any {
        return ArrowOverlayHandler.draw(this, component, currentConnectionPaintStyle, absolutePosition)
    }

    updateFrom(d: any): void { }

}

export function isArrowOverlay(o:Overlay):o is ArrowOverlay {
    return o.type === ArrowOverlay.type
}

OverlayFactory.register(ArrowOverlay.type, ArrowOverlay)

export const ArrowOverlayHandler:OverlayHandler<ArrowOverlayOptions> = {
    create: function(p1: JsPlumbInstance, p2: Component, options: ArrowOverlayOptions):ArrowOverlay {
        options = options || {}

        const overlayBase = createOverlayBase(p1, p2, options)

        const width = options.width || DEFAULT_WIDTH
        const length = options.length || DEFAULT_LENGTH
        const direction = (options.direction || 1) < 0 ? -1 : 1
        const foldback = options.foldback || 0.623
        const paintStyle = options.paintStyle || { "strokeWidth": 1 }
        const location = options.location == null ? this.location : Array.isArray(options.location) ? (options.location as number[])[0] : options.location as number

        return extend(overlayBase as any, {
            width,
            length,
            direction,
            foldback,
            paintStyle,
            location
        }) as ArrowOverlay
    },
    draw: function (overlay: ArrowOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {
        let connector = component as unknown as ConnectorBase

        let hxy, mid, txy, tail, cxy

        if (overlay.location > 1 || overlay.location < 0) {
            let fromLoc = overlay.location < 0 ? 1 : 0
            hxy = pointAlongComponentPathFrom(connector, fromLoc, overlay.location, false)
            mid = pointAlongComponentPathFrom(connector, fromLoc, overlay.location - (overlay.direction * overlay.length / 2), false)
            txy = pointOnLine(hxy, mid, overlay.length)
        } else if (overlay.location === 1) {
            hxy = pointOnComponentPath(connector, overlay.location)
            mid = pointAlongComponentPathFrom(connector, overlay.location, -(overlay.length))
            txy = pointOnLine(hxy, mid, overlay.length)

            if (overlay.direction === -1) {
                const _ = txy
                txy = hxy
                hxy = _
            }
        } else if (overlay.location === 0) {
            txy = pointOnComponentPath(connector, overlay.location)
            mid = pointAlongComponentPathFrom(connector, overlay.location, overlay.length)
            hxy = pointOnLine(txy, mid, overlay.length)
            if (overlay.direction === -1) {
                const __ = txy
                txy = hxy
                hxy = __
            }
        } else {
            hxy = pointAlongComponentPathFrom(connector, overlay.location, overlay.direction * overlay.length / 2)
            mid = pointOnComponentPath(connector, overlay.location)
            txy = pointOnLine(hxy, mid, overlay.length)
        }

        tail = perpendicularLineTo(hxy, txy, overlay.width)
        cxy = pointOnLine(hxy, txy, overlay.foldback * overlay.length)

        let d = {hxy: hxy, tail: tail, cxy: cxy},
            stroke = overlay.paintStyle.stroke || currentConnectionPaintStyle.stroke,
            fill = overlay.paintStyle.fill || currentConnectionPaintStyle.stroke,
            lineWidth = overlay.paintStyle.strokeWidth || currentConnectionPaintStyle.strokeWidth

        return {
            component: component,
            d: d,
            "stroke-width": lineWidth,
            stroke: stroke,
            fill: fill,
            xmin: Math.min(hxy.x, tail[0].x, tail[1].x),
            xmax: Math.max(hxy.x, tail[0].x, tail[1].x),
            ymin: Math.min(hxy.y, tail[0].y, tail[1].y),
            ymax: Math.max(hxy.y, tail[0].y, tail[1].y)
        }
    },
    updateFrom(d: any): void { }

}
