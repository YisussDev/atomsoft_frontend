import {Injectable} from "@angular/core";
import {Socket, SocketIoConfig} from "ngx-socket-io";
import {EMPTY, Observable, of, Subject, take} from "rxjs";
import {SocketEvents} from "@infrastructure/ports/socket/socket.events";
import {SocketConfig} from "@infrastructure/ports/socket/socket.config";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SocketService {


  private socketClient: Socket | null = null;
  private connected = false;

  constructor() {
  }

  public init(token: string, session: string): void {
    if (this.connected) return;

    const config: SocketIoConfig = {
      url: SocketConfig.url,
      options: {
        ...SocketConfig.options,
        query: {
          token,
          session
        },
      }
    };

    this.socketClient = new Socket(config);

    this.socketClient.on('connect', () => {
      console.log('✅ Socket conectado');
      this.connected = true;
    });

    this.socketClient.on('disconnect', () => {
      console.log('❌ Socket desconectado');
      this.connected = false;
    });

    this.socketClient.ioSocket.on('connect_error', () => {
      console.error('❗ Error de conexión');
    });


    this.listenConnection().pipe(take(1)).subscribe();

  }

  public listen<T = any>(eventName: SocketEvents): Observable<T> {
    if (!this.socketClient) {
      console.warn(`🔌 Intento de escuchar evento "${eventName}" sin conexión`);
      return EMPTY;
    }
    return this.socketClient.fromEvent<T>(eventName);
  }

  public listenConnection<T = any>(): Observable<string> {
    if (!this.socketClient) {
      console.warn(`🔌 Intento de escuchar evento "CONNECTION" sin conexión`);
      return EMPTY;
    }
    return this.socketClient.fromEvent<string>("connection").pipe(
      tap(session => {
        localStorage.setItem("x-socket", session);
      }),
    );
  }

  public emit(eventName: string, data: any): void {
    if (!this.socketClient) return;
    this.socketClient.emit(eventName, data);
  }

  public disconnect(): void {
    if (!this.socketClient) return;
    this.socketClient.disconnect();
    this.connected = false;
    localStorage.removeItem("x-socket");
  }
}
