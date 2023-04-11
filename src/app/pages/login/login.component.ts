import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UiService } from 'src/app/services/ui.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  template: `
    <section>
      <div>
        <h3>Login to your account</h3>
        <form [formGroup]="loginForm" , (ngSubmit)="login()">
          <mat-form-field>
            <mat-label> Username [Email] </mat-label>
            <input
              type="email"
              formControlName="email"
              name="email"
              placeholder="Eg. example@example.com"
            />
            <mat-error>
              {{
                loginForm.controls['email'].hasError('required')
                  ? 'Email is required'
                  : loginForm.controls['email'].hasError('email')
                  ? 'Email address is invalid'
                  : loginForm.controls['email'].getError('message')
              }}
            </mat-error>
          </mat-form-field>
          <mat-form-field>
            <input
              [type]="isPasswordVisible ? 'text' : 'password'"
              ,
              formControlName="password"
              name="password"
              placeholder="*******"
            />
            <button
              mat-icon-button
              (click)="isPasswordVisible = !isPasswordVisible"
              type="button"
              aria-label="Show password"
              matSuffix
            >
              <mat-icon>
                {{ isPasswordVisible ? 'visibility' : 'visibility_off' }}
              </mat-icon>
            </button>
            <mat-error>
              {{
                loginForm.controls['password'].hasError('required')
                  ? 'Password is required'
                  : loginForm.controls['password'].getError('message')
              }}
            </mat-error>
          </mat-form-field>
        </form>
      </div>
    </section>
  `,
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit, OnDestroy {
  private uiService = inject(UiService);
  private authService = inject(AuthenticationService);
  private fb = inject(FormBuilder);
  isPasswordVisible: boolean = false;
  loadingState: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor() {}
  ngOnInit(): void {}
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login({
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password,
    });
  }
  ngOnDestroy(): void {}
}
