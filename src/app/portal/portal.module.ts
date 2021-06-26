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
import { SplitterModule } from "primeng/splitter";
import { ToolbarModule } from "primeng/toolbar";
import { DividerModule } from "primeng/divider";
import { UserManagementComponent } from "./user-management/user-management.component";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { TagModule } from "primeng/tag";
import { AvatarModule } from "primeng/avatar";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { SplitButtonModule } from "primeng/splitbutton";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { ContextMenuModule } from "primeng/contextmenu";
import { InputSwitchModule } from "primeng/inputswitch";
import { SelectButtonModule } from "primeng/selectbutton";
import { CheckboxModule } from "primeng/checkbox";
import { CalendarModule } from "primeng/calendar";
import { RoleManagementComponent } from "./role-management/role-management.component";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MultiSelectModule } from "primeng/multiselect";
import { MetaDataComponent } from "./meta-data/meta-data.component";
import { MetadataDetailsComponent } from "./meta-data/details/metadata-details.component";
import { ApprovalChainComponent } from "./approval-chain/approval-chain.component";
import { TimelineModule } from "primeng/timeline";
import { TextTransformPipe } from './pipes/text-transform.pipe';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    PortalComponent,
    PortalNavComponent,
    PortalMenuComponent,
    UserManagementComponent,
    RoleManagementComponent,
    MetaDataComponent,
    MetadataDetailsComponent,
    ApprovalChainComponent,
    TextTransformPipe,
    InventoryComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    SharedModule,
    BadgeModule,
    SplitterModule,
    ToolbarModule,
    DividerModule,
    DataViewModule,
    DropdownModule,
    TableModule,
    ToastModule,
    TagModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
    SplitButtonModule,
    OverlayPanelModule,
    DialogModule,
    RippleModule,
    ContextMenuModule,
    InputSwitchModule,
    SelectButtonModule,
    CheckboxModule,
    CalendarModule,
    InputTextareaModule,
    MultiSelectModule,
    TimelineModule,
  ],
  providers: [],
})
export class PortalModule {}
