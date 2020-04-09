import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginValidateConfig } from '../services/validate-configs/login-validate-config';
import { LayoutService } from '../services/layout.service';
import { Operation } from '../models/operation.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  SERVER_URL = 'https://localhost:44362/AccountAn/Login';

  accountInfo: AccountInfo = {AccountName: '', Password: '', Message: ''};
  /** 表單 */
  theForm: FormGroup;
  formErrors: any;

  // 轉頁屬性
  operation = Operation;
  currOperatiom: Operation = Operation.login;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,  private validateConfig: LoginValidateConfig,
              private layoutService: LayoutService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.layoutService.layoutChanged$.subscribe(o => {
      this.currOperatiom = o;
    });
  }

  initForm() {
    if (!this.theForm) {
      this.theForm = this.validateConfig.init();
      this.formErrors = this.validateConfig.formErrors;
    }
    // this.theForm = this.formBuilder.group({
    //   AccountName: '',
    //   Password: ''
    // });
  }

  onAccountNameSelect(event) {
   this.theForm.get('AccountName').setValue(event.target.value);
  }

  onPasswordSelect(event) {
    this.theForm.get('Password').setValue(event.target.value);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('AccountName', this.theForm.get('AccountName').value);
    formData.append('Password', this.theForm.get('Password').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
        this.accountInfo.Message = res.Message;
        this.layoutService.changeOperation(Operation.home);
        this.router.navigateByUrl('/home');
      } ,
      (err) => {
        console.log(err);
        this.accountInfo.Message = err.error.Message;
      }
    );
  }
}

export interface AccountInfo{
AccountName: string;
Password: string;
Message: string;
}

