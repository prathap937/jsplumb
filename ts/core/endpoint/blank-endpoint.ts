import {createBaseRepresentation, EndpointRepresentation} from "./endpoints"
import {Orientation} from "../factory/anchor-record-factory"
import {Endpoint} from "./endpoint"
import {EndpointHandler} from "../factory/endpoint-factory"
import {AnchorPlacement, BlankEndpointParams} from "@jsplumb/common"
import {extend} from "@jsplumb/util"

export type ComputedBlankEndpoint = [ number, number, number, number  ]

export const TYPE_ENDPOINT_BLANK = "Blank"

export interface BlankEndpoint extends EndpointRepresentation<ComputedBlankEndpoint> { }

export const BlankEndpointHandler:EndpointHandler<BlankEndpoint, ComputedBlankEndpoint> = {

    type:TYPE_ENDPOINT_BLANK,

    create(endpoint:Endpoint, params?:BlankEndpointParams):BlankEndpoint{
        const base = createBaseRepresentation(TYPE_ENDPOINT_BLANK, endpoint, params)
        return extend(base as any, {type:TYPE_ENDPOINT_BLANK}) as BlankEndpoint
    },

    compute:(ep:BlankEndpoint, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any):ComputedBlankEndpoint => {
        ep.x = anchorPoint.curX
        ep.y = anchorPoint.curY
        ep.w = 10
        ep.h = 0
        return [anchorPoint.curX, anchorPoint.curY, 10, 0]
    },

    getParams:(ep:BlankEndpoint): Record<string, any> => {
        return { }
    }
}




