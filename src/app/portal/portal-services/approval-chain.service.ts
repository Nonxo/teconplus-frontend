import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApprovalChain } from "../approval-chain/model/approval-chain";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { handleError } from "../../services/apiErrorHandler";

@Injectable({
  providedIn: "root",
})
export class ApprovalChainService {
  constructor(private http: HttpClient) {}

  create(data: ApprovalChain) {
    return this.http
      .post(environment.apiBaseUrl + `/approval-chain`, data)
      .pipe(catchError(handleError));
  }

  getAllApprovalChain() {
    return this.http
      .get(environment.apiBaseUrl + `/approval-chain`)
      .pipe(catchError(handleError));
  }

  update(data: ApprovalChain) {
    return this.http
      .put(environment.apiBaseUrl + `/approval-chain`, data)
      .pipe(catchError(handleError));
  }
}
