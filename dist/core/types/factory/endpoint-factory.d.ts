import { EndpointRepresentation } from "../endpoint/endpoints";
import { Endpoint } from "../endpoint/endpoint";
import { Orientation } from "../factory/anchor-record-factory";
import { AnchorPlacement, EndpointRepresentationParams } from "@jsplumb/common";
export declare type EndpointComputeFunction<T> = (endpoint: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any) => T;
export declare const EndpointFactory: {
    get: (ep: Endpoint, name: string, params: any) => EndpointRepresentation<any>;
    clone: <C, ElementType>(epr: EndpointRepresentation<C>) => EndpointRepresentation<C>;
    compute: <T, ElementType_1>(endpoint: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any) => T;
    registerHandler: <E, T_1>(eph: EndpointHandler<E, T_1>) => void;
};
export interface EndpointHandler<EndpointClass, T> {
    type: string;
    compute: EndpointComputeFunction<T>;
    getParams(endpoint: EndpointClass): Record<string, any>;
    create(endpoint: Endpoint, params?: EndpointRepresentationParams): EndpointClass;
}
//# sourceMappingURL=endpoint-factory.d.ts.map