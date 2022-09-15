import {Extents, EventGenerator,clone, extend, isFunction, isString, log, merge, populate, setToArray, uuid, PointXY } from "@jsplumb/util"

import {Overlay, Overlays} from '../overlay/overlay'
import {ComponentTypeDescriptor} from '../type-descriptors'
import { JsPlumbInstance } from "../core"
import {Connection} from "../connector/connection-impl"
import {Endpoint} from "../endpoint/endpoint"
import { INTERCEPT_BEFORE_DROP } from '../constants'
import { BeforeDropParams } from '../callbacks'
import {
    convertToFullOverlaySpec
} from "../overlay/overlay"
import { LabelOverlay } from "../overlay/label-overlay"
import { OverlayFactory } from "../factory/overlay-factory"
import {
    FullOverlaySpec,
    LabelOverlayOptions,
    OverlaySpec, PaintStyle } from "@jsplumb/common"
import {TYPE_DESCRIPTOR_ENDPOINT, Endpoints} from "../endpoint/endpoints"
import { TYPE_DESCRIPTOR_CONNECTION, Connections } from "../connector/connections"

export type ComponentParameters = Record<string, any>

function _splitType (t:string):string[] {
    return t == null ? null : t.split(" ").filter(t => t != null && t.length > 0)
}

function _mapType (map:any, obj:any, typeId:string) {
    for (let i in obj) {
        map[i] = typeId
    }
}

const CONNECTOR = "connector"
const MERGE_STRATEGY_OVERRIDE = "override"
const CSS_CLASS = "cssClass"
const DEFAULT_TYPE_KEY = "__default"
const ANCHOR = "anchor"
const ANCHORS = "anchors"
const _internalLabelOverlayId = "__label"
const _internalLabelOverlayClass = "jtk-default-label"
const TYPE_ITEM_OVERLAY = "overlay"
const LOCATION_ATTRIBUTE = "labelLocation"
const ACTION_ADD = "add"
const ACTION_REMOVE = "remove"

function _applyTypes<E>(component:Component, params?:any) {
    // if (component.getDefaultType) {
        let td = component._typeDescriptor, map = {}
        let defType = component._defaultType

        let o = extend({} as any, defType)

        _mapType(map, defType, DEFAULT_TYPE_KEY)

        component._types.forEach(tid => {
            if (tid !== DEFAULT_TYPE_KEY) {
                let _t = component.instance.getType(tid, td)
                if (_t != null) {

                    const overrides = new Set([CONNECTOR, ANCHOR, ANCHORS])
                    if (_t.mergeStrategy === MERGE_STRATEGY_OVERRIDE) {
                        for (let k in _t) {
                            overrides.add(k)
                        }
                    }

                    o = merge(o, _t, [CSS_CLASS], setToArray(overrides))
                    _mapType(map, _t, tid)
                }
            }
        })

        if (params) {
            o = populate(o, params, "_")
        }

        Components.applyType(component, o, map)
    //}
}

export function _removeTypeCssHelper<E>(component:Component, typeId:string) {
    let type = component.instance.getType(typeId, component._typeDescriptor)

     if (type != null && type.cssClass) {
        Components.removeClass(component, type.cssClass)
    }
}

// helper method to update the hover style whenever it, or paintStyle, changes.
// we use paintStyle as the foundation and merge hoverPaintStyle over the
// top.
export function  _updateHoverStyle<E> (component:Component) {
    if (component.paintStyle && component.hoverPaintStyle) {
        let mergedHoverStyle:PaintStyle = {}
        extend(mergedHoverStyle, component.paintStyle)
        extend(mergedHoverStyle, component.hoverPaintStyle)
        component.hoverPaintStyle = mergedHoverStyle
    }
}

/**
 * Defines the method signature for the callback to the `beforeDetach` interceptor. Returning false from this method
 * prevents the connection from being detached. The interceptor is fired by the core, meaning that it will be invoked
 * regardless of whether the detach occurred programmatically, or via the mouse.
 * @public
 */
export type BeforeDetachInterceptor = (c:Connection) => boolean

/**
 * Defines the method signature for the callback to the `beforeDrop` interceptor.
 * @public
 */
export type BeforeDropInterceptor = (params:BeforeDropParams) => boolean

/**
 * The parameters passed to a `beforeDrag` interceptor.
 * @public
 */
export interface BeforeDragParams<E> {
    endpoint:Endpoint
    source:E
    sourceId:string
    connection:Connection
}

