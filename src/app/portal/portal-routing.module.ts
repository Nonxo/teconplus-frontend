import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortalComponent } from "./portal.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { RoleManagementComponent } from "./role-management/role-management.component";
import { MetaDataComponent } from "./meta-data/meta-data.component";
import { EquipmentGroupsComponent } from "./meta-data/equipment-groups/equipment-groups.component";

const portalRoute: Routes = [
  { path: "", component: PortalComponent },
  { path: "users", component: UserManagementComponent },
  { path: "roles", component: RoleManagementComponent },
  { path: "metadata", component: MetaDataComponent },
  { path: "metadata/equipment-groups", component: EquipmentGroupsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(portalRoute)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
