
import {createOverlayBase, OverlayBase, Overlays} from "./overlay"
import {Size, isFunction, PointXY, extend} from "@jsplumb/util"
import {Component} from "../component/component"
import {JsPlumbInstance} from "../core"
import {OverlayFactory, OverlayHandler} from "../factory/overlay-factory"
import {LabelOverlayOptions, PaintStyle} from "@jsplumb/common"

export const TYPE_OVERLAY_LABEL = "Label"

export interface LabelOverlay extends OverlayBase {

    label:string | Function
    labelText:string
    cachedDimensions:Size
}

export function isLabelOverlay(o:OverlayBase):o is LabelOverlay {
    return o.type === TYPE_OVERLAY_LABEL
}

const LabelOverlayHandler:OverlayHandler<LabelOverlayOptions> = {
    create: function(instance: JsPlumbInstance, component: Component, options: LabelOverlayOptions):LabelOverlay {
        options = options || { label:""}
        const overlayBase = createOverlayBase(instance, component, options)
        const labelOverlay = extend(overlayBase as any, {
            label:options.label,
            labelText:"",
            cachedDimensions:null,
            type:TYPE_OVERLAY_LABEL
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

OverlayFactory.register(TYPE_OVERLAY_LABEL, LabelOverlayHandler)

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

