import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { UserResolverService } from 'src/app/resolvers/user-resolver.service';
import { ProductComponent } from './product/product.component';
import { WebeditorComponent } from './webeditor/webeditor.component';
import { SupportComponent } from './support/support.component';
import { PostComponent } from './post/post.component';
import { CustomersComponent } from './customers/customers.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PreviewComponent } from './preview/preview.component';
import { WebformComponent } from './webform/webform.component';
import { UsersGuard } from 'src/app/guards/users.guard';


const routes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'manmedia', component: ManageMediaComponent, resolve: {media: UserResolverService},   loadChildren: ()=> import('./manage-media/manage-media.module').then(mod => mod.ManageMediaModule)},
  {path: 'product', component: ProductComponent, loadChildren: ()=> import('./product/product.module').then( mod => mod.ProductModule)},
  {path: 'website', component: WebeditorComponent , loadChildren: ()=> import('./webeditor/webeditor.module').then(mod => mod.WebeditorModule)},
  {path: 'support', component: SupportComponent},
  {path: 'post', component: PostComponent , resolve:{post: UserResolverService} ,loadChildren: ()=> import('./post/post.module').then(mod => mod.PostModule)},
  {path: 'customer', component: CustomersComponent,  loadChildren: ()=> import('./customers/customers.module').then(mod => mod.CustomersModule) },
  {path: 'portfolio', component: PortfolioComponent },
  {path: 'preview', component: PreviewComponent },
  {path: 'webform', component: WebformComponent ,  loadChildren: ()=> import('./webform/webform.module').then(mod => mod.WebformModule)},
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: '**', component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
