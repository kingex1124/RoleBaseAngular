import { Injectable } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormGroupService } from '../form-group.service';


@Injectable()
export class LoginValidateConfig {
  public controlsConfig: any;
  public validationMessages: any;
  public formErrors = {
    AccountName: '',
    Password: ''
  };

  constructor(
    private formGroupService: FormGroupService,
    private translate: TranslateService
  ) { }

  init(): FormGroup {
    this.controlsConfig = {
      AccountName: [
        '',
        [Validators.required]
      ],
      Password: [
        '',
        [Validators.required]
      ]
    };

    this.setValidationMessages();
    return this.formGroupService.buildForm(this.controlsConfig, this.formErrors, this.validationMessages);
  }


  private setValidationMessages() {
    this.validationMessages = {
      AccountName: {
        required: () => '必填',
      },
      Password: {
        required: () => '必填',
      }
    };
  }

  resetMessageForI18N(form: FormGroup) {
    this.formGroupService.onValueChanged(form, this.formErrors, this.validationMessages);
  }
}
