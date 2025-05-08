import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from './shared/button/button.component';
import { InputComponent } from './shared/input/input.component';
import { AppLoderComponent } from './components/app-loder/app-loder.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FetchDataFormComponent } from './components/fetch-data-form/fetch-data-form.component';
import { DataShowComponent } from './components/data-show/data-show.component';
import { EachDataComponent } from './components/each-data/each-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    HomeComponent ,
    ButtonComponent,
    InputComponent,
    AppLoderComponent,
    FormComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    FetchDataFormComponent,
    DataShowComponent,
    EachDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
