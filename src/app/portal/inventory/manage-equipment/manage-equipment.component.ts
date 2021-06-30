import { Component, OnInit } from "@angular/core";
import { MessageService, SelectItem, SelectItemGroup } from "primeng/api";
import { Equipment } from "../model/equipment";
import { InventoryService } from "../../portal-services/inventory.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { MetadataService } from "../../portal-services/metadata.service";

@Component({
  selector: "app-manage-equipment",
  templateUrl: "./manage-equipment.component.html",
  styleUrls: ["./manage-equipment.component.scss"],
})
export class ManageEquipmentComponent implements OnInit {
  locations: SelectItem[] = [];
  equipment: Equipment;
  isLoading: boolean;
  metrics: any[] = [];

  equipmentStatus: SelectItem[] = [];
  equipmentGroups: SelectItem[] = [];
  checkIntervals: SelectItem[] = [];

  constructor(
    private inventorySvc: InventoryService,
    private messageService: MessageService,
    private metadataSvc: MetadataService
  ) {}

  ngOnInit(): void {
    this.locations = [
      {
        label: "Lagos",
        value: "lagos",
      },
      {
        label: "Rivers",
        value: "rivers",
      },
      {
        label: "Uyo",
        value: "uyo",
      },
      {
        label: "Abuja",
        value: "abuja",
      },
    ];
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
    this.fetchMetrics();
    this.fetchEquipmentGroup();
  }

  fetchMetrics() {
    this.metadataSvc
      .getAllMetrics()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            this.messageService.add({
              severity: "error",
              summary: "Fetch Metrics Failed",
              detail: err,
            });
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        console.log(res.data);
        res.data.forEach((obj) => {
          this.metrics.push({
            label: obj.unitType,
            value: obj.id,
          });
        });
      });
  }

  fetchEquipmentGroup() {
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
          summary: "Role Created",
          detail: res.message,
        });
      });
  }
}
