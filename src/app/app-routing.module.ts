import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { InfoPageComponent } from "./auth/forgot-password/info-page/info-page.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "info/:data", component: InfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
