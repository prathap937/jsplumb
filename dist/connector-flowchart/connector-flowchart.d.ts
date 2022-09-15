/**
 * This package contains the Flowchart connector. Prior to version 5.x this connector was shipped
 * along with the core.
 *
 * @packageDocumentation
 */

import { ConnectorBase } from '@jsplumb/core';
import { ConnectorHandler } from '@jsplumb/core';
import { ConnectorOptions } from '@jsplumb/common';

export declare const CONNECTOR_TYPE_FLOWCHART = "Flowchart";

export declare interface FlowchartConnector extends ConnectorBase {
    type: typeof CONNECTOR_TYPE_FLOWCHART;
    internalSegments: Array<FlowchartSegment>;
    midpoint: number;
    alwaysRespectStubs: boolean;
    cornerRadius: number;
    lastx: number;
    lasty: number;
    loopbackRadius: number;
    isLoopbackCurrently: boolean;
}

/**
 * @internal
 */
export declare const FlowchartConnectorHandler: ConnectorHandler;

/**
 * Options for a flowchart connector
 * @public
 */
export declare interface FlowchartConnectorOptions extends ConnectorOptions {
    /**
     * Always paint stubs at the end of a connector, even if the elements are closer together than the length of the stubs.
     */
    alwaysRespectStubs?: boolean;
    /**
     * Optional midpoint to use for the connector, defaults to 0.5.
     */
    midpoint?: number;
    /**
     * Optional curvature between segments. Defaults to 0, ie. no curve.
     */
    cornerRadius?: number;
    /**
     * How large to make a connector whose source and target is the same element.
     */
    loopbackRadius?: number;
}

declare type FlowchartSegment = [number, number, number, number, string];

export { }
