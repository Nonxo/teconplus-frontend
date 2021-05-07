import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
import { Auth } from "../../../models/auth";
import { CountryCode } from "../../../models/country-code";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  providers: [MessageService],
})
export class LoginFormComponent implements OnInit {
  stateOptions: any[];
  password: string;
  value1: string = "off";
  user: Auth;
  showPassword: boolean;
  isLoading: boolean;
  countryCode = CountryCode;
  inputValue: string;
  @Output() forgotPassword = new EventEmitter<boolean>();

  constructor(
    private authSvc: AuthenticationService,
    private toastSvc: ToastService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.stateOptions = [
      { label: "Email Address", value: "off" },
      { label: "Phone Number", value: "on" },
    ];
  }

  ngOnInit(): void {
    this.user = new Auth();
    this.primengConfig.ripple = true;
  }

  resetPassword(): void {
    this.forgotPassword.emit(true);
  }

  loginUser(): void {
    this.isLoading = true;
    this.authSvc
      .login(this.user)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "User Authentication",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        console.log(res);
      });
  }
}
