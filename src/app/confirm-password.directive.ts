import { ValidatorFn, AbstractControl} from '@angular/forms';

export function ConfirmPasswordDirective( password : string): ValidatorFn {
     return (control: AbstractControl): {[key: string]: boolean} | null => {
       console.log(password);
       console.log(control.get('password'));
      //  console.log(control.parent.get('password'));
        const result = control.value==control.get('password').value;
      return result ?null : {passwordMatch:true};
    };
  }