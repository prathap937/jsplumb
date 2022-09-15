import {SelectionBase} from "./common"
import {Connection} from "../connector/connection-impl"
import {ConnectorSpec} from "@jsplumb/common"
import {Connections} from "../connector/connections"

export class ConnectionSelection extends SelectionBase<Connection> {

    setDetachable(d:boolean):ConnectionSelection {
        this.each((c:Connection) => Connections.setDetachable(c, d))
        return this
    }

    setReattach(d:boolean):ConnectionSelection {
        this.each((c:Connection) => Connections.setReattach(c, d))
        return this
    }

    setConnector(spec:ConnectorSpec):ConnectionSelection {
        this.each((c:Connection) => Connections.setConnector(c, spec))
        return this
    }

    deleteAll() {
        this.each((c:Connection) => this.instance.deleteConnection(c))
        this.clear()
    }

    repaint():ConnectionSelection {
        this.each((c:Connection) => this.instance._paintConnection(c))
        return this
    }
}
