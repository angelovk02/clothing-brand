import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/domains'
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder){}


  form = this.fb.group({
    email: [
      '',
      [Validators.required,appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
      password: ['', [Validators.required, Validators.minLength(3)]],
  })

  login() : void {
    if(this.form.invalid){
      return
    }

    const { email, password } = this.form.value

    this.userService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
