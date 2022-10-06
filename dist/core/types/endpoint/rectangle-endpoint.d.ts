import { EndpointRepresentation } from "./endpoints";
import { EndpointHandler } from "./endpoints";
export declare type ComputedRectangleEndpoint = [number, number, number, number];
export declare const TYPE_ENDPOINT_RECTANGLE = "Rectangle";
export interface RectangleEndpoint extends EndpointRepresentation<ComputedRectangleEndpoint> {
    width: number;
    height: number;
}
export declare const RectangleEndpointHandler: EndpointHandler<RectangleEndpoint, ComputedRectangleEndpoint>;
//# sourceMappingURL=rectangle-endpoint.d.ts.map