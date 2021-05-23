import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "../../services/apiErrorHandler";
import { HttpClient } from "@angular/common/http";
import { Role } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getAllRoles() {
    return this.http
      .get(environment.apiBaseUrl + `/roles`)
      .pipe(catchError(handleError));
  }

  getAllPrivileges() {
    return this.http
      .get(environment.apiBaseUrl + `/privileges`)
      .pipe(catchError(handleError));
  }

  create(role: Role) {
    return this.http
      .post(environment.apiBaseUrl + `/roles`, role)
      .pipe(catchError(handleError));
  }

  update(role: Role) {
    return this.http
      .put(environment.apiBaseUrl + `roles`, role)
      .pipe(catchError(handleError));
  }
}
