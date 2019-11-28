import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebThemeComponent } from './web-theme/web-theme.component';
import { WebSettingComponent } from './web-setting/web-setting.component';
import { WebEditComponent } from './web-edit/web-edit.component';
import { WebIdentityComponent } from './web-identity/web-identity.component';
import { UserResolverService } from 'src/app/resolvers/user-resolver.service';


const routes: Routes = [
  {path: 'identity', component: WebIdentityComponent},
  {path: 'edit', component: WebEditComponent},
  {path: 'theme', component: WebThemeComponent, resolve: {theme: UserResolverService}},
  {path: 'preference', component: WebSettingComponent},
  {path: '', redirectTo: 'identity', pathMatch: 'full' },
  {path: "**", component: WebIdentityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebeditorRoutingModule { }
