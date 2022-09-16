import {createBaseRepresentation, EndpointRepresentation} from "./endpoints"
import {Orientation} from "../factory/anchor-record-factory"
import {Endpoint} from "./endpoint"
import {EndpointHandler} from "../factory/endpoint-factory"
import {AnchorPlacement, RectangleEndpointParams} from "@jsplumb/common"
import {extend} from "@jsplumb/util"

export type ComputedRectangleEndpoint = [ number, number, number, number ]
export const TYPE_ENDPOINT_RECTANGLE = "Rectangle"

export interface RectangleEndpoint extends EndpointRepresentation<ComputedRectangleEndpoint> {

    width:number
    height:number
}

export const RectangleEndpointHandler:EndpointHandler<RectangleEndpoint, ComputedRectangleEndpoint> = {

    type:TYPE_ENDPOINT_RECTANGLE,

    create(endpoint:Endpoint, params?:RectangleEndpointParams):RectangleEndpoint {
        const base = createBaseRepresentation(TYPE_ENDPOINT_RECTANGLE, endpoint, params)
        return extend(base as any, {
            type:TYPE_ENDPOINT_RECTANGLE,
            width:params.width || 10,
            height:params.height || 10
        }) as RectangleEndpoint
    },

    compute:(ep:RectangleEndpoint, anchorPoint:AnchorPlacement, orientation:Orientation, endpointStyle:any):ComputedRectangleEndpoint => {
        let width = endpointStyle.width || ep.width,
            height = endpointStyle.height || ep.height,
            x = anchorPoint.curX - (width / 2),
            y = anchorPoint.curY - (height / 2)

        ep.x = x
        ep.y = y
        ep.w = width
        ep.h = height

        return [ x, y, width, height]
    },

    getParams:(ep:RectangleEndpoint):Record<string, any> => {
        return {
            width: ep.width,
            height:ep.height
        }
    }
}


