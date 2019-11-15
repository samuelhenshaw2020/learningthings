import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMessageComponent } from './view-message/view-message.component';
import { WfReviewComponent } from './wf-review/wf-review.component';


const routes: Routes = [
  {path: 'wfreview', component: WfReviewComponent},
  {path: '', redirectTo: 'wfreview', pathMatch: 'full'},
  {path: '**', component: WfReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebformRoutingModule { }
