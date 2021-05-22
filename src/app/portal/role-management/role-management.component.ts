import { Component, OnInit } from "@angular/core";
import { Privilege, Role } from "../../models/user";
import { catchError } from "rxjs/operators";
import { ObservableInput } from "rxjs/internal/types";
import { throwError } from "rxjs";
import { MenuItem } from "primeng/api";
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
  createRoleModel: Role;
  selectedRole: Role;
  privileges: Privilege[] = [];
  displayCreateModal: boolean;
  createAnother: boolean;
  isLoading: boolean;
  selectedPrivileges;
  constructor(private roleSvc: RoleService) {}

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchPrivileges();
    this.selectedRole = new Role();
    this.createRoleModel = new Role();

    this.items = [
      {
        label: "View Role Details",
        icon: "pi pi-info-circle",
        command: () => {},
      },
      {
        label: "Edit Role",
        icon: "pi pi-pencil",
        command: () => {
          this.editMode = true;
        },
      },
      {
        label: "Delete Role",
        icon: "pi pi-exclamation-circle",
        command: () => {},
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

  create(form: NgForm) {}
}
