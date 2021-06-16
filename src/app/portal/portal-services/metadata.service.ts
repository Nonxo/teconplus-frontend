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

  getMetaData(tag) {
    return this.http
      .get(environment.apiBaseUrl + `/metadata/${tag}`)
      .pipe(catchError(handleError));
  }

  create(tag, data) {
    return this.http
      .post(environment.apiBaseUrl + `/metadata/${tag}`, data)
      .pipe(catchError(handleError));
  }

  update(tag, data) {
    return this.http
      .put(environment.apiBaseUrl + `/metadata/${tag}`, data)
      .pipe(catchError(handleError));
  }

  delete(tag, tagId) {
    return this.http
      .delete(environment.apiBaseUrl + `/metadata/${tag}/${tagId}`)
      .pipe(catchError(handleError));
  }

  getAllMetrics() {
    return this.http
      .get(environment.apiBaseUrl + `/metadata/metrics`)
      .pipe(catchError(handleError));
  }
}
