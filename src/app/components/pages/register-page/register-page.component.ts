import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required, Validators.minLength(5)],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required, Validators.minLength(5)],
        confirmPassword: ['', Validators.required],
        zipCode: ['', Validators.required, Validators.minLength(8), Validators.maxLength(8)],
        number: [''],
        complement: ['']
      }, {
        validators: PasswordsMatchValidator('password', 'confirmPassword')
      });

      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    }

    get fc() {
      return this.registerForm.controls;
    }

    submit() {
      this.isSubmitted = true;

      if(this.registerForm.invalid) return;

      const fv = this.registerForm.value;


      console.log(fv)

      const user: IUserRegister = {
        name: fv.name,
        email: fv.email,
        password: fv.password,
      };

      this.userService.register(user).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }

}
