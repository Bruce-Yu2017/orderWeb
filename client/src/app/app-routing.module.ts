import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { MainService } from './main.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { NewUserComponent } from './new-user/new-user.component';


const routes: Routes = [
  {path: "", pathMatch: "full", component: HomeComponent},
  {path: "login", pathMatch: "full", component: LoginComponent},
  {path: "new_menu", pathMatch: "full", component: NewMenuComponent},
  {path: "new_user", pathMatch: "full", component: NewUserComponent},
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
