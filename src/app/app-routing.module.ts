import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { SignInComponent } from './includes/sign-in/sign-in.component';
import { RegComponent } from './includes/reg/reg.component';
import { UsersComponent } from './components/users/users.component';
import { AdminComponent } from './components/admin/admin.component';
import { OtpComponent } from './components/otp/otp.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { UserResolverService } from './resolvers/user-resolver.service';
import { UsersGuard } from './guards/users.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'login', component: LoginComponent, children: [
    {path: 'signin', component: SignInComponent},
    {path: 'signup', component: RegComponent},
    {path: 'rpwd', component: OtpComponent},
    {path: 'verify', component: VerifyMailComponent},
    {path: '', redirectTo: 'signin', pathMatch: 'full'} 
  ]},

  {path: 'start', component: GetStartedComponent,  resolve: {temp: UserResolverService}},
  // {path: 'dash', component: UsersComponent, loadChildren: ()=> import('./components/users/user.module').then(mod => mod.UserModule)},

  {path: 'dash', component: UsersComponent , canActivate: [UsersGuard],  resolve: {site_data: UserResolverService} , loadChildren: ()=> import('./components/users/user.module').then(mod => mod.UserModule)},
  {path: 'admin', canActivate: [UsersGuard], component: AdminComponent, loadChildren: ()=> import('./components/admin/admin.module').then(mod => mod.AdminModule)},

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
