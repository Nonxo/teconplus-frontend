import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./auth/login/login.component";
import { LoginFormComponent } from "./auth/login/login-form/login-form.component";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { HeaderComponent } from "./auth/header/header.component";
import { SelectButtonModule } from "primeng/selectbutton";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { FooterComponent } from "./auth/footer/footer.component";
import { DropdownModule } from "primeng/dropdown";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { InfoPageComponent } from "./auth/forgot-password/info-page/info-page.component";
import { DividerModule } from "primeng/divider";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { ApiInterceptor } from "./services/api-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    InfoPageComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    SelectButtonModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    HttpClientModule,
    ToastModule,
    DividerModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
