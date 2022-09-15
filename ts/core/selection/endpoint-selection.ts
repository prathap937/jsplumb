import {SelectionBase} from './common'
import { Endpoint} from '../endpoint/endpoint'
import { Endpoints} from '../endpoint/endpoints'
import {AnchorSpec} from "@jsplumb/common"

export class EndpointSelection extends SelectionBase<Endpoint> {

    setEnabled(e:boolean):EndpointSelection {
        this.each((ep:Endpoint) => ep.enabled = e)
        return this
    }
    setAnchor(a:AnchorSpec):EndpointSelection {
        this.each((ep:Endpoint) => Endpoints.setAnchor(ep, a))
        return this
    }

    deleteEveryConnection():EndpointSelection {
        this.each((ep:Endpoint) => Endpoints.deleteEveryConnection(ep))
        return this
    }

    deleteAll():EndpointSelection {
        this.each((ep:Endpoint) => this.instance.deleteEndpoint(ep))
        this.clear()
        return this
    }
}
