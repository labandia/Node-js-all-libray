import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.scss']
})
export class UploadimageComponent implements OnInit {

  url: string = '';
  // filetoUpload : File = null;
  onselectedfile : any;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  upload(){
    const formdata = new FormData();
    formdata.append('file', this.onselectedfile);

    this.http.post('http://localhost:4000/file', formdata)
    .subscribe((dt: any)=>{
      console.log(dt);
    })
  }

  multipleupload(e: any){
    const files : FileList = e.target.files;
    const formdata = new FormData();

    for(let i = 0; i < files.length; i++){
      const element = files[i];
      formdata.append('files', element);
    }


    this.http.post('http://localhost:4000/multifiles', formdata)
    .subscribe((dt: any)=>{
      this.url = 'http://localhost:4000/images/'+ dt.filename;
      // console.log(dt);
    })
  }

  handlefileinput(e: any){
    this.onselectedfile =  e.target.files[0];

    //Show image preview
    const reader = new FileReader();
    reader.onload = (event: any)=>{
      this.url = event.target.result as string;
    }

    reader.readAsDataURL(this.onselectedfile)
  }

}
