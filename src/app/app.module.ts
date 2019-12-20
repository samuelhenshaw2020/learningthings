import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './includes/footer/footer.component';
import { InfoComponent } from './includes/info/info.component';
import { MatDialogModule,  MatCheckboxModule, MatMenuModule, MatListModule, MatToolbarModule, MatButtonModule, MatIconModule,
  MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule} from '@angular/material';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { RegComponent } from './includes/reg/reg.component';
import { SignInComponent } from './includes/sign-in/sign-in.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderdotComponent } from './includes/loaderdot/loaderdot.component';
import { UsersComponent } from './components/users/users.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoadernavComponent } from './includes/loadernav/loadernav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PwdForgetComponent } from './dialogs/pwd-forget.component';
import { OtpComponent } from './components/otp/otp.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppInterceptorService } from './app-interceptor.service';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { RightAsideComponent } from './includes/right-aside/right-aside.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SocialMediaComponent } from './includes/social-media/social-media.component';
import { LoaderBlockOneComponent } from './includes/loader-block-one/loader-block-one.component';
import { UsersGuard } from './guards/users.guard';
import { LoginGuard } from './guards/login.guard';
import { NotificationComponent } from './components/users/notification/notification.component';
import { ProductPipe } from './pipes/product.pipe';
import { ScrollProdDirective } from './directives/scroll-prod.directive';
import { ProdVariationComponent } from './dialogs/prod-variation/prod-variation.component';

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
import { ControlComponent } from './control/control.component';
import { ValNumComponent } from './includes/val-num/val-num.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LyMenuModule } from '@alyle/ui/menu';
import { LyAvatarModule } from '@alyle/ui/avatar';
import { LyGridModule } from '@alyle/ui/grid';
import { LyDividerModule } from '@alyle/ui/divider';
import { FloatMenuComponent } from './includes/float-menu/float-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    InfoComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    GetStartedComponent,
    RegComponent,
    SignInComponent,
    LoaderdotComponent,
    UsersComponent,
    AdminComponent,
    LoadernavComponent,
    PwdForgetComponent,
    OtpComponent,
    VerifyMailComponent,
    RightAsideComponent,
    NotificationComponent,
    ProductPipe,
    ScrollProdDirective,
    ProdVariationComponent,
    ControlComponent,
    ValNumComponent,
    FloatMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  entryComponents: [
    PwdForgetComponent,
    ProdVariationComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }
  ],
  bootstrap: [AppComponent],
  exports: [
    AppComponent
  ]
})
export class AppModule { }
