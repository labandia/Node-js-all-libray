import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-protectedroute',
  templateUrl: './protectedroute.component.html',
  styleUrls: ['./protectedroute.component.scss']
})
export class ProtectedrouteComponent implements OnInit {
  message : string = '';

  constructor(public auth: AuthService, public router: Router) { }

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
