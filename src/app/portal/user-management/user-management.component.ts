import { Component, OnInit } from "@angular/core";
import { MenuItem, MessageService, PrimeNGConfig } from "primeng/api";
import { UserService } from "../portal-services/user.service";
import { catchError } from "rxjs/operators";
import { ObservableInput } from "rxjs/internal/types";
import { throwError } from "rxjs";
import { Role, User } from "../../models/user";
import { NgForm } from "@angular/forms";
import { RoleService } from "../portal-services/role.service";
import { host } from "@angular-devkit/build-angular/src/test-utils";
import { CountryCode } from "../../models/country-code";
import { Designations } from "../../models/designations";
import { AuthenticationService } from "../../services/authentication.service";
import { Auth } from "../../models/auth";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  users: User[] = [];
  value3: string;
  isLoading: boolean;
  selectedFilter: string;
  items: MenuItem[];
  filterOptions: any[] = [];
  displayModal: boolean;
  editMode: boolean;
  createUserModel: User;
  layout: string = "grid";
  selectedUser: User;
  displayCreateModal: boolean;
  timeBound: boolean = false;
  layoutOptions: any[];
  createAnother: boolean;
  roles: Role[] = [];
  selectedRole: Role;
  period: any[] = [];
  countryCode = CountryCode;
  designations = Designations;
  deactivateModal: boolean;
  reactivateModal: boolean;
  resetPasswordModal: boolean;
  minDateValue = new Date();
  selectedUserIndex: number;
  currentUser;

  constructor(
    private primengConfig: PrimeNGConfig,
    private userSvc: UserService,
    private messageSvc: MessageService,
    private roleService: RoleService,
    private authSvc: AuthenticationService
  ) {
    this.fetchRoles();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.layoutOptions = [
      { icon: "pi pi-list", value: "list" },
      { icon: "pi pi-th-large", value: "grid" },
    ];
    this.createUserModel = new User();
    this.selectedUser = new User();
    this.selectedRole = new Role();
    this.period = [
      {
        label: "Day",
        value: "day",
      },
      {
        label: "Month",
        value: "month",
      },
      {
        label: "Year",
        value: "year",
      },
    ];

    this.filterOptions = [
      { name: "Super Admin", value: 1 },
      { name: "Admin", value: 2 },
    ];

    this.primengConfig.ripple = true;
    this.fetchUsers();
  }

  fetchUsers() {
    this.userSvc
      .getAllUsers(this.pageNumber, this.pageSize)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageSvc.add({
              severity: "error",
              summary: "Fetch Users Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        const { data, message } = res;
        this.users = data.content;
        console.log(this.users);
      });
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

  changeToEditMode() {
    this.editMode = true;
    this.displayCreateModal = true;
    this.displayModal = false;
    this.createUserModel = this.selectedUser;
    this.createUserModel.role = this.selectedUser.role.id;
    this.createUserModel.defaultRole = this.selectedUser.defaultRole?.id;
  }

  create(form: NgForm) {
    let currentUser = localStorage.getItem("current-user");
    this.createUserModel.createdById = JSON.parse(currentUser).createdById;
    this.isLoading = true;
    this.userSvc
      .create(this.createUserModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "User Create Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.isMultipleCreate(form);
        this.messageSvc.add({
          severity: "success",
          summary: "User Created",
          detail: res.message,
        });
        this.users.push(res.data);
      });
  }

  isMultipleCreate(form) {
    if (this.createAnother) {
      form.resetForm();
    } else {
      this.displayCreateModal = false;
    }
  }

  update(index) {
    this.isLoading = true;
    this.userSvc
      .update(this.createUserModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "User Update Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.displayCreateModal = false;
        this.messageSvc.add({
          severity: "success",
          summary: "User Updated",
          detail: res.message,
        });
        this.users[index] = res.data;
        this.displayModal = false;
      });
  }

  deactivate(id: string) {
    this.isLoading = true;
    this.userSvc
      .deactivate(id)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "User Update Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.deactivateModal = false;
        this.isLoading = false;
        this.messageSvc.add({
          severity: "success",
          summary: "User Updated",
          detail: res.message,
        });
        this.users[this.selectedUserIndex] = res.data;
        this.displayModal = false;
      });
  }

  reactivate(id: string) {
    this.isLoading = true;
    this.userSvc
      .reactivate(id)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "User Update Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.reactivateModal = false;
        this.isLoading = false;
        this.messageSvc.add({
          severity: "success",
          summary: "User Updated",
          detail: res.message,
        });
        this.users[this.selectedUserIndex] = res.data;
        this.displayModal = false;
      });
  }

  showCreateDialog() {
    this.editMode = false;
    this.createUserModel = new User();
    this.displayCreateModal = true;
  }

  showDeactivateDialog() {
    this.deactivateModal = true;
    this.displayModal = false;
  }

  getSelectedUser(user: User, index) {
    this.selectedUser = user;
    this.selectedUser.tempRoleExpiryDate = this.selectedUser.tempRoleExpiryDate
      ? new Date(this.selectedUser.tempRoleExpiryDate)
      : null;
    this.selectedUserIndex = index;
    if (user.locked) {
      this.items = [
        {
          label: "View details",
          icon: "pi pi-info-circle",
        },
        {
          label: "Edit users details",
          icon: "pi pi-pencil",
        },
        {
          label: "Reset Password",
          icon: "pi pi-refresh",
        },
        {
          label: "Activate",
          icon: "pi pi-exclamation-circle",
          command: () => {
            this.reactivateModal = true;
          },
        },
      ];
    } else {
      this.items = [
        {
          label: "View details",
          icon: "pi pi-info-circle",
          command: () => {
            this.displayModal = true;
            this.editMode = false;
          },
        },
        {
          label: "Edit users details",
          icon: "pi pi-pencil",
          command: () => {
            this.changeToEditMode();
          },
        },
        {
          label: "Reset Password",
          icon: "pi pi-refresh",
          command: () => {
            this.resetPasswordModal = true;
          },
        },
        {
          label: "Deactivate",
          icon: "pi pi-exclamation-circle",
          command: () => {
            this.deactivateModal = true;
          },
        },
      ];
    }
  }

  resetPassword() {
    this.isLoading = true;
    let user = new Auth();
    user.email = this.selectedUser.email;
    this.authSvc
      .forgotPassword(user)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "User Update Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.messageSvc.add({
          severity: "success",
          summary: "User Password Reset",
          detail: res.message,
        });
        this.resetPasswordModal = false;
      });
  }

  switch(event) {
    const { originalEvent, checked } = event;
    this.timeBound = checked;
    if (!checked) {
      this.selectedUser.defaultRole = "";
      this.createUserModel.defaultRole = "";
      this.createUserModel.tempRoleExpiryDate = null;
    }
  }
}