/**
 * The parameters passed to a `beforeStartDetach` interceptor.
 * @public
 */
export interface BeforeStartDetachParams<E> extends BeforeDragParams<E> {}

/**
 * Defines the method signature for the callback to the `beforeDrag` interceptor. This method can return boolean `false` to
 * abort the connection drag, or it can return an object containing values that will be used as the `data` for the connection
 * that is created.
 * @public
 */
export type BeforeDragInterceptor<E = any> = (params:BeforeDragParams<E>) => boolean|Record<string, any>

/**
 * Defines the method signature for the callback to the `beforeStartDetach` interceptor.
 * @public
 */
export type BeforeStartDetachInterceptor<E = any> = (params:BeforeStartDetachParams<E>) => boolean

/**
 * @internal
 */
export interface ComponentOptions {
    parameters?:Record<string, any>
    beforeDetach?:BeforeDetachInterceptor
    beforeDrop?:BeforeDropInterceptor
    hoverClass?:string
    scope?:string
    cssClass?:string
    data?:any
    id?:string
    label?:string
    labelLocation?:number
    overlays?:Array<OverlaySpec>
}

export const ADD_CLASS_ACTION = "add"
export const REMOVE_CLASS_ACTION = "remove"

/**
 * @internal
 */
export type ClassAction = typeof ADD_CLASS_ACTION | typeof REMOVE_CLASS_ACTION

function _makeLabelOverlay(component:Component, params:LabelOverlayOptions):LabelOverlay {

    let _params:any = {
            cssClass: params.cssClass,
            id: _internalLabelOverlayId,
            component: component
        },
        mergedParams:LabelOverlayOptions = extend<LabelOverlayOptions>(_params, params)

    return new LabelOverlay(component.instance, component, mergedParams)
}

function _processOverlay<E>(component:Component, o:OverlaySpec|Overlay) {
    let _newOverlay:Overlay = null
    if (isString(o)) {
        _newOverlay = OverlayFactory.get(component.instance, o as string, component, {})
    }
    else if ((o as FullOverlaySpec).type != null && (o as FullOverlaySpec).options != null) {
        // this is for the {type:"Arrow", options:{ width:50 }} syntax
        const oa = o as FullOverlaySpec
        const p = extend({}, oa.options)
        _newOverlay = OverlayFactory.get(component.instance, oa.type, component, p)
    } else {
        _newOverlay = o as Overlay
    }

    _newOverlay.id = _newOverlay.id || uuid()
    Components.cacheTypeItem(component, TYPE_ITEM_OVERLAY, _newOverlay, _newOverlay.id)
    component.overlays[_newOverlay.id] = _newOverlay

    return _newOverlay
}

/**
 * @internal
 */
// function _clazzManip(component:Component, action:ClassAction, clazz:string) {
//
//     for (let i in component.overlays) {
//         if (action === ACTION_ADD) {
//             component.instance.addOverlayClass(component.overlays[i], clazz)
//         } else if (action === ACTION_REMOVE) {
//             compnoent.instance.removeOverlayClass(component.overlays[i], clazz)
//         }
//     }
// }

export interface Component {
    overlays:Record<string, Overlay>
    overlayPositions:Record<string, PointXY>
    overlayPlacements:Record<string, Extents>
    instance:JsPlumbInstance
    visible:boolean
    cssClass:string
    hoverClass:string

    id:string
    
    getDefaultOverlayKey():string
    getIdPrefix():string
    //getTypeDescriptor():string
    //getDefaultType():ComponentTypeDescriptor
    getXY():PointXY

    _typeDescriptor:string
    _types:Set<string>
    _typeCache:{}
    
    deleted:boolean
    _hover:boolean
    
    paintStyle:PaintStyle
    hoverPaintStyle:PaintStyle
    paintStyleInUse:PaintStyle

    parameters:ComponentParameters

    params:Record<string, any>

    lastPaintedAt:string

    data:Record<string, any>

    _defaultType:ComponentTypeDescriptor
    beforeDetach:BeforeDetachInterceptor
    beforeDrop:BeforeDropInterceptor
}

