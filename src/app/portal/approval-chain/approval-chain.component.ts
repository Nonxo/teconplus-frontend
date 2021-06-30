import { Component, OnInit } from "@angular/core";
import {
  MenuItem,
  MessageService,
  PrimeIcons,
  PrimeNGConfig,
  SelectItemGroup,
} from "primeng/api";
import { Role, User } from "../../models/user";
import { catchError } from "rxjs/operators";
import { ObservableInput } from "rxjs/internal/types";
import { Observable, throwError } from "rxjs";
import { RoleService } from "../portal-services/role.service";
import { ApprovalChainService } from "../portal-services/approval-chain.service";
import { ApprovalChain, ApprovalLevel } from "./model/approval-chain";
import { Dropdown } from "primeng/dropdown";
import { UserService } from "../portal-services/user.service";

@Component({
  selector: "app-approval-chain",
  templateUrl: "./approval-chain.component.html",
  styleUrls: ["./approval-chain.component.scss"],
})
export class ApprovalChainComponent implements OnInit {
  displayModal: boolean;
  approvalList: SelectItemGroup[];
  selectedApprovalLevels: ApprovalLevel[] = [];
  item = new ApprovalLevel();
  data: any[] = [];
  approvalModel: ApprovalChain;
  isLoading: boolean;
  roles: Role[] = [];
  increment = 1;
  isRoleSelected: boolean;
  disableSelected: boolean;
  displayViewModal: boolean;
  displayEditModal: boolean;
  menuItems: MenuItem[];
  selectedRoleIds: number[] = [];
  selected: number[] = [];
  specificApprovalChain: any;
  editMode: true;
  specificUser: Observable<any>;
  rowIndex: number;

  constructor(
    private primengConfig: PrimeNGConfig,
    private roleService: RoleService,
    private messageSvc: MessageService,
    private approvalChainSvc: ApprovalChainService,
    private userSvc: UserService
  ) {
    this.fetchRoles();
  }

  ngOnInit(): void {
    this.approvalModel = new ApprovalChain();
    this.approvalList = [
      {
        label: "Select all",
        value: "de",
        items: [
          { label: "Equipment Creation", value: "EQUIPMENT_CREATION" },
          { label: "Equipment Modification", value: "EQUIPMENT_MODIFICATION" },
          { label: "Equipment Deletion", value: "EQUIPMENT_DELETION" },
        ],
      },
    ];
    this.primengConfig.ripple = true;

    this.fetchAllApprovalChain();
  }

  fetchRoles() {
    this.roleService
      .getAllRoles()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.roles = res.data;
      });
  }

  getSelectedApprovalChain(obj, index) {
    this.specificApprovalChain = obj;
    this.specificUser = this.userSvc.getSpecificUser(
      obj.approvalChain.createdById
    );
    this.menuItems = [
      {
        label: "View approval chain",
        // icon: "pi pi-info-circle",
        command: () => {
          this.displayViewModal = true;
        },
      },
      {
        label: "Edit approval chain",
        // icon: "pi pi-pencil",
        command: () => {
          this.switchToEdit();
          this.rowIndex = index;
        },
      },
    ];
  }

  onSelect(approvalLevel, event, index) {
    const { value } = event;
    if (this.selectedRoleIds.includes(value)) {
      this.isRoleSelected = true;
      return;
    } else {
      if (this.selectedRoleIds.indexOf(value) === -1) {
        this.isRoleSelected = false;
        this.selectedRoleIds.push(value);
        this.approvalModel.approvalLevels[index].approvalLevel = approvalLevel;
        this.approvalModel.approvalLevels[index].approvalRole = value;
      }
    }
  }

  onEdit(approvalLevel, event, index) {
    if (this.selectedRoleIds.includes(parseInt(event.target.value))) {
      this.isRoleSelected = true;
      return;
    }
    if (this.selectedRoleIds.indexOf(event.target.value) === -1) {
      this.isRoleSelected = false;
      this.selectedRoleIds.push(event.target.value);
      this.approvalModel.approvalLevels[index].approvalLevel = approvalLevel;
      this.approvalModel.approvalLevels[index].approvalRole = parseInt(
        event.target.value
      );
    }
  }

  createApprovalChain() {
    this.isLoading = true;
    this.approvalChainSvc
      .create(this.approvalModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "Create Approval Chain Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.selectedRoleIds = [];
        this.messageSvc.add({
          severity: "success",
          summary: "Approval Chain Created",
          detail: res.message,
        });
        this.displayModal = false;
        for (let obj of res.data) {
          this.data.push(obj);
        }
      });
  }

  updateApprovalChain() {
    this.isLoading = true;
    console.log(this.approvalModel);
    this.approvalChainSvc
      .update(this.approvalModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "Update Approval Chain Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.selectedRoleIds = [];
        this.messageSvc.add({
          severity: "success",
          summary: "Approval Chain Updated",
          detail: res.message,
        });
        this.displayEditModal = false;
        this.data[this.rowIndex] = res.data;
      });
  }

  fetchAllApprovalChain() {
    this.approvalChainSvc
      .getAllApprovalChain()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageSvc.add({
              severity: "error",
              summary: "Fetch Approval Chain Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.data = res.data;
      });
  }

  deleteApprovalLevel(rowIndex, obj) {
    this.approvalModel.approvalLevels = this.approvalModel.approvalLevels.filter(
      (item, index) => index !== rowIndex
    );
    this.approvalModel.approvalLevels[rowIndex].approvalLevel = rowIndex + 1;
    this.selectedRoleIds = this.selectedRoleIds.filter(
      (id, i) => i !== rowIndex && id !== obj.id
    );
    this.isRoleSelected = false;
  }

  addApprovalLevel() {
    this.approvalModel.approvalLevels.push({
      approvalLevel: this.increment++,
      approvalRole: 0,
    });
  }

  showCreateModal() {
    this.displayModal = true;
    this.approvalModel = new ApprovalChain();
    this.approvalModel.approvalLevels.push({
      approvalLevel: 0,
      approvalRole: 0,
    });
  }

  switchToEdit() {
    this.displayViewModal = false;
    this.selectedRoleIds = [];
    this.approvalModel = new ApprovalChain();
    for (let obj of this.specificApprovalChain.approvalDetails) {
      this.approvalModel.approvalLevels.push({
        approvalLevel: obj.approvalLevel,
        approvalRole: obj.approvalRole.id,
      });
      this.selectedRoleIds.push(obj.approvalRole.id);
    }
    this.approvalModel.id = this.specificApprovalChain.approvalChain.id;
    this.displayEditModal = true;
  }
}
