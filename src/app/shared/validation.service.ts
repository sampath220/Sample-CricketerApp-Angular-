import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {

  constructor() { }
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRe: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const forbidden = emailRe.test(control.value);
      console.log(forbidden)
      return forbidden ? null : { 'invalid': { value: control.value } };
    };
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordRe: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$$/;
      const forbidden = passwordRe.test(control.value);
      console.log(forbidden)
      return forbidden ? null : { 'invalid': { value: control.value } };
    };

  }
}


// export function emailValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const emailRe: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
//     const forbidden = emailRe.test(control.value);
//     console.log(forbidden)
//     return forbidden ? null : { 'invalid': { value: control.value } };
//   };
// }