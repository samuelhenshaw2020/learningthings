import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountsComponent } from './accounts/accounts.component';
import { WebsitesComponent } from './websites/websites.component';
import { MatDividerModule, MatCheckboxModule, MatExpansionModule, MatMenuModule, MatListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatSidenavModule, MatAutocompleteModule } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { LyThemeModule, LY_THEME, LyHammerGestureConfig } from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LyCommonModule } from '@alyle/ui';
import { LyButtonModule } from '@alyle/ui/button';
import { ThemeMinimaModule } from '@alyle/ui/themes/minima';
import { LyCardModule } from '@alyle/ui/card';
import { LyDrawerModule } from '@alyle/ui/drawer';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyListModule } from '@alyle/ui/list';
import { LyRadioModule } from '@alyle/ui/radio';
import { LyTypographyModule } from '@alyle/ui/typography';
import { LyIconModule } from '@alyle/ui/icon';
import { ResponsiveModule } from '@alyle/ui/responsive';
import { LyBadgeModule } from '@alyle/ui/badge';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LyMenuModule } from '@alyle/ui/menu';
import { LyAvatarModule } from '@alyle/ui/avatar';
import { LyGridModule } from '@alyle/ui/grid';
import { LyDividerModule } from '@alyle/ui/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaymentComponent } from './payment/payment.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminMailComponent } from './admin-mail/admin-mail.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { ViewSiteComponent } from './view-site/view-site.component';



@NgModule({
  declarations: [AnalysisComponent, DashboardComponent, SettingsComponent, AccountsComponent, WebsitesComponent, PaymentComponent, AdminMailComponent, ViewSiteComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    ReactiveFormsModule,
    AngularEditorModule,
    FormsModule,
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
    DragDropModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonToggleModule,

    LyThemeModule.setTheme('minima-light'),
    LyCommonModule,
    ThemeMinimaModule, 
    LyCommonModule,
    LyCardModule,
    LyButtonModule,
    LyDrawerModule,
    LyToolbarModule,
    LyListModule,
    LyButtonModule,
    LyRadioModule,
    LyTypographyModule,
    LyIconModule,
    LyBadgeModule,
    ResponsiveModule,
    LyMenuModule,
    LyAvatarModule,
    LyGridModule,
    LyDividerModule
    
  ],
  entryComponents: [AdminMailComponent, ViewSiteComponent],
  providers: [AdminGuard]
 
})
export class AdminModule { }
