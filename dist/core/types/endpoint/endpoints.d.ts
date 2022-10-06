import { DeleteConnectionOptions, JsPlumbInstance } from "../core";
import { LightweightAnchor, Orientation } from "../factory/anchor-record-factory";
import { Endpoint } from "./endpoint";
import { Extents } from '@jsplumb/util';
import { AnchorPlacement, AnchorSpec, EndpointRepresentationParams, EndpointSpec } from "@jsplumb/common";
import { Connection } from '../connector/declarations';
export declare const TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION = "endpoint-representation";
export interface EndpointHandler<EndpointClass, T> {
    type: string;
    compute: EndpointComputeFunction<T>;
    getParams(endpoint: EndpointClass): Record<string, any>;
    create(endpoint: Endpoint, params?: EndpointRepresentationParams): EndpointClass;
}
export declare type EndpointComputeFunction<T> = (endpoint: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any) => T;
/**
 * Base interface for all types of Endpoint representation.
 */
export interface EndpointRepresentation<C> {
    typeId: string;
    x: number;
    y: number;
    w: number;
    h: number;
    computedValue: C;
    bounds: Extents;
    classes: Array<string>;
    instance: JsPlumbInstance;
    canvas: any;
    type: string;
    endpoint: Endpoint;
    typeDescriptor: typeof TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION;
}
export declare function isEndpointRepresentation(ep: any): ep is EndpointRepresentation<any>;
export declare function createBaseRepresentation(type: string, endpoint: Endpoint, params?: EndpointRepresentationParams): EndpointRepresentation<any>;
export declare const TYPE_DESCRIPTOR_ENDPOINT = "endpoint";
/**
 * Factory + helper methods for Endpoints.
 * @public
 */
export declare const Endpoints: {
    applyType(endpoint: Endpoint, t: any, typeMap: any): void;
    destroy(endpoint: Endpoint): void;
    /**
     * Sets the visible state of the given Endpoint.
     * @public
     * @param endpoint
     * @param v
     * @param doNotChangeConnections
     * @param doNotNotifyOtherEndpoint
     */
    setVisible(endpoint: Endpoint, v: boolean, doNotChangeConnections?: boolean, doNotNotifyOtherEndpoint?: boolean): void;
    /**
     * Adds a class to the given Endpoint.
     * @param endpoint
     * @param clazz
     * @param cascade
     */
    addClass(endpoint: Endpoint, clazz: string, cascade?: boolean): void;
    /**
     * Removes a class from the given Endpoint.
     * @param endpoint
     * @param clazz
     * @param cascade
     */
    removeClass(endpoint: Endpoint, clazz: string, cascade?: boolean): void;
    /**
     * @internal
     * @param endpoint
     * @param anchor
     */
    _setPreparedAnchor(endpoint: Endpoint, anchor: LightweightAnchor): Endpoint;
    /**
     *
     * @param endpoint
     * @internal
     */
    _updateAnchorClass(endpoint: Endpoint): void;
    /**
     * Called by the router when a dynamic anchor has changed its current location.
     * @param currentAnchor
     * @internal
     */
    _anchorLocationChanged(endpoint: Endpoint, currentAnchor: LightweightAnchor): void;
    /**
     * Sets the anchor for the given endpoint.
     * @param endpoint
     * @param anchorParams
     * @public
     */
    setAnchor(endpoint: Endpoint, anchorParams: AnchorSpec | Array<AnchorSpec>): Endpoint;
    /**
     * Adds a connection to the given endpoint. This method is internal and should not be called by users of the API, as
     * just calling this method alone will not ensure the connection is appropriately registered throughout the
     * jsPlumb instance.
     * @internal
     * @param endpoint
     * @param conn
     */
    _addConnection(endpoint: Endpoint, conn: Connection): void;
    /**
     * Deletes every connection attached to the given endpoint.
     * @public
     * @param endpoint
     * @param params
     */
    deleteEveryConnection(endpoint: Endpoint, params?: DeleteConnectionOptions): void;
    /**
     * Removes all connections from `endpoint` to `otherEndpoint`.
     * @param endpoint
     * @param otherEndpoint
     * @public
     */
    detachFrom(endpoint: Endpoint, otherEndpoint: Endpoint): Endpoint;
    /**
     * Detaches this Endpoint from the given Connection.  If `deleteOnEmpty` is set to true and there are no
     * Connections after this one is detached, the Endpoint is deleted.
     * @param connection Connection from which to detach.
     * @param idx Optional, used internally to identify if this is the source (0) or target endpoint (1). Sometimes we already know this when we call this method.
     * @param _transientDetach For internal use only.
     * @public
     */
    detachFromConnection(endpoint: Endpoint, connection: Connection, idx?: number, _transientDetach?: boolean): void;
    /**
     * Returns whether or not the given endpoint is currently full.
     * @public
     * @param endpoint
     */
    isFull(endpoint: Endpoint): boolean;
    /**
     * @internal
     * @param endpoint
     * @private
     */
    _isFloating(endpoint: Endpoint): boolean;
    /**
     * Test if two endpoints are connected
     * @param otherEndpoint
     * @public
     */
    areConnected(endpoint: Endpoint, otherEndpoint: Endpoint): boolean;
    /**
     * Returns whether or not the given object is an Endpoint.
     * @param component
     * @internal
     */
    _isEndpoint(component: any): component is Endpoint;
    /**
     * @internal
     * @param endpoint
     * @param ep
     */
    _setEndpoint<C>(endpoint: Endpoint, ep: EndpointSpec | EndpointRepresentation<C>): void;
    /**
     * @internal
     * @param endpoint
     * @param ep
     */
    _setPreparedEndpoint<C_1>(endpoint: Endpoint, ep: EndpointRepresentation<C_1>): void;
    /**
     * @internal
     * @param epr
     */
    /**
     * @internal
     * @param ep
     * @param anchorPoint
     * @param orientation
     * @param endpointStyle
     */
    _compute<T, ElementType>(ep: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any): void;
    /**
     * @internal
     * @param eph
     */
    _registerHandler<E, T_1>(eph: EndpointHandler<E, T_1>): void;
    /**
     * @internal
     * @param endpoint
     */
    _refreshEndpointClasses(endpoint: Endpoint): void;
};
//# sourceMappingURL=endpoints.d.ts.map