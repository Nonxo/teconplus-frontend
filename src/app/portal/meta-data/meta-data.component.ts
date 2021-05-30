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
      {
        label: "Equipment Groups",
        value: "EQUIPMENT_GROUP",
        icon: "assets/img/equipment_group.svg",
      },
      {
        label: "Equipment Types",
        value: "EQUIPMENT_TYPE",
        icon: "assets/img/equipment_types.svg",
      },
      {
        label: "Project Types",
        value: "PROJECT_TYPE",
        icon: "assets/img/project_types.svg",
      },
      {
        label: "Inventory Maintenance Types",
        value: "INVENTORY_MAINTENANCE_TYPE",
        icon: "",
      },
      {
        label: "Inventory Maintenance Metrics",
        value: "INVENTORY_MAINTENANCE_METRIC",
        icon: "",
      },
      {
        label: "Tecon Locations",
        value: "TECON_LOCATION",
        icon: "assets/img/tecon_locations.svg",
      },
      {
        label: "Designations",
        value: "SUBSIDIARY",
        icon: "assets/img/designation.svg",
      },
    ];
  }

  navigate(value) {
    this.router.navigate(["/portal/metadata", value]);
  }
}
