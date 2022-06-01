import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


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
      username: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl('')
    });
  }

  registeruser(){
      this.auth
      .posdata('register', this.RegisterForm.value)
      .toPromise()
      .then((data: any) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      });
  }

}
