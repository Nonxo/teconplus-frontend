import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortalComponent } from "./portal.component";
import { UserManagementComponent } from "./user-management/user-management.component";

const portalRoute: Routes = [
  { path: "", component: PortalComponent },
  { path: "users", component: UserManagementComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(portalRoute)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
