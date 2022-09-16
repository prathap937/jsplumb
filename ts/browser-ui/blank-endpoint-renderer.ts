import {registerEndpointRenderer} from "./browser-jsplumb-instance"
import { _attr, _node, ElementAttributes } from './svg-util'

import {BlankEndpoint, TYPE_ENDPOINT_BLANK} from "@jsplumb/core"
import { PaintStyle } from "@jsplumb/common"

const BLANK_ATTRIBUTES:ElementAttributes = {
    "width": 10,
    "height": 0,
    "fill":"transparent",
    "stroke":"transparent"
}

export const register = () => {

    registerEndpointRenderer<BlankEndpoint>(TYPE_ENDPOINT_BLANK, {
        makeNode: (ep: BlankEndpoint, style: PaintStyle) => {
            return _node("rect", BLANK_ATTRIBUTES)
        },

        updateNode: (ep: BlankEndpoint, node: SVGElement) => {
            _attr(node, BLANK_ATTRIBUTES)
        }
    })

}
