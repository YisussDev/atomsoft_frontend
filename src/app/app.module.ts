import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NGX_TIPPY_CONFIG, NgxTippyProps} from "ngx-tippy-wrapper";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SpinnerInterceptor} from "@core/interceptors/spinner.interceptor";
import {SpinnerModule} from "@ui/spinner/spinner.module";
import {ErrorInterceptor} from "@core/interceptors/error.interceptor";
import {AuthInterceptor} from "@core/interceptors/auth.interceptor";
import {SocketModule} from "@infrastructure/ports/socket/socket.module";

const tippyConfig: NgxTippyProps = {
  delay: [100, 0], // [delayShow, delayHide] en milisegundos
  arrow: true,
  theme: 'light', // usa un tema con sombra o define uno personalizado
  popperOptions: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8], // separación del target
        },
      },
    ],
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    SocketModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: NGX_TIPPY_CONFIG,
      useValue: tippyConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