export function createComponentBase(instance:JsPlumbInstance,
                             idPrefix:string,
                             typeDescriptor:string,
                             defaultOverlayKey:string, 
                             defaultType:Record<string, any>,
                             defaultLabelLocation:number | [number, number],
                             params?:ComponentOptions):Component {

    params = params || ({} as ComponentOptions)

    const cssClass = params.cssClass || ""
    const hoverClass = params.hoverClass || instance.defaults.hoverClass

    const beforeDetach = params.beforeDetach
    const beforeDrop = params.beforeDrop

    const _types = new Set<string>()
    const _typeCache = {}

    const parameters:ComponentParameters = clone(params.parameters || {})
    const cParams:Record<string, any> = {}
    const data:Record<string, any> = {}

    const id = params.id || idPrefix + (new Date()).getTime()

    const _defaultType = {
        parameters: params.parameters,
        scope: params.scope || instance.defaultScope,
        overlays:{}
    }

    extend(_defaultType, defaultType || {})

    // const clone = ():Component => {
    //     let o = Object.create(this.constructor.prototype)
    //     this.constructor.apply(o, [instance, params])
    //     return o
    // }

    const overlays = {}
    const overlayPositions = {}
    const overlayPlacements = {}

    let o = params.overlays || [], oo:Record<string, OverlaySpec> = {}
    if (defaultOverlayKey) {

        const defaultOverlays = instance.defaults[defaultOverlayKey] as Array<OverlaySpec>
        if (defaultOverlays) {
            o.push(...defaultOverlays)
        }

        for (let i = 0; i < o.length; i++) {
            // if a string, convert to object representation so that we can store the typeid on it.
            // also assign an id.
            let fo = convertToFullOverlaySpec(o[i])
            oo[fo.options.id] = fo
        }
    }

    _defaultType.overlays = oo

    if (params.label) {
        _defaultType.overlays[_internalLabelOverlayId] = {
            type:LabelOverlay.type,
            options:{
                label: params.label,
                location: params.labelLocation || defaultLabelLocation,
                id:_internalLabelOverlayId,
                cssClass:_internalLabelOverlayClass
            }
        }
    }
    
    return {
        cssClass,
        hoverClass,
        beforeDetach,
        beforeDrop,
        _typeDescriptor:typeDescriptor,
        _types,
        _typeCache,
        parameters,
        id,
        overlays,
        overlayPositions,
        overlayPlacements,
        instance,
        visible:true,
        getIdPrefix:() => idPrefix,
        getDefaultOverlayKey:() => defaultOverlayKey,
        getXY: () => { return {x:0, y:0} },
        deleted:false,
        _hover:false,
        paintStyle:{},
        hoverPaintStyle:{},
        paintStyleInUse:{},
        lastPaintedAt:null,
        data,
        params:cParams,
        _defaultType
    }
}

function _clazzManip(component:Component, action:ClassAction, clazz:string) {

    for (let i in component.overlays) {
        if (action === ACTION_ADD) {
            component.instance.addOverlayClass(component.overlays[i], clazz)
        } else if (action === ACTION_REMOVE) {
            component.instance.removeOverlayClass(component.overlays[i], clazz)
        }
    }
}

