import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRippleModule,
  ],
  template: `
    <section class="flex flex-col md:flex-row h-screen">
      <!-- Login side -->
      <div class="flex flex-col w-full md:w-1/3">
        <h3 class="text-3xl text-center font-bold mt-12">
          Login to your account
        </h3>
        <p class="max-w-sm text-gray-400 ml-12 mt-6">
          Not registered? <br />
          Please contact system admin
          <!-- <a
            class="p-2 px-4 pt-2 text-white bg-black rounded-full baseline hover:bg-blend-darken hover:cursor-pointer"
          >
            Sign up
          </a> -->
        </p>
        <form
          [formGroup]="loginForm"
          (ngSubmit)="login()"
          class="flex flex-col m-12"
        >
          <mat-form-field class="">
            <mat-label> Email </mat-label>
            <input
              matInput
              type="email"
              formControlName="email"
              name="email"
              placeholder="Eg. example@example.com"
            />
            <mat-error class="text-red-400">
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
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="isPasswordVisible ? 'text' : 'password'"
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
            <mat-error class="text-red-400">
              {{
                loginForm.controls['password'].hasError('required')
                  ? 'Password is required'
                  : loginForm.controls['password'].getError('message')
              }}
            </mat-error>
          </mat-form-field>
          <button
            type="submit"
            class="mt-8 py-2 px-4 rounded-full"
            color="primary"
            mat-raised-button
            [disabled]="loadingState"
            matRipple
          >
            <mat-spinner
              *ngIf="loadingState"
              [diameter]="15"
              [strokeWidth]="2"
            ></mat-spinner>
            <mat-icon *ngIf="!loadingState">login</mat-icon>
            {{ loadingState ? 'Loading...' : 'Login' }}
          </button>
          <!-- <button mat-raised-button>Not registered?</button> -->
        </form>
      </div>
      <!-- The Other Side -->
      <div class="hidden md:block md:w-2/3  bg-black items-center">
        <div class="text-center text-white mt-40 leading-normal">
          <h1 class="text-4xl font-bold">Security Management System</h1>
          <h1 class="text-4xl font-semibold">
            Powered by TV White Space for BroadBand Connectivity
          </h1>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthenticationService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private destroy$ = new Subject<boolean>();

  isPasswordVisible: boolean = false;
  loadingState: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingState = true;
    this.authService
      .login({
        email: this.loginForm.getRawValue().email!, // we are sure that email is not null due to the form validation above that's why we are using the non-null assertion operator (!)
        password: this.loginForm.getRawValue().password!,
      })
      .pipe(takeUntil(this.destroy$)) // this is to prevent memory leaks(removing the subscription when the component is destroyed) check the ngOnDestroy method below
      .subscribe({
        next: (res) => {
          this.loadingState = false;
          // do any component specific stuff here
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.loadingState = false;
          this.toastr.error(err.error.message, 'Error');
          // do any component specific stuff here for error
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
