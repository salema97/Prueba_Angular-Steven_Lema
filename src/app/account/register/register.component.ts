import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ConfirmPassword } from '../../shared/Validators/Password.validators';
import { EmailValidator } from '../../shared/Validators/Email.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors: string[] = [];

  constructor(
    private accountService: AccountService,
    private route: Router,
    private fb: FormBuilder,
    private emailValidator: EmailValidator
  ) {}

  ngOnInit(): void {
    this.CreateRegister();
  }

  CreateRegister() {
    this.registerForm = this.fb.group(
      {
        displayName: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
          ],
          [this.emailValidator.ValidateEmailNotToken()],
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { Validators: [ConfirmPassword] }
    );
  }

  get _displayName() {
    return this.registerForm.get('displayName');
  }
  get _email() {
    return this.registerForm.get('email');
  }
  get _password() {
    return this.registerForm.get('password');
  }
  get _confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.route.navigateByUrl('/shop');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
