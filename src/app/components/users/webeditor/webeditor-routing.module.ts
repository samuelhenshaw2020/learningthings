import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebThemeComponent } from './web-theme/web-theme.component';
import { WebSettingComponent } from './web-setting/web-setting.component';
import { WebEditComponent } from './web-edit/web-edit.component';
import { WebIdentityComponent } from './web-identity/web-identity.component';


const routes: Routes = [
  {path: 'edit', component: WebEditComponent},
  {path: 'identity', component: WebIdentityComponent},
  {path: 'theme', component: WebThemeComponent},
  {path: 'preference', component: WebSettingComponent},
  {path: '', redirectTo: 'edit', pathMatch: 'full' },
  {path: "**", component: WebEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebeditorRoutingModule { }
