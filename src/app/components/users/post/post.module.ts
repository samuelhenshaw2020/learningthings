
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AllPostComponent } from './all-post/all-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostRoutingModule } from './post-routing.module';
import { MatCheckboxModule, MatExpansionModule, MatMenuModule, MatListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatSidenavModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoaderdotComponent } from 'src/app/includes/loaderdot/loaderdot.component';
import { PostAnalysisComponent } from './post-analysis/post-analysis.component';
import { AngularEditorModule } from '@kolkov/angular-editor';




@NgModule({
  declarations: [
    AllPostComponent,
    CreatePostComponent,
    EditPostComponent,
    PostAnalysisComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
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
  ],
  entryComponents: [
    PostAnalysisComponent
  ]
})
export class PostModule { }
