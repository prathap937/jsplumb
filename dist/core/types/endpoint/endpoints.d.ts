import { DeleteConnectionOptions, JsPlumbInstance } from "../core";
import { LightweightAnchor, Orientation } from "../factory/anchor-record-factory";
import { Endpoint } from "./endpoint";
import { Extents } from '@jsplumb/util';
import { AnchorPlacement, AnchorSpec, EndpointRepresentationParams, EndpointSpec } from "@jsplumb/common";
import { Connection } from '../connector/declarations';
export declare const TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION = "endpoint-representation";
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
export declare const Endpoints: {
    applyType(endpoint: Endpoint, t: any, typeMap: any): void;
    destroy(endpoint: Endpoint): void;
    setVisible(endpoint: Endpoint, v: boolean, doNotChangeConnections?: boolean, doNotNotifyOtherEndpoint?: boolean): void;
    addClass(endpoint: Endpoint, clazz: string, cascade?: boolean): void;
    removeClass(endpoint: Endpoint, clazz: string, cascade?: boolean): void;
    _setPreparedAnchor(endpoint: Endpoint, anchor: LightweightAnchor): Endpoint;
    _updateAnchorClass(endpoint: Endpoint): void;
    /**
     * Called by the router when a dynamic anchor has changed its current location.
     * @param currentAnchor
     */
    _anchorLocationChanged(endpoint: Endpoint, currentAnchor: LightweightAnchor): void;
    setAnchor(endpoint: Endpoint, anchorParams: AnchorSpec | Array<AnchorSpec>): Endpoint;
    addConnection(endpoint: Endpoint, conn: Connection): void;
    deleteEveryConnection(endpoint: Endpoint, params?: DeleteConnectionOptions): void;
    /**
 * Removes all connections from this endpoint to the given other endpoint.
 * @param otherEndpoint
 */
    detachFrom(endpoint: Endpoint, otherEndpoint: Endpoint): Endpoint;
    /**
 * Detaches this Endpoint from the given Connection.  If `deleteOnEmpty` is set to true and there are no
 * Connections after this one is detached, the Endpoint is deleted.
 * @param connection Connection from which to detach.
 * @param idx Optional, used internally to identify if this is the source (0) or target endpoint (1). Sometimes we already know this when we call this method.
 * @param transientDetach For internal use only.
 */
    detachFromConnection(endpoint: Endpoint, connection: Connection, idx?: number, transientDetach?: boolean): void;
    isFull(endpoint: Endpoint): boolean;
    isFloating(endpoint: Endpoint): boolean;
    /**
     * Test if this Endpoint is connected to the given Endpoint.
     * @param otherEndpoint
     */
    isConnectedTo(endpoint: Endpoint, otherEndpoint: Endpoint): boolean;
    isEndpoint(component: any): component is Endpoint;
    prepareEndpoint<C>(endpoint: Endpoint, ep: EndpointSpec | EndpointRepresentation<C>, typeId?: string): EndpointRepresentation<C>;
    setEndpoint<C_1>(endpoint: Endpoint, ep: EndpointSpec | EndpointRepresentation<C_1>): void;
    setPreparedEndpoint<C_2>(endpoint: Endpoint, ep: EndpointRepresentation<C_2>): void;
    compute(ep: EndpointRepresentation<any>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any): void;
};
//# sourceMappingURL=endpoints.d.ts.map