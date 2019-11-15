import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostComponent } from './all-post/all-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';


const routes: Routes = [
  {path: 'all', component: AllPostComponent},
  {path: 'create', component: CreatePostComponent},
  {path: 'edit/:post_id', component: EditPostComponent},
  {path: '', redirectTo: 'all', pathMatch: 'full'},
  {path: '**', component: AllPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
