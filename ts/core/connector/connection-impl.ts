
import { JsPlumbInstance } from "../core"
import {ConnectParams } from '../params'
import { ConnectionTypeDescriptor } from "../type-descriptors"
import {ConnectorBase} from "./abstract-connector"
import {Endpoint} from "../endpoint/endpoint"

import {Component, Components, createComponentBase} from "../component/component"
import {extend, uuid, Merge, isObject, PointXY} from "@jsplumb/util"
import {makeLightweightAnchorFromSpec} from "../factory/anchor-record-factory"

import * as Constants from "../constants"
import {ConnectorSpec, EndpointSpec, DEFAULT, PaintStyle} from "@jsplumb/common"
import {
    Connections,
    setPreparedConnector,
    TYPE_ITEM_ANCHORS,
    TYPE_ITEM_CONNECTOR,
    TYPE_DESCRIPTOR_CONNECTION,
    DEFAULT_LABEL_LOCATION_CONNECTION
} from "./connections"
import { Overlay } from '../overlay/overlay'



// function prepareEndpoint<E>(conn:Connection<E>, existing:Endpoint, index:number, anchor?:AnchorSpec, element?:E, elementId?:string, endpoint?:EndpointSpec):Endpoint {
//
//     let e
//
//     if (existing) {
//         conn.endpoints[index] = existing
//         existing.addConnection(conn)
//     } else {
//
//         let ep = endpoint || conn.endpointSpec || conn.endpointsSpec[index] || conn.instance.defaults.endpoints[index] || conn.instance.defaults.endpoint
//
//         let es = conn.endpointStyles[index] || conn.endpointStyle || conn.instance.defaults.endpointStyles[index] || conn.instance.defaults.endpointStyle
//
//         // Endpoints derive their fill from the connector's stroke, if no fill was specified.
//         if (es.fill == null && conn.paintStyle != null) {
//             es.fill = conn.paintStyle.stroke
//         }
//
//         if (es.outlineStroke == null && conn.paintStyle != null) {
//             es.outlineStroke = conn.paintStyle.outlineStroke
//         }
//         if (es.outlineWidth == null && conn.paintStyle != null) {
//             es.outlineWidth = conn.paintStyle.outlineWidth
//         }
//
//         let ehs = conn.endpointHoverStyles[index] || conn.endpointHoverStyle || conn.endpointHoverStyle || conn.instance.defaults.endpointHoverStyles[index] || conn.instance.defaults.endpointHoverStyle
//         // endpoint hover fill style is derived from connector's hover stroke style
//         if (conn.hoverPaintStyle != null) {
//             if (ehs == null) {
//                 ehs = {}
//             }
//             if (ehs.fill == null) {
//                 ehs.fill = conn.hoverPaintStyle.stroke
//             }
//         }
//
//         let u = conn.uuids ? conn.uuids[index] : null
//
//         anchor = anchor != null ? anchor : conn.instance.defaults.anchors != null ? conn.instance.defaults.anchors[index] : conn.instance.defaults.anchor
//
//         e = conn.instance._internal_newEndpoint({
//             paintStyle: es,
//             hoverPaintStyle: ehs,
//             endpoint: ep,
//             connections: [ conn ],
//             uuid: u,
//             element: element,
//             scope: conn.scope,
//             anchor:anchor,
//             reattachConnections: conn.reattach || conn.instance.defaults.reattachConnections,
//             connectionsDetachable: conn.detachable || conn.instance.defaults.connectionsDetachable
//         })
//
//         conn.instance._refreshEndpoint(e)
//
//         if (existing == null) {
//             e.deleteOnEmpty = true
//         }
//         conn.endpoints[index] = e
//     }
//
//     return e
// }

/**
 * @internal
 */
export type ConnectionOptions<E = any>  =  Merge<ConnectParams<E>,  {

    source?:E
    target?:E
    sourceEndpoint?:Endpoint
    targetEndpoint?:Endpoint

    previousConnection?:Connection

    geometry?:any
}>

