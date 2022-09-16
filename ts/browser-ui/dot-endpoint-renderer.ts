import {registerEndpointRenderer} from "./browser-jsplumb-instance"
import { _attr, _node } from './svg-util'
import {DotEndpoint, TYPE_ENDPOINT_DOT} from '@jsplumb/core'
import { PaintStyle } from "@jsplumb/common"

const CIRCLE = "circle"

export const register = () => {

    registerEndpointRenderer<DotEndpoint>(TYPE_ENDPOINT_DOT, {

        makeNode: (ep: DotEndpoint, style: PaintStyle) => {
            return _node(CIRCLE, {
                "cx": ep.w / 2,
                "cy": ep.h / 2,
                "r": ep.radius
            })
        },

        updateNode: (ep: DotEndpoint, node: SVGElement) => {
            _attr(node, {
                "cx": "" + (ep.w / 2),
                "cy": "" + (ep.h / 2),
                "r": "" + ep.radius
            })
        }
    })
}
