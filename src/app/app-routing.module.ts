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
import { ControlComponent } from './control/control.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminResolverService } from './resolvers/admin-resolver.service';
import { AfterUserLoginGuard } from './guards/after-user-login.guard';
import { BeforeUserLoginGuard } from './guards/before-user-login.guard';


const routes: Routes = [
  
  // HOME
  {path: 'login', component: LoginComponent, children: [
    {path: 'signin', component: SignInComponent},
    {path: 'signup', component: RegComponent},
    {path: 'rpwd', component: OtpComponent},
    {path: '', redirectTo: 'signin', pathMatch: 'full'}
  ],  data: {animation: 'LoginPage'}, canActivate: [BeforeUserLoginGuard]},

  // USER
  {
    path: 'dash', component: UsersComponent  ,  resolve: {site_data: UserResolverService}, 
    loadChildren: ()=> import('./components/users/user.module').then(mod => mod.UserModule),
    data: {animation: 'DashPage'},
    canActivate: [AfterUserLoginGuard], canLoad: [UsersGuard]
  },
  {path: 'verify', component: VerifyMailComponent, canActivate: [AfterUserLoginGuard]},
  {path: 'start', component: GetStartedComponent,  resolve: {temp: UserResolverService}, canActivate: [AfterUserLoginGuard]},

  // ADMIN
  {path: 'control', component: ControlComponent, data: {animation: 'ControlPage'}},
  {
      path: 'admin',  component: AdminComponent,  
      loadChildren: ()=> import('./components/admin/admin.module').then(mod => mod.AdminModule),
      data: {animation: 'AdminPage',
      canActivate: [AdminGuard]
    }
  },

  // ANY ROUTE
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
