import {DeleteConnectionOptions, JsPlumbInstance} from "../core"
import {LightweightAnchor, Orientation} from "../factory/anchor-record-factory"
import {Endpoint} from "./endpoint"
import {extend, Extents, isString, log} from '@jsplumb/util'
import { EVENT_ANCHOR_CHANGED } from '../constants'
import {
    AnchorPlacement,
    AnchorSpec,
    EMPTY_BOUNDS,
    EndpointRepresentationParams,
    EndpointSpec,
    FullEndpointSpec
} from "@jsplumb/common"
import {Components} from '../component/component'
import { Connections } from '../connector/connections'
import { Connection } from '../connector/declarations'

export const TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION = "endpoint-representation"

const endpointComputers:Record<string, EndpointComputeFunction<any>> = {}
const handlers:Record<string, EndpointHandler<any, any>> = {}

export interface EndpointHandler<EndpointClass, T> {
    type:string
    compute:EndpointComputeFunction<T>
    getParams(endpoint:EndpointClass):Record<string, any>
    create(endpoint:Endpoint, params?:EndpointRepresentationParams):EndpointClass
}

export type EndpointComputeFunction<T> = (endpoint:EndpointRepresentation<T>, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any) => T

/**
 * @param ep
 * @param name
 * @param params
 * @internal
 */
function _get(ep:Endpoint, name:string, params:any):EndpointRepresentation<any> {

    let e:EndpointHandler<any, any> = handlers[name]
    if (!e) {
        throw {message:"jsPlumb: unknown endpoint type '" + name + "'"}
    } else {
        return e.create(ep, params) as EndpointRepresentation<any>
    }
}

function _clone<C, ElementType>(epr:EndpointRepresentation<C>):EndpointRepresentation<C> {
    const handler = handlers[epr.type]
    return _get(epr.endpoint, epr.type, handler.getParams(epr))
}

/**
 * @param endpoint
 * @param ep
 * @param typeId
 * @internal
 */
function _prepareEndpoint<C>(endpoint:Endpoint, ep:EndpointSpec | EndpointRepresentation<C>, typeId?:string):EndpointRepresentation<C> {

    let endpointArgs = {
        cssClass: endpoint.cssClass,
        endpoint
    }

    let endpointRep:EndpointRepresentation<C>

    if(isEndpointRepresentation(ep)) {
        // cloning an existing endpoint
        const epr = (ep as EndpointRepresentation<C>)
        endpointRep = _clone(epr)
        // ensure the css classes are correctly applied
        endpointRep.classes = endpointArgs.cssClass.split(" ")

    } else if (isString(ep)) {
        endpointRep = _get(endpoint, ep as string, endpointArgs)
    }
    else {
        const fep = ep as FullEndpointSpec
        extend(endpointArgs, fep.options || {})
        endpointRep = _get(endpoint, fep.type, endpointArgs)
    }

    endpointRep.typeId = typeId
    return endpointRep
}

/**
 * Base interface for all types of Endpoint representation.
 */
export interface EndpointRepresentation<C> {
    typeId:string
    x:number
    y:number
    w:number
    h:number
    computedValue:C
    bounds:Extents
    classes:Array<string>
    instance:JsPlumbInstance
    canvas:any
    type:string
    endpoint:Endpoint
    typeDescriptor:typeof TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION
}

export function isEndpointRepresentation(ep:any):ep is EndpointRepresentation<any> {
    return ep.typeDescriptor != null && ep.typeDescriptor === TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION
}

export function createBaseRepresentation(type:string, endpoint:Endpoint, params?:EndpointRepresentationParams) {
    params = params || {}
    const classes = []
    if (endpoint.cssClass) {
        classes.push(endpoint.cssClass)
    }
    if (params.cssClass) {
        classes.push(params.cssClass)
    }
    return {
       typeId:null,
        x:0,
        y:0,
        w:0,
        h:0,
        classes,
        type,
        bounds:EMPTY_BOUNDS(),
        instance:endpoint.instance,
        canvas:null as any,
        endpoint,
        computedValue:null as any,
        typeDescriptor:TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION
    } as EndpointRepresentation<any>
}

export const TYPE_DESCRIPTOR_ENDPOINT = "endpoint"
const typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass" ]

/**
 * Factory + helper methods for Endpoints.
 * @public
 */
