import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "../../services/apiErrorHandler";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(pageNumber: number, pageSize: number) {
    return this.http
      .get(
        environment.apiBaseUrl +
          `/users/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(catchError(handleError));
  }

  update(user: User) {
    delete user.createdById;
    return this.http
      .put(environment.apiBaseUrl + `/users`, user)
      .pipe(catchError(handleError));
  }

  create(user: User) {
    return this.http
      .post(environment.apiBaseUrl + `/users`, user)
      .pipe(catchError(handleError));
  }

  deactivate(userId: string) {
    return this.http
      .put(environment.apiBaseUrl + `/users/deactivate/${userId}`, null)
      .pipe(catchError(handleError));
  }

  reactivate(userId: string) {
    return this.http
      .put(environment.apiBaseUrl + `/users/reactivate/${userId}`, null)
      .pipe(catchError(handleError));
  }
}
