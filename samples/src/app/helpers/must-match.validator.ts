import { FormGroup } from '@angular/forms';

export function MustMatch(controlname: string, matchingControlname: string){
   return (formgroup: FormGroup) =>{
      const control = formgroup.controls[controlname];
      const matchingcontrol = formgroup.controls[matchingControlname];

      if(matchingcontrol.errors && !matchingcontrol.errors!['mustMatch']){
         // return if another validator has already found an error on the matchingControl
         return;
      }

      if(control.value !== matchingcontrol.value){
         matchingcontrol.setErrors({mustMatch: true});
      } else{
         matchingcontrol.setErrors(null);
      }
   }
}