import {ConnectorBase, ConnectorComputeParams, PaintGeometry} from "./abstract-connector"
import {Connection} from "./connection-impl"
import {Geometry} from "@jsplumb/common"

const connectorHandlerMap:Record<string, ConnectorHandler> = {}

/**
 * Definition of an object that can create instances of some connector type, and perform a few
 * housekeeping tasks on connector's of that type.
 */
export interface ConnectorHandler {
    importGeometry(connector:ConnectorBase, g:Geometry):boolean
    transformGeometry(connector:ConnectorBase, g:Geometry, dx:number, dy:number):Geometry
    _compute(connector:ConnectorBase, geometry:PaintGeometry, params:ConnectorComputeParams):void
    create(connection:Connection, connectorType:string, params:any):ConnectorBase
    exportGeometry(connector:ConnectorBase):Geometry
    setAnchorOrientation(connector:ConnectorBase, idx:number, orientation:number[]):void
}

/**
 * Provides a few default methods for working with connectors. You only need to interact with this object
 * if you're writing your own connector and you want to use on of the default methods it provides.
 * @public
 */
export const defaultConnectorHandler = {
    /**
     * Sets geometry on a connector
     * @param connector
     */
    exportGeometry(connector:ConnectorBase):Geometry {
        return connector.geometry
    },
    /**
     * Import geometry to a connector and mark it 'edited'
     * @param connector
     * @param g
     */
    importGeometry(connector:ConnectorBase, g:Geometry):boolean {
        connector.geometry = g
        return true
    }

}

/**
 * Utilities for registering and working with Connectors
 * @public
 */
export const Connectors = {
    /**
     * Register a connector handler. If you write your own Connector type you need to register it using this method.
     * @param connectorType
     * @param connectorHandler
     * @public
     */
    register:(connectorType:string, connectorHandler:ConnectorHandler) => {
        connectorHandlerMap[connectorType] = connectorHandler
    },
    /**
     * Get a handler for the given connector type
     * @internal
     * @param connectorType
     */
    get:(connectorType:string):ConnectorHandler => {
        const sh = connectorHandlerMap[connectorType]
        if (!sh) {
            throw {message:"jsPlumb: no connector handler found for connector type '" + connectorType + "'"}
        } else {
            return sh
        }
    },
    /**
     * Export the given connector's geometry, via the associated handler.
     * @param connector
     * @internal
     */
    exportGeometry(connector:ConnectorBase) {
        return this.get(connector.type).exportGeometry(connector)
    },
    /**
     * Import geometry into the given connector, via the associated handler
     * @param connector
     * @param g
     * @internal
     */
    importGeometry(connector:ConnectorBase, g:Geometry) {
        return this.get(connector.type).importGeometry(connector, g)
    },
    /**
     * Transform geometry for the given connector, via the associated handler
     * @param connector
     * @param g
     * @param dx
     * @param dy
     * @internal
     */
    transformGeometry(connector:ConnectorBase, g:Geometry, dx:number, dy:number) {
        return this.get(connector.type).transformGeometry(connector, g, dx, dy)
    },
    /**
     * Prepare a connector using the given name and args.
     * @internal
     * @param connection
     * @param name
     * @param args
     */
    create(connection:Connection<any>, name:string, args:any):ConnectorBase {
        return this.get(name).create(connection, name, args)
    },
    setAnchorOrientation(connector:ConnectorBase, idx:number, orientation:number[]):void {
        this.get(connector.type).setAnchorOrientation(connector, idx, orientation)
    }
}



