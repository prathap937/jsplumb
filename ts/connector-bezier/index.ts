/**
 * This package contains the Bezier and StateMachine connectors. Prior to version 5.x these connectors were shipped
 * along with the core.
 *
 * @packageDocumentation
 */

import {
    CONNECTOR_TYPE_QUADRATIC_BEZIER,
    CONNECTOR_TYPE_STATE_MACHINE,
    StateMachineConnectorHandler
} from "./statemachine-connector"
import {Connectors} from "@jsplumb/core"
import {BezierConnectorHandler, CONNECTOR_TYPE_BEZIER, CONNECTOR_TYPE_CUBIC_BEZIER} from "./bezier-connector"

export * from "./bezier"
export * from "./bezier-segment"
export * from "./abstract-bezier-connector"
export * from "./bezier-connector"
export * from "./statemachine-connector"

Connectors.register(CONNECTOR_TYPE_STATE_MACHINE, StateMachineConnectorHandler)
Connectors.register(CONNECTOR_TYPE_QUADRATIC_BEZIER, StateMachineConnectorHandler)
Connectors.register(CONNECTOR_TYPE_BEZIER, BezierConnectorHandler)
Connectors.register(CONNECTOR_TYPE_CUBIC_BEZIER, BezierConnectorHandler)