export const Endpoints = {
    applyType(endpoint:Endpoint, t:any, typeMap:any):void {

        Components.applyBaseType(endpoint, t, typeMap)

        Components.setPaintStyle(endpoint, t.endpointStyle || t.paintStyle)
        Components.setHoverPaintStyle(endpoint, t.endpointHoverStyle || t.hoverPaintStyle)

        endpoint.connectorStyle = t.connectorStyle
        endpoint.connectorHoverStyle = t.connectorHoverStyle
        endpoint.connector = t.connector
        endpoint.connectorOverlays = t.connectorOverlays
        endpoint.edgeType = t.edgeType

        if (t.maxConnections != null) {
            endpoint.maxConnections = t.maxConnections
        }
        if (t.scope) {
            endpoint.scope = t.scope
        }
        extend(t, typeParameters)

        endpoint.instance.applyEndpointType(endpoint, t)

    },
    destroy(endpoint:Endpoint):void {

        Components.destroy(endpoint)

        // as issue 1110 pointed out, an endpointHoverStyle would result in an endpoint not being cleaned up
        // properly, as when deleting its connections, the connection sets hover(false) on each endpoint. When the endpoint
        // paints, it if it has no canvas, a new one is created
        endpoint.deleted = true

        if(endpoint.representation != null) {
            endpoint.instance.destroyEndpoint(endpoint)
        }

    },
    /**
     * Sets the visible state of the given Endpoint.
     * @public
     * @param endpoint
     * @param v
     * @param doNotChangeConnections
     * @param doNotNotifyOtherEndpoint
     */
    setVisible(endpoint:Endpoint, v:boolean, doNotChangeConnections?:boolean, doNotNotifyOtherEndpoint?:boolean) {

        Components._setComponentVisible(endpoint, v)

        endpoint.instance.setEndpointVisible(endpoint, v)

        if (v) {
            Components.showOverlays(endpoint)
        } else {
            Components.hideOverlays(endpoint)
        }

        if (!doNotChangeConnections) {
            for (let i = 0; i < endpoint.connections.length; i++) {
                Connections.setVisible(endpoint.connections[i], v)
                if (!doNotNotifyOtherEndpoint) {
                    let oIdx = endpoint === endpoint.connections[i].endpoints[0] ? 1 : 0
                    // only change the other endpoint if this is its only connection.
                    if (endpoint.connections[i].endpoints[oIdx].connections.length === 1) {
                        Endpoints.setVisible(endpoint.connections[i].endpoints[oIdx], v, true, true)
                    }
                }
            }
        }
    },
    /**
     * Adds a class to the given Endpoint.
     * @param endpoint
     * @param clazz
     * @param cascade
     */
    addClass(endpoint:Endpoint, clazz: string, cascade?:boolean): void {
        Components.addBaseClass(endpoint, clazz, cascade)
        if (endpoint.representation != null) {
            endpoint.representation.classes.push(clazz)
            endpoint.instance.addEndpointClass(endpoint, clazz)
        }
    },
    /**
     * Removes a class from the given Endpoint.
     * @param endpoint
     * @param clazz
     * @param cascade
     */
    removeClass(endpoint:Endpoint,clazz: string, cascade?:boolean): void {
        Components.removeBaseClass(endpoint, clazz, cascade)
        if (endpoint.representation != null) {
            endpoint.representation.classes = endpoint.representation.classes.filter((_c:string) => _c !== clazz)
            endpoint.instance.removeEndpointClass(endpoint, clazz)
        }
    },
    /**
     * @internal
     * @param endpoint
     * @param anchor
     */
    _setPreparedAnchor (endpoint:Endpoint, anchor:LightweightAnchor):Endpoint {
        endpoint.instance.router.setAnchor(endpoint, anchor)
        this._updateAnchorClass(endpoint)
        return endpoint
    },
    /**
     *
     * @param endpoint
     * @internal
     */
    _updateAnchorClass (endpoint:Endpoint):void {
        const ac = endpoint._anchor && endpoint._anchor.cssClass
        if (ac != null && ac.length > 0) {
            // stash old, get new
            let oldAnchorClass = endpoint.instance.endpointAnchorClassPrefix + "-" + endpoint.currentAnchorClass
            endpoint.currentAnchorClass = ac
            let anchorClass = endpoint.instance.endpointAnchorClassPrefix + (endpoint.currentAnchorClass ? "-" + endpoint.currentAnchorClass : "")

            if (oldAnchorClass !== anchorClass) {
                this.removeClass(endpoint, oldAnchorClass)
                this.addClass(endpoint, anchorClass)
                endpoint.instance.removeClass(endpoint.element, oldAnchorClass)
                endpoint.instance.addClass(endpoint.element, anchorClass)
            }
        }
    },

    /**
     * Called by the router when a dynamic anchor has changed its current location.
     * @param currentAnchor
     * @internal
     */
    _anchorLocationChanged(endpoint:Endpoint, currentAnchor:LightweightAnchor) {
        endpoint.instance.fire(EVENT_ANCHOR_CHANGED, {endpoint: endpoint, anchor: currentAnchor})
        this._updateAnchorClass(endpoint)
    },

    /**
     * Sets the anchor for the given endpoint.
     * @param endpoint
     * @param anchorParams
     * @public
     */
    setAnchor (endpoint:Endpoint, anchorParams:AnchorSpec | Array<AnchorSpec>):Endpoint {
        const a = endpoint.instance.router.prepareAnchor(anchorParams)
        this._setPreparedAnchor(endpoint, a)
        return endpoint
    },

    /**
     * Adds a connection to the given endpoint. This method is internal and should not be called by users of the API, as
     * just calling this method alone will not ensure the connection is appropriately registered throughout the
     * jsPlumb instance.
     * @internal
     * @param endpoint
     * @param conn
     */
    _addConnection(endpoint:Endpoint, conn:Connection) {
        endpoint.connections.push(conn)
        endpoint.instance._refreshEndpoint(endpoint)
    },
    /**
     * Deletes every connection attached to the given endpoint.
     * @public
     * @param endpoint
     * @param params
     */
    deleteEveryConnection (endpoint:Endpoint, params?:DeleteConnectionOptions):void {
        let c = endpoint.connections.length
        for (let i = 0; i < c; i++) {
            endpoint.instance.deleteConnection(endpoint.connections[0], params)
        }
    },
    /**
     * Removes all connections from `endpoint` to `otherEndpoint`.
     * @param endpoint
     * @param otherEndpoint
     * @public
     */
    detachFrom (endpoint:Endpoint, otherEndpoint:Endpoint):Endpoint {
        let c = []
        for (let i = 0; i < endpoint.connections.length; i++) {
            if (endpoint.connections[i].endpoints[1] === otherEndpoint || endpoint.connections[i].endpoints[0] === otherEndpoint) {
                c.push(endpoint.connections[i])
            }
        }
        for (let j = 0, count = c.length; j < count; j++) {
            endpoint.instance.deleteConnection(c[0])
        }
        return endpoint
    },
    /**
     * Detaches this Endpoint from the given Connection.  If `deleteOnEmpty` is set to true and there are no
     * Connections after this one is detached, the Endpoint is deleted.
     * @param connection Connection from which to detach.
     * @param idx Optional, used internally to identify if this is the source (0) or target endpoint (1). Sometimes we already know this when we call this method.
     * @param _transientDetach For internal use only.
     * @public
     */
    detachFromConnection (endpoint:Endpoint, connection:Connection, idx?:number, _transientDetach?:boolean):void {
        idx = idx == null ? endpoint.connections.indexOf(connection) : idx
        if (idx >= 0) {
            endpoint.connections.splice(idx, 1)
            // refresh the endpoint's appearance (which can change based on the number of connections, via classes)
            endpoint.instance._refreshEndpoint(endpoint)
        }

        if (!_transientDetach  && endpoint.deleteOnEmpty && endpoint.connections.length === 0) {
            endpoint.instance.deleteEndpoint(endpoint)
        }
    },
    /**
     * Returns whether or not the given endpoint is currently full.
     * @public
     * @param endpoint
     */
    isFull(endpoint:Endpoint):boolean {
        return endpoint.maxConnections === 0 ? true : !(this._isFloating(endpoint) || endpoint.maxConnections < 0 || endpoint.connections.length < endpoint.maxConnections)
    },

    /**
     * @internal
     * @param endpoint
     * @private
     */
    _isFloating(endpoint:Endpoint):boolean {
        return endpoint.instance.router.isFloating(endpoint)
    },

    /**
     * Test if two endpoints are connected
     * @param otherEndpoint
     * @public
     */
    areConnected(endpoint:Endpoint, otherEndpoint:Endpoint):boolean {
        let found = false
        if (otherEndpoint) {
            for (let i = 0; i < endpoint.connections.length; i++) {
                if (endpoint.connections[i].endpoints[1] === otherEndpoint || endpoint.connections[i].endpoints[0] === otherEndpoint) {
                    found = true
                    break
                }
            }
        }
        return found
    },

    /**
     * Returns whether or not the given object is an Endpoint.
     * @param component
     * @internal
     */
    _isEndpoint(component:any):component is Endpoint {
        return component._typeDescriptor != null && component._typeDescriptor == TYPE_DESCRIPTOR_ENDPOINT
    },


    /**
     * @internal
     * @param endpoint
     * @param ep
     */
    _setEndpoint<C>(endpoint:Endpoint, ep:EndpointSpec | EndpointRepresentation<C>) {
        let _ep = _prepareEndpoint(endpoint, ep)
        this._setPreparedEndpoint(endpoint, _ep)
    },

    /**
     * @internal
     * @param endpoint
     * @param ep
     */
    _setPreparedEndpoint<C>(endpoint:Endpoint, ep:EndpointRepresentation<C>) {
        if (endpoint.representation != null) {
            endpoint.instance.destroyEndpoint(endpoint)
        }
        endpoint.representation = ep
    },


    /**
     * @internal
     * @param epr
     */
    //,

    /**
     * @internal
     * @param ep
     * @param anchorPoint
     * @param orientation
     * @param endpointStyle
     */
    _compute<T, ElementType>(ep:EndpointRepresentation<T>, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any):void {
        const c = endpointComputers[ep.type]
        if (c != null) {
            ep.computedValue = c(ep, anchorPoint, orientation, endpointStyle)
            ep.bounds.xmin = ep.x
            ep.bounds.ymin = ep.y
            ep.bounds.xmax = ep.x + ep.w
            ep.bounds.ymax = ep.y + ep.h
        } else {
            log("jsPlumb: cannot find endpoint calculator for endpoint of type ", ep.type)
        }
    },

    /**
     * @internal
     * @param eph
     */
    _registerHandler<E,T>(eph:EndpointHandler<E, T>) {
        handlers[eph.type] = eph
        endpointComputers[eph.type] = eph.compute
    }
}


