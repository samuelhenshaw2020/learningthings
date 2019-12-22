import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteListComponent } from './website-list/website-list.component';
import { WebsitePendingComponent } from './website-pending/website-pending.component';
import { AdminResolverService } from 'src/app/resolvers/admin-resolver.service';


const routes: Routes = [
  {path: 'list', component: WebsiteListComponent},
  {path: 'pending', component: WebsitePendingComponent, resolve: {pending: AdminResolverService}},
  {path: '', redirectTo: 'list', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsitesRoutingModule { }
