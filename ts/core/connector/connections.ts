
import {Connectors} from "../connector/connectors"
import { ConnectorBase } from "../connector/abstract-connector"
import { Endpoint} from '../endpoint/endpoint'
import {AnchorSpec, ConnectorSpec, ConnectorWithOptions, EndpointSpec} from "@jsplumb/common"
import {isString, merge} from "@jsplumb/util"
import * as Constants from "../constants"
import { OverlayBase } from '../overlay/overlay'
import {ConnectionTypeDescriptor, } from "../type-descriptors"
import { makeLightweightAnchorFromSpec} from '../factory/anchor-record-factory'

import {Endpoints} from '../endpoint/endpoints'

import { JsPlumbInstance } from "../core"

import { Connection, ConnectionOptions, ID_PREFIX_CONNECTION, TYPE_ID_CONNECTION, TYPE_DESCRIPTOR_CONNECTION, DEFAULT_LABEL_LOCATION_CONNECTION} from './declarations'

import {Components, createComponentBase} from "../component/component"
import {extend, uuid, isObject} from "@jsplumb/util"

import {DEFAULT} from "@jsplumb/common"

function prepareEndpoint<E>(conn:Connection<E>, existing:Endpoint, index:number, anchor?:AnchorSpec, element?:E, elementId?:string, endpoint?:EndpointSpec):Endpoint {

    let e

    if (existing) {
        conn.endpoints[index] = existing
        Endpoints.addConnection(existing, conn)
    } else {

        let ep = endpoint || conn.endpointSpec || conn.endpointsSpec[index] || conn.instance.defaults.endpoints[index] || conn.instance.defaults.endpoint

        let es = conn.endpointStyles[index] || conn.endpointStyle || conn.instance.defaults.endpointStyles[index] || conn.instance.defaults.endpointStyle

        // Endpoints derive their fill from the connector's stroke, if no fill was specified.
        if (es.fill == null && conn.paintStyle != null) {
            es.fill = conn.paintStyle.stroke
        }

        if (es.outlineStroke == null && conn.paintStyle != null) {
            es.outlineStroke = conn.paintStyle.outlineStroke
        }
        if (es.outlineWidth == null && conn.paintStyle != null) {
            es.outlineWidth = conn.paintStyle.outlineWidth
        }

        let ehs = conn.endpointHoverStyles[index] || conn.endpointHoverStyle || conn.endpointHoverStyle || conn.instance.defaults.endpointHoverStyles[index] || conn.instance.defaults.endpointHoverStyle
        // endpoint hover fill style is derived from connector's hover stroke style
        if (conn.hoverPaintStyle != null) {
            if (ehs == null) {
                ehs = {}
            }
            if (ehs.fill == null) {
                ehs.fill = conn.hoverPaintStyle.stroke
            }
        }

        let u = conn.uuids ? conn.uuids[index] : null

        anchor = anchor != null ? anchor : conn.instance.defaults.anchors != null ? conn.instance.defaults.anchors[index] : conn.instance.defaults.anchor

        e = conn.instance._internal_newEndpoint({
            paintStyle: es,
            hoverPaintStyle: ehs,
            endpoint: ep,
            connections: [ conn ],
            uuid: u,
            element: element,
            scope: conn.scope,
            anchor:anchor,
            reattachConnections: conn.reattach || conn.instance.defaults.reattachConnections,
            connectionsDetachable: conn.detachable || conn.instance.defaults.connectionsDetachable
        })

        conn.instance._refreshEndpoint(e)

        if (existing == null) {
            e.deleteOnEmpty = true
        }
        conn.endpoints[index] = e
    }

    return e
}

/**
 * @internal
 */
export const TYPE_ITEM_ANCHORS = "anchors"
/**
 * @internal
 */
export const TYPE_ITEM_CONNECTOR = "connector"

/**
 * Sets a connector that has been prepared on a Connection, removing any previous connector, and caching by type if necessary.
 * @param connection
 * @param connector
 * @param doNotRepaint
 * @param doNotChangeListenerComponent
 * @param typeId
 * @internal
 */
