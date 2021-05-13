import { NgModule } from "@angular/core";
import { PortalComponent } from "./portal.component";
import { PortalRoutingModule } from "./portal-routing.module";
import { CommonModule } from "@angular/common";
import { PortalNavComponent } from "./portal-nav/portal-nav.component";
import { PortalMenuComponent } from "./portal-menu/portal-menu.component";
import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";
import { SharedModule } from "primeng/api";
import { BadgeModule } from "primeng/badge";
import { MenuModule } from "primeng/menu";

@NgModule({
  declarations: [PortalComponent, PortalNavComponent, PortalMenuComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    SharedModule,
    BadgeModule,
  ],
})
export class PortalModule {}
