import { Component, OnInit } from "@angular/core";
import { Privilege, Role } from "../../models/user";
import { catchError } from "rxjs/operators";
import { ObservableInput } from "rxjs/internal/types";
import { throwError } from "rxjs";
import { MenuItem, MessageService } from "primeng/api";
import { RoleService } from "../portal-services/role.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-role-management",
  templateUrl: "./role-management.component.html",
  styleUrls: ["./role-management.component.scss"],
})
export class RoleManagementComponent implements OnInit {
  filterOptions: any[] = [];
  value3: string;
  selectedFilter: string;
  roles: Role[] = [];
  items: MenuItem[] = [];
  editMode: boolean;
  roleModel: Role;
  selectedRole: Role;
  privileges: Privilege[] = [];
  displayCreateModal: boolean;
  displayDetailsModal: boolean;
  createAnother: boolean;
  isLoading: boolean;
  index: number;
  displayDeleteModal: boolean;
  constructor(
    private roleSvc: RoleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchPrivileges();
    this.selectedRole = new Role();
    this.roleModel = new Role();

    this.items = [
      {
        label: "View Role Details",
        icon: "pi pi-info-circle",
        command: () => {
          this.displayDetailsModal = true;
        },
      },
      {
        label: "Edit Role",
        icon: "pi pi-pencil",
        command: () => {
          this.editMode = true;
          this.displayCreateModal = true;
          this.roleModel.privileges = this.roleModel.privileges.map(
            (privilege: any) => privilege.id
          );
        },
      },
      {
        label: "Delete Role",
        icon: "pi pi-exclamation-circle",
        command: () => {
          this.displayDeleteModal = true;
        },
      },
    ];
  }

  fetchRoles() {
    this.roleSvc
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

  fetchPrivileges() {
    this.roleSvc
      .getAllPrivileges()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.privileges = res.data;
      });
  }

  createRole(form: NgForm) {
    this.isLoading = true;
    this.roleSvc
      .create(this.roleModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "Role Create Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.isMultipleCreate(form);
        this.messageService.add({
          severity: "success",
          summary: "Role Created",
          detail: res.message,
        });
        this.roles.push(res.data);
      });
  }

  isMultipleCreate(form) {
    if (this.createAnother) {
      form.resetForm();
    } else {
      this.displayCreateModal = false;
    }
  }

  getSelectedRole(role, index) {
    this.roleModel = { ...role };
    this.index = index;
    // this.roleModel.privileges = role.privileges.map(
    //   (privilege) => privilege.id
    // );
  }

  updateRole() {
    this.isLoading = true;
    this.roleSvc
      .update(this.roleModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "Role Update Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.messageService.add({
          severity: "success",
          summary: "Role Updated",
          detail: res.message,
        });
        this.roles[this.index] = res.data;
        this.displayCreateModal = false;
      });
  }

  deleteRole(id: number) {
    this.isLoading = true;
    this.roleSvc
      .delete(id)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "Role Update Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.displayDeleteModal = false;
        this.isLoading = false;
        this.messageService.add({
          severity: "success",
          summary: "Role Updated",
          detail: res.message,
        });
        this.roles = this.roles.filter((role) => role.id !== id);
      });
  }

  showModal() {
    this.editMode = false;
    this.displayCreateModal = true;
    this.roleModel = new Role();
  }
}
