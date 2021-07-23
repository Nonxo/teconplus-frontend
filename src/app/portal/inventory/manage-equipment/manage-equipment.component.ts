import { Component, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { Equipment } from "../model/equipment";
import { InventoryService } from "../../portal-services/inventory.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { MetadataService } from "../../portal-services/metadata.service";
import { User } from "../../../models/user";
import { UserService } from "../../portal-services/user.service";

@Component({
  selector: "app-manage-equipment",
  templateUrl: "./manage-equipment.component.html",
  styleUrls: ["./manage-equipment.component.scss"],
})
export class ManageEquipmentComponent implements OnInit {
  locations: SelectItem[] = [];
  equipment: Equipment;
  isLoading: boolean;
  actionList: SelectItem[] = [];

  supportDocFileList: File;
  supportDoc: string;

  refManualFileList: File;
  refManual: string;

  imageFileList: File;
  image: string;

  users: User[] = [];

  equipmentStatus: SelectItem[] = [];
  equipmentGroups: SelectItem[] = [];
  equipmentTypes: SelectItem[] = [];
  checkIntervals: SelectItem[] = [];

  preventionGroup: SelectItem[] = [];

  constructor(
    private inventorySvc: InventoryService,
    private messageService: MessageService,
    private metadataSvc: MetadataService,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.equipmentStatus = [
      {
        label: "Functional",
        value: "FUNCTIONAL",
      },
      {
        label: "In Use",
        value: "USED",
      },
      {
        label: "Faulty",
        value: "FAULTY",
      },
      {
        label: "Bad",
        value: "BAD",
      },
    ];
    this.preventionGroup = [
      {
        label: "Routine Check",
        value: "ROUTINE_CHECK",
      },
      {
        label: "Corrosion Prevention",
        value: "CORROSION_PREVENTION",
      },
    ];
    this.checkIntervals = [
      {
        label: "Hourly",
        value: "HOURLY",
      },
      {
        label: "Daily",
        value: "DAILY",
      },
      {
        label: "Weekly",
        value: "WEEKLY",
      },
      {
        label: "Monthly",
        value: "MONTHLY",
      },
      {
        label: "Bi-Monthly",
        value: "BI_MONTHLY",
      },
      {
        label: "End of Well",
        value: "END_OF_WELL",
      },
      {
        label: "End of Project",
        value: "END_OF_PROJECT",
      },
      {
        label: "Quarterly",
        value: "QUARTERLY",
      },
      {
        label: "Annually",
        value: "ANNUALLY",
      },
    ];
    if (this.inventorySvc.getEquipment()) {
      this.equipment = this.inventorySvc.getEquipment();
    } else {
      this.equipment = new Equipment();
      this.fetchActionList();
      this.fetchEquipmentGroup();
      this.fetchLocations();
      this.fetchUsers();
      this.fetchEquipmentTypes();
    }
  }

  fetchEquipmentGroup() {
    this.metadataSvc
      .getMetaData("INVENTORY_ACTION_LIST")
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageService.add({
              severity: "error",
              summary: "Fetch Group Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        res.data.forEach((obj) => {
          this.actionList.push({
            label: obj.name,
            value: obj.id,
          });
        });
      });
  }

  fetchActionList() {
    this.metadataSvc
      .getMetaData("EQUIPMENT_GROUP")
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageService.add({
              severity: "error",
              summary: "Fetch Group Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        res.data.forEach((obj) => {
          this.equipmentGroups.push({
            label: obj.name,
            value: obj.id,
          });
        });
      });
  }

  fetchEquipmentTypes() {
    this.metadataSvc
      .getMetaData("EQUIPMENT_TYPE")
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageService.add({
              severity: "error",
              summary: "Fetch Group Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        res.data.forEach((obj) => {
          this.equipmentTypes.push({
            label: obj.name,
            value: obj.id,
          });
        });
      });
  }

  fetchLocations() {
    this.metadataSvc
      .getMetaData("TECON_LOCATION")
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageService.add({
              severity: "error",
              summary: "Fetch Group Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        res.data.forEach((obj) => {
          this.locations.push({
            label: obj.name,
            value: obj.id,
          });
        });
      });
  }

  fetchUsers() {
    this.userSvc
      .getAllUsers()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageService.add({
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
        this.users = data.content.filter((item) => item.role.id === 7);
      });
  }

  createEquipment() {
    this.isLoading = true;
    this.inventorySvc
      .create(this.equipment)
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "Equipment Create Failed",
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
          summary: "Equipment Created",
          detail: res.message,
        });
      });
  }

  fileUpload(event: any, flag): void {
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      if (flag === "SUPPORT_DOC") {
        this.supportDocFileList = event.target.files[i];
        this.equipment.supportingDocUrl = this.convertFileToBase64(
          this.supportDocFileList
        );
        this.supportDoc = this.supportDocFileList.name;
      }
      if (flag === "REF_MANUAL") {
        this.refManualFileList = event.target.files[i];
        this.equipment.oemreferenceManualUrl = this.convertFileToBase64(
          this.refManualFileList
        );
        this.refManual = this.refManualFileList.name;
      }
      if (flag === "IMAGE") {
        this.imageFileList = event.target.files[i];
        this.equipment.imageUrl = this.convertFileToBase64(this.imageFileList);
        this.image = this.imageFileList.name;
      }
    }
  }

  convertFileToBase64(file): any {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        return reader.result;
      }
    };
  }
}
