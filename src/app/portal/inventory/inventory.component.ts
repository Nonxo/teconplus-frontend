import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

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

  constructor() {}

  ngOnInit(): void {}
}
