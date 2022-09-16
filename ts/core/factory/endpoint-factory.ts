import {EndpointRepresentation} from "../endpoint/endpoints"
import {Endpoint} from "../endpoint/endpoint"
import {Orientation} from "../factory/anchor-record-factory"
import {log} from "@jsplumb/util"
import {AnchorPlacement, EndpointRepresentationParams} from "@jsplumb/common"

const endpointComputers:Record<string, EndpointComputeFunction<any>> = {}
const handlers:Record<string, EndpointHandler<any, any>> = {}

export type EndpointComputeFunction<T> = (endpoint:EndpointRepresentation<T>, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any) => T

export const EndpointFactory = {
    get:(ep:Endpoint, name:string, params:any):EndpointRepresentation<any> => {

        let e:EndpointHandler<any, any> = handlers[name]
        if (!e) {
            throw {message:"jsPlumb: unknown endpoint type '" + name + "'"}
        } else {
            return e.create(ep, params) as EndpointRepresentation<any>
        }
    },

    clone:<C, ElementType>(epr:EndpointRepresentation<C>):EndpointRepresentation<C> => {
        const handler = handlers[epr.type]
        return EndpointFactory.get(epr.endpoint, epr.type, handler.getParams(epr))
    },

    compute:<T, ElementType>(endpoint:EndpointRepresentation<T>, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any):T => {
      const c = endpointComputers[endpoint.type]
      if (c != null) {
          return c(endpoint, anchorPoint, orientation, endpointStyle)
      } else {
          log("jsPlumb: cannot find endpoint calculator for endpoint of type ", endpoint.type)
      }
    },

    registerHandler:<E,T>(eph:EndpointHandler<E, T>) => {
        handlers[eph.type] = eph
        endpointComputers[eph.type] = eph.compute
    }
}

export interface EndpointHandler<EndpointClass, T> {
    type:string
    compute:EndpointComputeFunction<T>
    getParams(endpoint:EndpointClass):Record<string, any>
    create(endpoint:Endpoint, params?:EndpointRepresentationParams):EndpointClass
}
