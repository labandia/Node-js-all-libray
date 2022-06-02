import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  submitted = false;

  constructor(public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
     this.LoginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }, {updateOn: 'submit'});
  }

  login(){
    console.log(this.LoginForm.controls);
    this.submitted = true;
    if(this.LoginForm.valid){
          this.auth
        .posdata('login', this.LoginForm.value)
        .toPromise()
        .then((data: any) => {
          this.auth.storeToken(data);
          this.router.navigate(['admin']);
        });
    }else{
      // alert('Please fill all the required fields to create a super hero!');
    }
  
  }

  get f() { return this.LoginForm.controls; }

  onReset(){
    this.LoginForm.reset();
  }

}
