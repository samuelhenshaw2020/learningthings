import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatExpansionModule, MatMenuModule, MatListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatSidenavModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { WebeditorRoutingModule } from './webeditor-routing.module';
import { WebThemeComponent } from './web-theme/web-theme.component';
import { WebSettingComponent } from './web-setting/web-setting.component';
import { WebEditComponent } from './web-edit/web-edit.component';
import { WebIdentityComponent } from './web-identity/web-identity.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WebInfoComponent } from './web-info/web-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { SocialMediaComponent } from 'src/app/includes/social-media/social-media.component';
import { LoaderBlockOneComponent } from 'src/app/includes/loader-block-one/loader-block-one.component';


@NgModule({
  declarations: [WebThemeComponent, 
    WebSettingComponent, WebEditComponent, WebIdentityComponent, WebInfoComponent,
     SocialMediaComponent,
     LoaderBlockOneComponent],
  imports: [
    CommonModule,
    WebeditorRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    ScrollingModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class WebeditorModule { }
