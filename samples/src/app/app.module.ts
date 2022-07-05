import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadimageComponent } from './pages/uploadimage/uploadimage.component';
import { LoginComponent } from './auth/login/login.component';
import { ProtectedrouteComponent } from './auth/protectedroute/protectedroute.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/services/auth.service';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationpracticeComponent } from './components/animationpractice/animationpractice.component';
import { OthersComponent } from './components/others/others.component';
import { ItemsComponent } from './components/items/items.component';
import { Defautlimage } from './pipes/imageurl.pipe';
import { BadEnglishpipe } from './pipes/badwordsenglish.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UploadimageComponent,
    LoginComponent,
    ProtectedrouteComponent,
    RegisterComponent,
    AnimationpracticeComponent,
    OthersComponent,
    ItemsComponent,
    Defautlimage,
    BadEnglishpipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
