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
    this.equipment = new Equipment();
    this.fetchActionList();
    this.fetchEquipmentGroup();
    this.fetchLocations();
    this.fetchUsers();
    this.fetchEquipmentTypes();
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
}
