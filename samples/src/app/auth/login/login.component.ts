import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;

  constructor(public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
     this.LoginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login(){

    this.auth
      .posdata('login', this.LoginForm.value)
      .toPromise()
      .then((data: any) => {
        this.auth.storeToken(data);
        this.router.navigateByUrl('/admin');
      });
  }

}
