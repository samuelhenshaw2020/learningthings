import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';


const routes: Routes = [
  {path: 'list', component: ListCustomersComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: '**', component: ListCustomersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
