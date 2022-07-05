import { Pipe, Component, NgModule } from "@angular/core";

@Pipe({
   name: 'imageurl'
})
export class Defautlimage{
   // transform(value: string, fb: string, forceHttp: boolean = false){
   //    let image = '';
   //    if(value){
   //       image = value;
   //    }else{
   //       image = fb;
   //    }

   //    if(forceHttp){
   //       if(image.indexOf('https') === -1 ){
   //          image = image.replace('http', 'https');
   //       }
   //    }
   //    return image;
   // }


   transform(value: string){
      let image = '';
      if(value){
         image = value;
      }else{
         image = 'assets/florian-olivo-Mf23RF8xArY-unsplash.jpg';
      }

      return image;
   }
}