import { ValidatorFn, AbstractControl} from '@angular/forms';
// export function PasswordValidationDirective(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: boolean} | null => {
//     if (nameRe==/[A-Z]/){
//       const result = nameRe.test(control.value);
//       return result ? {upperCase:true} : null;
//     }
//     else if(nameRe==/[a-z]/){
//       const result = nameRe.test(control.value);
//       return result ? {lowerCase:true} : null;
//     }
//     else if(nameRe==/[0-9]/){
//       const result = nameRe.test(control.value);
//       return result ? {numaric:true} : null;
//     }
//     else if(nameRe==/[!@#$%^&*(),.?":{}|<>]/){
//       const result = nameRe.test(control.value);
//       return result ? {specialCharacter:true} : null;
//     }
//   };
// }
export function PasswordValidationDirective(nameRe: RegExp, errorName : {[key: string]: boolean}): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      const result = nameRe.test(control.value);
      return result ?null : errorName;
    };
  }