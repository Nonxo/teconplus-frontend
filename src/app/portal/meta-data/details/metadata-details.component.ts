import { Component, OnInit } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { MetadataService } from "../../portal-services/metadata.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { Metadata } from "../model/metadata";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { handleError } from "../../../services/apiErrorHandler";

@Component({
  selector: "app-equipment-groups",
  templateUrl: "./metadata-details.component.html",
  styleUrls: ["./metadata-details.component.scss"],
})
export class MetadataDetailsComponent implements OnInit {
  items: MenuItem[] = [];
  selectedItem: Metadata[] = [];
  data: Metadata[] = [];
  editMode: boolean;
  displayModal: boolean;
  groupModel: Metadata;
  createAnother: boolean;
  isLoading: boolean;
  index: number;
  displayTag: string;
  tag: string;
  displayDeleteModal: boolean;

  constructor(
    private metadataSvc: MetadataService,
    private messageSvc: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tag = this.route.snapshot.paramMap.get("tag");
    this.displayTag = this.tag
      .replace("_", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
    this.groupModel = new Metadata();
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
    this.fetchEquipmentGroup(this.tag);
  }

  fetchEquipmentGroup(tag: string) {
    this.metadataSvc
      .getMetaData(tag)
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
    this.groupModel = new Metadata();
  }

  create(form: NgForm) {
    this.isLoading = true;
    this.metadataSvc
      .create(this.tag, this.groupModel)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
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
            this.isLoading = false;
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
        this.displayModal = false;
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

  delete() {
    this.isLoading = true;
    this.metadataSvc
      .delete(this.tag, this.groupModel.id)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageSvc.add({
              severity: "error",
              summary: "Delete Metadata Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.displayDeleteModal = false;
        this.isLoading = false;
        this.messageSvc.add({
          severity: "success",
          summary: "Metadata Deleted",
          detail: res.message,
        });
        this.data = this.data.filter((item) => item.id !== this.groupModel.id);
      });
  }
}
