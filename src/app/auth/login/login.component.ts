import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isSignIn: boolean = true;
  isForgotPassword: boolean;
  token: string;
  isResetPassword: boolean;
  resetForm: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params["token"];
    });

    if (this.token) {
      localStorage.setItem("token", this.token);
      this.isResetPassword = true;
      this.resetForm = true;
      this.isSignIn = false;
    }
  }

  changeAuthStateToForgotPassword(event): void {
    this.isForgotPassword = event;
    this.isSignIn = false;
  }

  changeAuthStateToSignIn(event) {
    this.isResetPassword = false;
    this.isSignIn = event;
  }

  resetDone(event): void {
    this.resetForm = false;
  }

  back(): void {
    this.isForgotPassword = false;
    this.isSignIn = true;
  }
}
