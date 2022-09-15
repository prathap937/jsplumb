
import {createOverlayBase, Overlay, OverlayBase, Overlays} from "./overlay"
import {Size, isFunction, PointXY, extend} from "@jsplumb/util"
import {Component} from "../component/component"
import {JsPlumbInstance} from "../core"
import {OverlayFactory, OverlayHandler} from "../factory/overlay-factory"
import {ArrowOverlayOptions, LabelOverlayOptions, PaintStyle} from "@jsplumb/common"
import {ArrowOverlayHandler, DEFAULT_LENGTH, DiamondOverlay, PlainArrowOverlay} from "@jsplumb/core"

export const TYPE_OVERLAY_LABEL = "Label"

export class LabelOverlay extends Overlay implements  OverlayBase {

    label:string | Function
    labelText:string

    static type = "Label"
    type:string = LabelOverlay.type

    cachedDimensions:Size

    constructor(public instance:JsPlumbInstance, public component:Component,
                p:LabelOverlayOptions) {

        super(instance, component, p)
        p = p || { label:""}
        Labels.setLabel(this, p.label)
    }

    getLabel(): string {
        return Labels.getLabel(this)
    }

    setLabel(l: string | Function): void {
        Labels.setLabel(this, l)
    }

    getDimensions():Size { return {w:1,h:1} }

    updateFrom(d: any): void {
        if(d.label != null){
            this.setLabel(d.label)
        }
        if (d.location != null) {
            this.setLocation(d.location)
            this.instance.updateLabel(this)
        }
    }
}

export function isLabelOverlay(o:Overlay):o is LabelOverlay {
    return o.type === LabelOverlay.type
}


OverlayFactory.register(LabelOverlay.type, LabelOverlay)

const LabelOverlayHandler:OverlayHandler<LabelOverlayOptions> = {
    create: function(instance: JsPlumbInstance, component: Component, options: LabelOverlayOptions):LabelOverlay {
        options = options || { label:""}
        const overlayBase = createOverlayBase(instance, component, options)
        const labelOverlay = extend(overlayBase as any, {
            label:options.label,
            labelText:"",
            cachedDimensions:null
        }) as LabelOverlay

        Labels.setLabel(labelOverlay, options.label)
        return labelOverlay
    },
    draw: function (overlay: LabelOverlay, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY) {

    },
    updateFrom(overlay: LabelOverlay, d: any): void {
        if(d.label != null){
            Labels.setLabel(overlay, d.label)
        }
        if (d.location != null) {
            Overlays.setLocation(overlay, d.location)
            overlay.instance.updateLabel(overlay)
        }
    }



}

export const Labels = {
    setLabel(overlay:LabelOverlay, l:string|Function) {
        overlay.label = l
        overlay.labelText = null
        overlay.instance.updateLabel(overlay)
    },
    getLabel(overlay:LabelOverlay):string {
        if (isFunction(overlay.label)) {
            return (overlay.label as Function)(overlay)
        } else {
            return overlay.labelText
        }
    }
}