export const TYPE_ID_CONNECTION = "_jsplumb_connection"
export const ID_PREFIX_CONNECTION = "_jsPlumb_c"

export interface Connection<E = any> extends Component {
    connector: ConnectorBase
    defaultLabelLocation: number
    scope: string

    deleted:boolean

    typeId: string
    idPrefix: string
    defaultOverlayKey: string

    // getXY():PointXY

    previousConnection:Connection<E>

    /**
     * The id of the source of the connection
     * @public
     */
    sourceId:string
    /**
     * The id of the target of the connection
     * @public
     */
    targetId:string
    /**
     * The element that is the source of the connection
     * @public
     */
    source:E
    /**
     * The element that is the target of the connection
     * @public
     */
    target:E

    /**
     * Whether or not this connection is detachable
     * @public
     */
    detachable:boolean

    /**
     * Whether or not this connection should be reattached if it were detached via the mouse
     * @public
     */
    reattach:boolean

    /**
     * UUIDs of the endpoints. If this is not specifically provided in the constructor of the connection it will
     * be null.
     * @public
     */
    readonly uuids:[string, string]

    /**
     * Connection's cost.
     * @public
     */
    cost:number

    /**
     * Whether or not the connection is directed.
     * @public
     */
    directed:boolean

    /**
     * Source and target endpoints.
     * @public
     */
    endpoints:[Endpoint, Endpoint]
    endpointStyles:[PaintStyle, PaintStyle]

    readonly endpointSpec:EndpointSpec
    readonly endpointsSpec:[EndpointSpec, EndpointSpec]
    endpointStyle:PaintStyle
    endpointHoverStyle:PaintStyle
    readonly endpointHoverStyles:[PaintStyle, PaintStyle]

    id:string
    lastPaintedAt:string

    paintStyleInUse:PaintStyle

    /**
     * @internal
     */
    suspendedEndpoint:Endpoint
    /**
     * @internal
     */
    suspendedIndex:number
    /**
     * @internal
     */
    suspendedElement:E
    /**
     * @internal
     */
    suspendedElementId:string
    /**
     * @internal
     */
    suspendedElementType:string

    /**
     * @internal
     */
    _forceReattach:boolean
    /**
     * @internal
     */
    _forceDetach:boolean

    /**
     * List of current proxies for this connection. Used when collapsing groups and when dealing with scrolling lists.
     * @internal
     */
    proxies:Array<{ ep:Endpoint, originalEp: Endpoint }>

    /**
     * @internal
     */
    pending:boolean

    //getOverlay(overlayId:string):Overlay

}

