import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  submitted = false;
  isloading : boolean = false;

  constructor(public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
     this.LoginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }, {updateOn: 'submit'});
    //   this.LoginForm = this.fb.group({
    //   username: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required]),
    //  fullname: new FormGroup({
    //     firstname: new FormControl(''),
    //     lastname: new FormControl('')
    //   })
    // });

    //FOR EMAIL VALIDATION
    // [^ @]*@[^ @]*

    // this.LoginForm.valueChanges.subscribe(data=>{
    //     if(this.LoginForm.valid){
    //       console.log(data);
    //        data.dateUpdate = new Date();
    //     }
    // })
  }

  login(){
    this.submitted = true;
    if(this.LoginForm.valid){
        this.isloading = true;
          this.auth
        .posdata('login', this.LoginForm.value).toPromise().then(
          (data: any) => {
           setTimeout(()=>{
              this.isloading = false;
              this.auth.storeToken(data);
              this.router.navigate(['admin']);
          }, 2000)
        }
        ).catch((errr)=>{
           setTimeout(()=>{
              this.isloading = false;
              alert('Username and password is incorrect')
            }, 2000)
        })
    }
}

  get f() { return this.LoginForm.controls; }

  onReset(){
    this.LoginForm.reset();
  }

}
