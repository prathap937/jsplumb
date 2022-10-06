import { EndpointRepresentation, EndpointHandler } from "./endpoints";
export declare type ComputedDotEndpoint = [number, number, number, number, number];
export declare const TYPE_ENDPOINT_DOT = "Dot";
export interface DotEndpoint extends EndpointRepresentation<ComputedDotEndpoint> {
    radius: number;
    defaultOffset: number;
    defaultInnerRadius: number;
}
export declare const DotEndpointHandler: EndpointHandler<DotEndpoint, ComputedDotEndpoint>;
//# sourceMappingURL=dot-endpoint.d.ts.map