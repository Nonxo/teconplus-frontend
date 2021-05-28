import { Component, OnInit } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { MetadataService } from "../../portal-services/metadata.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { EquipmentGroup } from "../model/equipment-group";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-equipment-groups",
  templateUrl: "./equipment-groups.component.html",
  styleUrls: ["./equipment-groups.component.scss"],
})
export class EquipmentGroupsComponent implements OnInit {
  items: MenuItem[] = [];
  selectedItem: EquipmentGroup[] = [];
  data: EquipmentGroup[] = [];
  editMode: boolean;
  displayModal: boolean;
  groupModel: EquipmentGroup;
  createAnother: boolean;
  isLoading: boolean;
  index: number;
  displayDeleteModal: boolean;

  constructor(
    private metadataSvc: MetadataService,
    private messageSvc: MessageService
  ) {}

  ngOnInit(): void {
    this.groupModel = new EquipmentGroup();
    this.items = [
      {
        label: "Edit value",
        command: () => {
          this.editMode = true;
          this.displayModal = true;
        },
      },
      {
        label: "Delete value",
        command: () => {
          this.displayDeleteModal = true;
        },
      },
    ];
    this.fetchEquipmentGroup();
  }

  fetchEquipmentGroup() {
    this.metadataSvc
      .getMetaData("EQUIPMENT_GROUP")
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageSvc.add({
              severity: "error",
              summary: "Fetch Metadata Failed",
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

  showModal() {
    this.editMode = false;
    this.displayModal = true;
    this.groupModel = new EquipmentGroup();
  }

  create(form: NgForm) {
    this.isLoading = true;
    this.metadataSvc
      .create("EQUIPMENT_GROUP", this.groupModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageSvc.add({
              severity: "error",
              summary: "Create Metadata Failed",
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
          summary: "Metadata Created",
          detail: res.message,
        });
        this.data.push(res.data);
      });
  }

  update() {
    this.isLoading = true;
    this.metadataSvc
      .update("EQUIPMENT_GROUP", this.groupModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageSvc.add({
              severity: "error",
              summary: "Update Metadata Failed",
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
          summary: "Metadata Updated",
          detail: res.message,
        });
        this.data[this.index] = res.data;
      });
  }

  getSelectedData(item, index) {
    this.groupModel = item;
    this.index = index;
  }

  isMultipleCreate(form) {
    if (this.createAnother) {
      form.resetForm();
    } else {
      this.displayModal = false;
    }
  }
}
