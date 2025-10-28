import {Component, Input, OnInit} from '@angular/core';
import {AccountEntity} from "@domain/entities/account/account.entity";
import {SessionEntity} from "@domain/entities/account/session.entity";
import Swal from "sweetalert2";
import {ConsultSessionsAccountUseCase} from "@application/ports/in/auth/consult-sessions-account.use-case";
import {CloseSessionAccountUseCase} from "@application/ports/in/auth/close-session-account.use-case";

@Component({
  selector: 'app-configuration-sessions',
  templateUrl: './configuration-sessions.component.html',
  styleUrls: ['./configuration-sessions.component.css']
})
export class ConfigurationSessionsComponent implements OnInit {

  @Input() public account!: AccountEntity & { jti: string };

  public sessions: SessionEntity[] = [];

  constructor(
    private consultSessionsAccountUseCase: ConsultSessionsAccountUseCase,
    private closeSessionAccountUseCase: CloseSessionAccountUseCase,
  ) {
  }

  ngOnInit() {
    this.initSessions();
  }

  private initSessions(): void {
    this.consultSessionsAccountUseCase.execute(this.account.username).subscribe({
      next: (response) => {
        this.sessions = response.sessions;
      }
    })
  }

  public closeSession(idSession: string) {
    Swal.fire({
      icon: "question",
      title: 'Confirmación',
      text: `¿Deseas cerrar la sesion ${idSession}?`,
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        console.log("Enviando...")
        this.closeSessionAccountUseCase.execute(this.account.username, idSession).subscribe({
          next: (response) => {
            this.sessions = this.sessions.filter(session => session.id !== idSession);
          }
        });
      }
    })
  }

}
