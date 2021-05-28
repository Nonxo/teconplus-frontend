import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-meta-data",
  templateUrl: "./meta-data.component.html",
  styleUrls: ["./meta-data.component.scss"],
})
export class MetaDataComponent implements OnInit {
  layoutOptions: any[];
  layout: string = "grid";
  metaDataList: any[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.layoutOptions = [
      { icon: "pi pi-list", value: "list" },
      { icon: "pi pi-th-large", value: "grid" },
    ];

    this.metaDataList = [
      { label: "Equipment Groups", value: "EQUIPMENT_GROUP" },
      { label: "Equipment Types", value: "EQUIPMENT_TYPE" },
      { label: "Project Types", value: "PROJECT_TYPE" },
      {
        label: "Inventory Maintenance Types",
        value: "INVENTORY_MAINTENANCE_TYPE",
      },
      {
        label: "Inventory Maintenance Metrics",
        value: "INVENTORY_MAINTENANCE_METRIC",
      },
      { label: "Tecon Locations", value: "TECON_LOCATION" },
      { label: "Designations", value: "SUBSIDIARY" },
    ];
  }

  navigate(value) {
    switch (value) {
      case "EQUIPMENT_GROUP":
        this.router.navigate(["/portal/metadata/equipment-groups"]);
    }
  }
}
