import {DeleteConnectionOptions, JsPlumbInstance} from "../core"
import {LightweightAnchor, Orientation} from "../factory/anchor-record-factory"
import {Endpoint} from "./endpoint"
import {EndpointFactory} from "../factory/endpoint-factory"
import {extend, Extents, isAssignableFrom, isString} from '@jsplumb/util'
import {
    AnchorPlacement,
    AnchorSpec,
    EMPTY_BOUNDS,
    EndpointRepresentationParams,
    EndpointSpec,
    FullEndpointSpec
} from "@jsplumb/common"
import {Component, Components} from '../component/component'
import { Connections } from '../connector/connections'
import {Connection, EVENT_ANCHOR_CHANGED} from "@jsplumb/core"

/**
 * Superclass for all types of Endpoint. This class is renderer
 * agnostic, as are any subclasses of it.
 */
export abstract class EndpointRepresentation<C> {

    typeId:string

    x:number
    y:number
    w:number
    h:number

    computedValue:C

    bounds:Extents = EMPTY_BOUNDS()

    classes:Array<string> = []

    instance:JsPlumbInstance

    canvas:any

    abstract type:string

    protected constructor(public endpoint:Endpoint, params?:EndpointRepresentationParams) {
        params = params || {}
        this.instance = endpoint.instance
        if (endpoint.cssClass) {
            this.classes.push(endpoint.cssClass)
        }
        if (params.cssClass) {
            this.classes.push(params.cssClass)
        }
    }

    addClass(c:string) {
        this.classes.push(c)
        this.instance.addEndpointClass(this.endpoint, c)
    }

    removeClass(c:string) {
        this.classes = this.classes.filter((_c:string) => _c !== c)
        this.instance.removeEndpointClass(this.endpoint, c)
    }

    compute(anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any) {
        this.computedValue = EndpointFactory.compute(this, anchorPoint, orientation, endpointStyle)
        this.bounds.xmin = this.x
        this.bounds.ymin = this.y
        this.bounds.xmax = this.x + this.w
        this.bounds.ymax = this.y + this.h
    }

    // setVisible(v:boolean){
    //     this.instance.setEndpointVisible(this.endpoint, v)
    // }

}

