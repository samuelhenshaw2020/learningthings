import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatExpansionModule, MatMenuModule, MatListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatSidenavModule, MatSelectModule, MatSlideToggleModule, MatAutocompleteModule } from '@angular/material';
import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListCustomersComponent } from './list-customers/list-customers.component';


@NgModule({
  declarations: [ListCustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
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
export class CustomersModule { }
