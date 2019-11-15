import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatExpansionModule, MatMenuModule, MatListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatSidenavModule, MatSliderModule } from '@angular/material';
import { WebformRoutingModule } from './webform-routing.module';
import { ViewMessageComponent } from './view-message/view-message.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WfReviewComponent } from './wf-review/wf-review.component';


@NgModule({
  declarations: [
    ViewMessageComponent,
    WfReviewComponent
  ],
  imports: [
    CommonModule,
    WebformRoutingModule,
    CommonModule,
    AngularEditorModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
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
    MatSliderModule
  ],
  entryComponents: [
    ViewMessageComponent
  ]
})
export class WebformModule { }
