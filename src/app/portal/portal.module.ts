import { NgModule } from "@angular/core";
import { PortalComponent } from "./portal.component";
import { PortalRoutingModule } from "./portal-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PortalComponent],
  imports: [CommonModule, PortalRoutingModule],
})
export class PortalModule {}
