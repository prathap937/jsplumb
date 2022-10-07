/**
 * This package is the core of the jsPlumb Community Edition.
 *
 *
 * @packageDocumentation
 */

import { AnchorPlacement } from '@jsplumb/common';
import { AnchorSpec } from '@jsplumb/common';
import { ArrowOverlayOptions } from '@jsplumb/common';
import { BoundingBox } from '@jsplumb/util';
import { Connector } from '@jsplumb/common';
import { ConnectorOptions } from '@jsplumb/common';
import { ConnectorSpec } from '@jsplumb/common';
import { EndpointRepresentationParams } from '@jsplumb/common';
import { EndpointSpec } from '@jsplumb/common';
import { EndpointStyle } from '@jsplumb/common';
import { EventGenerator } from '@jsplumb/util';
import { Extents } from '@jsplumb/util';
import { FullOverlaySpec } from '@jsplumb/common';
import { Geometry } from '@jsplumb/common';
import { Merge } from '@jsplumb/util';
import { OverlayOptions } from '@jsplumb/common';
import { OverlaySpec } from '@jsplumb/common';
import { PaintAxis } from '@jsplumb/common';
import { PaintStyle } from '@jsplumb/common';
import { PerimeterAnchorShapes } from '@jsplumb/common';
import { PointNearPath } from '@jsplumb/common';
import { PointXY } from '@jsplumb/util';
import { RotatedPointXY } from '@jsplumb/util';
import { Rotations } from '@jsplumb/util';
import { Segment } from '@jsplumb/common';
import { SegmentParams } from '@jsplumb/common';
import { Size } from '@jsplumb/util';

export declare const ABSOLUTE = "absolute";

export declare interface AbstractSelectOptions<E> {
    scope?: SelectionList;
    source?: ElementSelectionSpecifier<E>;
    target?: ElementSelectionSpecifier<E>;
}

export declare const ADD_CLASS_ACTION = "add";

export declare interface AddGroupOptions<E> extends GroupOptions {
    el: E;
    collapsed?: boolean;
}

export declare function _addSegment<T extends SegmentParams>(connector: ConnectorBase, segmentType: string, params: T): void;

/**
 * @internal
 */
export declare type AnchorComputeParams = {
    xy?: PointXY;
    wh?: Size;
    txy?: PointXY;
    twh?: Size;
    element?: Endpoint;
    timestamp?: string;
    index?: number;
    tElement?: Endpoint;
    connection?: Connection;
    elementId?: string;
    rotation?: Rotations;
    tRotation?: Rotations;
};

declare type AnchorListEntry = {
    theta: number;
    order: number;
    c: ConnectionFacade;
    b: boolean;
    elId: string;
    epId: string;
};

declare type AnchorLists = {
    top: Array<AnchorListEntry>;
    right: Array<AnchorListEntry>;
    bottom: Array<AnchorListEntry>;
    left: Array<AnchorListEntry>;
};

export declare type AnchorOrientationHint = -1 | 0 | 1;

/**
 * @internal
 */
export declare interface AnchorRecord {
    x: number;
    y: number;
    ox: AnchorOrientationHint;
    oy: AnchorOrientationHint;
    offx: number;
    offy: number;
    iox: AnchorOrientationHint;
    ioy: AnchorOrientationHint;
    cls: string;
}

/**
 * @internal
 */
export declare interface ArcSegment extends Segment {
    cx: number;
    cy: number;
    radius: number;
    anticlockwise: boolean;
    startAngle: number;
    endAngle: number;
    sweep: number;
    length: number;
    circumference: number;
    frac: number;
}

/**
 * @internal
 */
export declare interface ArcSegmentParams extends SegmentParams {
    cx: number;
    cy: number;
    r: number;
    ac: boolean;
    startAngle?: number;
    endAngle?: number;
}

export declare interface ArrowOverlay extends OverlayBase {
    width: number;
    length: number;
    foldback: number;
    direction: number;
    location: number;
    paintStyle: PaintStyle;
    cachedDimensions: Size;
}

export declare const ArrowOverlayHandler: OverlayHandler<ArrowOverlayOptions>;

export declare function att(...attName: Array<string>): string;

export declare const ATTRIBUTE_GROUP = "data-jtk-group";

export declare const ATTRIBUTE_MANAGED = "data-jtk-managed";

export declare const ATTRIBUTE_NOT_DRAGGABLE = "data-jtk-not-draggable";

export declare const ATTRIBUTE_SCOPE = "data-jtk-scope";

export declare const ATTRIBUTE_SCOPE_PREFIX: string;

export declare const ATTRIBUTE_TABINDEX = "tabindex";

export declare type Axis = [Face, Face];

/**
 * Defines the method signature for the callback to the `beforeDetach` interceptor. Returning false from this method
 * prevents the connection from being detached. The interceptor is fired by the core, meaning that it will be invoked
 * regardless of whether the detach occurred programmatically, or via the mouse.
 * @public
 */
export declare type BeforeDetachInterceptor = (c: Connection) => boolean;

/**
 * Defines the method signature for the callback to the `beforeDrag` interceptor. This method can return boolean `false` to
 * abort the connection drag, or it can return an object containing values that will be used as the `data` for the connection
 * that is created.
 * @public
 */
export declare type BeforeDragInterceptor<E = any> = (params: BeforeDragParams<E>) => boolean | Record<string, any>;

/**
 * The parameters passed to a `beforeDrag` interceptor.
 * @public
 */
export declare interface BeforeDragParams<E> {
    endpoint: Endpoint;
    source: E;
    sourceId: string;
    connection: Connection;
}

/**
 * Defines the method signature for the callback to the `beforeDrop` interceptor.
 * @public
 */
export declare type BeforeDropInterceptor = (params: BeforeDropParams) => boolean;

/**
 * Definition of the parameters passed to the `beforeDrop` interceptor.
 * @public
 */
export declare interface BeforeDropParams {
    sourceId: string;
    targetId: string;
    scope: string;
    connection: Connection;
    dropEndpoint: Endpoint;
}

/**
 * Defines the method signature for the callback to the `beforeStartDetach` interceptor.
 * @public
 */
export declare type BeforeStartDetachInterceptor<E = any> = (params: BeforeStartDetachParams<E>) => boolean;

/**
 * The parameters passed to a `beforeStartDetach` interceptor.
 * @public
 */
export declare interface BeforeStartDetachParams<E> extends BeforeDragParams<E> {
}

/**
 * Extends EndpointTypeDescriptor to add the options supported by an `addSourceSelector` or `addTargetSelector` call.
 * @public
 */
export declare interface BehaviouralTypeDescriptor<T = any> extends EndpointTypeDescriptor {
    /**
     * A function that can be used to extract a set of parameters pertinent to the connection that is being dragged
     * from a given source or dropped on a given target.
     * @param el - The element that is the drag source
     * @param eventTarget - The element that captured the event that started the connection drag.
     */
    parameterExtractor?: (el: T, eventTarget: T, event: Event) => Record<string, any>;
    /**
     * Optional policy for dropping existing connections that have been detached by their source/target.
     *
     * - 'strict' (`RedropPolicy.STRICT`) indicates that a connection can only be dropped back onto a part of
     * an element that matches the original source/target's selector.
     *
     * - 'any' (`RedropPolicy.ANY`) indicates that a connection can be dropped anywhere onto an element.
     *
     * - 'anySource' (`RedropPolicy.ANY_SOURCE`) indicates that a connection can be dropped onto any part of an element that
     * is configured as a source selector.
     *
     * - 'anyTarget' (`RedropPolicy.ANY_TARGET`) indicates that a connection can be dropped onto any part of an element that
     * is configured as a target selector.
     *
     * - 'anySourceOrTarget' (`RedropPolicy.ANY_SOURCE_OR_TARGET`) indicates that a connection can be dropped onto any part of an element that
     * is configured as a source selector or a target selector.
     */
    redrop?: RedropPolicy;
    /**
     * Optional function that is used to determine whether at the start of a drag, a given element is able to accept
     * new connections. For a source element returning false from here aborts the connection drag. For a target element
     * returning false from here means the target element is not active as a drop target.
     */
    canAcceptNewConnection?: (el: Element, e: Event) => boolean;
    /**
     * Optional set of values to extract from an element when a drag starts from that element. For target selectors this option is ignored.
     */
    extract?: Record<string, string>;
    /**
     * If true, only one endpoint will be created on any given element for this type descriptor, and subsequent connections will
     * all attach to that endpoint. Defaults to false.
     */
    uniqueEndpoint?: boolean;
    /**
     * Optional function to call if the user begins a new connection drag when the associated element is full.
     * @param value
     * @param event
     */
    onMaxConnections?: (value: any, event?: any) => any;
    /**
     * Optional type for connections dragged from a source selector. This option is ignored for target selectors.
     */
    edgeType?: string;
    /**
     * Optional logical id for the endpoint associated with a source or target selector.
     */
    portId?: string;
    /**
     * Defaults to true. If false, the user will not be permitted to drag a connection from the current node to itself.
     */
    allowLoopback?: boolean;
    /**
     * Optional rank for a given source or target selector. When selecting a selector from a list of candidates, rank can be used
     * to prioritise them. Higher values take precedence.
     */
    rank?: number;
    /**
     * Optional selector identifying the ancestor of the event target that could be the element to which connections
     * are added. By default this is the internal attribute jsPlumb uses to mark managed elements (data-jtk-managed)
     */
    parentSelector?: string;
    /**
     * This function offers a means for you to provide the anchor to use for
     * a new drag, or a drop. You're given the source/target element, the proportional location on
     * the element that the drag started/drop occurred, the associated type descriptor, and
     * the originating event.  Return null if you don't wish to provide a value,
     * and any other return value will be treated as an AnchorSpec.
     * @param el
     * @param elxy
     * @param def
     * @param e
     */
    anchorPositionFinder?: (el: Element, elxy: PointXY, def: BehaviouralTypeDescriptor, e: Event) => AnchorSpec | null;
    /**
     * Whether or not an endpoint created from this definition should subsequently
     * behave as a source for dragging connections with the mouse.
     */
    source?: boolean;
    /**
     * Whether or not an endpoint created from this definition should subsequently
     * behave as a target for dragging connections with the mouse.
     */
    target?: boolean;
}

export declare interface BlankEndpoint extends EndpointRepresentation<ComputedBlankEndpoint> {
}

export declare const BlankEndpointHandler: EndpointHandler<BlankEndpoint, ComputedBlankEndpoint>;

export declare const BLOCK = "block";

export declare const BOTTOM = FaceValues.bottom;

export declare const CHECK_CONDITION = "checkCondition";

export declare const CHECK_DROP_ALLOWED = "checkDropAllowed";

export declare const CLASS_CONNECTED = "jtk-connected";

export declare const CLASS_CONNECTOR = "jtk-connector";

export declare const CLASS_CONNECTOR_OUTLINE = "jtk-connector-outline";

export declare const CLASS_ENDPOINT = "jtk-endpoint";

export declare const CLASS_ENDPOINT_ANCHOR_PREFIX = "jtk-endpoint-anchor";

export declare const CLASS_ENDPOINT_CONNECTED = "jtk-endpoint-connected";

export declare const CLASS_ENDPOINT_DROP_ALLOWED = "jtk-endpoint-drop-allowed";

export declare const CLASS_ENDPOINT_DROP_FORBIDDEN = "jtk-endpoint-drop-forbidden";

export declare const CLASS_ENDPOINT_FLOATING = "jtk-floating-endpoint";

export declare const CLASS_ENDPOINT_FULL = "jtk-endpoint-full";

export declare const CLASS_GROUP_COLLAPSED = "jtk-group-collapsed";

export declare const CLASS_GROUP_EXPANDED = "jtk-group-expanded";

export declare const CLASS_OVERLAY = "jtk-overlay";

/**
 * @internal
 */
export declare type ClassAction = typeof ADD_CLASS_ACTION | typeof REMOVE_CLASS_ACTION;

export declare function classList(...className: Array<string>): string;

export declare function _clearSegments(connector: ConnectorBase): void;

export declare function cls(...className: Array<string>): string;

export declare interface Component {
    overlays: Record<string, OverlayBase>;
    overlayPositions: Record<string, PointXY>;
    overlayPlacements: Record<string, Extents>;
    instance: JsPlumbInstance;
    visible: boolean;
    cssClass: string;
    hoverClass: string;
    id: string;
    getDefaultOverlayKey(): string;
    getIdPrefix(): string;
    getXY(): PointXY;
    _typeDescriptor: string;
    _types: Set<string>;
    _typeCache: {};
    deleted: boolean;
    _hover: boolean;
    paintStyle: PaintStyle;
    hoverPaintStyle: PaintStyle;
    paintStyleInUse: PaintStyle;
    parameters: ComponentParameters;
    params: Record<string, any>;
    lastPaintedAt: string;
    data: Record<string, any>;
    _defaultType: ComponentTypeDescriptor;
    beforeDetach: BeforeDetachInterceptor;
    beforeDrop: BeforeDropInterceptor;
}

/**
 * @internal
 */
export declare interface ComponentOptions {
    parameters?: Record<string, any>;
    beforeDetach?: BeforeDetachInterceptor;
    beforeDrop?: BeforeDropInterceptor;
    hoverClass?: string;
    scope?: string;
    cssClass?: string;
    data?: any;
    id?: string;
    label?: string;
    labelLocation?: number;
    overlays?: Array<OverlaySpec>;
}

export declare type ComponentParameters = Record<string, any>;

