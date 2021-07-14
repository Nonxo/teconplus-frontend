import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Equipment } from "../inventory/model/equipment";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "../../services/apiErrorHandler";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  create(equipment: Equipment): Observable<any> {
    return this.http
      .post(environment.apiBaseUrl + `/inventory`, equipment)
      .pipe(catchError(handleError));
  }

  getAll(): Observable<any> {
    return this.http
      .get(environment.apiBaseUrl + `/inventory`)
      .pipe(catchError(handleError));
  }

  getAllApprovalRequest(): Observable<any> {
    return this.http
      .get(environment.apiBaseUrl + `/inventory/approval-request`)
      .pipe(catchError(handleError));
  }
}
