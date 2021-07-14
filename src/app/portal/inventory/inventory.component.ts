import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { InventoryService } from "../portal-services/inventory.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { Equipment } from "./model/equipment";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  filterOptions: any[] = [];
  selectedFilter: string;
  value3: string;
  items: MenuItem[] = [];
  data: Equipment[] = [];
  requests;
  selectedEquipment: any;
  viewDetailsModal: boolean;
  viewHistoryModal: boolean;
  isApproved: boolean = true;

  constructor(private InventorySvc: InventoryService) {}

  ngOnInit(): void {
    this.fetchInventories();
    this.fetchInventoriesApprovalRequest();
  }

  fetchInventories() {
    this.InventorySvc.getAll()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        this.data = res.data;
      });
  }

  fetchInventoriesApprovalRequest() {
    this.InventorySvc.getAllApprovalRequest()
      .pipe(
        catchError(
          (err: any): ObservableInput<any> => {
            return throwError(err);
          }
        )
      )
      .subscribe((res) => {
        console.log(res.data);
      });
  }

  getSelectedRow(equipment: Equipment, index) {
    this.selectedEquipment = equipment;
    this.items = [
      {
        label: "View Equipment Details",
        command: () => {
          this.viewDetailsModal = true;
        },
      },
      {
        label: "Edit Equipment Info",
        command: () => {},
      },
      {
        label: "Delete Equipment",
        command: () => {},
      },
    ];
  }

  viewHistory() {
    this.viewDetailsModal = false;
    this.viewHistoryModal = true;
  }
}
