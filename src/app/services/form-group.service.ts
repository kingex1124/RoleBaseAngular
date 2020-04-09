import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {

  constructor(protected fb: FormBuilder) { }

  buildForm(controlsConfig: any, formErrors: any, validationMessages: any): FormGroup {
    const theForm: FormGroup = this.fb.group(controlsConfig);
    theForm.valueChanges
      .subscribe(data => { this.onValueChanged(theForm, formErrors, validationMessages, data); });

    this.onValueChanged(theForm, formErrors, validationMessages); // (re)set validation messages now

    return theForm;
  }

  onValueChanged(theForm: FormGroup, formErrors: any, validationMessages: any, data?: any) {
    if (!theForm) { return; }
    const form = theForm;

    Object.keys(formErrors).forEach(field => {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = validationMessages[field];
        if (control.errors) {
          Object.keys(control.errors).forEach(key => {
            if (typeof (messages[key]) === 'function') {
              formErrors[field] += messages[key]();
            } else {
              formErrors[field] += messages[key];
            }
          });
        }
      }
    });
  }


  buildFormArray(formGroups: FormGroup[]): FormArray {
    if (formGroups && formGroups.length > 0) {
      return this.fb.array(formGroups);
    } else {
      return null;
    }
  }
}
