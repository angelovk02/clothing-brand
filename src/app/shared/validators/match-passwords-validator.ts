import { FormGroup, ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(
  passwordOne: string,
  passwordTwo: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const pass1 = group.get(passwordOne);
    const pass2 = group.get(passwordTwo);

    return pass1?.value === pass2?.value
      ? null
      : { matchPasswordsValidator: true };
  };
}