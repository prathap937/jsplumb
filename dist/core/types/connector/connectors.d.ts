import { ConnectorBase, ConnectorComputeParams, PaintGeometry } from "./abstract-connector";
import { Connection } from "./connection-impl";
import { Geometry } from "@jsplumb/common";
/**
 * Definition of an object that can create instances of some connector type, and perform a few
 * housekeeping tasks on connector's of that type.
 */
export interface ConnectorHandler {
    importGeometry(connector: ConnectorBase, g: Geometry): boolean;
    transformGeometry(connector: ConnectorBase, g: Geometry, dx: number, dy: number): Geometry;
    _compute(connector: ConnectorBase, geometry: PaintGeometry, params: ConnectorComputeParams): void;
    create(connection: Connection, connectorType: string, params: any): ConnectorBase;
    exportGeometry(connector: ConnectorBase): Geometry;
    setAnchorOrientation(connector: ConnectorBase, idx: number, orientation: number[]): void;
}
/**
 * Provides a few default methods for working with connectors. You only need to interact with this object
 * if you're writing your own connector and you want to use on of the default methods it provides.
 * @public
 */
export declare const defaultConnectorHandler: {
    /**
     * Sets geometry on a connector
     * @param connector
     */
    exportGeometry(connector: ConnectorBase): Geometry;
    /**
     * Import geometry to a connector and mark it 'edited'
     * @param connector
     * @param g
     */
    importGeometry(connector: ConnectorBase, g: Geometry): boolean;
};
/**
 * Utilities for registering and working with Connectors
 * @public
 */
export declare const Connectors: {
    /**
     * Register a connector handler. If you write your own Connector type you need to register it using this method.
     * @param connectorType
     * @param connectorHandler
     * @public
     */
    register: (connectorType: string, connectorHandler: ConnectorHandler) => void;
    /**
     * Get a handler for the given connector type
     * @internal
     * @param connectorType
     */
    get: (connectorType: string) => ConnectorHandler;
    /**
     * Export the given connector's geometry, via the associated handler.
     * @param connector
     * @internal
     */
    exportGeometry(connector: ConnectorBase): any;
    /**
     * Import geometry into the given connector, via the associated handler
     * @param connector
     * @param g
     * @internal
     */
    importGeometry(connector: ConnectorBase, g: Geometry): any;
    /**
     * Transform geometry for the given connector, via the associated handler
     * @param connector
     * @param g
     * @param dx
     * @param dy
     * @internal
     */
    transformGeometry(connector: ConnectorBase, g: Geometry, dx: number, dy: number): any;
    /**
     * Prepare a connector using the given name and args.
     * @internal
     * @param connection
     * @param name
     * @param args
     */
    create(connection: Connection<any>, name: string, args: any): ConnectorBase;
    setAnchorOrientation(connector: ConnectorBase, idx: number, orientation: number[]): void;
};
//# sourceMappingURL=connectors.d.ts.map