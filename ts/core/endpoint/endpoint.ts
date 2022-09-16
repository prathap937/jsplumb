
import { Connection } from '../connector/declarations'
import {EndpointRepresentation, TYPE_DESCRIPTOR_ENDPOINT} from './endpoints'
import { extend,  } from '@jsplumb/util'
import { JsPlumbInstance } from '../core'
import {Component, Components, createComponentBase} from "../component/component"
import { InternalEndpointOptions } from "./endpoint-options"
import { LightweightAnchor } from '../factory/anchor-record-factory'
import { PaintStyle, OverlaySpec, DEFAULT, AnchorLocations, AnchorSpec, ConnectorSpec } from "@jsplumb/common"
import { Endpoints} from './endpoints'

export interface Endpoint extends Component {
    connections:Array<Connection>
    representation:EndpointRepresentation<any>
    proxiedBy:Endpoint
    connectorClass:string
    connectorHoverClass:string
    element:any
    elementId:string
    dragAllowedWhenFull:boolean
    timestamp:string

    portId:string

    maxConnections:number
    enabled:boolean

    isSource:boolean
    isTarget:boolean
    isTemporarySource:boolean

    connectionCost:number
    connectionsDirected:boolean
    connectionsDetachable:boolean
    reattachConnections:boolean

    edgeType:string
    currentAnchorClass:string
    connector:ConnectorSpec
    connectorOverlays:Array<OverlaySpec>

    connectorStyle:PaintStyle
    connectorHoverStyle:PaintStyle

    deleteOnEmpty:boolean

    uuid:string

    scope:string

    _anchor:LightweightAnchor

    referenceEndpoint:Endpoint
    finalEndpoint:Endpoint

    connectorSelector:() => Connection
}

export const ID_PREFIX_ENDPOINT = "_jsplumb_e"
export const DEFAULT_OVERLAY_KEY_ENDPOINTS = "endpointOverlays"
export const DEFAULT_LABEL_LOCATION_ENDPOINT = [ 0.5, 0.5 ] as [number, number]

export function createEndpoint<E>(instance:JsPlumbInstance, params:InternalEndpointOptions<E>):Endpoint {
    const baseComponent = createComponentBase(instance,
        ID_PREFIX_ENDPOINT,
        TYPE_DESCRIPTOR_ENDPOINT,
        DEFAULT_OVERLAY_KEY_ENDPOINTS,
        {
            edgeType:params.edgeType,
            maxConnections: params.maxConnections == null ? instance.defaults.maxConnections : params.maxConnections, // maximum number of connections this endpoint can be the source of.,
            paintStyle: params.paintStyle || instance.defaults.endpointStyle,
            hoverPaintStyle: params.hoverPaintStyle || instance.defaults.endpointHoverStyle,
            connectorStyle: params.connectorStyle,
            connectorHoverStyle: params.connectorHoverStyle,
            connectorClass: params.connectorClass,
            connectorHoverClass: params.connectorHoverClass,
            connectorOverlays: params.connectorOverlays,
            connector: params.connector
        },
        DEFAULT_LABEL_LOCATION_ENDPOINT,
        params)

    const enabled = !(params.enabled === false)
    const visible = true
    const element = params.element
    //
    const uuid = params.uuid
    //
    const portId = params.portId
    const elementId = params.elementId
    //
    const connectionCost = params.connectionCost == null ? 1 : params.connectionCost
    const connectionsDirected = params.connectionsDirected
    const currentAnchorClass = ""
    const events = {}
    //
    const connectorOverlays = params.connectorOverlays
    //
    const connectorStyle = params.connectorStyle
    const connectorHoverStyle = params.connectorHoverStyle
    const connector = params.connector
    const edgeType = params.edgeType
    const connectorClass = params.connectorClass
    const connectorHoverClass = params.connectorHoverClass
    //
    const deleteOnEmpty = params.deleteOnEmpty === true
    //
    const isSource = params.source || false
    const isTemporarySource = params.isTemporarySource || false
    const isTarget = params.target || false
    //
    const connections = params.connections || []
    //
    const scope = params.scope || instance.defaultScope
    const timestamp:string = null
    const reattachConnections = params.reattachConnections || instance.defaults.reattachConnections
    let connectionsDetachable = instance.defaults.connectionsDetachable
    if (params.connectionsDetachable === false) {
        connectionsDetachable = false
    }
    const dragAllowedWhenFull = params.dragAllowedWhenFull !== false

    const endpoint:Endpoint = extend(baseComponent as any, {
        enabled,
        visible,
        element,
        uuid,
        portId,
        elementId,
        connectionCost,
        connectionsDirected,
        currentAnchorClass,
        events,
        connectorOverlays,
        connectorStyle,
        connectorHoverStyle,
        connector,
        edgeType,
        connectorClass,
        connectorHoverClass,
        deleteOnEmpty,
        isSource,
        isTemporarySource,
        isTarget,
        connections,
        scope,
        timestamp,
        reattachConnections,
        connectionsDetachable,
        dragAllowedWhenFull,
        connectorSelector:function() { return this.connections[0] },
        getXY:function() { return { x:this.representation.x, y:this.representation.y } }

    }) as Endpoint


//
    let ep = params.endpoint || params.existingEndpoint || instance.defaults.endpoint
    Endpoints.setEndpoint(endpoint, ep)
//
    if (params.preparedAnchor != null) {
        Endpoints._setPreparedAnchor(endpoint, params.preparedAnchor)
    } else {
        let anchorParamsToUse:AnchorSpec|Array<AnchorSpec> = params.anchor ? params.anchor : params.anchors ? params.anchors : (instance.defaults.anchor || AnchorLocations.Top)
        Endpoints.setAnchor(endpoint, anchorParamsToUse)
    }
//
    // finally, set type if it was provided
    let type = [ DEFAULT, (params.type || "")].join(" ")
    Components.addType(endpoint, type, params.data)

    return endpoint
}
