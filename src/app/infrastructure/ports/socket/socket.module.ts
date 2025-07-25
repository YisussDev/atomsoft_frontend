import {NgModule} from "@angular/core";
import {AccountEventsRepository} from "@infrastructure/ports/socket/events/account/account.events.repository";
import {SocketIoModule} from "ngx-socket-io";
import {SocketService} from "@infrastructure/ports/socket/services/socket.service";

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
