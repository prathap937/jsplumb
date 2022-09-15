import {
    _addSegment,
    ConnectorBase,
    ConnectorComputeParams,
    PaintGeometry,
    transformAnchorPlacement
} from "./abstract-connector"
import {SEGMENT_TYPE_STRAIGHT} from "./straight-segment"
import {AnchorPlacement, Geometry} from "@jsplumb/common"
import {ConnectorHandler, Connectors, defaultConnectorHandler} from "./connectors"
import {Connection } from './connection-impl'
import {createConnectorBase} from "./abstract-connector"
import {extend} from "@jsplumb/util"

export interface StraightConnectorGeometry {
    source:AnchorPlacement
    target:AnchorPlacement
}

export const CONNECTOR_TYPE_STRAIGHT = "Straight"

export interface StraightConnector extends ConnectorBase {
    type:typeof CONNECTOR_TYPE_STRAIGHT
}

const StraightConnectorHandler:ConnectorHandler = {
    _compute(connector: ConnectorBase, paintInfo: PaintGeometry, p: ConnectorComputeParams): void {
        _addSegment(connector, SEGMENT_TYPE_STRAIGHT, {x1: paintInfo.sx, y1: paintInfo.sy, x2: paintInfo.startStubX, y2: paintInfo.startStubY})
        _addSegment(connector, SEGMENT_TYPE_STRAIGHT, {x1: paintInfo.startStubX, y1: paintInfo.startStubY, x2: paintInfo.endStubX, y2: paintInfo.endStubY})
        _addSegment(connector, SEGMENT_TYPE_STRAIGHT, {x1: paintInfo.endStubX, y1: paintInfo.endStubY, x2: paintInfo.tx, y2: paintInfo.ty})

        connector.geometry = {source:p.sourcePos, target:p.targetPos}
    },
    create(connection:Connection, connectorType: string, params: any): StraightConnector {

        const base = createConnectorBase(connectorType, connection, params, [0,0])
        return extend(base as any, {
            type:CONNECTOR_TYPE_STRAIGHT
        }) as StraightConnector

    },
    exportGeometry(connector: ConnectorBase): StraightConnectorGeometry {
        return defaultConnectorHandler.exportGeometry(connector)
    },
    importGeometry(connector: ConnectorBase, g: StraightConnectorGeometry): boolean {
        return defaultConnectorHandler.importGeometry(connector, g)
    },
    transformGeometry(connector: ConnectorBase, g: StraightConnectorGeometry, dx: number, dy: number): StraightConnectorGeometry {
        return {
            source:transformAnchorPlacement(g.source, dx, dy),
            target:transformAnchorPlacement(g.target, dx, dy)
        }
    },
    setAnchorOrientation(connector:ConnectorBase, idx:number, orientation:number[]):void { }

}

Connectors.register(CONNECTOR_TYPE_STRAIGHT, StraightConnectorHandler)