export const Components = {

    applyType(component:Component, t:any, params?:any):void {
        if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
            Endpoints.applyType(component as Endpoint, t, params)
        } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
            Connections.applyType(component as Connection, t, params)
        }
    },

    applyBaseType(component:Component, t:any, params?:any):void {
        this.setPaintStyle(component, t.paintStyle)
        this.setHoverPaintStyle(component, t.hoverPaintStyle)
        this.mergeParameters(component, t.parameters)
        component.paintStyleInUse = component.paintStyle
        if (t.overlays) {
            // loop through the ones in the type. if already present on the component,
            // dont remove or re-add.
            let keep = {}, i

            for (i in t.overlays) {

                let existing:Overlay = component.overlays[t.overlays[i].options.id]
                if (existing) {
                    // maybe update from data, if there were parameterised values for instance.
                    existing.updateFrom(t.overlays[i].options)
                    keep[t.overlays[i].options.id] = true
                    component.instance.reattachOverlay(existing, component)

                }
                else {
                    let c:Overlay = this.getCachedTypeItem(component, TYPE_ITEM_OVERLAY, t.overlays[i].options.id)
                    if (c != null) {
                        component.instance.reattachOverlay(c, component)
                        Overlays.setVisible(c, true)
                        // maybe update from data, if there were parameterised values for instance.
                        c.updateFrom(t.overlays[i].options)
                        component.overlays[c.id] = c
                    }
                    else {
                        c = this.addOverlay(component, t.overlays[i])
                    }
                    keep[c.id] = true
                }
            }

            // now loop through the full overlays and remove those that we dont want to keep
            for (i in component.overlays) {
                if (keep[component.overlays[i].id] == null) {
                    this.removeOverlay(component, component.overlays[i].id, true) // remove overlay but dont clean it up.
                    // that would remove event listeners etc; overlays are never discarded by the types stuff, they are
                    // just detached/reattached.
                }
            }
        }
    },
    destroy(component:Component):void {

        for (let i in component.overlays) {
            component.instance.destroyOverlay(component.overlays[i])
        }

        component.overlays = {}
        component.overlayPositions = {}

        // component.unbind() // this is on EventGenerator
        // component.clone = null
    },
    /**
     * base method, called by subclasses.
     * @param component
     * @param v
     * @internal
     */
    _setComponentVisible(component:Component, v:boolean) {
        component.visible = v
        if (v) {
            this.showOverlays(component)
            // component.showOverlays()
        } else {
            this.hideOverlays(component)
        }
    },
    setVisible(component:Component, v:boolean) {
        if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
            Endpoints.setVisible(component as Endpoint, v)
        } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
            Connections.setVisible(component as Connection, v)
        }
    },

    /**
     * @internal
     */
    isVisible(component:Component):boolean {
        return component.visible
    },
    /**
     * Adds a css class to the component
     * @param clazz Class to add. May be a space separated list.
     * @param cascade This is for subclasses to use, if they wish to. For instance, a Connection might want to optionally cascade a css class
     * down to its endpoints.
     * @public
     */
    addBaseClass(component:Component, clazz:string, cascade?:boolean):void {
        let parts = (component.cssClass || "").split(" ")
        parts.push(clazz)
        component.cssClass = parts.join(" ")
        _clazzManip(component, ACTION_ADD, clazz)
    },

    /**
     * Removes a css class from the component
     * @param clazz Class to remove. May be a space separated list.
     * @param cascade This is for subclasses to use, if they wish to. For instance, a Connection might want to optionally cascade a css class
     * removal down to its endpoints.
     * @public
     */
    removeBaseClass(component:Component, clazz:string, cascade?:boolean):void {

        let parts = (component.cssClass || "").split(" ")
        component.cssClass = parts.filter((p) => p !== clazz).join(" ")
        _clazzManip(component, ACTION_REMOVE, clazz)
    },
    addClass(component:Component, clazz:string, cascade?:boolean):void {
        if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
            Endpoints.addClass(component as Endpoint, clazz, cascade)
        } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
            Connections.addClass(component as Connection, clazz, cascade)
        }
    },
    removeClass(component:Component, clazz:string, cascade?:boolean):void {
        if (component._typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT) {
            Endpoints.removeClass(component as Endpoint, clazz, cascade)
        } else if (component._typeDescriptor === TYPE_DESCRIPTOR_CONNECTION) {
            Connections.removeClass(component as Connection, clazz, cascade)
        }
    },
    /**
     * Show all overlays, or a specific set of overlays.
     * @param ids optional list of ids to show.
     * @public
     */
    showOverlays(component:Component, ...ids:Array<string>):void {
        ids = ids || []
        for (let i in component.overlays) {
            if (ids.length === 0 || ids.indexOf(i) !== -1) {
                Overlays.setVisible(component.overlays[i], true)
            }
        }
    },
    /**
     * Hide all overlays, or a specific set of overlays.
     * @param ids optional list of ids to hide.
     * @public
     */
    hideOverlays(component:Component, ...ids:Array<string>):void {
        ids = ids || []
        for (let i in component.overlays) {
            if (ids.length === 0 || ids.indexOf(i) !== -1) {
                Overlays.setVisible(component.overlays[i], false)
            }
        }
    },
    setPaintStyle(component:Component, style:PaintStyle):void {
        component.paintStyle = style
        component.paintStyleInUse = component.paintStyle
        _updateHoverStyle(component)
    },

    /**
     * @internal
     */
    setHoverPaintStyle(component:Component, style:PaintStyle) {
        component.hoverPaintStyle = style
        _updateHoverStyle(component)
    },
    mergeParameters(component:Component, p:ComponentParameters) {
        if (p != null) {
            extend(component.parameters, p)
        }
    },
    /**
     * Add an overlay to the component.  This method is not intended for use by users of the API. You must `revalidate`
     * an associated element for this component if you call this method directly. Consider using the `addOverlay` method
     * of `JsPlumbInstance` instead, which adds the overlay and then revalidates.
     * @param overlay
     * @internal
     */
    addOverlay(component:Component, overlay:OverlaySpec):Overlay {
        let o = _processOverlay(component, overlay)

        if (component.data != null && o.type === LabelOverlay.type && !isString(overlay)) {
            //
            // component data might contain label location - look for it here.
            const d = component.data, p = (overlay as FullOverlaySpec).options
            if (d) {
                const locationAttribute = (<LabelOverlayOptions>p).labelLocationAttribute || LOCATION_ATTRIBUTE
                const loc = d[locationAttribute]

                if (loc) {
                    o.location = loc
                }
            }
        }
        return o
    },

    /**
     * Get the Overlay with the given ID. You can optionally provide a type parameter for this method in order to get
     * a typed return value (such as `LabelOverlay`, `ArrowOverlay`, etc), since some overlays have methods that
     * others do not.
     * @param id ID of the overlay to retrieve.
     * @public
     */
    getOverlay<T extends Overlay>(component:Component, id:string):T {
        return component.overlays[id] as T
    },

    /**
     * Hide the overlay with the given id.
     * @param id
     * @public
     */
    hideOverlay(component:Component, id:string):void {
        let o = this.getOverlay(component, id)
        if (o) {
            Overlays.setVisible(o, false)
        }
    },

    /**
     * Show a specific overlay (set it to be visible)
     * @param id
     * @public
     */
    showOverlay(component:Component, id:string):void {
        let o = this.getOverlay(component, id)
        if (o) {
            Overlays.setVisible(o, true)
        }
    },

    /**
     * Remove all overlays from this component.
     * @public
     */
    removeAllOverlays(component:Component):void {
        for (let i in component.overlays) {
            component.instance.destroyOverlay(component.overlays[i])
        }

        component.overlays = {}
        component.overlayPositions = null
        component.overlayPlacements= {}
    },

    /**
     * Remove the overlay with the given id.
     * @param overlayId
     * @param dontCleanup This is an internal parameter. You are not encouraged to provide a value for this.
     * @internal
     */
    removeOverlay(component:Component, overlayId:string, dontCleanup?:boolean):void {
        let o = component.overlays[overlayId]
        if (o) {
            Overlays.setVisible(o, false)
            if (!dontCleanup) {
                component.instance.destroyOverlay(o)
            }
            delete component.overlays[overlayId]
            if (component.overlayPositions) {
                delete component.overlayPositions[overlayId]
            }

            if (component.overlayPlacements) {
                delete component.overlayPlacements[overlayId]
            }
        }
    },

    /**
     * Remove the given set of overlays, specified by their ids.
     * @param overlays
     * @public
     */
    removeOverlays(component:Component, ...overlays:string[]):void {
        for (let i = 0, j = overlays.length; i < j; i++) {
            this.removeOverlay(component, overlays[i])
        }
    },

    /**
     * Return this component's label, if one is set.
     * @public
     */
    getLabel(component:Component):string {
        let lo:LabelOverlay = this.getLabelOverlay(component)
        return lo != null ? lo.getLabel() : null
    },

    /**
     * @internal
     */
    getLabelOverlay(component:Component):LabelOverlay {
        return this.getOverlay(component, _internalLabelOverlayId) as LabelOverlay
    },

    /**
     * Set this component's label.
     * @param l Either some text, or a function which returns some text, or an existing label overlay.
     * @public
     */
    setLabel(component:Component, l:string|Function|LabelOverlay):void {
        let lo = this.getLabelOverlay(component)
        if (!lo) {
            let params:LabelOverlayOptions = isString(l) || isFunction(l) ? { label: l as string|Function } : (l as LabelOverlayOptions)
            lo = _makeLabelOverlay(component, params)
            component.overlays[_internalLabelOverlayId] = lo
        }
        else {
            if (isString(l) || isFunction(l)) {
                lo.setLabel(l as string|Function)
            }
            else {
                let ll = l as LabelOverlay
                if (ll.label) {
                    lo.setLabel(ll.label)
                }
                if (ll.location) {
                    lo.location = ll.location
                }
            }
        }
    },
    /**
     * @internal
     */
    getDefaultType(component:Component):ComponentTypeDescriptor {
        return component._defaultType
    },

    /**
     * @internal
     */
    appendToDefaultType (component:Component, obj:Record<string, any>) {
        for (let i in obj) {
            component._defaultType[i] = obj[i]
        }
    },

    /**
     * @internal
     */
    // getId():string { return this.id; }

    /**
     * @internal
     */
    cacheTypeItem(component:Component, key:string, item:any, typeId:string) {
        component._typeCache[typeId] = component._typeCache[typeId] || {}
        component._typeCache[typeId][key] = item
    },

    /**
     * @internal
     */
    getCachedTypeItem (component:Component, key:string, typeId:string):any {
        return component._typeCache[typeId] ? component._typeCache[typeId][key] : null
    },

    /**
     * @internal
     */
    setType(component:Component, typeId:string, params?:any) {
        this.clearTypes(component)
        ;(_splitType(typeId) || []).forEach(component._types.add, component._types)
        _applyTypes(component, params)
    },

    /**
     * @internal
     */
    getType(component:Component):string[] {
        return Array.from(component._types.keys())
    },

    /**
     * @internal
     */
    reapplyTypes(component:Component, params?:any) {
        _applyTypes(component, params)
    },

    /**
     * @internal
     */
    hasType(component:Component, typeId:string):boolean {
        return component._types.has(typeId)
    },

    /**
     * @internal
     */
    addType(component:Component, typeId:string, params?:any):void {
        let t = _splitType(typeId), _somethingAdded = false
        if (t != null) {
            for (let i = 0, j = t.length; i < j; i++) {
                if (!component._types.has(t[i])) {
                    component._types.add(t[i])
                    _somethingAdded = true
                }
            }
            if (_somethingAdded) {
                _applyTypes(component, params)
            }
        }
    },

    /**
     * @internal
     */
    removeType(component:Component, typeId:string, params?:any) {
        let t = _splitType(typeId), _cont = false, _one = (tt:string) =>{
            if (component._types.has(tt)) {
                _removeTypeCssHelper(component, tt)
                component._types.delete(tt)
                return true
            }
            return false
        }

        if (t != null) {
            for (let i = 0, j = t.length; i < j; i++) {
                _cont = _one(t[i]) || _cont
            }
            if (_cont) {
                _applyTypes(component, params)
            }
        }
    },

    /**
     * @internal
     */
    clearTypes(component:Component, params?:any):void {

        component._types.forEach(t => {
            _removeTypeCssHelper(component, t)
        })
        component._types.clear()

        _applyTypes(component, params)
    },

    /**
     * @internal
     */
    toggleType(component:Component, typeId:string, params?:any) {
        let t = _splitType(typeId)
        if (t != null) {
            for (let i = 0, j = t.length; i < j; i++) {
                if (component._types.has(t[i])) {
                    _removeTypeCssHelper(component, t[i])
                    component._types.delete(t[i])
                } else {
                    component._types.add(t[i])
                }
            }

            _applyTypes(component, params)
        }
    },
    /**
     * Called internally when the user is trying to disconnect the given connection.
     * @internal
     * @param connection
     */
    isDetachAllowed(component:Component, connection:Connection):boolean {
        let r = true
        if (component.beforeDetach) {
            try {
                r = component.beforeDetach(connection)
            }
            catch (e) {
                log("jsPlumb: beforeDetach callback failed", e)
            }
        }
        return r
    },

    /**
     * @internal
     * @param sourceId
     * @param targetId
     * @param scope
     * @param connection
     * @param dropEndpoint
     */
    isDropAllowed(component:Component, sourceId:string, targetId:string, scope:string, connection:Connection, dropEndpoint:Endpoint):boolean {

        let r:boolean
        let payload = {
            sourceId: sourceId,
            targetId: targetId,
            scope: scope,
            connection: connection,
            dropEndpoint: dropEndpoint
        }

        if (component.beforeDrop) {
            try {
                r = component.beforeDrop(payload)
            }
            catch (e) {
                log("jsPlumb: beforeDrop callback failed", e)
            }
        } else {
            r = component.instance.checkCondition<boolean>(INTERCEPT_BEFORE_DROP, payload)
        }
        return r
    },
    /**
     * Gets any backing data stored against the given component.
     * @public
     */
    getData (component:Component) {
        if (component.data = null) {
            component.data = {}
        }
        return component.data 
    },

    /**
     * Sets backing data stored against the given component, overwriting any current value.
     * @param d
     * @public
     */
    setData (component:Component, d:any) { component.data = d || {} },

    /**
     * Merges the given backing data into any current backing data.
     * @param d
     * @public
     */
    mergeData (component:Component, d:any) { component.data = extend(component.data, d) },
    
    setAbsoluteOverlayPosition(component:Component, overlay:Overlay, xy:PointXY) {
        component.overlayPositions[overlay.id] = xy
    },

    /**
     * @internal
     */
    getAbsoluteOverlayPosition(component:Component, overlay:Overlay):PointXY {
        return component.overlayPositions ? component.overlayPositions[overlay.id] : null
    }

}
