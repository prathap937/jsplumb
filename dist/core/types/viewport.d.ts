import { Size, PointXY } from '@jsplumb/util';
import { JsPlumbInstance } from "./core";
/**
 * Definition of some element's location and rotation in the viewport.
 * @public
 */
export interface ViewportPosition extends PointXY {
    w: number;
    h: number;
    r: number;
    c: PointXY;
}
/**
 * @internal
 */
export interface ViewportElementBase<E> extends ViewportPosition {
    x2: number;
    y2: number;
    id: string;
}
/**
 * @internal
 */
export interface ViewportElement<E> extends ViewportElementBase<E> {
    t: TranslatedViewportElement<E>;
}
/**
 * @internal
 */
export interface TranslatedViewportElementBase<E> extends ViewportElementBase<E> {
    cr: number;
    sr: number;
}
/**
 * @internal
 */
export declare type TranslatedViewportElement<E> = Omit<TranslatedViewportElementBase<E>, "dirty">;
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
//# sourceMappingURL=viewport.d.ts.map