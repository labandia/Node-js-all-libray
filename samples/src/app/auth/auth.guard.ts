import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public auth: AuthService, public route: Router){

  }
  canActivate():boolean {
    if(this.auth.isLoginuser()){
        return true
    }else{
        this.route.navigate(['/login']);
        return false
    }
  }
  
}
