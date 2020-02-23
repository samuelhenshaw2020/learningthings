import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './includes/footer/footer.component';
import { InfoComponent } from './includes/info/info.component';
import { MatDialogModule,  MatCheckboxModule, MatMenuModule, MatListModule, MatToolbarModule, MatButtonModule, MatIconModule,
  MatInputModule, MatBadgeModule, MatTooltipModule, MatGridListModule, MatCardModule, MatChipsModule, MatStepperModule, MatSnackBarModule, MatProgressBarModule, MatButtonToggleModule} from '@angular/material';
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
import { WebsiteListComponent } from './components/admin/websites/website-list/website-list.component';
import { MiniProfileComponent } from './includes/mini-profile/mini-profile.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FacebookLoginProvider, AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AddProductComponent } from './components/users/product/add-product/add-product.component';
import { LyDialogModule } from '@alyle/ui/dialog';
import { AddCategoryComponent } from './users/product/add-category/add-category.component';
import { AddCategoryDialogComponent } from './components/users/product/add-category-dialog/add-category-dialog.component';
import { ViewProductDialogComponent } from './components/users/product/view-product-dialog/view-product-dialog.component';
import { MediaManagerComponent } from './components/users/media-manager/media-manager.component';
import { AddExperienceComponent } from './dialogs/add-experience/add-experience.component';
import { AddEducationComponent } from './dialogs/add-education/add-education.component';
import { AddProjectComponent } from './dialogs/add-project/add-project.component';
import { DeleteBadTokenComponent } from './dialog/delete-bad-token/delete-bad-token.component';




const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1837407539717598')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('229148738185-afk333csv0utocqubf5vajuhf8naq4de.apps.googleusercontent.com')
  }
])

export function providerConfig(){
  return config;
}


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
    FloatMenuComponent,
    MiniProfileComponent,
    ConfirmDialogComponent,
    AddCategoryComponent,
    ViewProductDialogComponent,
    MediaManagerComponent,


    // Dialog
    AddCategoryDialogComponent,
    AddExperienceComponent,
    AddEducationComponent,
    AddProjectComponent,
    DeleteBadTokenComponent
   
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
    LyDividerModule,
    LyDialogModule,

    RecaptchaModule,
    RecaptchaFormsModule,
    SocialLoginModule
    
    
    
  ],
  entryComponents: [
    PwdForgetComponent,
    ProdVariationComponent,
    MiniProfileComponent,
    ConfirmDialogComponent,
    AddCategoryDialogComponent,
    ViewProductDialogComponent,
    MediaManagerComponent,
    AddExperienceComponent,
    AddEducationComponent,
    AddProjectComponent,
    DeleteBadTokenComponent

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    {provide: AuthServiceConfig, useFactory: providerConfig }
  ],
  bootstrap: [
    AppComponent,
    AddExperienceComponent,
    AddEducationComponent
  ],
  exports: [
    AppComponent
  ]
})
export class AppModule { }
