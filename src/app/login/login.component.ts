import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../shared/validation.service';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted: boolean = false
  errorMsg = ''
  returnUrl: string
  constructor(private formBuilder: FormBuilder,
    private router: Router, private validationService: ValidationService,
    private route: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['sam@gmail.com', [Validators.required, this.validationService.emailValidator()]],
      password: ['Sam@12345', [Validators.required, this.validationService.passwordValidator()]]
    });
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cricketers';
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.email.value, this.password.value).
        subscribe((result: User) => {
          // this.dataService.updateUser(result);
          this.loginForm.reset();
          this.submitted = false;
          // this.dataService.updateIsLogin(true);
          this.errorMsg = ''
          this.router.navigate([this.returnUrl]);
        },
          (err: any) => {
            console.log(err);
            this.errorMsg = err
          });
    }
    else {
      console.log(this.loginForm.valid);
    }
  }

}
