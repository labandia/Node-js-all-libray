import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-protectedroute',
  templateUrl: './protectedroute.component.html',
  styleUrls: ['./protectedroute.component.scss']
})
export class ProtectedrouteComponent implements OnInit, OnDestroy {
  message : string = '';
  Subscription : Subscription | undefined;

  constructor(public auth: AuthService, public router: Router) { }


  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.auth.getdata('protectedroute').subscribe((data: any)=>{
        this.message = data.msg;
    }, (error)=>{
        console.log(error);
    })
  }


  Logout(){
    this.auth.userlogout();
    this.router.navigateByUrl('/login');
  }

}
