import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistComponent } from './regist/regist.component';
import { FunctionManagementComponent } from './function-management/function-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { NoCompetenceComponent } from './no-competence/no-competence.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'regist', component: RegistComponent },
  { path: 'function-management', component: FunctionManagementComponent },
  { path: 'role-management', component: RoleManagementComponent },
  { path: 'no-competence', component: NoCompetenceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
