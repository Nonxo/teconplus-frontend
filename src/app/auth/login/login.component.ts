import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isSignIn: boolean = true;
  isForgotPassword: boolean;

  constructor() {}

  ngOnInit(): void {}

  changeAuthState(event): void {
    this.isForgotPassword = event;
    this.isSignIn = false;
  }

  back(): void {
    this.isForgotPassword = false;
    this.isSignIn = true;
  }
}
