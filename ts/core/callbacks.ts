import { Endpoint } from "./endpoint/endpoint"
import { Connection } from "./connector/declarations"

/**
 * Definition of the parameters passed to a listener for the `connection` event.
 * @public
 */
export interface ConnectionEstablishedParams<E = any> {
    connection:Connection
    source:E
    sourceEndpoint:Endpoint
    sourceId:string
    target:E
    targetEndpoint:Endpoint
    targetId:string
}

/**
 * Definition of the parameters passed to a listener for the `connection:detach` event.
 * @public
 */
export interface ConnectionDetachedParams<E = any> extends ConnectionEstablishedParams<E> { }

/**
 * Definition of the parameters passed to a listener for the `connection:move` event.
 * @public
 */
export interface ConnectionMovedParams<E = any>  {
    connection:Connection<E>
    index:number
    originalSourceId:string
    newSourceId:string
    originalTargetId:string
    newTargetId:string
    originalEndpoint:Endpoint
    newEndpoint:Endpoint
}

/**
 * Definition of the parameters passed to the `beforeDrop` interceptor.
 * @public
 */
export interface BeforeDropParams {
    sourceId: string
    targetId: string
    scope: string
    connection: Connection
    dropEndpoint: Endpoint
}

/**
 * Payload for an element managed event
 * @public
 */
export interface ManageElementParams<E = any> {
    el:E
}

/**
 * Payload for an element unmanaged event.
 * @public
 */
export interface UnmanageElementParams<E = any> {
    el:E
}