export function setPreparedConnector(connection:Connection, connector:ConnectorBase, doNotRepaint?:boolean, doNotChangeListenerComponent?:boolean, typeId?:string) {

    if (connection.connector !== connector) {
        const instance = connection.instance

        let previous, previousClasses = ""
        // the connector will not be cleaned up if it was set as part of a type, because `typeId` will be set on it
        // and we havent passed in `true` for "force" here.
        if (connection.connector != null) {
            previous = connection.connector
            previousClasses = instance.getConnectorClass(connection.connector)
            instance.destroyConnector(connection)
        }

        connection.connector = connector
        if (typeId) {
            Components.cacheTypeItem(connection, TYPE_ITEM_CONNECTOR, connector, typeId)
        }

        // put classes from prior connector onto the canvas
        Connections.addClass(connection, previousClasses)

        if (previous != null) {
            let o:Record<string, OverlayBase> = connection.overlays
            for (let i in o) {
                instance.reattachOverlay(o[i], connection)
            }
        }

        if (!doNotRepaint) {
            instance._paintConnection(connection)
        }
    }
}

function createConnection(instance:JsPlumbInstance, params:ConnectionOptions):Connection {

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

/**
 * Manager for operations on connections.
 * @internal
 */
export const Connections = {

    isReattach(connection:Connection, alsoCheckForced:boolean):boolean {
        const ra = connection.reattach === true || connection.endpoints[0].reattachConnections === true || connection.endpoints[1].reattachConnections === true
        const fa = alsoCheckForced ? connection._forceReattach : false
        return ra || fa
    },
    isDetachable (connection:Connection, ep?:Endpoint):boolean {
        return connection.detachable === false ? false : ep != null ? ep.connectionsDetachable === true : connection.detachable === true
    },
    setDetachable (connection:Connection, detachable:boolean):void {
        connection.detachable = detachable === true
    },
    setReattach (connection:Connection, reattach:boolean):void {
        connection.reattach = reattach === true
    },
    prepareConnector(connection:Connection, connectorSpec:ConnectorSpec, typeId?:string):ConnectorBase {
        let connectorArgs = {
                cssClass: connection.params.cssClass,
                hoverClass:connection.params.hoverClass,
                "pointer-events": connection.params["pointer-events"]
            },
            connector

        if (isString(connectorSpec)) {
            connector = Connectors.create(connection, connectorSpec as string, connectorArgs)
        }
        else {
            const co = connectorSpec as ConnectorWithOptions
            connector = Connectors.create(connection, co.type, merge(co.options || {}, connectorArgs))
        }
        if (typeId != null) {
            connector.typeId = typeId
        }
        return connector
    },
    /**
     * @internal
     * @param connectorSpec
     * @param doNotRepaint
     * @param doNotChangeListenerComponent
     * @param typeId
     */
    setConnector(connection:Connection, connectorSpec:ConnectorSpec, doNotRepaint?:boolean, doNotChangeListenerComponent?:boolean, typeId?:string) {
        const connector = Connections.prepareConnector(connection, connectorSpec, typeId)
        setPreparedConnector(connection, connector, doNotRepaint, doNotChangeListenerComponent, typeId)
    },
    getUuids(connection:Connection):[string, string] {
        return [ connection.endpoints[0].uuid, connection.endpoints[1].uuid ]
    },
    /**
     * Replace the Endpoint at the given index with a new Endpoint.  This is used by the Toolkit edition, if changes to an edge type
     * cause a change in Endpoint.
     * @param idx 0 for source, 1 for target
     * @param endpointDef Spec for the new Endpoint.
     * @public
     */
    replaceEndpoint(connection:Connection, idx:number, endpointDef:EndpointSpec) {

        let current = connection.endpoints[idx],
            elId = current.elementId,
            ebe = connection.instance.getEndpoints(current.element),
            _idx = ebe.indexOf(current),
            _new = prepareEndpoint(connection, null, idx, null, current.element, elId, endpointDef)

        connection.endpoints[idx] = _new

        ebe.splice(_idx, 1, _new)

        Endpoints.detachFromConnection(current, connection)
        connection.instance.deleteEndpoint(current)

        connection.instance.fire(Constants.EVENT_ENDPOINT_REPLACED, {previous:current, current:_new})

    },
    makeEndpoint (connection:Connection, isSource:boolean, el:any, elId:string, anchor?:AnchorSpec, ep?:Endpoint):Endpoint {
        elId = elId || connection.instance.getId(el)
        return prepareEndpoint(connection, ep, isSource ? 0 : 1, anchor, el, elId)
    },
    applyType(connection:Connection, t:ConnectionTypeDescriptor, typeMap:any):void {

        let _connector = null
        if (t.connector != null) {
            _connector = Components.getCachedTypeItem(connection, TYPE_ITEM_CONNECTOR, typeMap.connector)
            if (_connector == null) {
                _connector = Connections.prepareConnector(connection, t.connector, typeMap.connector)
                Components.cacheTypeItem(connection, TYPE_ITEM_CONNECTOR, _connector, typeMap.connector)
            }
            setPreparedConnector(connection, _connector)
        }

        // apply connector before superclass, as a new connector means overlays have to move.
        Components.applyBaseType(connection, t, typeMap)

        // none of these things result in the creation of objects so can be ignored.
        if (t.detachable != null) {
            Connections.setDetachable(connection, t.detachable)
        }
        if (t.reattach != null) {
            Connections.setReattach(connection, t.reattach)
        }
        if (t.scope) {
            connection.scope = t.scope
        }

        let _anchors = null
        // this also results in the creation of objects.
        if (t.anchor) {
            // note that even if the param was anchor, we store `anchors`.
            _anchors = Components.getCachedTypeItem(connection, TYPE_ITEM_ANCHORS, typeMap.anchor)
            if (_anchors == null) {
                _anchors = [ makeLightweightAnchorFromSpec(t.anchor), makeLightweightAnchorFromSpec(t.anchor) ]
                Components.cacheTypeItem(connection, TYPE_ITEM_ANCHORS, _anchors, typeMap.anchor)
            }
        }
        else if (t.anchors) {
            _anchors = this.getCachedTypeItem(TYPE_ITEM_ANCHORS, typeMap.anchors)
            if (_anchors == null) {
                _anchors = [
                    makeLightweightAnchorFromSpec(t.anchors[0]),
                    makeLightweightAnchorFromSpec(t.anchors[1])
                ]
                Components.cacheTypeItem(connection, TYPE_ITEM_ANCHORS, _anchors, typeMap.anchors)
            }
        }
        if (_anchors != null) {
            connection.instance.router.setConnectionAnchors(connection, _anchors)

            if (connection.instance.router.isDynamicAnchor(connection.endpoints[1])) {
                connection.instance.repaint(connection.endpoints[1].element)
            }
        }

        connection.instance.applyConnectorType(connection.connector, t)
    },
    destroy(connection:Connection) {
        Components.destroy(connection)

        connection.endpoints = null
        connection.endpointStyles = null
        connection.source = null
        connection.target = null

        // TODO stop hover?

        connection.instance.destroyConnector(connection)

        connection.connector = null
        connection.deleted = true

    },
    setVisible(connection:Connection, v:boolean) {
        Components._setComponentVisible(connection, v)
        if (connection.connector) {
            connection.instance.setConnectorVisible(connection.connector, v)
        }
        connection.instance._paintConnection(connection)
    },
    /**
     * Adds the given class to the UI elements being used to represent this connection's connector, and optionally to
     * the UI elements representing the connection's endpoints.
     * @param c class to add
     * @param cascade If true, also add the class to the connection's endpoints.
     * @public
     */
    addClass(connection:Connection, c:string, cascade?:boolean) {
        Components.addBaseClass(connection, c)

        if (cascade) {
            Endpoints.addClass(connection.endpoints[0], c)
            Endpoints.addClass(connection.endpoints[1], c)
            if (connection.suspendedEndpoint) {
                Endpoints.addClass(connection.suspendedEndpoint, c)
            }
        }

        if (connection.connector) {
            connection.instance.addConnectorClass(connection.connector, c)
        }
    },

    /**
     * Removes the given class from the UI elements being used to represent this connection's connector, and optionally from
     * the UI elements representing the connection's endpoints.
     * @param c class to remove
     * @param cascade If true, also remove the class from the connection's endpoints.
     * @public
     */
    removeClass(connection:Connection, c:string, cascade?:boolean) {
        Components.removeBaseClass(connection, c)

        if (cascade) {
            Endpoints.removeClass(connection.endpoints[0], c)
            Endpoints.removeClass(connection.endpoints[1], c)
            if (connection.suspendedEndpoint) {
                Endpoints.removeClass(connection.suspendedEndpoint, c)
            }
        }

        if (connection.connector) {
            connection.instance.removeConnectorClass(connection.connector, c)
        }
    },

    isConnection(component:any):component is Connection {
        return component._typeDescriptor != null && component._typeDescriptor == TYPE_DESCRIPTOR_CONNECTION
    },
    create(instance:JsPlumbInstance, params:ConnectionOptions):Connection {
        return createConnection(instance, params)
    }

}


