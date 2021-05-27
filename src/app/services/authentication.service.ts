import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "../models/auth";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "./apiErrorHandler";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  credentials: string;
  constructor(private http: HttpClient) {}

  login(credentials: Auth): Observable<any> {
    return this.http
      .post<any>(environment.apiBaseUrl + `/users/login`, credentials)
      .pipe(catchError(handleError));
  }

  forgotPassword(credentials: Auth): Observable<any> {
    return this.http
      .post(environment.apiBaseUrl + `/users/forgot-password`, credentials)
      .pipe(catchError(handleError));
  }

  resetPassword(credentials: Auth): Observable<any> {
    const reqHeader = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("reset-token")}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    return this.http.put(
      environment.apiBaseUrl + `/users/reset-password`,
      credentials,
      { headers: reqHeader }
    );
  }

  setCredentials(credentials) {
    this.credentials = credentials;
  }

  getCredentials() {
    return this.credentials;
  }
}
