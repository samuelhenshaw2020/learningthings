import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './includes/footer/footer.component';
import { InfoComponent } from './includes/info/info.component';
import {  MatCheckboxModule, MatMenuModule, MatListModule, MatToolbarModule, MatButtonModule, MatIconModule,
  MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule} from '@angular/material';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { RegComponent } from './includes/reg/reg.component';
import { SignInComponent } from './includes/sign-in/sign-in.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/users/dashboard/dashboard.component';
import { LoaderdotComponent } from './includes/loaderdot/loaderdot.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    InfoComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    GetStartedComponent,
    RegComponent,
    SignInComponent,
    DashboardComponent,
    LoaderdotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
