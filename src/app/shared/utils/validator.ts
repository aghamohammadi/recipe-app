import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('checkedDate');
    const end = control.get('returnedDate');
    return start?.value !== null && end?.value !== null && start?.value < end?.value 
    ? null :{ dateValid:true };
}