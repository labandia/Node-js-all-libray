import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { MustMatch } from 'src/app/helpers/must-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;

  constructor(public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
     this.RegisterForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      Corfirmpassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
     }
    //, {
    //   updateOn: 'submit', 
    //   validators: MustMatch('password', 'Corfirmpassword')
    // }
    );


    this.RegisterForm.valueChanges.subscribe(data=>{
       if(this.RegisterForm.valid){
          console.log(data)
       }
    })
  }

  get f(){
     return this.RegisterForm.controls;
  }

  registeruser(){
      if(this.RegisterForm.valid){
        this.auth
        .posdata('register', this.RegisterForm.value)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          this.router.navigateByUrl('/login');
        });
      }
  }

}
