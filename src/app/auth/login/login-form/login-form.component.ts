import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  stateOptions: any[];
  password: string;
  value1: string = "off";
  inputValue: string;
  @Output() forgotPassword = new EventEmitter<boolean>();

  constructor() {
    this.stateOptions = [
      { label: "Email Address", value: "off" },
      { label: "Phone Number", value: "on" },
    ];
  }

  ngOnInit(): void {}

  resetPassword(): void {
    this.forgotPassword.emit(true);
  }
}