export declare const Components: {
    applyType(component: Component, t: any, params?: any): void;
    applyBaseType(component: Component, t: any, params?: any): void;
    destroy(component: Component): void;
    /**
     * base method, called by subclasses.
     * @param component
     * @param v
     * @internal
     */
    _setComponentVisible(component: Component, v: boolean): void;
    setVisible(component: Component, v: boolean): void;
    /**
     * Adds a css class to the component
     * @param clazz Class to add. May be a space separated list.
     * @param cascade This is for subclasses to use, if they wish to. For instance, a Connection might want to optionally cascade a css class
     * down to its endpoints.
     * @public
     */
    addBaseClass(component: Component, clazz: string, cascade?: boolean): void;
    /**
     * Removes a css class from the component
     * @param clazz Class to remove. May be a space separated list.
     * @param cascade This is for subclasses to use, if they wish to. For instance, a Connection might want to optionally cascade a css class
     * removal down to its endpoints.
     * @public
     */
    removeBaseClass(component: Component, clazz: string, cascade?: boolean): void;
    addClass(component: Component, clazz: string, cascade?: boolean): void;
    removeClass(component: Component, clazz: string, cascade?: boolean): void;
    /**
     * Show all overlays, or a specific set of overlays.
     * @param ids optional list of ids to show.
     * @public
     */
    showOverlays(component: Component, ...ids: Array<string>): void;
    /**
     * Hide all overlays, or a specific set of overlays.
     * @param ids optional list of ids to hide.
     * @public
     */
    hideOverlays(component: Component, ...ids: Array<string>): void;
    setPaintStyle(component: Component, style: PaintStyle): void;
    /**
     * @internal
     */
    setHoverPaintStyle(component: Component, style: PaintStyle): void;
    mergeParameters(component: Component, p: ComponentParameters): void;
    /**
     * Add an overlay to the component.  This method is not intended for use by users of the API. You must `revalidate`
     * an associated element for this component if you call this method directly. Consider using the `addOverlay` method
     * of `JsPlumbInstance` instead, which adds the overlay and then revalidates.
     * @param overlay
     * @internal
     */
    addOverlay(component: Component, overlay: OverlaySpec): OverlayBase;
    /**
     * Get the Overlay with the given ID. You can optionally provide a type parameter for this method in order to get
     * a typed return value (such as `LabelOverlay`, `ArrowOverlay`, etc), since some overlays have methods that
     * others do not.
     * @param id ID of the overlay to retrieve.
     * @public
     */
    getOverlay<T extends OverlayBase>(component: Component, id: string): T;
    /**
     * Hide the overlay with the given id.
     * @param id
     * @public
     */
    hideOverlay(component: Component, id: string): void;
    /**
     * Show a specific overlay (set it to be visible)
     * @param id
     * @public
     */
    showOverlay(component: Component, id: string): void;
    /**
     * Remove all overlays from this component.
     * @public
     */
    removeAllOverlays(component: Component): void;
    /**
     * Remove the overlay with the given id.
     * @param overlayId
     * @param dontCleanup This is an internal parameter. You are not encouraged to provide a value for this.
     * @internal
     */
    removeOverlay(component: Component, overlayId: string, dontCleanup?: boolean): void;
    /**
     * Remove the given set of overlays, specified by their ids.
     * @param overlays
     * @public
     */
    removeOverlays(component: Component, ...overlays: string[]): void;
    /**
     * Return this component's label, if one is set.
     * @public
     */
    getLabel(component: Component): string;
    /**
     * @internal
     */
    getLabelOverlay(component: Component): LabelOverlay;
    /**
     * Set this component's label.
     * @param l Either some text, or a function which returns some text, or an existing label overlay.
     * @public
     */
    setLabel(component: Component, l: string | Function | LabelOverlay): void;
    /**
     * @internal
     */
    getDefaultType(component: Component): ComponentTypeDescriptor;
    /**
     * @internal
     */
    appendToDefaultType(component: Component, obj: Record<string, any>): void;
    /**
     * @internal
     */
    /**
     * @internal
     */
    cacheTypeItem(component: Component, key: string, item: any, typeId: string): void;
    /**
     * @internal
     */
    getCachedTypeItem(component: Component, key: string, typeId: string): any;
    /**
     * @internal
     */
    setType(component: Component, typeId: string, params?: any): void;
    /**
     * @internal
     */
    getType(component: Component): string[];
    /**
     * @internal
     */
    reapplyTypes(component: Component, params?: any): void;
    /**
     * @internal
     */
    hasType(component: Component, typeId: string): boolean;
    /**
     * @internal
     */
    addType(component: Component, typeId: string, params?: any): void;
    /**
     * @internal
     */
    removeType(component: Component, typeId: string, params?: any): void;
    /**
     * @internal
     */
    clearTypes(component: Component, params?: any): void;
    /**
     * @internal
     */
    toggleType(component: Component, typeId: string, params?: any): void;
    /**
     * Called internally when the user is trying to disconnect the given connection.
     * @internal
     * @param connection
     */
    isDetachAllowed(component: Component, connection: Connection): boolean;
    /**
     * @internal
     * @param sourceId
     * @param targetId
     * @param scope
     * @param connection
     * @param dropEndpoint
     */
    isDropAllowed(component: Component, sourceId: string, targetId: string, scope: string, connection: Connection, dropEndpoint: Endpoint): boolean;
    /**
     * Gets any backing data stored against the given component.
     * @public
     */
    getData(component: Component): Record<string, any>;
    /**
     * Sets backing data stored against the given component, overwriting any current value.
     * @param d
     * @public
     */
    setData(component: Component, d: any): void;
    /**
     * Merges the given backing data into any current backing data.
     * @param d
     * @public
     */
    mergeData(component: Component, d: any): void;
    setAbsoluteOverlayPosition(component: Component, overlay: OverlayBase, xy: PointXY): void;
    /**
     * @internal
     */
    getAbsoluteOverlayPosition(component: Component, overlay: OverlayBase): PointXY;
};

/**
 * Base interface for type descriptors for internal methods.
 * @internal
 */
export declare interface ComponentTypeDescriptor extends TypeDescriptorBase {
    overlays: Record<string, OverlaySpec>;
}

export declare function compute(connector: ConnectorBase, params: ConnectorComputeParams): void;

export declare type ComputedBlankEndpoint = [number, number, number, number];

export declare type ComputedDotEndpoint = [number, number, number, number, number];

/**
 * @internal
 */
export declare interface ComputedPosition {
    curX: number;
    curY: number;
    ox: AnchorOrientationHint;
    oy: AnchorOrientationHint;
    x: number;
    y: number;
}

export declare type ComputedRectangleEndpoint = [number, number, number, number];

/**
 * Definition of a connection between two elements.
 */
export declare interface Connection<E = any> extends Component {
    connector: ConnectorBase;
    defaultLabelLocation: number;
    scope: string;
    deleted: boolean;
    typeId: string;
    idPrefix: string;
    defaultOverlayKey: string;
    previousConnection: Connection<E>;
    /**
     * The id of the source of the connection
     * @public
     */
    sourceId: string;
    /**
     * The id of the target of the connection
     * @public
     */
    targetId: string;
    /**
     * The element that is the source of the connection
     * @public
     */
    source: E;
    /**
     * The element that is the target of the connection
     * @public
     */
    target: E;
    /**
     * Whether or not this connection is detachable
     * @public
     */
    detachable: boolean;
    /**
     * Whether or not this connection should be reattached if it were detached via the mouse
     * @public
     */
    reattach: boolean;
    /**
     * UUIDs of the endpoints. If this is not specifically provided in the constructor of the connection it will
     * be null.
     * @public
     */
    readonly uuids: [string, string];
    /**
     * Connection's cost.
     * @public
     */
    cost: number;
    /**
     * Whether or not the connection is directed.
     * @public
     */
    directed: boolean;
    /**
     * Source and target endpoints.
     * @public
     */
    endpoints: [Endpoint, Endpoint];
    endpointStyles: [PaintStyle, PaintStyle];
    readonly endpointSpec: EndpointSpec;
    readonly endpointsSpec: [EndpointSpec, EndpointSpec];
    endpointStyle: PaintStyle;
    endpointHoverStyle: PaintStyle;
    readonly endpointHoverStyles: [PaintStyle, PaintStyle];
    id: string;
    lastPaintedAt: string;
    paintStyleInUse: PaintStyle;
    /**
     * @internal
     */
    suspendedEndpoint: Endpoint;
    /**
     * @internal
     */
    suspendedIndex: number;
    /**
     * @internal
     */
    suspendedElement: E;
    /**
     * @internal
     */
    suspendedElementId: string;
    /**
     * @internal
     */
    suspendedElementType: string;
    /**
     * @internal
     */
    _forceReattach: boolean;
    /**
     * @internal
     */
    _forceDetach: boolean;
    /**
     * List of current proxies for this connection. Used when collapsing groups and when dealing with scrolling lists.
     * @internal
     */
    proxies: Array<{
        ep: Endpoint;
        originalEp: Endpoint;
    }>;
    /**
     * @internal
     */
    pending: boolean;
}

/**
 * Definition of the parameters passed to a listener for the `connection:detach` event.
 * @public
 */
export declare interface ConnectionDetachedParams<E = any> extends ConnectionEstablishedParams<E> {
}

export declare class ConnectionDragSelector {
    selector: string;
    def: SourceOrTargetDefinition;
    exclude: boolean;
    readonly id: string;
    redrop: RedropPolicy;
    constructor(selector: string, def: SourceOrTargetDefinition, exclude?: boolean);
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
}

/**
 * Definition of the parameters passed to a listener for the `connection` event.
 * @public
 */
export declare interface ConnectionEstablishedParams<E = any> {
    connection: Connection;
    source: E;
    sourceEndpoint: Endpoint;
    sourceId: string;
    target: E;
    targetEndpoint: Endpoint;
    targetId: string;
}

declare interface ConnectionFacade {
    endpoints: [Endpoint, Endpoint];
    placeholder?: boolean;
}

/**
 * Definition of the parameters passed to a listener for the `connection:move` event.
 * @public
 */
export declare interface ConnectionMovedParams<E = any> {
    connection: Connection<E>;
    index: number;
    originalSourceId: string;
    newSourceId: string;
    originalTargetId: string;
    newTargetId: string;
    originalEndpoint: Endpoint;
    newEndpoint: Endpoint;
}

/**
 * @internal
 */
export declare type ConnectionOptions<E = any> = Merge<ConnectParams<E>, {
    source?: E;
    target?: E;
    sourceEndpoint?: Endpoint;
    targetEndpoint?: Endpoint;
    previousConnection?: Connection;
    geometry?: any;
}>;

/**
 * Manager for operations on connections.
 * @internal
 */
export declare const Connections: {
    isReattach(connection: Connection, alsoCheckForced: boolean): boolean;
    isDetachable(connection: Connection, ep?: Endpoint): boolean;
    setDetachable(connection: Connection, detachable: boolean): void;
    setReattach(connection: Connection, reattach: boolean): void;
    prepareConnector(connection: Connection, connectorSpec: ConnectorSpec, typeId?: string): ConnectorBase;
    /**
     * @internal
     * @param connectorSpec
     * @param doNotRepaint
     * @param doNotChangeListenerComponent
     * @param typeId
     */
    setConnector(connection: Connection, connectorSpec: ConnectorSpec, doNotRepaint?: boolean, doNotChangeListenerComponent?: boolean, typeId?: string): void;
    getUuids(connection: Connection): [string, string];
    /**
     * Replace the Endpoint at the given index with a new Endpoint.  This is used by the Toolkit edition, if changes to an edge type
     * cause a change in Endpoint.
     * @param idx 0 for source, 1 for target
     * @param endpointDef Spec for the new Endpoint.
     * @public
     */
    replaceEndpoint(connection: Connection, idx: number, endpointDef: EndpointSpec): void;
    makeEndpoint(connection: Connection, isSource: boolean, el: any, elId: string, anchor?: AnchorSpec, ep?: Endpoint): Endpoint;
    applyType(connection: Connection, t: ConnectionTypeDescriptor, typeMap: any): void;
    destroy(connection: Connection): void;
    setVisible(connection: Connection, v: boolean): void;
    /**
     * Adds the given class to the UI elements being used to represent this connection's connector, and optionally to
     * the UI elements representing the connection's endpoints.
     * @param c class to add
     * @param cascade If true, also add the class to the connection's endpoints.
     * @public
     */
    addClass(connection: Connection, c: string, cascade?: boolean): void;
    /**
     * Removes the given class from the UI elements being used to represent this connection's connector, and optionally from
     * the UI elements representing the connection's endpoints.
     * @param c class to remove
     * @param cascade If true, also remove the class from the connection's endpoints.
     * @public
     */
    removeClass(connection: Connection, c: string, cascade?: boolean): void;
    isConnection(component: any): component is Connection<any>;
    create(instance: JsPlumbInstance, params: ConnectionOptions): Connection;
};

export declare class ConnectionSelection extends SelectionBase<Connection> {
    setDetachable(d: boolean): ConnectionSelection;
    setReattach(d: boolean): ConnectionSelection;
    setConnector(spec: ConnectorSpec): ConnectionSelection;
    deleteAll(): void;
    repaint(): ConnectionSelection;
}

/**
 * Definition of a connection type.
 * @public
 */
export declare interface ConnectionTypeDescriptor extends TypeDescriptor {
    /**
     * Whether or not connections of this type should be detachable with the mouse. Defaults to true.
     */
    detachable?: boolean;
    /**
     * Whether or not when a user detaches a connection of this type it should be automatically
     * reattached. Defaults to false.
     */
    reattach?: boolean;
    /**
     * Specs for the [source, target] endpoints for connections of this type.
     */
    endpoints?: [EndpointSpec, EndpointSpec];
}

export declare const CONNECTOR_TYPE_STRAIGHT = "Straight";

/**
 * Base interface for connectors. In connector implementations, use createConnectorBase(..) to get
 * one of these and then extend your concrete implementation into it.
 * @internal
 */
