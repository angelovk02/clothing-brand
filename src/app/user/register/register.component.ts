import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/domains'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required,appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    tel: [''],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: [matchPasswordsValidator('password','confirmPassword')],
    }
    ),
  })

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder){}

  register() : void {
    if(this.form.invalid){
      return
    }

    const {
      username,
      email,
      passGroup: { password, confirmPassword } = {},
      tel,
    } = this.form.value;

    this.userService
      .register(username!, email!, password!, confirmPassword!, tel!)
      .subscribe(() => {
        this.router.navigate(['/shop']);
      });
  }

}
