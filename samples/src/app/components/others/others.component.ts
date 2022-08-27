import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import {
  FadeGrowStagger,
  fadeinandout,
  disablestatechange,
} from '../animation';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
  animations: [fadeinandout, FadeGrowStagger, disablestatechange],
})
export class OthersComponent implements OnInit {
  show: boolean = true;

  BlogForm!: FormGroup;
  blog: any = [];
  searchField!: FormControl;

  buttonselected: boolean = false;

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  ngOnInit(): void {
    this.BlogForm = this.fb.group(
      {
        title: new FormControl('', Validators.required),
        desc: new FormControl('', Validators.required),
        // image: new FormControl('')
      },
      { updateOn: 'submit' }
    );

    this.searchField = new FormControl('', Validators.required);

    // this.getBlog();
    // this.getBlogByID();
  }
  showpanel() {
    this.show = !this.show;
  }

  getBlog() {
    this.auth.getdata('getblog').subscribe((data: any) => {
      this.blog = data.payload;
    });
  }

  getBlogByID() {
    this.auth.getdata('getblog2/1').subscribe((data: any) => {
      // this.blog = data.payload;
      // console.log(data);
    });
  }

  addBlog() {
    if (this.BlogForm.valid) {
      console.log('SDSD');
      this.auth.posdata('postblog', this.BlogForm.value).subscribe((data) => {
        this.getBlog();
      });

      this.BlogForm.reset();
    }
  }

  searchitem() {
    this.auth.searchdata(this.searchField.value);
  }

  triggerbtn() {
    this.buttonselected = !this.buttonselected;
    console.log(this.buttonselected);
  }
}
