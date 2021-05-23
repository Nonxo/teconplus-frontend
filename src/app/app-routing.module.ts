import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { InfoPageComponent } from "./auth/forgot-password/info-page/info-page.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "info/:data", component: InfoPageComponent },
  {
    path: "portal",
    loadChildren: () =>
      import("./portal/portal.module").then((m) => m.PortalModule),
  },
  { path: "reset", component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: "legacy",
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
