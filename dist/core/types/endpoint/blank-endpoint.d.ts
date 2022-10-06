import { EndpointRepresentation, EndpointHandler } from "./endpoints";
export declare type ComputedBlankEndpoint = [number, number, number, number];
export declare const TYPE_ENDPOINT_BLANK = "Blank";
export interface BlankEndpoint extends EndpointRepresentation<ComputedBlankEndpoint> {
}
export declare const BlankEndpointHandler: EndpointHandler<BlankEndpoint, ComputedBlankEndpoint>;
//# sourceMappingURL=blank-endpoint.d.ts.map