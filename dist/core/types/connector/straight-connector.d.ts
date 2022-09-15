import { ConnectorBase } from "./abstract-connector";
import { AnchorPlacement } from "@jsplumb/common";
export interface StraightConnectorGeometry {
    source: AnchorPlacement;
    target: AnchorPlacement;
}
export declare const CONNECTOR_TYPE_STRAIGHT = "Straight";
export interface StraightConnector extends ConnectorBase {
    type: typeof CONNECTOR_TYPE_STRAIGHT;
}
//# sourceMappingURL=straight-connector.d.ts.map