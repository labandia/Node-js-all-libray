import { Component, OnInit } from '@angular/core';
import { FadeGrowStagger, staggereffect } from '../animation';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    staggereffect,
    FadeGrowStagger
  ]
})
export class ItemsComponent implements OnInit {
  isloading : boolean = false;

  imagesample : string = '';  
  content: string = 'Son of a bitch'; 

  word : String = 'bitch';

  constructor() { }

  ngOnInit(): void {
    console.log(this.word.length)
  }


  loadingbutts(){
      this.isloading = true;
      setTimeout(() => {
          this.isloading = false;
      }, 4000);
  }
}
