import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { SignInComponent } from './includes/sign-in/sign-in.component';
import { RegComponent } from './includes/reg/reg.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, data:{animation: 'home'}},

  {path: 'login', component: LoginComponent, data:{animation: 'login'}, children: [
    {path: 'signin', component: SignInComponent, data: {signininAnime: 'signin'}},
    {path: 'signup', component: RegComponent, data: {signupinAnime: 'signup'}},
    {path: '', redirectTo: 'signin', pathMatch: 'full'}
  ]},

  {path: 'start', component: GetStartedComponent, data:{animation: 'start'}},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
