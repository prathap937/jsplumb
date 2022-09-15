
import { JsPlumbInstance } from "../core"
import {ConnectParams } from '../params'
import {ConnectorBase} from "./abstract-connector"
import {Endpoint} from "../endpoint/endpoint"

import {Component, Components, createComponentBase} from "../component/component"
import {extend, uuid, Merge, isObject} from "@jsplumb/util"

import * as Constants from "../constants"
import {ConnectorSpec, EndpointSpec, DEFAULT, PaintStyle} from "@jsplumb/common"
import {
    Connections,
    TYPE_DESCRIPTOR_CONNECTION,
    DEFAULT_LABEL_LOCATION_CONNECTION
} from "./connections"

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

    const componentBase = createComponentBase(instance,
        ID_PREFIX_CONNECTION,
        TYPE_DESCRIPTOR_CONNECTION,
        Constants.KEY_CONNECTION_OVERLAYS,
        {},
        DEFAULT_LABEL_LOCATION_CONNECTION,
        params)

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
