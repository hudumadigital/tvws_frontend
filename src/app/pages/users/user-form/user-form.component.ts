import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User, UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

export type UserPayload = Pick<
  User,
  'firstname' | 'lastname' | 'email' | 'username' | 'mobile' | 'password'
>;

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private toastr = inject(ToastrService);
  loadingState: boolean = false;

  public userForm = this.fb.nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    mobile: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmitForm() {
    this.loadingState = true;
    const userPayload: UserPayload = {
      firstname: this.userForm.getRawValue().firstname,
      lastname: this.userForm.getRawValue().lastname,
      email: this.userForm.getRawValue().email,
      username: this.userForm.getRawValue().username,
      mobile: this.userForm.getRawValue().mobile,
      password: this.userForm.getRawValue().password,
    };

    this.userService
      .createUser(userPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: any) => {
          // this.userService.getUsers();
          this.loadingState = false;
          this.dialogRef.close();
          this.toastr.success(result.message);
        },
        error: (err) => {
          this.loadingState = false;
          // TODO: handle error
          this.toastr.error(err.error.message, 'Error');
          console.error(err);
        },
      });
  }
}
