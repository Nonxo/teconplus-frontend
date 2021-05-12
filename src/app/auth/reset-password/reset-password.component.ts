import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Auth } from "../../models/auth";
import { AuthenticationService } from "../../services/authentication.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { MessageService, PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  isResetSuccessful: boolean;
  isLoading: boolean;
  @Output() backToSignIn = new EventEmitter<boolean>();

  auth: Auth;

  constructor(
    private authSvc: AuthenticationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.auth = new Auth();
    this.primengConfig.ripple = true;
  }

  updatePassword(): void {
    this.isLoading = true;
    this.authSvc
      .resetPassword(this.auth)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "Reset Password Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.isResetSuccessful = true;
        console.log(res);
      });
  }

  navigate() {
    this.backToSignIn.emit(true);
  }
}
