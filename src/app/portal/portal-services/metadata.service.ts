import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "../../services/apiErrorHandler";

@Injectable({
  providedIn: "root",
})
export class MetadataService {
  constructor(private http: HttpClient) {}

  getMetaData(groupId) {
    return this.http
      .get(environment.apiBaseUrl + `/metadata/${groupId}`)
      .pipe(catchError(handleError));
  }

  create(groupId, data) {
    return this.http
      .post(environment.apiBaseUrl + `/metadata/${groupId}`, data)
      .pipe(catchError(handleError));
  }

  update(groupId, data) {
    return this.http
      .put(environment.apiBaseUrl + `/metadata/${groupId}`, data)
      .pipe(catchError(handleError));
  }
}
