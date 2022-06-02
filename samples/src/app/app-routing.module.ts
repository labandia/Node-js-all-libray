import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProtectedrouteComponent } from './auth/protectedroute/protectedroute.component';
import { RegisterComponent } from './auth/register/register.component';
import { UploadimageComponent } from './pages/uploadimage/uploadimage.component';

const routes: Routes = [
  {
    path: 'image_section', 
    component: UploadimageComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'admin', 
    component: ProtectedrouteComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'fadein'
    }
  },
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
