import { SelectionBase } from './common'
import { Endpoint} from '../endpoint/endpoint'
import { Endpoints} from '../endpoint/endpoints'
import { AnchorSpec } from "@jsplumb/common"

/**
 * A set of selected endpoints. Offers a few methods to operate on every endpoint in the selection at once.
 * @public
 */
export class EndpointSelection extends SelectionBase<Endpoint> {

    /**
     * Sets the enabled state of every endpoint in the selection
     * @param e
     */
    setEnabled(e:boolean):EndpointSelection {
        this.each((ep:Endpoint) => ep.enabled = e)
        return this
    }

    /**
     * Sets the anchor for every endpoint in the selection
     * @param a
     */
    setAnchor(a:AnchorSpec):EndpointSelection {
        this.each((ep:Endpoint) => Endpoints.setAnchor(ep, a))
        return this
    }

    /**
     * Deletes every connection attached to all of the endpoints in the selection
     */
    deleteEveryConnection():EndpointSelection {
        this.each((ep:Endpoint) => Endpoints.deleteEveryConnection(ep))
        return this
    }

    /**
     * Delete every endpoint in the selection
     */
    deleteAll():EndpointSelection {
        this.each((ep:Endpoint) => this.instance.deleteEndpoint(ep))
        this.clear()
        return this
    }
}