export function createConnection(instance:JsPlumbInstance, params:ConnectionOptions):Connection {

//    super(instance, params)
    const componentBase = createComponentBase(instance,
        ID_PREFIX_CONNECTION,
        TYPE_DESCRIPTOR_CONNECTION,
        Constants.KEY_CONNECTION_OVERLAYS,
        {},
        DEFAULT_LABEL_LOCATION_CONNECTION,
        params)

    // this.id = params.id
    // if a new connection is the result of moving some existing connection, params.previousConnection
    // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
    // member and take action if they need to.
    const previousConnection = params.previousConnection
    let source = params.source
    let target = params.target
    let sourceId, targetId

    if (params.sourceEndpoint) {
        source = params.sourceEndpoint.element
        sourceId = params.sourceEndpoint.elementId
    } else {
        sourceId = instance.getId(source)
    }

    if (params.targetEndpoint) {
        target = params.targetEndpoint.element
        targetId = params.targetEndpoint.elementId
    } else {
        targetId = instance.getId(target)
    }

    const scope = params.scope

    const sourceAnchor = params.anchors ? params.anchors[0] : params.anchor
    const targetAnchor = params.anchors ? params.anchors[1] : params.anchor

    instance.manage(source)
    instance.manage(target)

    const cParams = {
        cssClass: params.cssClass,
        hoverClass:params.hoverClass,
        "pointer-events": params["pointer-events"],
        overlays: params.overlays
    }

    if (params.type) {
        params.endpoints = params.endpoints || instance._deriveEndpointAndAnchorSpec(params.type).endpoints
    }

    const endpointSpec = params.endpoint
    const endpointsSpec = params.endpoints || [null, null]
    const endpointStyle = params.endpointStyle
    const endpointHoverStyle = params.endpointHoverStyle
    const endpointStyles = params.endpointStyles || [null, null]
    const endpointHoverStyles = params.endpointHoverStyles || [null, null]
    const paintStyle = params.paintStyle
    const hoverPaintStyle = params.hoverPaintStyle
    const uuids = params.uuids

    const connection:Connection = extend(componentBase as any, {
        previousConnection,
        source,
        target,
        sourceId,
        targetId,
        scope,
        params:cParams,
        lastPaintedAt:null,
        endpointSpec,
        endpointsSpec,
        endpointStyle,
        endpointHoverStyle,
        endpointStyles,
        endpointHoverStyles,
        paintStyle,
        hoverPaintStyle,
        uuids,
        deleted:false,
        idPrefix:ID_PREFIX_CONNECTION,
        typeId:TYPE_ID_CONNECTION,
        defaultOverlayKey:Constants.KEY_CONNECTION_OVERLAYS,
        detachable:true,
        reattach:true,
        cost:1,
        directed:false,
        endpoints:[null, null],
        proxies:[]
    }) as Connection

    Connections.makeEndpoint(connection, true, connection.source, connection.sourceId, sourceAnchor, params.sourceEndpoint)
    Connections.makeEndpoint(connection, false, connection.target, connection.targetId, targetAnchor, params.targetEndpoint)

    // if scope not set, set it to be the scope for the source endpoint.
    if (!connection.scope) {
        connection.scope = connection.endpoints[0].scope
    }

    if (params.deleteEndpointsOnEmpty != null) {
        connection.endpoints[0].deleteOnEmpty = params.deleteEndpointsOnEmpty
        connection.endpoints[1].deleteOnEmpty = params.deleteEndpointsOnEmpty
    }

    let _detachable = instance.defaults.connectionsDetachable
    if (params.detachable === false) {
        _detachable = false
    }
    if (connection.endpoints[0].connectionsDetachable === false) {
        _detachable = false
    }
    if (connection.endpoints[1].connectionsDetachable === false) {
        _detachable = false
    }

    let _reattach = params.reattach || connection.endpoints[0].reattachConnections || connection.endpoints[1].reattachConnections || instance.defaults.reattachConnections

    const initialPaintStyle = extend({}, connection.endpoints[0].connectorStyle || connection.endpoints[1].connectorStyle || params.paintStyle || instance.defaults.paintStyle)
    Components.appendToDefaultType(connection, {
        detachable: _detachable,
        reattach: _reattach,
        paintStyle:initialPaintStyle,
        hoverPaintStyle:extend({}, connection.endpoints[0].connectorHoverStyle || connection.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || instance.defaults.hoverPaintStyle)
    })
    if (params.outlineWidth) {
        initialPaintStyle.outlineWidth = params.outlineWidth
    }
    if (params.outlineColor) {
        initialPaintStyle.outlineStroke = params.outlineColor
    }
    if (params.lineWidth) {
        initialPaintStyle.strokeWidth = params.lineWidth
    }
    if (params.color) {
        initialPaintStyle.stroke = params.color
    }

    if (!instance._suspendDrawing) {
        const initialTimestamp = instance._suspendedAt || uuid()
        instance._paintEndpoint(connection.endpoints[0], { timestamp: initialTimestamp })
        instance._paintEndpoint(connection.endpoints[1], { timestamp: initialTimestamp })
    }

    connection.cost = params.cost || connection.endpoints[0].connectionCost
    connection.directed = params.directed
    // inherit directed flag if set on source endpoint
    if (params.directed == null) {
        connection.directed = connection.endpoints[0].connectionsDirected
    }

    // PARAMETERS
    // merge all the parameters objects into the connection.  parameters set
    // on the connection take precedence; then source endpoint params, then
    // finally target endpoint params.
    let _p = extend({}, connection.endpoints[1].parameters)
    extend(_p, connection.endpoints[0].parameters)
    extend(_p, connection.parameters)
    connection.parameters = _p
// END PARAMETERS

// PAINTING

    connection.paintStyleInUse = connection.paintStyle || {}

    Connections.setConnector(connection, connection.endpoints[0].connector || connection.endpoints[1].connector || params.connector || instance.defaults.connector, true)

    let data = params.data == null || !isObject(params.data) ? {} : params.data
    Components.setData(connection, data)

    // the very last thing we do is apply types, if there are any.
    let _types = [ DEFAULT, connection.endpoints[0].edgeType, connection.endpoints[1].edgeType,  params.type ].join(" ")
    if (/[^\s]/.test(_types)) {
        Components.addType(connection, _types, params.data)
    }

    connection.getXY = function() { return { x:this.connector.x, y:this.connector.y }}

    return connection

}
/**
 * @public
 */
