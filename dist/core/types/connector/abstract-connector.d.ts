import { PointXY, Extents } from "@jsplumb/util";
import { Connection } from './declarations';
import { Orientation } from '../factory/anchor-record-factory';
import { Endpoint } from '../endpoint/endpoint';
import { ViewportElement } from "../viewport";
import { AnchorPlacement, ConnectorOptions, PaintAxis, Segment, Connector, Geometry, SegmentParams } from "@jsplumb/common";
/**
 * @internal
 */
declare type SegmentForPoint = {
    d: number;
    s: Segment;
    x: number;
    y: number;
    l: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    index: number;
    connectorLocation: number;
};
export declare type ConnectorComputeParams = {
    sourcePos: AnchorPlacement;
    targetPos: AnchorPlacement;
    sourceEndpoint: Endpoint;
    targetEndpoint: Endpoint;
    strokeWidth: number;
    sourceInfo: ViewportElement<any>;
    targetInfo: ViewportElement<any>;
};
/**
 * @internal
 */
export interface PaintGeometry {
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    xSpan: number;
    ySpan: number;
    mx: number;
    my: number;
    so: Orientation;
    to: Orientation;
    x: number;
    y: number;
    w: number;
    h: number;
    segment: number;
    startStubX: number;
    startStubY: number;
    endStubX: number;
    endStubY: number;
    isXGreaterThanStubTimes2: boolean;
    isYGreaterThanStubTimes2: boolean;
    opposite: boolean;
    perpendicular: boolean;
    orthogonal: boolean;
    sourceAxis: PaintAxis;
    points: [number, number, number, number, number, number, number, number];
    stubs: [number, number];
    anchorOrientation?: string;
}
/**
 * Transform the given anchor placement by dx,dy
 * @internal
 * @param a
 * @param dx
 * @param dy
 */
export declare function transformAnchorPlacement(a: AnchorPlacement, dx: number, dy: number): AnchorPlacement;
/**
 * Function: findSegmentForPoint
 * Returns the segment that is closest to the given [x,y],
 * null if nothing found.  This function returns a JS
 * object with:
 *
 *   d   -   distance from segment
 *   l   -   proportional location in segment
 *   x   -   x point on the segment
 *   y   -   y point on the segment
 *   s   -   the segment itself.
 */
export declare function findSegmentForPoint(connector: ConnectorBase, x: number, y: number): SegmentForPoint;
export declare function lineIntersection(connector: ConnectorBase, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
export declare function connectorBoxIntersection(connector: ConnectorBase, x: number, y: number, w: number, h: number): Array<PointXY>;
export declare function connectorBoundingBoxIntersection(connector: ConnectorBase, box: any): Array<PointXY>;
/**
 * returns [segment, proportion of travel in segment, segment index] for the segment
 * that contains the point which is 'location' distance along the entire path, where
 * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
 * are made up of a list of segments, each of which contributes some fraction to
 * the total length.
 * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
 * as the absolute distance in pixels, rather than a proportion of the total path.
 */
export declare function _findSegmentForLocation(connector: ConnectorBase, location: number, absolute?: boolean): {
    segment: Segment;
    proportion: number;
    index: number;
};
export declare function pointOnComponentPath(connector: ConnectorBase, location: number, absolute?: boolean): PointXY;
export declare function gradientAtComponentPoint(connector: ConnectorBase, location: number, absolute?: boolean): number;
export declare function pointAlongComponentPathFrom(connector: ConnectorBase, location: number, distance: number, absolute?: boolean): PointXY;
export declare function _updateSegmentProportions(connector: ConnectorBase): void;
export declare function updateBounds(connector: ConnectorBase, segment: Segment): void;
export declare function _addSegment<T extends SegmentParams>(connector: ConnectorBase, segmentType: string, params: T): void;
export declare function _clearSegments(connector: ConnectorBase): void;
export declare function resetBounds(connector: ConnectorBase): void;
export declare function resetGeometry(connector: ConnectorBase): void;
export declare function compute(connector: ConnectorBase, params: ConnectorComputeParams): void;
export declare function dumpSegmentsToConsole(connector: ConnectorBase): void;
/**
 * Sets the geometry on some connector, and the `edited` flag if appropriate.
 * @param connector
 * @param g
 * @param internal
 */
export declare function setGeometry(connector: ConnectorBase, g: Geometry, internal: boolean): void;
/**
 * Base interface for connectors. In connector implementations, use createConnectorBase(..) to get
 * one of these and then extend your concrete implementation into it.
 * @internal
 */
export interface ConnectorBase extends Connector {
    edited: boolean;
    connection: Connection;
    stub: number | number[];
    sourceStub: number;
    targetStub: number;
    maxStub: number;
    typeId: string;
    gap: number;
    sourceGap: number;
    targetGap: number;
    segments: Array<Segment>;
    totalLength: number;
    segmentProportions: Array<[number, number]>;
    segmentProportionalLengths: Array<number>;
    paintInfo: PaintGeometry;
    strokeWidth: number;
    x: number;
    y: number;
    w: number;
    h: number;
    segment: number;
    bounds: Extents;
    cssClass: string;
    hoverClass: string;
    geometry: Geometry;
    getTypeDescriptor(): string;
    getIdPrefix(): string;
}
export declare const TYPE_DESCRIPTOR_CONNECTOR = "connector";
/**
 * factory method to create a ConnectorBase
 */
export declare function createConnectorBase(type: string, connection: Connection, params: ConnectorOptions, defaultStubs: [number, number]): ConnectorBase;
export {};
//# sourceMappingURL=abstract-connector.d.ts.map