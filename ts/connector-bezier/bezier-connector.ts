import {
    _compute,
    AbstractBezierOptions, BezierConnectorBase,
    BezierConnectorGeometry, createBezierConnectorBase
} from "./abstract-bezier-connector"
import {
    Connection,
    PaintGeometry,
    ConnectorComputeParams,
    _addSegment,
    ConnectorHandler,
    transformAnchorPlacement, ConnectorBase, setGeometry
} from "@jsplumb/core"
import {AnchorPlacement} from "@jsplumb/common"

import {CubicBezierSegmentParams, SEGMENT_TYPE_CUBIC_BEZIER} from "./bezier-segment"
import {extend, log, PointXY} from "@jsplumb/util"

/**
 * Options for the Bezier connector.
 */
export interface BezierOptions extends AbstractBezierOptions {}

export const CONNECTOR_TYPE_BEZIER = "Bezier"
export const CONNECTOR_TYPE_CUBIC_BEZIER = "CubicBezier"

function _computeBezier (connector:BezierConnector, paintInfo:PaintGeometry, p:ConnectorComputeParams, sp:AnchorPlacement, tp:AnchorPlacement, _w:number, _h:number):void {

    let _CP, _CP2,
        _sx = sp.curX < tp.curX ? _w : 0,
        _sy = sp.curY < tp.curY ? _h : 0,
        _tx = sp.curX < tp.curX ? 0 : _w,
        _ty = sp.curY < tp.curY ? 0 : _h

    if (connector.edited !== true) {
        _CP = _findControlPoint(connector, {x:_sx, y:_sy}, sp, tp, paintInfo.so, paintInfo.to)
        _CP2 = _findControlPoint(connector, {x:_tx, y:_ty}, tp, sp, paintInfo.to, paintInfo.so)

    } else {
        _CP = connector.geometry.controlPoints[0]
        _CP2 = connector.geometry.controlPoints[1]
    }

    connector.geometry = {
        controlPoints:[_CP, _CP2],
        source:p.sourcePos,
        target:p.targetPos
    }

    _addSegment<CubicBezierSegmentParams>(connector, SEGMENT_TYPE_CUBIC_BEZIER, {
        x1: _sx, y1: _sy, x2: _tx, y2: _ty,
        cp1x: _CP.x, cp1y: _CP.y, cp2x: _CP2.x, cp2y: _CP2.y
    })
}

function _findControlPoint (connector:BezierConnector, point:PointXY, sourceAnchorPosition:AnchorPlacement, targetAnchorPosition:AnchorPlacement, soo:[number, number], too:[number, number]):PointXY {
    // determine if the two anchors are perpendicular to each other in their orientation.  we swap the control
    // points around if so (code could be tightened up)
    let perpendicular = soo[0] !== too[0] || soo[1] === too[1],
        p:PointXY = {x:0,y:0}

    if (!perpendicular) {
        if (soo[0] === 0) {
            p.x = (sourceAnchorPosition.curX < targetAnchorPosition.curX ? point.x + connector.minorAnchor : point.x - connector.minorAnchor)
        }
        else {
            p.x = (point.x - (connector.majorAnchor * soo[0]))
        }

        if (soo[1] === 0) {
            p.y = (sourceAnchorPosition.curY < targetAnchorPosition.curY ? point.y + connector.minorAnchor : point.y - connector.minorAnchor)
        }
        else {
            p.y = (point.y + (connector.majorAnchor * too[1]))
        }
    }
    else {
        if (too[0] === 0) {
            p.x = (targetAnchorPosition.curX < sourceAnchorPosition.curX ? point.x + connector.minorAnchor : point.x - connector.minorAnchor)
        }
        else {
            p.x = (point.x + (connector.majorAnchor * too[0]))
        }

        if (too[1] === 0) {
            p.y = (targetAnchorPosition.curY < sourceAnchorPosition.curY ? point.y + connector.minorAnchor : point.y - connector.minorAnchor)
        }
        else {
            p.y = (point.y + (connector.majorAnchor * soo[1]))
        }
    }

    return p
}

/**
 * Models a cubic bezier connector
 * @internal
 */
export interface BezierConnector extends BezierConnectorBase {
    type:typeof CONNECTOR_TYPE_BEZIER
    majorAnchor:number
    minorAnchor:number
    geometry:BezierConnectorGeometry
}

/**
 * @internal
 */
export const BezierConnectorHandler:ConnectorHandler = {
    _compute(connector: BezierConnector, paintInfo: PaintGeometry, p: ConnectorComputeParams): void {
        _compute(connector, paintInfo, p, _computeBezier)
    },
    create(connection:Connection, connectorType: string, params: any): BezierConnector {
        params = params || {}
        const base = createBezierConnectorBase(connectorType, connection, params, [0,0])
        return extend(base as any, {
            majorAnchor :params.curviness || 150,
            minorAnchor : 10
        }) as BezierConnector
    },
    exportGeometry(connector: BezierConnector): BezierConnectorGeometry {
        if (connector.geometry == null) {
            return null
        } else {
            return {
                controlPoints:[
                    extend({} as any, connector.geometry.controlPoints[0]),
                    extend({} as any, connector.geometry.controlPoints[1])
                ],
                source:extend({} as any, connector.geometry.source),
                target:extend({} as any, connector.geometry.target)
            }
        }
    },
    importGeometry(connector: BezierConnector, geometry: BezierConnectorGeometry): boolean {
        if (geometry != null) {

            if (geometry.controlPoints == null || geometry.controlPoints.length != 2) {
                log("jsPlumb Bezier: cannot import geometry; controlPoints missing or does not have length 2")
                setGeometry(connector, null, true)
                return false
            }

            if (geometry.controlPoints[0].x == null || geometry.controlPoints[0].y == null || geometry.controlPoints[1].x == null || geometry.controlPoints[1].y == null) {
                log("jsPlumb Bezier: cannot import geometry; controlPoints malformed")
                setGeometry(connector, null, true)
                return false
            }

            if (geometry.source == null || geometry.source.curX == null || geometry.source.curY == null) {
                log("jsPlumb Bezier: cannot import geometry; source missing or malformed")
                setGeometry(connector, null, true)
                return false
            }

            if (geometry.target == null || geometry.target.curX == null || geometry.target.curY == null) {
                log("jsPlumb Bezier: cannot import geometry; target missing or malformed")
                setGeometry(connector, null, true)
                return false
            }

            setGeometry(connector, geometry, false)
            return true
        } else {
            return false
        }
    },
    transformGeometry(connector: BezierConnector, g: BezierConnectorGeometry, dx: number, dy: number): BezierConnectorGeometry {
        return {
            controlPoints:[
                {x:g.controlPoints[0].x + dx,y:g.controlPoints[0].y + dy },
                {x:g.controlPoints[1].x + dx,y:g.controlPoints[1].y + dy }
            ],
            source:transformAnchorPlacement(g.source, dx, dy),
            target:transformAnchorPlacement(g.target, dx, dy)
        }
    },
    setAnchorOrientation(connector:ConnectorBase, idx:number, orientation:number[]):void {}
}

