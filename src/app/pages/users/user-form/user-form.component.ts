import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User, UserService } from '../user.service';

export type UserPayload = Pick<
  User,
  'firstname' | 'lastname' | 'email' | 'username' | 'mobile'
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
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  public userForm = this.fb.nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    mobile: ['', Validators.required],
  });

  onSubmitForm() {
    const userPayload: UserPayload = {
      firstname: this.userForm.getRawValue().firstname,
      lastname: this.userForm.getRawValue().lastname,
      email: this.userForm.getRawValue().email,
      username: this.userForm.getRawValue().username,
      mobile: this.userForm.getRawValue().mobile,
    };

    this.userService
      .createUser(userPayload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (err) => {
          // TODO: handle error
          console.error(err);
        },
      });
  }
}
