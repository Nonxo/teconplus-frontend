import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  stateOptions: any[];
  password: string;

  constructor() {
    this.stateOptions = [
      { label: "Email Address", value: "off" },
      { label: "Phone Number", value: "on" },
    ];
  }

  ngOnInit(): void {}
}
