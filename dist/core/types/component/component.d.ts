import { Extents, PointXY } from "@jsplumb/util";
import { OverlayBase } from '../overlay/overlay';
import { ComponentTypeDescriptor } from '../type-descriptors';
import { JsPlumbInstance } from "../core";
import { Endpoint } from "../endpoint/endpoint";
import { BeforeDropParams } from '../callbacks';
import { LabelOverlay } from "../overlay/label-overlay";
import { OverlaySpec, PaintStyle } from "@jsplumb/common";
import { Connection } from '../connector/declarations';
export declare type ComponentParameters = Record<string, any>;
export declare function _removeTypeCssHelper<E>(component: Component, typeId: string): void;
export declare function _updateHoverStyle<E>(component: Component): void;
/**
 * Defines the method signature for the callback to the `beforeDetach` interceptor. Returning false from this method
 * prevents the connection from being detached. The interceptor is fired by the core, meaning that it will be invoked
 * regardless of whether the detach occurred programmatically, or via the mouse.
 * @public
 */
export declare type BeforeDetachInterceptor = (c: Connection) => boolean;
/**
 * Defines the method signature for the callback to the `beforeDrop` interceptor.
 * @public
 */
export declare type BeforeDropInterceptor = (params: BeforeDropParams) => boolean;
/**
 * The parameters passed to a `beforeDrag` interceptor.
 * @public
 */
export interface BeforeDragParams<E> {
    endpoint: Endpoint;
    source: E;
    sourceId: string;
    connection: Connection;
}
/**
 * The parameters passed to a `beforeStartDetach` interceptor.
 * @public
 */
export interface BeforeStartDetachParams<E> extends BeforeDragParams<E> {
}
/**
 * Defines the method signature for the callback to the `beforeDrag` interceptor. This method can return boolean `false` to
 * abort the connection drag, or it can return an object containing values that will be used as the `data` for the connection
 * that is created.
 * @public
 */
export declare type BeforeDragInterceptor<E = any> = (params: BeforeDragParams<E>) => boolean | Record<string, any>;
/**
 * Defines the method signature for the callback to the `beforeStartDetach` interceptor.
 * @public
 */
export declare type BeforeStartDetachInterceptor<E = any> = (params: BeforeStartDetachParams<E>) => boolean;
/**
 * @internal
 */
export interface ComponentOptions {
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
export declare const ADD_CLASS_ACTION = "add";
export declare const REMOVE_CLASS_ACTION = "remove";
/**
 * @internal
 */
export declare type ClassAction = typeof ADD_CLASS_ACTION | typeof REMOVE_CLASS_ACTION;
/**
 * @internal
 */
export interface Component {
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
export declare function createComponentBase(instance: JsPlumbInstance, idPrefix: string, typeDescriptor: string, defaultOverlayKey: string, defaultType: Record<string, any>, defaultLabelLocation: number | [number, number], params?: ComponentOptions): Component;
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
     * @internal
     */
    isVisible(component: Component): boolean;
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
//# sourceMappingURL=component.d.ts.map