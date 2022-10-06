import { SelectionBase } from './common';
import { Endpoint } from '../endpoint/endpoint';
import { AnchorSpec } from "@jsplumb/common";
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
//# sourceMappingURL=endpoint-selection.d.ts.map