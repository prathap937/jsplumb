import {createBaseRepresentation, EndpointRepresentation, EndpointHandler, Endpoints} from "./endpoints"
import {Orientation} from "../factory/anchor-record-factory"
import {Endpoint} from "./endpoint"
import {AnchorPlacement, DotEndpointParams} from "@jsplumb/common"
import {extend} from "@jsplumb/util"

export type ComputedDotEndpoint = [ number, number, number, number, number ]

export const TYPE_ENDPOINT_DOT = "Dot"

export interface DotEndpoint extends EndpointRepresentation<ComputedDotEndpoint> {
    radius:number
    defaultOffset:number
    defaultInnerRadius:number
}

export const DotEndpointHandler:EndpointHandler<DotEndpoint, ComputedDotEndpoint> = {

    type:TYPE_ENDPOINT_DOT,

    create(endpoint:Endpoint, params?:DotEndpointParams):DotEndpoint {
        const base = createBaseRepresentation(TYPE_ENDPOINT_DOT, endpoint, params)
        const radius = params.radius || 5
        return extend(base as any, {
            type:TYPE_ENDPOINT_DOT,
            radius,
            defaultOffset :0.5 * radius,
            defaultInnerRadius : radius / 3
        }) as DotEndpoint
    },

    compute(ep:DotEndpoint, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any):ComputedDotEndpoint {
        let x = anchorPoint.curX - ep.radius,
            y = anchorPoint.curY - ep.radius,
            w = ep.radius * 2,
            h = ep.radius * 2

        if (endpointStyle && endpointStyle.stroke) {
            let lw = endpointStyle.strokeWidth || 1
            x -= lw
            y -= lw
            w += (lw * 2)
            h += (lw * 2)
        }

        ep.x = x
        ep.y = y
        ep.w = w
        ep.h = h

        return [ x, y, w, h, ep.radius ]
    },

    getParams:(ep:DotEndpoint): Record<string, any> => {
        return { radius: ep.radius }
    }
}

Endpoints._registerHandler(DotEndpointHandler)
