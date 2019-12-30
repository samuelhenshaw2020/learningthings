import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { WebsitesComponent } from './websites/websites.component';
import { SettingsComponent } from './settings/settings.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminResolverService } from 'src/app/resolvers/admin-resolver.service';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'accounts', resolve: {acc: AdminResolverService}, component: AccountsComponent, loadChildren: ()=>import('./accounts/accounts.module').then(m => m.AccountsModule)},
  {path: 'websites', resolve: {web: AdminResolverService}, component: WebsitesComponent, loadChildren: ()=>import('./websites/websites.module').then(m => m.WebsitesModule)},
  {path: 'settings', component: SettingsComponent},
  {path: 'analysis', component: AnalysisComponent},
  {path: 'pay', component: PaymentComponent},
  {path: '', redirectTo: 'dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