export const TYPE_DESCRIPTOR_ENDPOINT = "endpoint"
const typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass" ]

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
    setVisible(endpoint:Endpoint, v:boolean, doNotChangeConnections?:boolean, doNotNotifyOtherEndpoint?:boolean) {

        Components._setComponentVisible(endpoint, v)

        // endpoint.endpoint.setVisible(v)

        endpoint.instance.setEndpointVisible(endpoint, v)

        if (v) {
            Components.showOverlays(endpoint)
        } else {
            Components.hideOverlays(endpoint)
        }

        if (!doNotChangeConnections) {
            for (let i = 0; i < endpoint.connections.length; i++) {
                Connections.setVisible(endpoint.connections[i], v)
                // endpoint.connections[i].setVisible(v)
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
    addClass(endpoint:Endpoint, clazz: string, cascade?:boolean): void {
        Components.addBaseClass(endpoint, clazz, cascade)
        if (endpoint.representation != null) {
            endpoint.representation.addClass(clazz)
        }
    },

    removeClass(endpoint:Endpoint,clazz: string, cascade?:boolean): void {
        Components.removeBaseClass(endpoint, clazz, cascade)
        if (endpoint.representation != null) {
            endpoint.representation.removeClass(clazz)
        }
    },
    _setPreparedAnchor (endpoint:Endpoint, anchor:LightweightAnchor):Endpoint {
        endpoint.instance.router.setAnchor(endpoint, anchor)
        this._updateAnchorClass(endpoint)
        return endpoint
    },
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
     */
    _anchorLocationChanged(endpoint:Endpoint, currentAnchor:LightweightAnchor) {
        endpoint.instance.fire(EVENT_ANCHOR_CHANGED, {endpoint: endpoint, anchor: currentAnchor})
        this._updateAnchorClass(endpoint)
    },

    setAnchor (endpoint:Endpoint, anchorParams:AnchorSpec | Array<AnchorSpec>):Endpoint {
        const a = endpoint.instance.router.prepareAnchor(anchorParams)
        this._setPreparedAnchor(endpoint, a)
        return endpoint
    },

    addConnection(endpoint:Endpoint, conn:Connection) {
        endpoint.connections.push(conn)
        endpoint.instance._refreshEndpoint(endpoint)
    },
    deleteEveryConnection (endpoint:Endpoint, params?:DeleteConnectionOptions):void {
        let c = endpoint.connections.length
        for (let i = 0; i < c; i++) {
            endpoint.instance.deleteConnection(endpoint.connections[0], params)
        }
    },
        /**
     * Removes all connections from this endpoint to the given other endpoint.
     * @param otherEndpoint
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
     * @param transientDetach For internal use only.
     */
    detachFromConnection (endpoint:Endpoint, connection:Connection, idx?:number, transientDetach?:boolean):void {
        idx = idx == null ? endpoint.connections.indexOf(connection) : idx
        if (idx >= 0) {
            endpoint.connections.splice(idx, 1)
            // refresh the endpoint's appearance (which can change based on the number of connections, via classes)
            endpoint.instance._refreshEndpoint(endpoint)
        }

        if (!transientDetach  && endpoint.deleteOnEmpty && endpoint.connections.length === 0) {
            endpoint.instance.deleteEndpoint(endpoint)
        }
    },
    isFull(endpoint:Endpoint):boolean {
        return endpoint.maxConnections === 0 ? true : !(this.isFloating(endpoint) || endpoint.maxConnections < 0 || endpoint.connections.length < endpoint.maxConnections)
    },

    isFloating(endpoint:Endpoint):boolean {
        return endpoint.instance.router.isFloating(endpoint)
    },

    /**
     * Test if this Endpoint is connected to the given Endpoint.
     * @param otherEndpoint
     */
    isConnectedTo(endpoint:Endpoint, otherEndpoint:Endpoint):boolean {
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

    isEndpoint(component:any):component is Endpoint {
        return component._typeDescriptor != null && component._typeDescriptor == TYPE_DESCRIPTOR_ENDPOINT
    },
    prepareEndpoint<C>(endpoint:Endpoint, ep:EndpointSpec | EndpointRepresentation<C>, typeId?:string):EndpointRepresentation<C> {

        let endpointArgs = {
            cssClass: endpoint.cssClass,
            endpoint
        }

        let endpointRep:EndpointRepresentation<C>

        if(isAssignableFrom(ep, EndpointRepresentation)) {
            // cloning an existing endpoint
            const epr = (ep as EndpointRepresentation<C>)
            endpointRep = EndpointFactory.clone(epr)
            // ensure the css classes are correctly applied
            endpointRep.classes = endpointArgs.cssClass.split(" ")

        } else if (isString(ep)) {
            endpointRep = EndpointFactory.get(endpoint, ep as string, endpointArgs)
        }
        else {
            const fep = ep as FullEndpointSpec
            extend(endpointArgs, fep.options || {})
            endpointRep = EndpointFactory.get(endpoint, fep.type, endpointArgs)
        }

        endpointRep.typeId = typeId
        return endpointRep
    },

    setEndpoint<C>(endpoint:Endpoint, ep:EndpointSpec | EndpointRepresentation<C>) {
        let _ep = this.prepareEndpoint(endpoint, ep)
        this.setPreparedEndpoint(endpoint, _ep)
    },

    setPreparedEndpoint<C>(endpoint:Endpoint, ep:EndpointRepresentation<C>) {
        if (endpoint.representation != null) {
            endpoint.instance.destroyEndpoint(endpoint)
        }
        endpoint.representation = ep
    }
}


