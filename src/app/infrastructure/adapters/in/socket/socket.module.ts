import {NgModule} from "@angular/core";
import {SocketIoModule} from "ngx-socket-io";
import {SocketService} from "@infrastructure/adapters/in/socket/services/socket.service";
import {AccountEventsRepository} from "@infrastructure/adapters/in/socket/events/account/account.events.repository";
@NgModule({
    imports: [
        SocketIoModule
    ],
    declarations: [],
    providers: [
        SocketService,
        AccountEventsRepository,
    ],
    exports: []
})
export class SocketModule {
}
