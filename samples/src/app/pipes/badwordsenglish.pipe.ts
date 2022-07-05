declare var require: any
import { Pipe, PipeTransform } from "@angular/core";
import './string.methods';

@Pipe({
   name: 'Badeng'
})

export class BadEnglishpipe implements PipeTransform{
   public readonly obscenities = require('badwords-list');

   transform(value: any): any{
      var newVal: string = value;
      var grawlix: string = '@#$%&!';
      this.obscenities.array.forEach((curse: any) => {
         newVal = newVal.replaceAll(curse, grawlix);
      });
      return newVal;
   }
}