export declare interface ConnectorBase extends Connector {
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

export declare function connectorBoundingBoxIntersection(connector: ConnectorBase, box: any): Array<PointXY>;

export declare function connectorBoxIntersection(connector: ConnectorBase, x: number, y: number, w: number, h: number): Array<PointXY>;

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
 * Definition of an object that can create instances of some connector type, and perform a few
 * housekeeping tasks on connector's of that type.
 */
export declare interface ConnectorHandler {
    importGeometry(connector: ConnectorBase, g: Geometry): boolean;
    transformGeometry(connector: ConnectorBase, g: Geometry, dx: number, dy: number): Geometry;
    _compute(connector: ConnectorBase, geometry: PaintGeometry, params: ConnectorComputeParams): void;
    create(connection: Connection, connectorType: string, params: any): ConnectorBase;
    exportGeometry(connector: ConnectorBase): Geometry;
    setAnchorOrientation(connector: ConnectorBase, idx: number, orientation: number[]): void;
}

/**
 * Utilities for registering and working with Connectors
 * @public
 */
export declare const Connectors: {
    /**
     * Register a connector handler. If you write your own Connector type you need to register it using this method.
     * @param connectorType
     * @param connectorHandler
     * @public
     */
    register: (connectorType: string, connectorHandler: ConnectorHandler) => void;
    /**
     * Get a handler for the given connector type
     * @internal
     * @param connectorType
     */
    get: (connectorType: string) => ConnectorHandler;
    /**
     * Export the given connector's geometry, via the associated handler.
     * @param connector
     * @internal
     */
    exportGeometry(connector: ConnectorBase): any;
    /**
     * Import geometry into the given connector, via the associated handler
     * @param connector
     * @param g
     * @internal
     */
    importGeometry(connector: ConnectorBase, g: Geometry): any;
    /**
     * Transform geometry for the given connector, via the associated handler
     * @param connector
     * @param g
     * @param dx
     * @param dy
     * @internal
     */
    transformGeometry(connector: ConnectorBase, g: Geometry, dx: number, dy: number): any;
    /**
     * Prepare a connector using the given name and args.
     * @internal
     * @param connection
     * @param name
     * @param args
     */
    create(connection: Connection<any>, name: string, args: any): ConnectorBase;
    setAnchorOrientation(connector: ConnectorBase, idx: number, orientation: number[]): void;
};

/**
 * Options for the `connect` call on a JsPlumbInstance
 * @public
 */
export declare interface ConnectParams<E> {
    /**
     * Optional UUIDs to assign to the source and target endpoints.
     */
    uuids?: [UUID, UUID];
    /**
     * Source for the connection - an Endpoint, or an element
     */
    source?: Element | Endpoint;
    /**
     * Source for the connection - an Endpoint, or an element
     */
    target?: Element | Endpoint;
    /**
     * Whether or not the connection is detachable. Defaults to true.
     */
    detachable?: boolean;
    /**
     * Whether or not to delete the connection's endpoints when this connection is detached. Defaults to false. Does not
     * delete endpoints if they have other connections.
     */
    deleteEndpointsOnDetach?: boolean;
    /**
     * Whether or not to delete any endpoints that were created by this connect call if at some
     * point in the future the endpoint has no remaining connections. Defaults to false.
     */
    deleteEndpointsOnEmpty?: boolean;
    /**
     * Whether or not to reattach this connection automatically should it be detached via user intervention. Defaults to false.
     */
    reattach?: boolean;
    /**
     * Spec for the endpoint to use for both source and target endpoints.
     */
    endpoint?: EndpointSpec;
    /**
     * Individual endpoint specs for the source/target endpoints.
     */
    endpoints?: [EndpointSpec, EndpointSpec];
    /**
     * Spec for the anchor to use for both source and target endpoints.
     */
    anchor?: AnchorSpec;
    /**
     * Individual anchor specs for the source/target endpoints.
     */
    anchors?: [AnchorSpec, AnchorSpec];
    /**
     * Optional label to set on the connection. In the default browser UI implementation this is rendered as a `label` attribute on the SVG element representing the connection.
     */
    label?: string;
    /**
     * Spec for the connector used to paint the connection.
     */
    connector?: ConnectorSpec;
    /**
     * Optional list of overlays to attach to the connection.
     */
    overlays?: Array<OverlaySpec>;
    /**
     * Spec for the styles to use on both source and target endpoints
     */
    endpointStyle?: EndpointStyle;
    /**
     * Individual specs for the source/target endpoint styles.
     */
    endpointStyles?: [EndpointStyle, EndpointStyle];
    /**
     * Spec for the styles to use on both source and target endpoints when they are in hover state
     */
    endpointHoverStyle?: EndpointStyle;
    /**
     * Individual specs for the source/target endpoint styles when they are in hover state.
     */
    endpointHoverStyles?: [EndpointStyle, EndpointStyle];
    /**
     * Optional port IDs for the source and target endpoints
     */
    ports?: [string, string];
    /**
     * Type of the connection. Used in conjunction with the `registerConnectionType` method.
     */
    type?: string;
    /**
     * Paint style for the connector.
     */
    paintStyle?: PaintStyle;
    /**
     * Paint style for the connector when in hover mode.
     */
    hoverPaintStyle?: PaintStyle;
    /**
     * Whether or not the connection is considered to be 'directed'
     */
    directed?: boolean;
    /**
     * Cost of the connection. Defaults to 1.
     */
    cost?: number;
    /**
     * Optional extra parameters to associate with the connection
     */
    parameters?: Record<string, any>;
    id?: string;
    data?: any;
    cssClass?: string;
    hoverClass?: string;
    outlineColor?: string;
    outlineWidth?: number;
    color?: string;
    lineWidth?: number;
    scope?: string;
}

/**
 * Convert the given input into an object in the form of a `FullOverlaySpec`
 * @param spec
 */
export declare function convertToFullOverlaySpec(spec: string | OverlaySpec): FullOverlaySpec;

export declare function createBaseRepresentation(type: string, endpoint: Endpoint, params?: EndpointRepresentationParams): EndpointRepresentation<any>;

export declare function createComponentBase(instance: JsPlumbInstance, idPrefix: string, typeDescriptor: string, defaultOverlayKey: string, defaultType: Record<string, any>, defaultLabelLocation: number | [number, number], params?: ComponentOptions): Component;

/**
 * factory method to create a ConnectorBase
 */
export declare function createConnectorBase(type: string, connection: Connection, params: ConnectorOptions, defaultStubs: [number, number]): ConnectorBase;

export declare function createEndpoint<E>(instance: JsPlumbInstance, params: InternalEndpointOptions<E>): Endpoint;

export declare function createFloatingAnchor(instance: JsPlumbInstance, element: Element, elementId: string): LightweightFloatingAnchor;

export declare function createOverlayBase(instance: JsPlumbInstance, component: Component, p: OverlayOptions): OverlayBase;

export declare function _createPerimeterAnchor(params: Record<string, any>): LightweightPerimeterAnchor;

export declare interface CustomOverlay extends OverlayBase {
    create: (c: Component) => any;
}

/**
 * @public
 */
export declare interface CustomOverlayOptions extends OverlayOptions {
    create: (c: Component) => any;
}

export declare const DEFAULT_KEY_ALLOW_NESTED_GROUPS = "allowNestedGroups";

export declare const DEFAULT_KEY_ANCHOR = "anchor";

export declare const DEFAULT_KEY_ANCHORS = "anchors";

export declare const DEFAULT_KEY_CONNECTION_OVERLAYS = "connectionOverlays";

export declare const DEFAULT_KEY_CONNECTIONS_DETACHABLE = "connectionsDetachable";

export declare const DEFAULT_KEY_CONNECTOR = "connector";

export declare const DEFAULT_KEY_CONTAINER = "container";

export declare const DEFAULT_KEY_ENDPOINT = "endpoint";

export declare const DEFAULT_KEY_ENDPOINT_HOVER_STYLE = "endpointHoverStyle";

export declare const DEFAULT_KEY_ENDPOINT_HOVER_STYLES = "endpointHoverStyles";

export declare const DEFAULT_KEY_ENDPOINT_OVERLAYS = "endpointOverlays";

export declare const DEFAULT_KEY_ENDPOINT_STYLE = "endpointStyle";

export declare const DEFAULT_KEY_ENDPOINT_STYLES = "endpointStyles";

export declare const DEFAULT_KEY_ENDPOINTS = "endpoints";

export declare const DEFAULT_KEY_HOVER_CLASS = "hoverClass";

export declare const DEFAULT_KEY_HOVER_PAINT_STYLE = "hoverPaintStyle";

export declare const DEFAULT_KEY_LIST_STYLE = "listStyle";

export declare const DEFAULT_KEY_MAX_CONNECTIONS = "maxConnections";

export declare const DEFAULT_KEY_PAINT_STYLE = "paintStyle";

export declare const DEFAULT_KEY_REATTACH_CONNECTIONS = "reattachConnections";

export declare const DEFAULT_KEY_SCOPE = "scope";

export declare const DEFAULT_LABEL_LOCATION_CONNECTION = 0.5;

export declare const DEFAULT_LABEL_LOCATION_ENDPOINT: [number, number];

export declare const DEFAULT_LENGTH = 20;

export declare const DEFAULT_OVERLAY_KEY_ENDPOINTS = "endpointOverlays";

/**
 * Provides a few default methods for working with connectors. You only need to interact with this object
 * if you're writing your own connector and you want to use on of the default methods it provides.
 * @public
 */
export declare const defaultConnectorHandler: {
    /**
     * Sets geometry on a connector
     * @param connector
     */
    exportGeometry(connector: ConnectorBase): Geometry;
    /**
     * Import geometry to a connector and mark it 'edited'
     * @param connector
     * @param g
     */
    importGeometry(connector: ConnectorBase, g: Geometry): boolean;
};

/**
 * Optional parameters to the `DeleteConnection` method.
 */
export declare type DeleteConnectionOptions = {
    /**
     * if true, force deletion even if the connection tries to cancel the deletion.
     */
    force?: boolean;
    /**
     * If false, an event won't be fired. Otherwise a `connection:detach` event will be fired.
     */
    fireEvent?: boolean;
    /**
     * Optional original event that resulted in the connection being deleted.
     */
    originalEvent?: Event;
    /**
     * internally when a connection is deleted, it may be because the endpoint it was on is being deleted.
     * in that case we want to ignore that endpoint.
     */
    endpointToIgnore?: Endpoint;
};

export declare interface DiamondOverlay extends ArrowOverlay {
}

export declare interface DotEndpoint extends EndpointRepresentation<ComputedDotEndpoint> {
    radius: number;
    defaultOffset: number;
    defaultInnerRadius: number;
}

export declare const DotEndpointHandler: EndpointHandler<DotEndpoint, ComputedDotEndpoint>;

export declare function dumpSegmentsToConsole(connector: ConnectorBase): void;

export declare type ElementSelectionSpecifier<E> = E | Array<E> | '*';

export declare interface Endpoint extends Component {
    connections: Array<Connection>;
    representation: EndpointRepresentation<any>;
    proxiedBy: Endpoint;
    connectorClass: string;
    connectorHoverClass: string;
    element: any;
    elementId: string;
    dragAllowedWhenFull: boolean;
    timestamp: string;
    portId: string;
    maxConnections: number;
    enabled: boolean;
    isSource: boolean;
    isTarget: boolean;
    isTemporarySource: boolean;
    connectionCost: number;
    connectionsDirected: boolean;
    connectionsDetachable: boolean;
    reattachConnections: boolean;
    edgeType: string;
    currentAnchorClass: string;
    connector: ConnectorSpec;
    connectorOverlays: Array<OverlaySpec>;
    connectorStyle: PaintStyle;
    connectorHoverStyle: PaintStyle;
    deleteOnEmpty: boolean;
    uuid: string;
    scope: string;
    _anchor: LightweightAnchor;
    referenceEndpoint: Endpoint;
    finalEndpoint: Endpoint;
    connectorSelector: () => Connection;
}

export declare type EndpointComputeFunction<T> = (endpoint: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any) => T;

export declare interface EndpointHandler<EndpointClass, T> {
    type: string;
    compute: EndpointComputeFunction<T>;
    getParams(endpoint: EndpointClass): Record<string, any>;
    create(endpoint: Endpoint, params?: EndpointRepresentationParams): EndpointClass;
}

export declare interface EndpointOptions<E = any> {
    parameters?: Record<string, any>;
    scope?: string;
    cssClass?: string;
    data?: any;
    hoverClass?: string;
    /**
     * Optional definition for both the source and target anchors for any connection created with this endpoint as its source.
     * If you do not supply this, the default `anchors` definition for the jsPlumb instance will be used
     */
    anchor?: AnchorSpec;
    /**
     * Optional definition for the source and target anchors for any connection created with this endpoint as its source.
     * If you do not supply this, the default `anchors` definition for the jsPlumb instance will be used
     */
    anchors?: [AnchorSpec, AnchorSpec];
    /**
     * Optional endpoint definition. If you do not supply this, the default endpoint definition for the jsPlumb instance will be used
     */
    endpoint?: EndpointSpec;
    /**
     * Whether or not the endpoint is initially enabled. Defaults to true.
     */
    enabled?: boolean;
    /**
     * Optional paint style to assign to the endpoint
     */
    paintStyle?: PaintStyle;
    /**
     * Optional paint style to assign, on hover, to the endpoint.
     */
    hoverPaintStyle?: PaintStyle;
    /**
     * Maximum number of connections this endpoint supports. Defaults to 1. Use a value of -1 to indicate there is no limit.
     */
    maxConnections?: number;
    /**
     * Optional paint style to assign to a connection that is created with this endpoint as its source.
     */
    connectorStyle?: PaintStyle;
    /**
     * Optional paint style to assign, on hover, to a connection that is created with this endpoint as its source.
     */
    connectorHoverStyle?: PaintStyle;
    /**
     * Optional connector definition for connections that are created with this endpoint as their source.
     */
    connector?: ConnectorSpec;
    /**
     * Optional list of overlays to add to a connection that is created with this endpoint as its source.
     */
    connectorOverlays?: Array<OverlaySpec>;
    /**
     * Optional class to assign to connections that have this endpoint as their source.
     */
    connectorClass?: string;
    /**
     * Optional class to assign, on mouse hover,  to connections that have this endpoint as their source.
     */
    connectorHoverClass?: string;
    /**
     * Whether or not connections that have this endpoint as their source are configured to be detachable with the mouse. Defaults to true.
     */
    connectionsDetachable?: boolean;
    /**
     * Whether or not this Endpoint acts as a source for connections dragged with the mouse. Defaults to false.
     */
    source?: boolean;
    /**
     * Whether or not this Endpoint acts as a target for connections dragged with the mouse. Defaults to false.
     */
    target?: boolean;
    /**
     * Optional 'type' for connections that have this endpoint as their source.
     */
    edgeType?: string;
    /**
     * Whether or not to set `reattach:true` on connections that have this endpoint as their source. Defaults to false.
     */
    reattachConnections?: boolean;
    /**
     * Optional "port id" for this endpoint - a logical mapping of the endpoint to some name.
     */
    portId?: string;
    /**
     * Optional user-supplied ID for this endpoint.
     */
    uuid?: string;
    /**
     * Whether or not connections can be dragged from the endpoint when it is full. Since no new connection could be dragged from an endpoint that is
     * full, in a practical sense this means whether or not existing connections can be dragged off an endpoint that is full. Defaults to true.
     */
    dragAllowedWhenFull?: boolean;
    /**
     * Optional cost to set for connections that have this endpoint as their source. Defaults to 1.
     */
    connectionCost?: number;
    /**
     * Whether or not connections that have this endpoint as their source are considered "directed".
     */
    connectionsDirected?: boolean;
    /**
     * Whether or not to delete the Endpoint if it transitions to the state that it has no connections. Defaults to false. Note that this only
     * applies if the endpoint previously had one or more connections and now has none: a newly created endpoint with this flag set is not
     * immediately deleted.
     */
    deleteOnEmpty?: boolean;
}

/**
 * Base interface for all types of Endpoint representation.
 */
export declare interface EndpointRepresentation<C> {
    typeId: string;
    x: number;
    y: number;
    w: number;
    h: number;
    computedValue: C;
    bounds: Extents;
    classes: Array<string>;
    instance: JsPlumbInstance;
    canvas: any;
    type: string;
    endpoint: Endpoint;
    typeDescriptor: typeof TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION;
}

/**
 * Factory + helper methods for Endpoints.
 * @public
 */
export declare const Endpoints: {
    applyType(endpoint: Endpoint, t: any, typeMap: any): void;
    destroy(endpoint: Endpoint): void;
    /**
     * Sets the visible state of the given Endpoint.
     * @public
     * @param endpoint
     * @param v
     * @param doNotChangeConnections
     * @param doNotNotifyOtherEndpoint
     */
    setVisible(endpoint: Endpoint, v: boolean, doNotChangeConnections?: boolean, doNotNotifyOtherEndpoint?: boolean): void;
    /**
     * Adds a class to the given Endpoint.
     * @param endpoint
     * @param clazz
     * @param cascade
     */
    addClass(endpoint: Endpoint, clazz: string, cascade?: boolean): void;
    /**
     * Removes a class from the given Endpoint.
     * @param endpoint
     * @param clazz
     * @param cascade
     */
    removeClass(endpoint: Endpoint, clazz: string, cascade?: boolean): void;
    /**
     * @internal
     * @param endpoint
     * @param anchor
     */
    _setPreparedAnchor(endpoint: Endpoint, anchor: LightweightAnchor): Endpoint;
    /**
     *
     * @param endpoint
     * @internal
     */
    _updateAnchorClass(endpoint: Endpoint): void;
    /**
     * Called by the router when a dynamic anchor has changed its current location.
     * @param currentAnchor
     * @internal
     */
    _anchorLocationChanged(endpoint: Endpoint, currentAnchor: LightweightAnchor): void;
    /**
     * Sets the anchor for the given endpoint.
     * @param endpoint
     * @param anchorParams
     * @public
     */
    setAnchor(endpoint: Endpoint, anchorParams: AnchorSpec | Array<AnchorSpec>): Endpoint;
    /**
     * Adds a connection to the given endpoint. This method is internal and should not be called by users of the API, as
     * just calling this method alone will not ensure the connection is appropriately registered throughout the
     * jsPlumb instance.
     * @internal
     * @param endpoint
     * @param conn
     */
    _addConnection(endpoint: Endpoint, conn: Connection): void;
    /**
     * Deletes every connection attached to the given endpoint.
     * @public
     * @param endpoint
     * @param params
     */
    deleteEveryConnection(endpoint: Endpoint, params?: DeleteConnectionOptions): void;
    /**
     * Removes all connections from `endpoint` to `otherEndpoint`.
     * @param endpoint
     * @param otherEndpoint
     * @public
     */
    detachFrom(endpoint: Endpoint, otherEndpoint: Endpoint): Endpoint;
    /**
     * Detaches this Endpoint from the given Connection.  If `deleteOnEmpty` is set to true and there are no
     * Connections after this one is detached, the Endpoint is deleted.
     * @param connection Connection from which to detach.
     * @param idx Optional, used internally to identify if this is the source (0) or target endpoint (1). Sometimes we already know this when we call this method.
     * @param _transientDetach For internal use only.
     * @public
     */
    detachFromConnection(endpoint: Endpoint, connection: Connection, idx?: number, _transientDetach?: boolean): void;
    /**
     * Returns whether or not the given endpoint is currently full.
     * @public
     * @param endpoint
     */
    isFull(endpoint: Endpoint): boolean;
    /**
     * @internal
     * @param endpoint
     * @private
     */
    _isFloating(endpoint: Endpoint): boolean;
    /**
     * Test if two endpoints are connected
     * @param otherEndpoint
     * @public
     */
    areConnected(endpoint: Endpoint, otherEndpoint: Endpoint): boolean;
    /**
     * Returns whether or not the given object is an Endpoint.
     * @param component
     * @internal
     */
    _isEndpoint(component: any): component is Endpoint;
    /**
     * @internal
     * @param endpoint
     * @param ep
     */
    _setEndpoint<C>(endpoint: Endpoint, ep: EndpointSpec | EndpointRepresentation<C>): void;
    /**
     * @internal
     * @param endpoint
     * @param ep
     */
    _setPreparedEndpoint<C_1>(endpoint: Endpoint, ep: EndpointRepresentation<C_1>): void;
    /**
     * @internal
     * @param epr
     */
    /**
     * @internal
     * @param ep
     * @param anchorPoint
     * @param orientation
     * @param endpointStyle
     */
    _compute<T, ElementType>(ep: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any): void;
    /**
     * @internal
     * @param eph
     */
    _registerHandler<E, T_1>(eph: EndpointHandler<E, T_1>): void;
    /**
     * @internal
     * @param endpoint
     */
    _refreshEndpointClasses(endpoint: Endpoint): void;
};

/**
 * A set of selected endpoints. Offers a few methods to operate on every endpoint in the selection at once.
 * @public
 */
export declare class EndpointSelection extends SelectionBase<Endpoint> {
    /**
     * Sets the enabled state of every endpoint in the selection
     * @param e
     */
    setEnabled(e: boolean): EndpointSelection;
    /**
     * Sets the anchor for every endpoint in the selection
     * @param a
     */
    setAnchor(a: AnchorSpec): EndpointSelection;
    /**
     * Deletes every connection attached to all of the endpoints in the selection
     */
    deleteEveryConnection(): EndpointSelection;
    /**
     * Delete every endpoint in the selection
     */
    deleteAll(): EndpointSelection;
}

/**
 * Definition of an endpoint type.
 * @public
 */
export declare interface EndpointTypeDescriptor extends TypeDescriptor {
    /**
     * Whether or not connections created from this endpoint should be detachable via the mouse. Defaults to true.
     */
    connectionsDetachable?: boolean;
    /**
     * Whether or not when a user detaches a connection that was created from this endpoint it should be automatically
     * reattached. Defaults to false.
     */
    reattachConnections?: boolean;
    /**
     * Maximum number of connections this endpoint can support. Defaults to 1. A value of -1 means unlimited.
     */
    maxConnections?: number;
}

export declare const ERROR_SOURCE_DOES_NOT_EXIST = "Cannot establish connection: source does not exist";

export declare const ERROR_SOURCE_ENDPOINT_FULL = "Cannot establish connection: source endpoint is full";

export declare const ERROR_TARGET_DOES_NOT_EXIST = "Cannot establish connection: target does not exist";

export declare const ERROR_TARGET_ENDPOINT_FULL = "Cannot establish connection: target endpoint is full";

export declare const EVENT_ANCHOR_CHANGED = "anchor:changed";

export declare const EVENT_CONNECTION = "connection";

export declare const EVENT_CONNECTION_DETACHED = "connection:detach";

export declare const EVENT_CONNECTION_MOVED = "connection:move";

export declare const EVENT_CONTAINER_CHANGE = "container:change";

export declare const EVENT_ENDPOINT_REPLACED = "endpoint:replaced";

export declare const EVENT_GROUP_ADDED = "group:added";

export declare const EVENT_GROUP_COLLAPSE = "group:collapse";

export declare const EVENT_GROUP_EXPAND = "group:expand";

export declare const EVENT_GROUP_MEMBER_ADDED = "group:member:added";

export declare const EVENT_GROUP_MEMBER_REMOVED = "group:member:removed";

export declare const EVENT_GROUP_REMOVED = "group:removed";

export declare const EVENT_INTERNAL_CONNECTION = "internal.connection";

export declare const EVENT_INTERNAL_CONNECTION_DETACHED = "internal.connection:detached";

export declare const EVENT_INTERNAL_ENDPOINT_UNREGISTERED = "internal.endpoint:unregistered";

export declare const EVENT_MANAGE_ELEMENT = "element:manage";

export declare const EVENT_MAX_CONNECTIONS = "maxConnections";

export declare const EVENT_NESTED_GROUP_ADDED = "group:nested:added";

export declare const EVENT_NESTED_GROUP_REMOVED = "group:nested:removed";

export declare const EVENT_UNMANAGE_ELEMENT = "element:unmanage";

export declare const EVENT_ZOOM = "zoom";

export declare type Face = keyof typeof FaceValues;

declare enum FaceValues {
    top = "top",
    left = "left",
    right = "right",
    bottom = "bottom"
}

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

export declare const FIXED = "fixed";

/**
 *
 * @param a
 * @internal
 */
export declare function getDefaultFace(a: LightweightContinuousAnchor): Face;

export declare function gradientAtComponentPoint(connector: ConnectorBase, location: number, absolute?: boolean): number;

export declare interface GroupCollapsedParams<E> {
    group: UIGroup<E>;
}

export declare interface GroupExpandedParams<E> {
    group: UIGroup<E>;
}

export declare class GroupManager<E> {
    instance: JsPlumbInstance;
    groupMap: Record<string, UIGroup<E>>;
    _connectionSourceMap: Record<string, UIGroup<E>>;
    _connectionTargetMap: Record<string, UIGroup<E>>;
    constructor(instance: JsPlumbInstance);
    private _cleanupDetachedConnection;
    addGroup(params: AddGroupOptions<E>): UIGroup<E>;
    getGroup(groupId: string | UIGroup<E>): UIGroup<E>;
    getGroupFor(el: E): UIGroup<E>;
    getGroups(): Array<UIGroup<E>>;
    removeGroup(group: string | UIGroup<E>, deleteMembers?: boolean, manipulateView?: boolean, doNotFireEvent?: boolean): Record<string, PointXY>;
    removeAllGroups(deleteMembers?: boolean, manipulateView?: boolean, doNotFireEvent?: boolean): void;
    forEach(f: (g: UIGroup<E>) => any): void;
    orphan(el: E, doNotTransferToAncestor: boolean): {
        id: string;
        pos: PointXY;
    };
    _updateConnectionsForGroup(group: UIGroup<E>): void;
    private _collapseConnection;
    private _expandConnection;
    private isElementDescendant;
    collapseGroup(group: string | UIGroup<E>): void;
    /**
     * Cascade a collapse from the given `collapsedGroup` into the given `targetGroup`.
     * @param collapsedGroup
     * @param targetGroup
     * @param collapsedIds Set of connection ids for already collapsed connections, which we can ignore.
     */
    cascadeCollapse(collapsedGroup: UIGroup<E>, targetGroup: UIGroup<E>, collapsedIds: Set<string>): void;
    expandGroup(group: string | UIGroup<E>, doNotFireEvent?: boolean): void;
    toggleGroup(group: string | UIGroup<E>): void;
    repaintGroup(group: string | UIGroup<E>): void;
    addToGroup(group: string | UIGroup<E>, doNotFireEvent: boolean, ...el: Array<E>): void;
    removeFromGroup(group: string | UIGroup<E>, doNotFireEvent: boolean, ...el: Array<E>): void;
    getAncestors(group: UIGroup<E>): Array<UIGroup<E>>;
    /**
     * Tests if `possibleAncestor` is in fact an ancestor of `group`
     * @param group
     * @param possibleAncestor
     */
    isAncestor(group: UIGroup<E>, possibleAncestor: UIGroup<E>): boolean;
    getDescendants(group: UIGroup<E>): Array<UIGroup<E>>;
    isDescendant(possibleDescendant: UIGroup<E>, ancestor: UIGroup<E>): boolean;
    reset(): void;
    isOverrideDrop(group: UIGroup<E>, el: any, targetGroup: UIGroup<E>): boolean;
    getAnchor(group: UIGroup<E>, conn: Connection, endpointIndex: number): AnchorSpec;
    getEndpoint(group: UIGroup<E>, conn: Connection, endpointIndex: number): EndpointSpec;
}

export declare interface GroupOptions {
    id?: string;
    droppable?: boolean;
    enabled?: boolean;
    orphan?: boolean;
    constrain?: boolean;
    proxied?: boolean;
    ghost?: boolean;
    revert?: boolean;
    prune?: boolean;
    dropOverride?: boolean;
    anchor?: AnchorSpec;
    endpoint?: EndpointSpec;
}

/**
 * Prefix to use on the ID for connections.
 * @internal
 */
export declare const ID_PREFIX_CONNECTION = "_jsPlumb_c";

export declare const ID_PREFIX_ENDPOINT = "_jsplumb_e";

export declare const INTERCEPT_BEFORE_DETACH = "beforeDetach";

export declare const INTERCEPT_BEFORE_DRAG = "beforeDrag";

export declare const INTERCEPT_BEFORE_DROP = "beforeDrop";

export declare const INTERCEPT_BEFORE_START_DETACH = "beforeStartDetach";

/**
 * Internal extension of ConnectParams containing a few extra things needed to establish a connection.
 * @internal
 */
export declare interface InternalConnectParams<E> extends ConnectParams<E> {
    sourceEndpoint?: Endpoint;
    targetEndpoint?: Endpoint;
    scope?: string;
    type?: string;
    newConnection?: (p: any) => Connection;
    id?: string;
}

export declare interface InternalEndpointOptions<E> extends EndpointOptions<E> {
    isTemporarySource?: boolean;
    elementId?: string;
    _transient?: boolean;
    type?: string;
    id?: string;
    preparedAnchor?: LightweightAnchor;
    connections?: Array<Connection>;
    element?: E;
    existingEndpoint?: EndpointRepresentation<E>;
}

export declare const IS_DETACH_ALLOWED = "isDetachAllowed";

export declare function isArrowOverlay(o: OverlayBase): o is ArrowOverlay;

export declare function isContinuous(a: LightweightAnchor): a is LightweightContinuousAnchor;

export declare function isCustomOverlay(o: OverlayBase): o is CustomOverlay;

export declare function isDiamondOverlay(o: OverlayBase): o is DiamondOverlay;

export declare function isDynamic(a: LightweightAnchor): boolean;

/**
 *
 * @param a
 * @param edge
 * @internal
 */
export declare function isEdgeSupported(a: LightweightContinuousAnchor, edge: Face): boolean;

export declare function isEndpointRepresentation(ep: any): ep is EndpointRepresentation<any>;

export declare function isFloating(a: LightweightAnchor): a is LightweightFloatingAnchor;

/**
 * Returns whether or not the given overlay spec is a 'full' overlay spec, ie. has a `type` and some `options`, or is just an overlay name.
 * @param o
 */
export declare function isFullOverlaySpec(o: OverlaySpec): o is FullOverlaySpec;

export declare function isLabelOverlay(o: OverlayBase): o is LabelOverlay;

export declare function isPlainArrowOverlay(o: OverlayBase): o is PlainArrowOverlay;

/**
 * @internal
 * @param anchors
 */
export declare function isValidAnchorsSpec(anchors: [AnchorSpec, AnchorSpec]): boolean;

export declare interface JsPlumbDefaults<E> {
    [DEFAULT_KEY_ENDPOINT]?: EndpointSpec;
    [DEFAULT_KEY_ENDPOINTS]?: [EndpointSpec, EndpointSpec];
    [DEFAULT_KEY_ANCHOR]?: AnchorSpec;
    [DEFAULT_KEY_ANCHORS]?: [AnchorSpec, AnchorSpec];
    [DEFAULT_KEY_PAINT_STYLE]?: PaintStyle;
    [DEFAULT_KEY_HOVER_PAINT_STYLE]?: PaintStyle;
    [DEFAULT_KEY_ENDPOINT_STYLE]?: EndpointStyle;
    [DEFAULT_KEY_ENDPOINT_HOVER_STYLE]?: EndpointStyle;
    [DEFAULT_KEY_ENDPOINT_STYLES]?: [EndpointStyle, EndpointStyle];
    [DEFAULT_KEY_ENDPOINT_HOVER_STYLES]?: [EndpointStyle, EndpointStyle];
    [DEFAULT_KEY_CONNECTIONS_DETACHABLE]?: boolean;
    [DEFAULT_KEY_REATTACH_CONNECTIONS]?: boolean;
    [DEFAULT_KEY_ENDPOINT_OVERLAYS]?: Array<OverlaySpec>;
    [DEFAULT_KEY_CONNECTION_OVERLAYS]?: Array<OverlaySpec>;
    [DEFAULT_KEY_LIST_STYLE]?: ListSpec;
    [DEFAULT_KEY_CONTAINER]?: E;
    [DEFAULT_KEY_CONNECTOR]?: ConnectorSpec;
    [DEFAULT_KEY_SCOPE]?: string;
    [DEFAULT_KEY_MAX_CONNECTIONS]?: number;
    [DEFAULT_KEY_HOVER_CLASS]?: string;
    [DEFAULT_KEY_ALLOW_NESTED_GROUPS]?: boolean;
}

export declare interface jsPlumbElement<E> {
    _jsPlumbGroup: UIGroup<E>;
    _jsPlumbParentGroup: UIGroup<E>;
    _jsPlumbProxies: Array<[Connection, number]>;
    _isJsPlumbGroup: boolean;
    parentNode: jsPlumbElement<E>;
}

export declare abstract class JsPlumbInstance<T extends {
    E: unknown;
} = any> extends EventGenerator {
    readonly _instanceIndex: number;
    defaults: JsPlumbDefaults<T["E"]>;
    private _initialDefaults;
    isConnectionBeingDragged: boolean;
    currentlyDragging: boolean;
    hoverSuspended: boolean;
    _suspendDrawing: boolean;
    _suspendedAt: string;
    connectorClass: string;
    connectorOutlineClass: string;
    connectedClass: string;
    endpointClass: string;
    endpointConnectedClass: string;
    endpointFullClass: string;
    endpointFloatingClass: string;
    endpointDropAllowedClass: string;
    endpointDropForbiddenClass: string;
    endpointAnchorClassPrefix: string;
    overlayClass: string;
    readonly connections: Array<Connection>;
    endpointsByElement: Record<string, Array<Endpoint>>;
    private readonly endpointsByUUID;
    sourceSelectors: Array<ConnectionDragSelector>;
    targetSelectors: Array<ConnectionDragSelector>;
    allowNestedGroups: boolean;
    private _curIdStamp;
    readonly viewport: Viewport<T>;
    readonly router: Router<T, any>;
    readonly groupManager: GroupManager<T["E"]>;
    private _connectionTypes;
    private _endpointTypes;
    private _container;
    protected _managedElements: Record<string, ManagedElement<T["E"]>>;
    private DEFAULT_SCOPE;
    get defaultScope(): string;
    private _zoom;
    get currentZoom(): number;
    constructor(_instanceIndex: number, defaults?: JsPlumbDefaults<T["E"]>);
    /**
     * @internal
     */
    areDefaultAnchorsSet(): boolean;
    getContainer(): any;
    setZoom(z: number, repaintEverything?: boolean): boolean;
    _idstamp(): string;
    checkCondition<RetVal>(conditionName: string, args?: any): RetVal;
    getId(element: T["E"], uuid?: string): string;
    getConnections(options?: SelectOptions<T["E"]>, flat?: boolean): Record<string, Connection> | Array<Connection>;
    select(params?: SelectOptions<T["E"]>): ConnectionSelection;
    selectEndpoints(params?: SelectEndpointOptions<T["E"]>): EndpointSelection;
    setContainer(c: T["E"]): void;
    private _set;
    /**
     * Change the source of the given connection to be the given endpoint or element.
     * @param connection
     * @param el
     */
    setSource(connection: Connection, el: T["E"] | Endpoint): void;
    /**
     * Change the target of the given connection to be the given endpoint or element.
     * @param connection
     * @param el
     */
    setTarget(connection: Connection, el: T["E"] | Endpoint): void;
    /**
     * Sets the type of a connection and then repaints it.
     * @param connection
     * @param type
     */
    setConnectionType(connection: Connection, type: string, params?: any): void;
    /**
     * Returns whether or not hover is currently suspended.
     */
    isHoverSuspended(): boolean;
    /**
     * Sets whether or not drawing is suspended.
     * @param val - True to suspend, false to enable.
     * @param repaintAfterwards - If true, repaint everything afterwards.
     */
    setSuspendDrawing(val?: boolean, repaintAfterwards?: boolean): boolean;
    getSuspendedAt(): string;
    /**
     * Suspend drawing, run the given function, and then re-enable drawing, optionally repainting everything.
     * @param fn - Function to run while drawing is suspended.
     * @param doNotRepaintAfterwards - Whether or not to repaint everything after drawing is re-enabled.
     */
    batch(fn: Function, doNotRepaintAfterwards?: boolean): void;
    /**
     * Execute the given function for each of the given elements.
     * @param spec - An Element, or an element id, or an array of elements/element ids.
     * @param fn - The function to run on each element.
     */
    each(spec: T["E"] | Array<T["E"]>, fn: (e: T["E"]) => any): JsPlumbInstance;
    /**
     * Update the cached offset information for some element.
     * @param params
     * @returns an UpdateOffsetResult containing the offset information for the given element.
     */
    updateOffset(params?: UpdateOffsetOptions): ViewportElement<T["E"]>;
    /**
     * Delete the given connection.
     * @param connection - Connection to delete.
     * @param params - Optional extra parameters.
     */
    deleteConnection(connection: Connection, params?: DeleteConnectionOptions): boolean;
    deleteEveryConnection(params?: DeleteConnectionOptions): number;
    /**
     * Delete all connections attached to the given element.
     * @param el
     * @param params
     * @public
     */
    deleteConnectionsForElement(el: T["E"], params?: DeleteConnectionOptions): JsPlumbInstance;
    private fireDetachEvent;
    fireMoveEvent(params?: ConnectionMovedParams, evt?: Event): void;
    /**
     * Manage a group of elements.
     * @param elements - Array-like object of strings or elements (can be an Array or a NodeList), or a CSS selector (which is applied with the instance's
     * container element as its context)
     * @param recalc - Maybe recalculate offsets for the element also.
     */
    manageAll(elements: ArrayLike<T["E"]> | string, recalc?: boolean): void;
    /**
     * Manage an element.  Adds the element to the viewport and sets up tracking for endpoints/connections for the element, as well as enabling dragging for the
     * element. This method is called internally by various methods of the jsPlumb instance, such as `connect`, `addEndpoint`, `makeSource` and `makeTarget`,
     * so if you use those methods to setup your UI then you may not need to call this. However, if you use the `addSourceSelector` and `addTargetSelector` methods
     * to configure your UI then you will need to register elements using this method, or they will not be draggable.
     * @param element - Element to manage. This method does not accept a DOM element ID as argument. If you wish to manage elements via their DOM element ID,
     * you should use `manageAll` and pass in an appropriate CSS selector that represents your element, eg `#myElementId`.
     * @param internalId - Optional ID for jsPlumb to use internally. If this is not supplied, one will be created.
     * @param _recalc - Maybe recalculate offsets for the element also. It is not recommended that clients of the API use this parameter; it's used in
     * certain scenarios internally
     */
    manage(element: T["E"], internalId?: string, _recalc?: boolean): ManagedElement<T["E"]>;
    /**
     * Retrieve some data from the given managed element. Created for internal use, as a way to avoid memory leaks from having data pertaining
     * to some element spread around the codebase, but could be used by external code.
     * @internal
     * @param elementId ID of the element to retrieve the data for
     * @param dataIdentifier Type of data being retrieved
     * @param key The key to retrieve the data for
     */
    getManagedData(elementId: string, dataIdentifier: string, key: string): any;
    /**
     * Attach some data to the given managed element. Created for internal use, as a way to avoid memory leaks from having data pertaining
     * to some element spread around the codebase, but could be used by external code.
     * @internal
     * @param elementId ID of the element to store the data against
     * @param dataIdentifier Type of data being stored
     * @param key The key to store the data against
     * @param data The data to store.
     */
    setManagedData(elementId: string, dataIdentifier: string, key: string, data: any): void;
    /**
     * Gets the element with the given ID from the list managed elements, null if not currently managed.
     * @param id
     */
    getManagedElement(id: string): T["E"];
    /**
     * Stops managing the given element, removing it from internal tracking and clearing the custom attribute that is
     * added by jsPlumb to mark it as managed. This method fires an 'element:unmanage' event containing the unmanaged
     * element and its managed id.
     * @param el - Element, or ID of the element to stop managing.
     * @param removeElement - If true, also remove the element from the renderer.
     * @public
     */
    unmanage(el: T["E"], removeElement?: boolean): void;
    /**
     * Sets rotation for the element to the given number of degrees (not radians). A value of null is treated as a
     * rotation of 0 degrees.
     * @param element - Element to rotate
     * @param rotation - Amount to totate
     * @param _doNotRepaint - For internal use.
     */
    rotate(element: T["E"], rotation: number, _doNotRepaint?: boolean): RedrawResult;
    /**
     * Gets the current rotation for the element with the given ID. This method exists for internal use.
     * @param elementId - Internal ID of the element for which to retrieve rotation.
     * @internal
     */
    _getRotation(elementId: string): number;
    /**
     * Returns a list of rotation transformations that apply to the given element. An element may have rotation applied
     * directly to it, and/or it may be within a group, which may itself be rotated, and that group may be inside a group
     * which is also rotated, etc. It's rotated turtles all the way down, or at least it could be. This method is intended
     * for internal use only.
     * @param elementId
     * @internal
     */
    _getRotations(elementId: string): Rotations;
    /**
     * Applies the given set of Rotations to the given point, and returns a new PointXY. For internal use.
     * @param point - Point to rotate
     * @param rotations - Rotations to apply.
     * @internal
     */
    _applyRotations(point: [number, number, number, number], rotations: Rotations): RotatedPointXY;
    /**
     * Applies the given set of Rotations to the given point, and returns a new PointXY. For internal use.
     * @param point - Point to rotate
     * @param rotations - Rotations to apply.
     * @internal
     */
    _applyRotationsXY(point: PointXY, rotations: Rotations): PointXY;
    /**
     * Internal method to create an Endpoint from the given options, perhaps with the given id. Do not use this method
     * as a consumer of the API. If you wish to add an Endpoint to some element, use `addEndpoint` instead.
     * @param params - Options for the Endpoint.
     * @internal
     */
    _internal_newEndpoint(params: InternalEndpointOptions<T["E"]>): Endpoint;
    /**
     * For internal use. For the given inputs, derive an appropriate anchor and endpoint definition.
     * @param type
     * @param dontPrependDefault
     * @internal
     */
    _deriveEndpointAndAnchorSpec(type: string, dontPrependDefault?: boolean): {
        endpoints: [EndpointSpec, EndpointSpec];
        anchors: [AnchorSpec, AnchorSpec];
    };
    /**
     * Updates position/size information for the given element and redraws its Endpoints and their Connections. Use this method when you've
     * made a change to some element that may have caused the element to change its position or size and you want to ensure the connections are
     * in the right place.
     * @param el - Element to revalidate.
     * @param timestamp - Optional, used internally to avoid recomputing position/size information if it has already been computed.
     */
    revalidate(el: T["E"], timestamp?: string): RedrawResult;
    /**
     * Repaint every connection and endpoint in the instance.
     */
    repaintEverything(): JsPlumbInstance;
    /**
     * Sets the position of the given element to be [x,y].
     * @param el - Element to set the position for
     * @param x - Position in X axis
     * @param y - Position in Y axis
     * @returns The result of the redraw operation that follows the update of the viewport.
     */
    setElementPosition(el: T["E"], x: number, y: number): RedrawResult;
    /**
     * Repaints all connections and endpoints associated with the given element, _without recomputing the element
     * size and position_. If you want to first recompute element size and position you should call `revalidate(el)` instead,
     * @param el - Element to repaint.
     * @param timestamp - Optional parameter used internally to avoid recalculating offsets multiple times in one paint.
     * @param offsetsWereJustCalculated - If true, we don't recalculate the offsets of child elements of the element we're repainting.
     */
    repaint(el: T["E"], timestamp?: string, offsetsWereJustCalculated?: boolean): RedrawResult;
    /**
     * @internal
     * @param endpoint
     */
    private unregisterEndpoint;
    /**
     * Potentially delete the endpoint from the instance, depending on the endpoint's internal state. Not for external use.
     * @param endpoint
     * @internal
     */
    _maybePruneEndpoint(endpoint: Endpoint): boolean;
    /**
     * Delete the given endpoint.
     * @param object - Either an Endpoint, or the UUID of an Endpoint.
     */
    deleteEndpoint(object: string | Endpoint): JsPlumbInstance;
    /**
     * Add an Endpoint to the given element.
     * @param el - Element to add the endpoint to.
     * @param params
     * @param referenceParams
     */
    addEndpoint(el: T["E"], params?: EndpointOptions<T["E"]>, referenceParams?: EndpointOptions<T["E"]>): Endpoint;
    /**
     * Add a set of Endpoints to an element
     * @param el - Element to add the Endpoints to.
     * @param endpoints - Array of endpoint options.
     * @param referenceParams
     */
    addEndpoints(el: T["E"], endpoints: Array<EndpointOptions<T["E"]>>, referenceParams?: EndpointOptions<T["E"]>): Array<Endpoint>;
    /**
     * Clears all endpoints and connections from the instance of jsplumb. Does not also clear out event listeners, selectors, or
     * connection/endpoint types - for that, use `destroy()`.
     * @public
     */
    reset(): void;
    /**
     * Clears the instance and unbinds any listeners on the instance. After you call this method you cannot use this
     * instance of jsPlumb again.
     * @public
     */
    destroy(): void;
    /**
     * Gets all registered endpoints for the given element.
     * @param el
     */
    getEndpoints(el: T["E"]): Array<Endpoint>;
    /**
     * Retrieve an endpoint by its UUID.
     * @param uuid
     */
    getEndpoint(uuid: string): Endpoint;
    /**
     * Set an endpoint's uuid, updating the internal map
     * @param endpoint
     * @param uuid
     */
    setEndpointUuid(endpoint: Endpoint, uuid: string): void;
    /**
     * Connect one element to another.
     * @param params - At the very least you need to supply a source and target.
     * @param referenceParams - Optional extra parameters. This can be useful when you're creating multiple connections that have some things in common.
     */
    connect(params: ConnectParams<T["E"]>, referenceParams?: ConnectParams<T["E"]>): Connection;
    /**
     * @param params
     * @param referenceParams
     * @internal
     */
    private _prepareConnectionParams;
    /**
     * Creates and registers a new connection. For internal use only. Use `connect` to create Connections.
     * @param params
     * @internal
     */
    _newConnection(params: ConnectionOptions<T["E"]>): Connection;
    /**
     * Adds the connection to the backing model, fires an event if necessary and then redraws. This is a package-private method, not intended to be
     * called by external code.
     * @param jpc - Connection to finalise
     * @param params
     * @param originalEvent - Optional original event that resulted in the creation of this connection.
     * @internal
     */
    _finaliseConnection(jpc: Connection, params?: any, originalEvent?: Event): void;
    /**
     * Remove every endpoint registered to the given element.
     * @param el - Element to remove endpoints for.
     * @param recurse - If true, also remove endpoints for elements that are descendants of this element.
     */
    removeAllEndpoints(el: T["E"], recurse?: boolean): JsPlumbInstance;
    protected _createSourceDefinition(params?: BehaviouralTypeDescriptor, referenceParams?: BehaviouralTypeDescriptor): SourceDefinition;
    /**
     * Registers a selector for connection drag on the instance. This is a newer version of the `makeSource` functionality
     * that had been in jsPlumb since the early days (and which, in 5.x, has been removed). With this approach, rather than calling `makeSource` on every element, you
     * can register a CSS selector on the instance that identifies something that is common to your elements. This will only respond to
     * mouse/touch events on elements that are managed by the instance.
     * @param selector - CSS3 selector identifying child element(s) of some managed element that should act as a connection source.
     * @param params - Options for the source: connector type, behaviour, etc.
     * @param exclude - If true, the selector defines an 'exclusion': anything _except_ elements that match this.
     * @public
     */
    addSourceSelector(selector: string, params?: BehaviouralTypeDescriptor, exclude?: boolean): ConnectionDragSelector;
    /**
     * Unregister the given source selector.
     * @param selector
     * @public
     */
    removeSourceSelector(selector: ConnectionDragSelector): void;
    /**
     * Unregister the given target selector.
     * @param selector
     * @public
     */
    removeTargetSelector(selector: ConnectionDragSelector): void;
    /**
     * Registers a selector for connection drag on the instance. This is a newer version of the `makeTarget` functionality
     * that has been in jsPlumb since the early days. With this approach, rather than calling `makeTarget` on every element, you
     * can register a CSS selector on the instance that identifies something that is common to your elements. This will only respond to
     * mouse events on elements that are managed by the instance.
     * @param selector - CSS3 selector identifying child element(s) of some managed element that should act as a connection target.
     * @param params - Options for the target
     * @param exclude - If true, the selector defines an 'exclusion': anything _except_ elements that match this.
     * @public
     */
    addTargetSelector(selector: string, params?: BehaviouralTypeDescriptor, exclude?: boolean): ConnectionDragSelector;
    private _createTargetDefinition;
    show(el: T["E"], changeEndpoints?: boolean): JsPlumbInstance;
    hide(el: T["E"], changeEndpoints?: boolean): JsPlumbInstance;
    /**
     * private method to do the business of toggling hiding/showing.
     */
    private _setVisible;
    toggleVisible(el: T["E"], changeEndpoints?: boolean): void;
    private _operation;
    /**
     * Register a connection type: a set of connection attributes grouped together with an ID.
     * @param id
     * @param type
     * @public
     */
    registerConnectionType(id: string, type: ConnectionTypeDescriptor): void;
    /**
     * Register a set of connection types
     * @param types Set of types to register.
     * @public
     */
    registerConnectionTypes(types: Record<string, ConnectionTypeDescriptor>): void;
    /**
     * Register an endpoint type: a set of endpoint attributes grouped together with an ID.
     * @param id
     * @param type
     * @public
     */
    registerEndpointType(id: string, type: EndpointTypeDescriptor): void;
    /**
     * Register a set of endpoint types
     * @param types Set of types to register.
     * @public
     */
    registerEndpointTypes(types: Record<string, EndpointTypeDescriptor>): void;
    /**
     * Retrieve an endpoint or connection type by its id.
     * @param id
     * @param typeDescriptor
     * @public
     */
    getType(id: string, typeDescriptor: string): TypeDescriptor;
    /**
     * Retrieve a connection type by its id.
     * @param id
     * @public
     */
    getConnectionType(id: string): ConnectionTypeDescriptor;
    /**
     * Retrieve an endpoint type by its id.
     * @param id
     * @public
     */
    getEndpointType(id: string): EndpointTypeDescriptor;
    /**
     * Import the given set of defaults to the instance.
     * @param d
     * @public
     */
    importDefaults(d: JsPlumbDefaults<T["E"]>): JsPlumbInstance;
    /**
     * Reset the instance defaults to the defaults computed by the constructor.
     * @public
     */
    restoreDefaults(): JsPlumbInstance;
    /**
     * Gets all of the elements managed by this instance.
     * @public
     */
    getManagedElements(): Record<string, ManagedElement<T["E"]>>;
    /**
     * @internal
     * @param connection
     * @param index
     * @param proxyEl
     * @param endpointGenerator
     * @param anchorGenerator
     */
    proxyConnection(connection: Connection, index: number, proxyEl: T["E"], endpointGenerator: (c: Connection, idx: number) => EndpointSpec, anchorGenerator: (c: Connection, idx: number) => AnchorSpec): void;
    /**
     * @internal
     * @param connection
     * @param index
     */
    unproxyConnection(connection: Connection, index: number): void;
    /**
     * @internal
     * @param originalId
     * @param newId
     * @param connection
     * @param newElement
     * @param index
     */
    sourceOrTargetChanged(originalId: string, newId: string, connection: Connection, newElement: T["E"], index: number): void;
    abstract setGroupVisible(group: UIGroup, state: boolean): void;
    /**
     * Gets the group with given id, null if not found.
     * @param groupId
     * @public
     */
    getGroup(groupId: string): UIGroup<T["E"]>;
    /**
     * Gets the group associated with the given element, null if the given element does not map to a group.
     * @param el
     * @public
     */
    getGroupFor(el: T["E"]): UIGroup<T["E"]>;
    /**
     * Add a group.
     * @param params
     * @public
     */
    addGroup(params: AddGroupOptions<T["E"]>): UIGroup<T["E"]>;
    /**
     * Add an element to a group
     * @param group
     * @param el
     * @public
     */
    addToGroup(group: string | UIGroup<T["E"]>, ...el: Array<T["E"]>): void;
    /**
     * Collapse a group.
     * @param group
     * @public
     */
    collapseGroup(group: string | UIGroup<T["E"]>): void;
    /**
     * Expand a group.
     * @param group
     * @public
     */
    expandGroup(group: string | UIGroup<T["E"]>): void;
    /**
     * Expand a group if it is collapsed, or collapse it if it is expanded.
     * @param group
     * @public
     */
    toggleGroup(group: string | UIGroup<T["E"]>): void;
    /**
     * Remove a group from this instance of jsPlumb.
     * @param group - Group to remove
     * @param deleteMembers - Whether or not to also delete any members of the group. If this is false (the default) then
     * group members will be removed before the group is deleted.
     * @param _manipulateView - Not for public usage. Used internally.
     * @param _doNotFireEvent - Not recommended for public usage, used internally.
     * @public
     */
    removeGroup(group: string | UIGroup<T["E"]>, deleteMembers?: boolean, _manipulateView?: boolean, _doNotFireEvent?: boolean): Record<string, PointXY>;
    /**
     * Remove all groups from this instance of jsPlumb
     * @param deleteMembers
     * @param _manipulateView - Not for public usage. Used internally.
     * @public
     */
    removeAllGroups(deleteMembers?: boolean, _manipulateView?: boolean): void;
    /**
     * Remove an element from a group
     * @param group - Group to remove element from
     * @param el - Element to remove.
     * @param _doNotFireEvent - Not for public usage. Used internally.
     * @public
     */
    removeFromGroup(group: string | UIGroup<T["E"]>, el: T["E"], _doNotFireEvent?: boolean): void;
    /**
     * @internal
     * @param endpoint
     * @param params
     * @private
     */
    _paintEndpoint(endpoint: Endpoint, params: {
        timestamp?: string;
        offset?: ViewportElement<T["E"]>;
        recalc?: boolean;
        elementWithPrecedence?: string;
        connectorPaintStyle?: PaintStyle;
        anchorLoc?: AnchorPlacement;
    }): void;
    /**
     * @internal
     * @param connection
     * @param params
     */
    _paintConnection(connection: Connection, params?: {
        timestamp?: string;
    }): void;
    /**
     * Adds an overlay to the given component, repainting the UI as necessary.
     * @param component - A Connection or Endpoint to add the overlay to
     * @param overlay - Spec for the overlay
     * @param doNotRevalidate - Defaults to true. If false, a repaint won't occur after adding the overlay. This flag can be used when adding
     * several overlays in a loop.
     * @public
     */
    addOverlay(component: Component, overlay: OverlaySpec, doNotRevalidate?: boolean): void;
    /**
     * Remove the overlay with the given id from the given component.
     * @param component - Component to remove the overlay from.
     * @param overlayId - ID of the overlay to remove.
     * @public
     */
    removeOverlay(component: Component, overlayId: string): void;
    /**
     * Set the outline color for the given connection
     * @param conn
     * @param color
     * @public
     */
    setOutlineColor(conn: Connection, color: string): void;
    /**
     * Sets the outline width for the given connection
     * @param conn
     * @param width
     * @public
     */
    setOutlineWidth(conn: Connection, width: number): void;
    /**
     * Sets the color of the connection.
     * @param conn
     * @param color
     * @public
     */
    setColor(conn: Connection, color: string): void;
    /**
     * Sets the line width of the connection
     * @param conn
     * @param width
     * @public
     */
    setLineWidth(conn: Connection, width: number): void;
    /**
     * Sets color, outline color, line width and outline width.
     * Any values for which the key is present will not be set, but if
     * the key is present and the value is null, the corresponding value in
     * the connection's paint style will be set to null.
     * @param conn
     * @param style
     * @public
     */
    setLineStyle(conn: Connection, style: {
        lineWidth?: number;
        outlineWidth?: number;
        color?: string;
        outlineColor?: string;
    }): void;
    /**
     * For some given element, find any other elements we want to draw whenever that element
     * is being drawn. for groups, for example, this means any child elements of the group. For an element that has child
     * elements that are also managed, it means those child elements.
     * @param el
     * @internal
     */
    abstract _getAssociatedElements(el: T["E"]): Array<T["E"]>;
    abstract _removeElement(el: T["E"]): void;
    abstract _appendElement(el: T["E"], parent: T["E"]): void;
    abstract _appendElementToGroup(group: UIGroup, e: T["E"]): void;
    abstract _appendElementToContainer(e: T["E"]): void;
    abstract removeClass(el: T["E"] | ArrayLike<T["E"]>, clazz: string): void;
    abstract addClass(el: T["E"] | ArrayLike<T["E"]>, clazz: string): void;
    abstract toggleClass(el: T["E"] | ArrayLike<T["E"]>, clazz: string): void;
    abstract getClass(el: T["E"]): string;
    abstract hasClass(el: T["E"], clazz: string): boolean;
    abstract setAttribute(el: T["E"], name: string, value: string): void;
    abstract getAttribute(el: T["E"], name: string): string;
    abstract setAttributes(el: T["E"], atts: Record<string, string>): void;
    abstract removeAttribute(el: T["E"], attName: string): void;
    abstract getSelector(ctx: string | T["E"], spec?: string): ArrayLike<T["E"]>;
    abstract getStyle(el: T["E"], prop: string): any;
    abstract getSize(el: T["E"]): Size;
    abstract getOffset(el: T["E"]): PointXY;
    abstract getOffsetRelativeToRoot(el: T["E"] | string): PointXY;
    abstract getGroupContentArea(group: UIGroup): T["E"];
    abstract setPosition(el: T["E"], p: PointXY): void;
    abstract on(el: Document | T["E"] | ArrayLike<T["E"]>, event: string, callbackOrSelector: Function | string, callback?: Function): void;
    abstract off(el: Document | T["E"] | ArrayLike<T["E"]>, event: string, callback: Function): void;
    abstract trigger(el: Document | T["E"], event: string, originalEvent?: Event, payload?: any, detail?: number): void;
    /**
     * @internal
     * @param connector
     */
    getPathData(connector: ConnectorBase): any;
    /**
     * @internal
     * @param o
     * @param params
     * @param extents
     */
    abstract _paintOverlay(o: OverlayBase, params: any, extents: any): void;
    abstract addOverlayClass(o: OverlayBase, clazz: string): void;
    abstract removeOverlayClass(o: OverlayBase, clazz: string): void;
    abstract setOverlayVisible(o: OverlayBase, visible: boolean): void;
    abstract destroyOverlay(o: OverlayBase): void;
    abstract updateLabel(o: LabelOverlay): void;
    abstract drawOverlay(overlay: OverlayBase, component: Component, paintStyle: PaintStyle, absolutePosition?: PointXY): any;
    abstract reattachOverlay(o: OverlayBase, c: Component): void;
    abstract setOverlayHover(o: OverlayBase, hover: boolean): void;
    abstract setHover(component: Component, hover: boolean): void;
    /**
     * @internal
     * @param connector
     * @param paintStyle
     * @param extents
     */
    abstract paintConnector(connector: ConnectorBase, paintStyle: PaintStyle, extents?: Extents): void;
    /**
     * @internal
     * @param connection
     * @param force
     */
    abstract destroyConnector(connection: Connection, force?: boolean): void;
    /**
     * @internal
     * @param connector
     * @param h
     * @param sourceEndpoint
     */
    abstract setConnectorHover(connector: ConnectorBase, h: boolean, sourceEndpoint?: Endpoint): void;
    /**
     * @internal
     * @param connector
     * @param clazz
     */
    abstract addConnectorClass(connector: ConnectorBase, clazz: string): void;
    abstract removeConnectorClass(connector: ConnectorBase, clazz: string): void;
    abstract getConnectorClass(connector: ConnectorBase): string;
    abstract setConnectorVisible(connector: ConnectorBase, v: boolean): void;
    abstract applyConnectorType(connector: ConnectorBase, t: TypeDescriptor): void;
    abstract applyEndpointType(ep: Endpoint, t: TypeDescriptor): void;
    abstract setEndpointVisible(ep: Endpoint, v: boolean): void;
    abstract destroyEndpoint(ep: Endpoint): void;
    abstract renderEndpoint(ep: Endpoint, paintStyle: PaintStyle): void;
    abstract addEndpointClass(ep: Endpoint, c: string): void;
    abstract removeEndpointClass(ep: Endpoint, c: string): void;
    abstract getEndpointClass(ep: Endpoint): string;
    abstract setEndpointHover(endpoint: Endpoint, h: boolean, endpointIndex: number, doNotCascade?: boolean): void;
}

export declare const KEY_CONNECTION_OVERLAYS = "connectionOverlays";

export declare interface LabelOverlay extends OverlayBase {
    label: string | Function;
    labelText: string;
    cachedDimensions: Size;
}

export declare const Labels: {
    setLabel(overlay: LabelOverlay, l: string | Function): void;
    getLabel(overlay: LabelOverlay): string;
};

export declare const LEFT = FaceValues.left;

export declare interface LightweightAnchor {
    locations: Array<AnchorRecord>;
    currentLocation: number;
    locked: boolean;
    id: string;
    cssClass: string;
    isContinuous: boolean;
    isFloating: boolean;
    isDynamic: boolean;
    timestamp: string;
    type: string;
    computedPosition?: ComputedPosition;
}

export declare interface LightweightContinuousAnchor extends LightweightAnchor {
    faces: Array<Face>;
    lockedFace: Face;
    isContinuous: true;
    isDynamic: false;
    currentFace: Face;
    lockedAxis: Axis;
    clockwise: boolean;
}

export declare class LightweightFloatingAnchor implements LightweightAnchor {
    instance: JsPlumbInstance;
    element: Element;
    isFloating: boolean;
    isContinuous: false;
    isDynamic: false;
    locations: Array<AnchorRecord>;
    currentLocation: number;
    locked: boolean;
    cssClass: string;
    timestamp: string;
    type: string;
    id: string;
    orientation: Orientation;
    size: Size;
    constructor(instance: JsPlumbInstance, element: Element, elementId: string);
    private _updateOrientationInRouter;
    /**
     * notification the endpoint associated with this anchor is hovering
     * over another anchor; we want to assume that anchor's orientation
     * for the duration of the hover.
     */
    over(endpoint: Endpoint): void;
    /**
     * notification the endpoint associated with this anchor is no
     * longer hovering over another anchor; we should resume calculating
     * orientation as we normally do.
     */
    out(): void;
}

export declare interface LightweightPerimeterAnchor extends LightweightAnchor {
    shape: PerimeterAnchorShapes;
}

export declare class LightweightRouter<T extends {
    E: unknown;
}> implements Router<T, LightweightAnchor> {
    instance: JsPlumbInstance;
    anchorLists: Map<string, AnchorLists>;
    anchorLocations: Map<string, AnchorPlacement>;
    constructor(instance: JsPlumbInstance);
    getAnchorOrientation(anchor: LightweightAnchor): Orientation;
    private _distance;
    private _anchorSelector;
    private _floatingAnchorCompute;
    private _setComputedPosition;
    private _computeSingleLocation;
    /**
     * Computes the position for an anchor that has only a single location. This is analogous to the
     * original `Anchor` class.
     * @param anchor
     * @param params
     * @internal
     */
    private _singleAnchorCompute;
    /**
     * Computes the position for an anchor that is neither floating nor continuous. This case covers what
     * was previously both DynamicAnchor and Anchor, since those concepts have now been folded into
     * a single concept - any given anchor has one or more locations.
     * @param anchor
     * @param params
     */
    private _defaultAnchorCompute;
    private _placeAnchors;
    private _updateAnchorList;
    private _removeEndpointFromAnchorLists;
    computeAnchorLocation(anchor: LightweightAnchor, params: AnchorComputeParams): AnchorPlacement;
    computePath(connection: Connection<any>, timestamp: string): void;
    getEndpointLocation(endpoint: Endpoint, params: AnchorComputeParams): AnchorPlacement;
    getEndpointOrientation(ep: Endpoint): Orientation;
    setAnchorOrientation(anchor: LightweightAnchor, orientation: Orientation): void;
    isDynamicAnchor(ep: Endpoint): boolean;
    isFloating(ep: Endpoint): boolean;
    prepareAnchor(params: AnchorSpec | Array<AnchorSpec>): LightweightAnchor;
    redraw(elementId: string, timestamp?: string, offsetToUI?: PointXY): RedrawResult;
    reset(): void;
    setAnchor(endpoint: Endpoint, anchor: LightweightAnchor): void;
    setConnectionAnchors(conn: Connection<any>, anchors: [LightweightAnchor, LightweightAnchor]): void;
    private _calculateOrientation;
    /**
     * @internal
     * @param a
     * @param face
     * @param overrideLock
     */
    setCurrentFace(a: LightweightContinuousAnchor, face: Face, overrideLock?: boolean): void;
    /**
     * @internal
     * @param a
     */
    lock(a: LightweightAnchor): void;
    /**
     * @internal
     * @param a
     */
    unlock(a: LightweightAnchor): void;
    /**
     * Attempts to set the location in the given anchor whose x/y matches the coordinates given. An anchor may have more than
     * one declared location. This method provides a means for setting the active location based upon matching its x/y values.
     * @param a
     * @param coords
     * @returns true if a matching location was found and activated, false if not.
     * @internal
     */
    selectAnchorLocation(a: LightweightAnchor, coords: {
        x: number;
        y: number;
    }): boolean;
    /**
     * @internal
     * @param a
     */
    lockCurrentAxis(a: LightweightContinuousAnchor): void;
    /**
     * @internal
     * @param a
     */
    unlockCurrentAxis(a: LightweightContinuousAnchor): void;
    /**
     * Returns whether or not the two anchors represent the same location.
     * @param a1
     * @param a2
     * @internal
     */
    anchorsEqual(a1: LightweightAnchor, a2: LightweightAnchor): boolean;
}

export declare function lineIntersection(connector: ConnectorBase, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;

export declare interface ListSpec {
    endpoint?: EndpointSpec;
}

export declare function makeLightweightAnchorFromSpec(spec: AnchorSpec | Array<AnchorSpec>): LightweightAnchor;

export declare type ManagedElement<E> = {
    el: jsPlumbElement<E>;
    viewportElement?: ViewportElement<E>;
    endpoints?: Array<Endpoint>;
    connections?: Array<Connection>;
    rotation?: number;
    group?: string;
    data: Record<string, Record<string, any>>;
};

/**
 * Payload for an element managed event
 * @public
 */
export declare interface ManageElementParams<E = any> {
    el: E;
}

export declare const NONE = "none";

export declare type Orientation = [AnchorOrientationHint, AnchorOrientationHint];

export declare interface OverlayBase {
    type: string;
    id: string;
    component: Component;
    cssClass: string;
    attributes: Record<string, string>;
    visible: boolean;
    _listeners: Record<string, Array<Function>>;
    location: number | Array<number>;
    instance: JsPlumbInstance;
}

export declare const OverlayFactory: {
    get(instance: JsPlumbInstance, name: string, component: Component, params: any): OverlayBase;
    register(name: string, overlay: OverlayHandler<any>): void;
    updateFrom(overlay: OverlayBase, d: any): void;
    draw(overlay: OverlayBase, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY): any;
};

export declare interface OverlayHandler<OptionsClass> {
    draw(overlay: OverlayBase, component: Component, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY): any;
    create(instance: JsPlumbInstance, component: Component, options: OptionsClass): OverlayBase;
    updateFrom(overlay: OverlayBase, d: any): void;
}

export declare interface OverlayMouseEventParams {
    e: Event;
    overlay: OverlayBase;
}

export declare const Overlays: {
    setLocation(overlay: OverlayBase, l: number | string): void;
    setVisible(overlay: OverlayBase, v: boolean): void;
};

/**
 * @internal
 */
export declare interface PaintGeometry {
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

export declare interface PlainArrowOverlay extends ArrowOverlay {
}

export declare function pointAlongComponentPathFrom(connector: ConnectorBase, location: number, distance: number, absolute?: boolean): PointXY;

export declare function pointOnComponentPath(connector: ConnectorBase, location: number, absolute?: boolean): PointXY;

export declare interface RectangleEndpoint extends EndpointRepresentation<ComputedRectangleEndpoint> {
    width: number;
    height: number;
}

export declare const RectangleEndpointHandler: EndpointHandler<RectangleEndpoint, ComputedRectangleEndpoint>;

export declare interface RedrawResult {
    c: Set<Connection>;
    e: Set<Endpoint>;
}

/**
 * Indicates that when dragging an existing connection by its source endpoint, it can be relocated onto some other source element by
 * dropping it anywhere on that element.
 * @public
 */
export declare const REDROP_POLICY_ANY = "any";

/**
 * Indicates that when dragging an existing connection by its source endpoint, it can be relocated onto any other source element, by dropping
 * it anywhere on a source element. But it cannot be dropped onto any target element. This flag is equivalent to `REDROP_POLICY_ANY` but with the
 * stipulation that the element on which the connections is being dropped must itself be configured with one or more source selectors.
 * @public
 */
export declare const REDROP_POLICY_ANY_SOURCE = "anySource";

/**
 * This flag is the union of REDROP_POLICY_ANY_TARGET and REDROP_POLICY_ANY_SOURCE
 * @public
 */
export declare const REDROP_POLICY_ANY_SOURCE_OR_TARGET = "anySourceOrTarget";

/**
 * Indicates that when dragging an existing connection by its target endpoint, it can be relocated onto any other target element, by dropping
 * it anywhere on a target element. But it cannot be dropped onto any source element. This flag is equivalent to `REDROP_POLICY_ANY` but with the
 * stipulation that the element on which the connections is being dropped must itself be configured with one or more target selectors.
 * @public
 */
export declare const REDROP_POLICY_ANY_TARGET = "anyTarget";

/**
 * Indicates that when dragging an existing connection by its source endpoint, it can only be relocated onto some other source element by
 * dropping it on the part of that element defined by its source selector.
 * @public
 */
export declare const REDROP_POLICY_STRICT = "strict";

/**
 * Defines how redrop of source endpoints can be done.
 * @public
 */
export declare type RedropPolicy = typeof REDROP_POLICY_STRICT | typeof REDROP_POLICY_ANY | typeof REDROP_POLICY_ANY_SOURCE | typeof REDROP_POLICY_ANY_TARGET | typeof REDROP_POLICY_ANY_SOURCE_OR_TARGET;

export declare const REMOVE_CLASS_ACTION = "remove";

export declare function _removeTypeCssHelper<E>(component: Component, typeId: string): void;

export declare function resetBounds(connector: ConnectorBase): void;

export declare function resetGeometry(connector: ConnectorBase): void;

export declare const RIGHT = FaceValues.right;

export declare interface Router<T extends {
    E: unknown;
}, A> {
    reset(): void;
    redraw(elementId: string, timestamp?: string, offsetToUI?: PointXY): RedrawResult;
    computePath(connection: Connection, timestamp: string): void;
    computeAnchorLocation(anchor: A, params: AnchorComputeParams): AnchorPlacement;
    getEndpointLocation(endpoint: Endpoint, params: AnchorComputeParams): AnchorPlacement;
    getEndpointOrientation(endpoint: Endpoint): Orientation;
    setAnchorOrientation(anchor: A, orientation: Orientation): void;
    setAnchor(endpoint: Endpoint, anchor: A): void;
    prepareAnchor(params: AnchorSpec | Array<AnchorSpec>): A;
    setConnectionAnchors(conn: Connection, anchors: [A, A]): void;
    isDynamicAnchor(ep: Endpoint): boolean;
    isFloating(ep: Endpoint): boolean;
    setCurrentFace(a: LightweightContinuousAnchor, face: Face, overrideLock?: boolean): void;
    lock(a: A): void;
    unlock(a: A): void;
    anchorsEqual(a: A, b: A): boolean;
    selectAnchorLocation(a: A, coords: {
        x: number;
        y: number;
    }): boolean;
}

/**
 * Identifer for arc segments.
 * @public
 */
export declare const SEGMENT_TYPE_ARC = "Arc";

/**
 * Identifier for straight segments.
 * @public
 */
export declare const SEGMENT_TYPE_STRAIGHT = "Straight";

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

export declare interface SegmentHandler<T extends Segment> {
    getLength(s: T): number;
    getPath(s: T, isFirstSegment: boolean): string;
    gradientAtPoint(s: T, location: number, absolute?: boolean): number;
    pointAlongPathFrom(s: T, location: number, distance: number, absolute?: boolean): PointXY;
    gradientAtPoint(s: T, location: number, absolute?: boolean): number;
    pointOnPath(s: T, location: number, absolute?: boolean): PointXY;
    findClosestPointOnPath(s: T, x: number, y: number): PointNearPath;
    lineIntersection(s: T, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
    boxIntersection(s: T, x: number, y: number, w: number, h: number): Array<PointXY>;
    boundingBoxIntersection(segment: T, box: BoundingBox): Array<PointXY>;
    create(segmentType: string, params: any): T;
}

export declare const Segments: {
    register: (segmentType: string, segmentHandler: SegmentHandler<any>) => void;
    get: (segmentType: string) => SegmentHandler<any>;
};

export declare interface SelectEndpointOptions<E> extends AbstractSelectOptions<E> {
    element?: ElementSelectionSpecifier<E>;
}

/**
 * Base class for selections of endpoints or connections.
 * @public
 */
declare class SelectionBase<T extends Component> {
    protected instance: JsPlumbInstance;
    protected entries: Array<T>;
    constructor(instance: JsPlumbInstance, entries: Array<T>);
    get length(): number;
    each(handler: (arg0: T) => void): SelectionBase<T>;
    get(index: number): T;
    addClass(clazz: string, cascade?: boolean): SelectionBase<T>;
    removeClass(clazz: string, cascade?: boolean): SelectionBase<T>;
    removeAllOverlays(): SelectionBase<T>;
    setLabel(label: string): SelectionBase<T>;
    clear(): this;
    map<Q>(fn: (entry: T) => Q): Array<Q>;
    addOverlay(spec: OverlaySpec): SelectionBase<T>;
    removeOverlay(id: string): SelectionBase<T>;
    removeOverlays(): SelectionBase<T>;
    showOverlay(id: string): SelectionBase<T>;
    hideOverlay(id: string): SelectionBase<T>;
    setPaintStyle(style: PaintStyle): SelectionBase<T>;
    setHoverPaintStyle(style: PaintStyle): SelectionBase<T>;
    setParameter(name: string, value: string): SelectionBase<T>;
    setParameters(p: Record<string, string>): SelectionBase<T>;
    setVisible(v: boolean): SelectionBase<T>;
    addType(name: string): SelectionBase<T>;
    toggleType(name: string): SelectionBase<T>;
    removeType(name: string): SelectionBase<T>;
    setHover(h: boolean): SelectionBase<T>;
}

export declare type SelectionList = '*' | Array<string>;

export declare interface SelectOptions<E> extends AbstractSelectOptions<E> {
    connections?: Array<Connection>;
}

export declare const SELECTOR_MANAGED_ELEMENT: string;

/**
 * Sets the geometry on some connector, and the `edited` flag if appropriate.
 * @param connector
 * @param g
 * @param internal
 */
export declare function setGeometry(connector: ConnectorBase, g: Geometry, internal: boolean): void;

/**
 * Sets a connector that has been prepared on a Connection, removing any previous connector, and caching by type if necessary.
 * @param connection
 * @param connector
 * @param doNotRepaint
 * @param doNotChangeListenerComponent
 * @param typeId
 * @internal
 */
export declare function setPreparedConnector(connection: Connection, connector: ConnectorBase, doNotRepaint?: boolean, doNotChangeListenerComponent?: boolean, typeId?: string): void;

export declare const SOURCE = "source";

export declare const SOURCE_INDEX = 0;

/**
 * Defines the supported options on an `addSourceSelector` call.
 * @public
 */
export declare interface SourceDefinition extends SourceOrTargetDefinition {
}

/**
 * Base interface for source/target definitions
 * @public
 */
export declare interface SourceOrTargetDefinition {
    enabled?: boolean;
    def: BehaviouralTypeDescriptor;
    endpoint?: Endpoint;
    maxConnections?: number;
    uniqueEndpoint?: boolean;
}

export declare const STATIC = "static";

export declare interface StraightConnector extends ConnectorBase {
    type: typeof CONNECTOR_TYPE_STRAIGHT;
}

export declare interface StraightConnectorGeometry {
    source: AnchorPlacement;
    target: AnchorPlacement;
}

/**
 * Defines a straight segment.
 * @interna;
 */
export declare interface StraightSegment extends Segment {
    length: number;
    m: number;
    m2: number;
}

/**
 * @internal
 */
export declare type StraightSegmentCoordinates = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

/**
 * @internal
 */
export declare interface StraightSegmentParams extends SegmentParams {
}

export declare const TARGET = "target";

export declare const TARGET_INDEX = 1;

/**
 * Defines the supported options on an `addTargetSelector` call.
 * @public
 */
export declare interface TargetDefinition extends SourceOrTargetDefinition {
}

export declare const TOP = FaceValues.top;

/**
 * Transform the given anchor placement by dx,dy
 * @internal
 * @param a
 * @param dx
 * @param dy
 */
export declare function transformAnchorPlacement(a: AnchorPlacement, dx: number, dy: number): AnchorPlacement;

/**
 * @internal
 */
export declare type TranslatedViewportElement<E> = Omit<TranslatedViewportElementBase<E>, "dirty">;

/**
 * @internal
 */
export declare interface TranslatedViewportElementBase<E> extends ViewportElementBase<E> {
    cr: number;
    sr: number;
}

export declare const TYPE_DESCRIPTOR_CONNECTION = "connection";

export declare const TYPE_DESCRIPTOR_CONNECTOR = "connector";

export declare const TYPE_DESCRIPTOR_ENDPOINT = "endpoint";

export declare const TYPE_DESCRIPTOR_ENDPOINT_REPRESENTATION = "endpoint-representation";

export declare const TYPE_ENDPOINT_BLANK = "Blank";

export declare const TYPE_ENDPOINT_DOT = "Dot";

export declare const TYPE_ENDPOINT_RECTANGLE = "Rectangle";

export declare const TYPE_ID_CONNECTION = "_jsplumb_connection";

/**
 * @internal
 */
export declare const TYPE_ITEM_ANCHORS = "anchors";

/**
 * @internal
 */
export declare const TYPE_ITEM_CONNECTOR = "connector";

export declare const TYPE_OVERLAY_ARROW = "Arrow";

export declare const TYPE_OVERLAY_CUSTOM = "Custom";

export declare const TYPE_OVERLAY_DIAMOND = "Diamond";

export declare const TYPE_OVERLAY_LABEL = "Label";

export declare const TYPE_OVERLAY_PLAIN_ARROW = "PlainArrow";

/**
 * Base interface for type descriptors for public methods.
 * @public
 */
export declare interface TypeDescriptor extends TypeDescriptorBase {
    /**
     * Array of overlays to add.
     */
    overlays?: Array<OverlaySpec>;
}

/**
 * Base interface for endpoint/connection types, which are registered via `registerConnectionType` and `registerEndpointType`. This interface
 * contains parameters that are common between the two types, and is shared by internal methods and public methods.
 * @public
 */
export declare interface TypeDescriptorBase {
    /**
     * CSS class to add to the given component's representation in the UI
     */
    cssClass?: string;
    /**
     * Paint style to use for the component.
     */
    paintStyle?: PaintStyle;
    /**
     * Paint style to use for the component when the pointer is hovering over it.
     */
    hoverPaintStyle?: PaintStyle;
    /**
     * Optional set of parameters to store on the component that is generated from this type.
     */
    parameters?: Record<string, any>;
    /**
     * [source, target] anchor specs for edges.
     */
    anchors?: [AnchorSpec, AnchorSpec];
    /**
     * Spec for the anchor to use for both source and target.
     */
    anchor?: AnchorSpec;
    /**
     * Provides a simple means for controlling connectivity in the UI.
     */
    scope?: string;
    /**
     * When merging a type description into its parent(s), values in the child for `connector`, `anchor` and `anchors` will
     * always overwrite any such values in the parent. But other values, such as `overlays`, will be merged with their
     * parent's entry for that key. You can force a child's type to override _every_ corresponding value in its parent by
     * setting `mergeStrategy:'override'`.
     */
    mergeStrategy?: string;
    /**
     * Spec for an endpoint created for this type.
     */
    endpoint?: EndpointSpec;
    /**
     * Paint style for connectors created for this type.
     */
    connectorStyle?: PaintStyle;
    /**
     * Paint style for connectors created for this type when pointer is hovering over the component.
     */
    connectorHoverStyle?: PaintStyle;
    /**
     * Spec for connectors created for this type.
     */
    connector?: ConnectorSpec;
    /**
     * Class to add to any connectors created for this type.
     */
    connectorClass?: string;
}

export declare class UIGroup<E = any> extends UINode<E> {
    instance: JsPlumbInstance;
    children: Array<UINode<E>>;
    collapsed: boolean;
    droppable: boolean;
    enabled: boolean;
    orphan: boolean;
    constrain: boolean;
    proxied: boolean;
    ghost: boolean;
    revert: boolean;
    prune: boolean;
    dropOverride: boolean;
    anchor: AnchorSpec;
    endpoint: EndpointSpec;
    readonly connections: {
        source: Array<Connection>;
        target: Array<Connection>;
        internal: Array<Connection>;
    };
    manager: GroupManager<E>;
    id: string;
    readonly elId: string;
    constructor(instance: JsPlumbInstance, el: E, options: GroupOptions);
    get contentArea(): any;
    add(_el: E, doNotFireEvent?: boolean): void;
    private resolveNode;
    remove(el: E, manipulateDOM?: boolean, doNotFireEvent?: boolean, doNotUpdateConnections?: boolean, targetGroup?: UIGroup<E>): void;
    private _doRemove;
    removeAll(manipulateDOM?: boolean, doNotFireEvent?: boolean): void;
    orphanAll(): Record<string, PointXY>;
    addGroup(group: UIGroup<E>): boolean;
    removeGroup(group: UIGroup<E>): void;
    getGroups(): Array<UIGroup<E>>;
    getNodes(): Array<UINode<E>>;
    get collapseParent(): UIGroup<E>;
}

export declare class UINode<E> {
    instance: JsPlumbInstance;
    el: E;
    group: UIGroup<E>;
    constructor(instance: JsPlumbInstance, el: E);
}

/**
 * Payload for an element unmanaged event.
 * @public
 */
export declare interface UnmanageElementParams<E = any> {
    el: E;
}

export declare function updateBounds(connector: ConnectorBase, segment: Segment): void;

export declare function _updateHoverStyle<E>(component: Component): void;

/**
 * Options for the UpdateOffset method
 * @internal
 */
export declare interface UpdateOffsetOptions {
    timestamp?: string;
    recalc?: boolean;
    elId?: string;
}

export declare function _updateSegmentProportions(connector: ConnectorBase): void;

export declare type UUID = string;

/**
 * Models the positions of the elements a given jsPlumb instance is tracking. Users of the API should not need to interact directly
 * with a Viewport.
 * @public
 */
export declare class Viewport<T extends {
    E: unknown;
}> {
    instance: JsPlumbInstance<T>;
    constructor(instance: JsPlumbInstance<T>);
    _sortedElements: Record<string, Array<[ViewportElement<any>, number]>>;
    _elementMap: Map<string, ViewportElement<T["E"]>>;
    _transformedElementMap: Map<string, TranslatedViewportElement<T["E"]>>;
    _bounds: Record<string, number>;
    private _updateBounds;
    private _recalculateBounds;
    /**
     * Updates the element with the given id. Any of the provided values may be null, in which case they are ignored (we never overwrite an
     * existing value with null).
     * @param id
     * @param x
     * @param y
     * @param width
     * @param height
     * @param rotation
     * @param doNotRecalculateBounds Defaults to false. For internal use. If true, does not update viewport bounds after updating the element.
     */
    updateElement(id: string, x: number, y: number, width: number, height: number, rotation: number, doNotRecalculateBounds?: boolean): ViewportElement<T["E"]>;
    /**
     * Update the size/offset of the element with the given id, and adjust viewport bounds.
     * @param elId
     * @param doNotRecalculateBounds If true, the viewport's bounds won't be recalculated after the element's size and position has been refreshed.
     */
    refreshElement(elId: string, doNotRecalculateBounds?: boolean): ViewportElement<T["E"]>;
    /**
     * These methods are called in only one place, but can be overridden
     * @param el
     * @internal
     */
    protected getSize(el: T["E"]): Size;
    /**
     * These methods are called in only one place, but can be overridden
     * @param el
     * @internal
     */
    protected getOffset(el: T["E"]): PointXY;
    /**
     * Creates an empty entry for an element with the given ID. The entry is marked 'dirty'.
     * @param doNotRecalculateBounds If true, the viewport's bounds won't be recalculated after the element has been registered.
     * @param id
     */
    registerElement(id: string, doNotRecalculateBounds?: boolean): ViewportElement<T["E"]>;
    /**
     * Adds the element with the given id, with the given values for x, y, width, height and rotation. Any of these may be null.
     * @param id
     * @param x
     * @param y
     * @param width
     * @param height
     * @param rotation
     */
    addElement(id: string, x: number, y: number, width: number, height: number, rotation: number): ViewportElement<T["E"]>;
    /**
     * Rotates the element with the given id, recalculating bounds afterwards.
     * @param id
     * @param rotation
     */
    rotateElement(id: string, rotation: number): ViewportElement<T["E"]>;
    /**
     * Gets the width of the content managed by the viewport, taking any rotated elements into account.
     */
    get boundsWidth(): number;
    /**
     * Gets the height of the content managed by the viewport, taking any rotated elements into account.
     */
    get boundsHeight(): number;
    /**
     * Gets the leftmost point of the content managed by the viewport, taking any rotated elements into account.
     */
    get boundsMinX(): number;
    /**
     * Gets the topmost of the content managed by the viewport, taking any rotated elements into account.
     */
    get boundsMinY(): number;
    /**
     * Informs the viewport that the element with the given ID has changed size.
     * @param id
     * @param w
     * @param h
     */
    sizeChanged(id: string, w: number, h: number): ViewportElement<T["E"]>;
    /**
     * Sets the [x,y] position of the element with the given ID, recalculating bounds.
     * @param id
     * @param x
     * @param y
     */
    positionChanged(id: string, x: number, y: number): ViewportElement<T["E"]>;
    /**
     * Clears the internal state of the viewport, removing all elements.
     */
    reset(): void;
    /**
     * Remove the element with the given ID from the viewport.
     * @param id
     */
    elementRemoved(id: string): void;
    /**
     * Gets the position of the element. This returns both the original position, and also the translated position of the element. Certain internal methods, such as the anchor
     * calculation code, use the unrotated position and then subsequently apply the element's rotation to any calculated positions.
     * Other parts of the codebase - the Toolkit's magnetizer or pan/zoom widget, for instance - are interested in the rotated position.
     * @param id
     */
    getPosition(id: string): ViewportElement<T["E"]>;
    /**
     * Get all elements managed by the Viewport.
     */
    getElements(): Map<string, ViewportElement<T["E"]>>;
    /**
     * Returns whether or not the viewport is empty.
     */
    isEmpty(): boolean;
}

/**
 * @internal
 */
export declare interface ViewportElement<E> extends ViewportElementBase<E> {
    t: TranslatedViewportElement<E>;
}

/**
 * @internal
 */
export declare interface ViewportElementBase<E> extends ViewportPosition {
    x2: number;
    y2: number;
    id: string;
}

/**
 * Definition of some element's location and rotation in the viewport.
 * @public
 */
export declare interface ViewportPosition extends PointXY {
    w: number;
    h: number;
    r: number;
    c: PointXY;
}

export declare const X_AXIS_FACES: Axis;

export declare const Y_AXIS_FACES: Axis;

export { }
