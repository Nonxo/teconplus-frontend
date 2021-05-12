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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params["token"];
      debugger;
    });

    if (this.token) {
      localStorage.setItem("reset-token", this.token);
      this.isResetPassword = true;
      this.isSignIn = false;
    }
  }

  changeAuthState(event): void {
    this.isForgotPassword = event;
    this.isSignIn = false;
  }

  back(): void {
    this.isForgotPassword = false;
    this.isSignIn = true;
  }
}