// export class ConnectionImpl<E = any> extends Component implements Connection<E> {
//
//     connector:ConnectorBase
//     defaultLabelLocation:number = 0.5
//     scope:string
//
//     //typeId = "_jsplumb_connection"
//     typeId = TYPE_ID_CONNECTION
//     //getIdPrefix () { return  "_jsPlumb_c"; }
//     idPrefix = ID_PREFIX_CONNECTION
//     defaultOverlayKey = Constants.KEY_CONNECTION_OVERLAYS
//
//     getDefaultOverlayKey():string { return Constants.KEY_CONNECTION_OVERLAYS }
//
//     getXY() {
//         return { x:this.connector.x, y:this.connector.y }
//     }
//
//     previousConnection:Connection
//
//     /**
//      * The id of the source of the connection
//      * @public
//      */
//     sourceId:string
//     /**
//      * The id of the target of the connection
//      * @public
//      */
//     targetId:string
//     /**
//      * The element that is the source of the connection
//      * @public
//      */
//     source:E
//     /**
//      * The element that is the target of the connection
//      * @public
//      */
//     target:E
//
//     /**
//      * Whether or not this connection is detachable
//      * @public
//      */
//     detachable:boolean = true
//
//     /**
//      * Whether or not this connection should be reattached if it were detached via the mouse
//      * @public
//      */
//     reattach:boolean = false
//
//     /**
//      * UUIDs of the endpoints. If this is not specifically provided in the constructor of the connection it will
//      * be null.
//      * @public
//      */
//     readonly uuids:[string, string]
//
//     /**
//      * Connection's cost.
//      * @public
//      */
//     cost:number = 1
//
//     /**
//      * Whether or not the connection is directed.
//      * @public
//      */
//     directed:boolean
//
//     /**
//      * Source and target endpoints.
//      * @public
//      */
//     endpoints:[Endpoint<E>, Endpoint<E>] = [null, null]
//     endpointStyles:[PaintStyle, PaintStyle]
//
//     readonly endpointSpec:EndpointSpec
//     readonly endpointsSpec:[EndpointSpec, EndpointSpec]
//     endpointStyle:PaintStyle = {}
//     endpointHoverStyle:PaintStyle = {}
//     readonly endpointHoverStyles:[PaintStyle, PaintStyle]
//
//     /**
//      * @internal
//      */
//     suspendedEndpoint:Endpoint<E>
//     /**
//      * @internal
//      */
//     suspendedIndex:number
//     /**
//      * @internal
//      */
//     suspendedElement:E
//     /**
//      * @internal
//      */
//     suspendedElementId:string
//     /**
//      * @internal
//      */
//     suspendedElementType:string
//
//     /**
//      * @internal
//      */
//     _forceReattach:boolean
//     /**
//      * @internal
//      */
//     _forceDetach:boolean
//
//     /**
//      * List of current proxies for this connection. Used when collapsing groups and when dealing with scrolling lists.
//      * @internal
//      */
//     proxies:Array<{ ep:Endpoint<E>, originalEp: Endpoint<E> }> = []
//
//     /**
//      * @internal
//      */
//     pending:boolean = false
//
//     /**
//      * Connections should never be constructed directly by users of the library.
//      * @internal
//      * @param instance
//      * @param params
//      */
//     constructor(public instance:JsPlumbInstance, params:ConnectionOptions<E>) {
//
//         super(instance, params)
//
//         this.id = params.id
//         // if a new connection is the result of moving some existing connection, params.previousConnection
//         // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
//         // member and take action if they need to.
//         this.previousConnection = params.previousConnection
//
//         this.source = params.source
//         this.target = params.target
//
//         if (params.sourceEndpoint) {
//             this.source = params.sourceEndpoint.element
//             this.sourceId = params.sourceEndpoint.elementId
//         } else {
//             this.sourceId = instance.getId(this.source)
//         }
//
//         if (params.targetEndpoint) {
//             this.target = params.targetEndpoint.element
//             this.targetId = params.targetEndpoint.elementId
//         } else {
//             this.targetId = instance.getId(this.target)
//         }
//
//         this.scope = params.scope
//
//         const sourceAnchor = params.anchors ? params.anchors[0] : params.anchor
//         const targetAnchor = params.anchors ? params.anchors[1] : params.anchor
//
//         instance.manage(this.source)
//         instance.manage(this.target)
//
//         this._visible = true
//
//         this.params = {
//             cssClass: params.cssClass,
//             hoverClass:params.hoverClass,
//             "pointer-events": params["pointer-events"],
//             overlays: params.overlays
//         }
//         this.lastPaintedAt = null
//
//         if (params.type) {
//             params.endpoints = params.endpoints || this.instance._deriveEndpointAndAnchorSpec(params.type).endpoints
//         }
//
//         this.endpointSpec = params.endpoint
//         this.endpointsSpec = params.endpoints || [null, null]
//         this.endpointStyle = params.endpointStyle
//         this.endpointHoverStyle = params.endpointHoverStyle
//         this.endpointStyles = params.endpointStyles || [null, null]
//         this.endpointHoverStyles = params.endpointHoverStyles || [null, null]
//         this.paintStyle = params.paintStyle
//         this.hoverPaintStyle = params.hoverPaintStyle
//         this.uuids = params.uuids
//
//         Connections.makeEndpoint(this, true, this.source, this.sourceId, sourceAnchor, params.sourceEndpoint)
//         Connections.makeEndpoint(this, false, this.target, this.targetId, targetAnchor, params.targetEndpoint)
//
//         // if scope not set, set it to be the scope for the source endpoint.
//         if (!this.scope) {
//             this.scope = this.endpoints[0].scope
//         }
//
//         if (params.deleteEndpointsOnEmpty != null) {
//             this.endpoints[0].deleteOnEmpty = params.deleteEndpointsOnEmpty
//             this.endpoints[1].deleteOnEmpty = params.deleteEndpointsOnEmpty
//         }
//
//         let _detachable = this.instance.defaults.connectionsDetachable
//         if (params.detachable === false) {
//             _detachable = false
//         }
//         if (this.endpoints[0].connectionsDetachable === false) {
//             _detachable = false
//         }
//         if (this.endpoints[1].connectionsDetachable === false) {
//             _detachable = false
//         }
//
//         this.endpointsSpec = params.endpoints || [null, null]
//         this.endpointSpec = params.endpoint || null
//
//         let _reattach = params.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || this.instance.defaults.reattachConnections
//
//         const initialPaintStyle = extend({}, this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || params.paintStyle || this.instance.defaults.paintStyle)
//         this.appendToDefaultType({
//             detachable: _detachable,
//             reattach: _reattach,
//             paintStyle:initialPaintStyle,
//             hoverPaintStyle:extend({}, this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || this.instance.defaults.hoverPaintStyle)
//         })
//         if (params.outlineWidth) {
//             initialPaintStyle.outlineWidth = params.outlineWidth
//         }
//         if (params.outlineColor) {
//             initialPaintStyle.outlineStroke = params.outlineColor
//         }
//         if (params.lineWidth) {
//             initialPaintStyle.strokeWidth = params.lineWidth
//         }
//         if (params.color) {
//             initialPaintStyle.stroke = params.color
//         }
//
//         if (!this.instance._suspendDrawing) {
//             const initialTimestamp = this.instance._suspendedAt || uuid()
//             this.instance._paintEndpoint(this.endpoints[0], { timestamp: initialTimestamp })
//             this.instance._paintEndpoint(this.endpoints[1], { timestamp: initialTimestamp })
//         }
//
//         this.cost = params.cost || this.endpoints[0].connectionCost
//         this.directed = params.directed
//         // inherit directed flag if set on source endpoint
//         if (params.directed == null) {
//             this.directed = this.endpoints[0].connectionsDirected
//         }
//
//         // PARAMETERS
//         // merge all the parameters objects into the connection.  parameters set
//         // on the connection take precedence; then source endpoint params, then
//         // finally target endpoint params.
//         let _p = extend({}, this.endpoints[1].parameters)
//         extend(_p, this.endpoints[0].parameters)
//         extend(_p, this.parameters)
//         this.parameters = _p
// // END PARAMETERS
//
// // PAINTING
//
//         this.paintStyleInUse = this.getPaintStyle() || {}
//
//         Connections.setConnector(this, this.endpoints[0].connector || this.endpoints[1].connector || params.connector || this.instance.defaults.connector, true)
//
//         let data = params.data == null || !isObject(params.data) ? {} : params.data
//         this.setData(data)
//
//         // the very last thing we do is apply types, if there are any.
//         let _types = [ DEFAULT, this.endpoints[0].edgeType, this.endpoints[1].edgeType,  params.type ].join(" ")
//         if (/[^\s]/.test(_types)) {
//             this.addType(_types, params.data)
//         }
//     }
//
//     // makeEndpoint (isSource:boolean, el:any, elId:string, anchor?:AnchorSpec, ep?:Endpoint):Endpoint {
//     //     elId = elId || this.instance.getId(el)
//     //     return prepareEndpoint<E>(this, ep, isSource ? 0 : 1, anchor, el, elId)
//     // }
//
//     static type = "connection"
//     typeDescriptor = TYPE_DESCRIPTOR_CONNECTION
//
//     // getTypeDescriptor ():string {
//     //     return TYPE_DESCRIPTOR_CONNECTION
//     // }
//
//     // isDetachable (ep?:Endpoint):boolean {
//     //     return this.detachable === false ? false : ep != null ? ep.connectionsDetachable === true : this.detachable === true
//     // }
//     //
//     // setDetachable (detachable:boolean):void {
//     //     this.detachable = detachable === true
//     // }
//     //
//     // // isReattach ():boolean {
//     // //     return this.reattach === true || this.endpoints[0].reattachConnections === true || this.endpoints[1].reattachConnections === true
//     // // }
//     //
//     // setReattach (reattach:boolean):void {
//     //     this.reattach = reattach === true
//     // }
//
//     // TODO remove - it's now in Connections
//     // applyType(t:ConnectionTypeDescriptor, typeMap:any):void {
//     //
//     //     let _connector = null
//     //     if (t.connector != null) {
//     //         _connector = this.getCachedTypeItem(TYPE_ITEM_CONNECTOR, typeMap.connector)
//     //         if (_connector == null) {
//     //             _connector = Connections.prepareConnector(this, t.connector, typeMap.connector)
//     //             this.cacheTypeItem(TYPE_ITEM_CONNECTOR, _connector, typeMap.connector)
//     //         }
//     //         setPreparedConnector(this, _connector)
//     //     }
//     //
//     //     // apply connector before superclass, as a new connector means overlays have to move.
//     //     super.applyType(t, typeMap)
//     //
//     //     // none of these things result in the creation of objects so can be ignored.
//     //     if (t.detachable != null) {
//     //         Connections.setDetachable(this, t.detachable)
//     //     }
//     //     if (t.reattach != null) {
//     //         Connections.setReattach(this, t.reattach)
//     //     }
//     //     if (t.scope) {
//     //         this.scope = t.scope
//     //     }
//     //
//     //     let _anchors = null
//     //     // this also results in the creation of objects.
//     //     if (t.anchor) {
//     //         // note that even if the param was anchor, we store `anchors`.
//     //         _anchors = this.getCachedTypeItem(TYPE_ITEM_ANCHORS, typeMap.anchor)
//     //         if (_anchors == null) {
//     //             _anchors = [ makeLightweightAnchorFromSpec(t.anchor), makeLightweightAnchorFromSpec(t.anchor) ]
//     //             this.cacheTypeItem(TYPE_ITEM_ANCHORS, _anchors, typeMap.anchor)
//     //         }
//     //     }
//     //     else if (t.anchors) {
//     //         _anchors = this.getCachedTypeItem(TYPE_ITEM_ANCHORS, typeMap.anchors)
//     //         if (_anchors == null) {
//     //             _anchors = [
//     //                 makeLightweightAnchorFromSpec(t.anchors[0]),
//     //                 makeLightweightAnchorFromSpec(t.anchors[1])
//     //             ]
//     //             this.cacheTypeItem(TYPE_ITEM_ANCHORS, _anchors, typeMap.anchors)
//     //         }
//     //     }
//     //     if (_anchors != null) {
//     //         this.instance.router.setConnectionAnchors(this, _anchors)
//     //
//     //         if (this.instance.router.isDynamicAnchor(this.endpoints[1])) {
//     //             this.instance.repaint(this.endpoints[1].element)
//     //         }
//     //     }
//     //
//     //     this.instance.applyConnectorType(this.connector, t)
//     // }
//
//     // /**
//     //  * Adds the given class to the UI elements being used to represent this connection's connector, and optionally to
//     //  * the UI elements representing the connection's endpoints.
//     //  * @param c class to add
//     //  * @param cascade If true, also add the class to the connection's endpoints.
//     //  * @public
//     //  */
//     // addClass(c:string, cascade?:boolean) {
//     //     super.addClass(c)
//     //
//     //     if (cascade) {
//     //         this.endpoints[0].addClass(c)
//     //         this.endpoints[1].addClass(c)
//     //         if (this.suspendedEndpoint) {
//     //             this.suspendedEndpoint.addClass(c)
//     //         }
//     //     }
//     //
//     //     if (this.connector) {
//     //         this.instance.addConnectorClass(this.connector, c)
//     //     }
//     // }
//     //
//     // /**
//     //  * Removes the given class from the UI elements being used to represent this connection's connector, and optionally from
//     //  * the UI elements representing the connection's endpoints.
//     //  * @param c class to remove
//     //  * @param cascade If true, also remove the class from the connection's endpoints.
//     //  * @public
//     //  */
//     // removeClass(c:string, cascade?:boolean) {
//     //     super.removeClass(c)
//     //
//     //     if (cascade) {
//     //         this.endpoints[0].removeClass(c)
//     //         this.endpoints[1].removeClass(c)
//     //         if (this.suspendedEndpoint) {
//     //             this.suspendedEndpoint.removeClass(c)
//     //         }
//     //     }
//     //
//     //     if (this.connector) {
//     //         this.instance.removeConnectorClass(this.connector, c)
//     //     }
//     // }
//
//     /**
//      * Sets the visible state of the connection.
//      * @param v
//      * @public
//      */
//     // setVisible(v:boolean) {
//     //     super.setVisible(v)
//     //     if (this.connector) {
//     //         this.instance.setConnectorVisible(this.connector, v)
//     //     }
//     //     this.instance._paintConnection(this)
//     // }
//
//     /**
//      * @internal
//      */
//     // destroy() {
//     //     super.destroy()
//     //
//     //     this.endpoints = null
//     //     this.endpointStyles = null
//     //     this.source = null
//     //     this.target = null
//     //
//     //     // TODO stop hover?
//     //
//     //     this.instance.destroyConnector(this)
//     //
//     //     this.connector = null
//     //     this.deleted = true
//     //
//     // }
// }
