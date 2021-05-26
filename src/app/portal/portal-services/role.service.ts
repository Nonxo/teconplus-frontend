import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "../../services/apiErrorHandler";
import { HttpClient } from "@angular/common/http";
import { Role } from "../../models/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    return this.http
      .get(environment.apiBaseUrl + `/roles`)
      .pipe(catchError(handleError));
  }

  getAllPrivileges(): Observable<any> {
    return this.http
      .get(environment.apiBaseUrl + `/privileges`)
      .pipe(catchError(handleError));
  }

  create(role: Role): Observable<any> {
    return this.http
      .post(environment.apiBaseUrl + `/roles`, role)
      .pipe(catchError(handleError));
  }

  update(role: Role): Observable<any> {
    delete role.createdBy;
    delete role.createdOn;
    return this.http
      .put(environment.apiBaseUrl + `/roles`, role)
      .pipe(catchError(handleError));
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + `/roles/${id}`)
      .pipe(catchError(handleError));
  }
}
