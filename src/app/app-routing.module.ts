import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FetchDataFormComponent } from './components/fetch-data-form/fetch-data-form.component';
import { DataShowComponent } from './components/data-show/data-show.component';
import { EachDataComponent } from './components/each-data/each-data.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AppLoderComponent } from './components/app-loder/app-loder.component';




const routes: Routes = [
  
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginFormComponent,canActivate:[GuestGuard]},
  {path:"signup",component:SignupFormComponent,canActivate:[GuestGuard]},
  {path:"data-form",component:FetchDataFormComponent,canActivate:[AuthGuard]},
  {path:"data-show",component:DataShowComponent,canActivate:[AuthGuard]},
  {path:"each-data/:id",component:EachDataComponent,canActivate:[AuthGuard]},
  {path:"loading",component:AppLoderComponent},
  {path:"**",component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


