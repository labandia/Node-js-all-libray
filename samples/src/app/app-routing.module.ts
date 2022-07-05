import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProtectedrouteComponent } from './auth/protectedroute/protectedroute.component';
import { RegisterComponent } from './auth/register/register.component';
import { AnimationpracticeComponent } from './components/animationpractice/animationpractice.component';
import { ItemsComponent } from './components/items/items.component';
import { OthersComponent } from './components/others/others.component';
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
    path: 'animatecom',
    component: AnimationpracticeComponent,
    children: [
      {
        path: 'hello',
        component: OthersComponent,
        // data: {
        //   animation: 'hello',
        //   state: 'home'
        // }
      },
      {
        path: 'world',
        component: ItemsComponent,
        // data: {
        //   animation: 'world',
        //   state: 'about'
        // }
      },
      {
        path: 'upload',
        component: UploadimageComponent,
        // data: {
        //   animation: 'world',
        //   state: 'about'
        // }
      }
    ]
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
    redirectTo: 'animatecom/hello', 
    // redirectTo: 'login', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
