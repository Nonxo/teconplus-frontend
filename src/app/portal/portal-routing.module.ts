import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortalComponent } from "./portal.component";

const portalRoute: Routes = [{ path: "", component: PortalComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(portalRoute)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
