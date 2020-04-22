import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormGroupService } from './services/form-group.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginValidateConfig } from './services/validate-configs/login-validate-config';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutService } from './services/layout.service';
import { HomeComponent } from './home/home.component';
import { LocalStoreManager } from './services/local-store-manager.service';
import { RegistComponent } from './regist/regist.component';
import { FunctionManagementComponent } from './function-management/function-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { NoCompetenceComponent } from './no-competence/no-competence.component';
import { RoleAddDeleteComponent } from './role-add-delete/role-add-delete.component';
import { PaginatorComponent } from './share/paginator/paginator.component';
import { PaginatorService } from './services/paginator.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    RegistComponent,
    FunctionManagementComponent,
    RoleManagementComponent,
    NoCompetenceComponent,
    RoleAddDeleteComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot()
  ],
  providers: [FormGroupService, LoginValidateConfig, LayoutService, PaginatorService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(){

  }
 }
