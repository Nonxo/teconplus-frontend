import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "../models/auth";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "./apiErrorHandler";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
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
}
