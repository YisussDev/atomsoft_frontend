import {SocketIoConfig} from "ngx-socket-io";
import {environment} from "../../../../environments/environment";

export const SocketConfig: SocketIoConfig = {
  url: `${environment.socket.uri}`,
  options: {}
}
