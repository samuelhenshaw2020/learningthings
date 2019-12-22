import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsitesRoutingModule } from './websites-routing.module';
import { WebsiteListComponent } from './website-list/website-list.component';
import { WebsiteSuspendedComponent } from './website-suspended/website-suspended.component';
import { WebsitePendingComponent } from './website-pending/website-pending.component';

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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SubDatePipe } from '../websites/sub-date.pipe';



@NgModule({
  declarations: [WebsiteListComponent, WebsiteSuspendedComponent, WebsitePendingComponent,  SubDatePipe],
  imports: [
    CommonModule,
    WebsitesRoutingModule,

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
  ] 
})
export class WebsitesModule { }
