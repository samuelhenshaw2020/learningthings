import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserPendingComponent } from './user-pending/user-pending.component';
import { AdminResolverService } from 'src/app/resolvers/admin-resolver.service';


const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'user-pending', component: UserPendingComponent},
  {path: '', redirectTo: 'user-list', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
