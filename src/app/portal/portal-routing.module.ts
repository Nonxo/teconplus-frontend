import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortalComponent } from "./portal.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { RoleManagementComponent } from "./role-management/role-management.component";
import { MetaDataComponent } from "./meta-data/meta-data.component";
import { MetadataDetailsComponent } from "./meta-data/details/metadata-details.component";
import { ApprovalChainComponent } from "./approval-chain/approval-chain.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { ManageEquipmentComponent } from "./inventory/manage-equipment/manage-equipment.component";

const portalRoute: Routes = [
  { path: "", component: PortalComponent },
  { path: "users", component: UserManagementComponent },
  { path: "roles", component: RoleManagementComponent },
  { path: "metadata", component: MetaDataComponent },
  { path: "metadata/:tag", component: MetadataDetailsComponent },
  { path: "approval-chain", component: ApprovalChainComponent },
  { path: "inventory", component: InventoryComponent },
  { path: "manage-equipment", component: ManageEquipmentComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(portalRoute)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
