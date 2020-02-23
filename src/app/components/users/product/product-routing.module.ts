import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
// import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {path: 'alla', component: AllProductComponent},
  {path: 'add', component: AddProductComponent},
  {path: 'edit/:prod_id', component: EditProductComponent},
  {path: '', redirectTo: 'all', pathMatch: 'full'},
  {path: '**', component: AllProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
