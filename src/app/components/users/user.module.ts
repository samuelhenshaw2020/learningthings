import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PostComponent } from './post/post.component';
import { WebeditorComponent } from './webeditor/webeditor.component';
import { CustomersComponent } from './customers/customers.component';
import { SupportComponent } from './support/support.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule, MatExpansionModule, MatMenuModule, MatListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatSidenavModule, MatSliderModule, MatSelectModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MediaManagerComponent } from './media-manager/media-manager.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PreviewComponent } from './preview/preview.component';
import { UserInterceptorService } from './user-interceptor.service';
import { WebformComponent } from './webform/webform.component';
import { ViewMessageComponent } from './webform/view-message/view-message.component';
import { SocialMediaComponent } from 'src/app/includes/social-media/social-media.component';
import { UsersGuard } from 'src/app/guards/users.guard';
import {DragDropModule} from '@angular/cdk/drag-drop';




@NgModule({
  declarations: [
    OverviewComponent,
    ManageMediaComponent,
    UserSettingsComponent,
    PostComponent,
    WebeditorComponent,
    CustomersComponent,
    SupportComponent,
    ProductComponent,
   
    PortfolioComponent,
    PreviewComponent,
    WebformComponent
    
  ],
  imports: [
    
    CommonModule,
    UserRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatCardModule,
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
    MatSliderModule,
    MatSelectModule,
    DragDropModule
    
  ],
  entryComponents: [
  ],
  providers: [
    UsersGuard
  ]
})
export class UserModule { }
