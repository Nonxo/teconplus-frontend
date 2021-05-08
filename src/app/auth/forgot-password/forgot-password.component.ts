import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Auth } from "../../models/auth";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { Router } from "@angular/router";
import { CountryCode } from "../../models/country-code";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  stateOptions: any[];
  value1: string = "off";
  user: Auth;
  countryCode = CountryCode;
  isPasswordReset: boolean;
  isLoading: boolean;

  constructor(
    private authSvc: AuthenticationService,
    private messageSvc: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router
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

  sendPasswordReset() {
    if (this.value1 === "off") {
      this.user.countryCode = null;
      this.user.phoneNumber = null;
    } else {
      this.user.email = null;
    }
    this.isLoading = true;
    this.authSvc
      .forgotPassword(this.user)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "Forgot Password Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        console.log(res);
        this.router.navigate([
          "/info-page",
          this.user.email
            ? this.user.email
            : this.user.countryCode + this.user.phoneNumber,
        ]);
      });
  }
}
