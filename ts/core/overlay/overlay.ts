
import {JsPlumbInstance} from "../core"
import {Component} from "../component/component"
import {isString, uuid, Events} from "@jsplumb/util"
import {OverlaySpec, FullOverlaySpec, OverlayOptions} from "@jsplumb/common"

/**
 * Returns whether or not the given overlay spec is a 'full' overlay spec, ie. has a `type` and some `options`, or is just an overlay name.
 * @param o
 */
export function isFullOverlaySpec(o:OverlaySpec):o is FullOverlaySpec {
    return (o as any).type != null && (o as any).options != null
}

/**
 * Convert the given input into an object in the form of a `FullOverlaySpec`
 * @param spec
 */
export function convertToFullOverlaySpec(spec:string | OverlaySpec):FullOverlaySpec {
    let o:FullOverlaySpec = null
    if (isString(spec)) {
        o = { type:spec as string, options:{ } }
    } else {
        o = spec as FullOverlaySpec
    }
    o.options.id = o.options.id || uuid()
    return o
}

export interface OverlayBase {
    type:string
    id:string
    component:Component
    cssClass:string
    attributes:Record<string, string>
    visible:boolean
    _listeners:Record<string, Array<Function>>
    location:number | Array<number>
    instance:JsPlumbInstance
}

export function createOverlayBase(instance:JsPlumbInstance, component:Component, p:OverlayOptions):OverlayBase {
    p = p || {}
    const id = p.id  || uuid()
    const cssClass = p.cssClass || ""
    const attributes = p.attributes || {}
    const events = p.events || {}

    const overlayBase:OverlayBase = {
        type:null,
        instance,
        id,
        cssClass,
        attributes,
        component,
        visible:true,
        _listeners:{},
        location:0.5
    }

    for (let event in events) {
        Events.subscribe(overlayBase, event, events[event])
    }

    Overlays.setLocation(overlayBase, p.location as any)
    return overlayBase
}

export const Overlays = {
    setLocation(overlay:OverlayBase, l:number|string) {
        let newLocation = overlay.location == null ? 0.5 : overlay.location
        if (l != null) {
            try {
                const _l = typeof l === "string" ? parseFloat(l) : l
                if (!isNaN(_l)) {
                    newLocation = _l
                }
            } catch (e) {
                // not parsable. use default.
            }
        }

        overlay.location = newLocation
    },
    setVisible(overlay:OverlayBase, v: boolean): void {
        overlay.visible = v
        overlay.instance.setOverlayVisible(overlay, v)
    }
}


export interface OverlayMouseEventParams {
    e:Event
    overlay:OverlayBase
}




