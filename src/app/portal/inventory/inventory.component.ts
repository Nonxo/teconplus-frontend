import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { InventoryService } from "../portal-services/inventory.service";
import { catchError } from "rxjs/operators";
import { ObservableInput, throwError } from "rxjs";
import { Equipment } from "./model/equipment";
import { Router } from "@angular/router";

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

  constructor(private inventorySvc: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInventories();
    this.fetchInventoriesApprovalRequest();
  }

  fetchInventories() {
    this.inventorySvc
      .getAll()
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
    this.inventorySvc
      .getAllApprovalRequest()
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
        command: () => {
          this.inventorySvc.setEquipment(this.selectedEquipment);
          this.router.navigate(["/portal/manage-equipment"]);
        },
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
