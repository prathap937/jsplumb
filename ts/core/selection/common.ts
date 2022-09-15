import { PaintStyle , OverlaySpec } from '@jsplumb/common'
import {Component, Components } from "../component/component"
import { JsPlumbInstance } from "../core"
import { forEach} from "@jsplumb/util"

export class SelectionBase<T extends Component>{

    constructor(protected instance:JsPlumbInstance, protected entries:Array<T>) { }

    get length():number {
        return this.entries.length
    }

    each( handler:(arg0:T) => void ):SelectionBase<T> {
        forEach(this.entries, (e:T) => handler(e) )
        return this
    }

    get(index:number) {
        return this.entries[index]
    }

    addClass(clazz:string, cascade?:boolean):SelectionBase<T> {
        this.each((c:T) => Components.addClass(c, clazz, cascade))
        return this
    }

    removeClass(clazz:string, cascade?:boolean):SelectionBase<T> {
        this.each((c:T) => Components.removeClass(c, clazz, cascade))
        return this
    }

    removeAllOverlays():SelectionBase<T> {
        this.each((c:T) => Components.removeAllOverlays(c))
        return this
    }

    setLabel(label:string):SelectionBase<T> {
        this.each((c:T) => Components.setLabel(c, label))
        return this
    }

    clear() {
        this.entries.length = 0
        return this
    }

    map<Q>(fn:(entry:T) => Q):Array<Q> {
        const a:Array<Q> = []
        this.each((e:T) => a.push(fn(e)))
        return a
    }

    addOverlay(spec:OverlaySpec):SelectionBase<T> {
        this.each((c:T) => Components.addOverlay(c, spec))
        return this
    }

    removeOverlay(id:string):SelectionBase<T> {
        this.each((c:T) => Components.removeOverlay(c, id))
        return this
    }

    removeOverlays():SelectionBase<T> {
        this.each((c:T) => Components.removeOverlays(c))
        return this
    }

    showOverlay(id:string):SelectionBase<T> {
        this.each((c:T) => Components.showOverlay(c, id))
        return this
    }

    hideOverlay(id:string):SelectionBase<T> {
        this.each((c:T) => Components.hideOverlay(c, id))
        return this
    }

    setPaintStyle(style:PaintStyle):SelectionBase<T> {
        this.each((c:T) => Components.setPaintStyle(c, style))
        return this
    }

    setHoverPaintStyle(style:PaintStyle):SelectionBase<T> {
        this.each((c:T) => Components.setHoverPaintStyle(c, style))
        return this
    }

    // setSuspendEvents(suspend:boolean):SelectionBase<T> {
    //     this.each((c:T) => Components.setSuspendEvents(c, suspend))
    //     return this
    // }

    setParameter(name:string, value:string):SelectionBase<T> {
        this.each((c:T) => c.parameters[name] = value)
        return this
    }

    setParameters(p:Record<string, string>):SelectionBase<T> {
        this.each((c:T) => c.parameters = p)
        return this
    }

    setVisible(v:boolean):SelectionBase<T> {
        this.each((c:T) => Components.setVisible(c, v))
        return this
    }

    addType(name:string):SelectionBase<T> {
        this.each((c:T) => Components.addType(c, name))
        return this
    }

    toggleType(name:string):SelectionBase<T> {
        this.each((c:T) => Components.toggleType(c, name))
        return this
    }

    removeType(name:string):SelectionBase<T> {
        this.each((c:T) => Components.removeType(c, name))
        return this
    }

    // bind(evt:string, handler:(a:any, e?:any) => any):SelectionBase<T> {
    //     this.each((c:T) => c.bind(evt, handler))
    //     return this
    // }
    //
    // unbind(evt:string, handler:Function):SelectionBase<T> {
    //     this.each((c:T) => c.unbind(evt, handler))
    //     return this
    // }

    setHover(h:boolean):SelectionBase<T> {
        this.each((c:T) => this.instance.setHover(c, h))
        return this
    }
}
