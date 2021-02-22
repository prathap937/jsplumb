import { jsPlumbDOMElement } from "./browser-jsplumb-instance";
import { Dictionary, PointXY } from "@jsplumb/core";
export declare function matchesSelector(el: jsPlumbDOMElement, selector: string, ctx?: HTMLElement): boolean;
export declare function consume(e: Event, doNotPreventDefault?: boolean): void;
export declare function sizeElement(el: jsPlumbDOMElement, x: number, y: number, w: number, h: number): void;
export declare function findParent(el: jsPlumbDOMElement, selector: string, container: HTMLElement): jsPlumbDOMElement;
export declare function getEventSource(e: Event): jsPlumbDOMElement;
export declare function getClass(el: Element): string;
export declare function addClass(el: Element, clazz: string): void;
export declare function hasClass(el: Element, clazz: string): boolean;
export declare function removeClass(el: Element, clazz: string): void;
export declare function toggleClass(el: Element, clazz: string): void;
export declare function createElement(tag: string, style?: Dictionary<any>, clazz?: string, atts?: Dictionary<string>): jsPlumbDOMElement;
export declare function createElementNS(ns: string, tag: string, style?: Dictionary<any>, clazz?: string, atts?: Dictionary<string | number>): jsPlumbDOMElement;
export declare function offsetRelativeToRoot(el: any): PointXY;
