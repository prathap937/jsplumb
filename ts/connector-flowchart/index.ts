/**
 * This package contains the Flowchart connector. Prior to version 5.x this connector was shipped
 * along with the core.
 *
 * @packageDocumentation
 */

import {Connectors} from "@jsplumb/core"
import {CONNECTOR_TYPE_FLOWCHART, FlowchartConnectorHandler} from "./flowchart-connector"

export * from "./flowchart-connector"

Connectors.register(CONNECTOR_TYPE_FLOWCHART, FlowchartConnectorHandler)
