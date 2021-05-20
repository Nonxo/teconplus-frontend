export class Auth {
  countryCode: string;
  email: string;
  password: string;
  loginMode: string;
  newPassword: string;
  phoneNumber: string;
  socialMedia: string;

  constructor() {
    this.loginMode = "TP_ACCOUNT";
  }
}
