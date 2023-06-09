import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserFormComponent } from './user-form/user-form.component';
import { User, UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export default class UsersComponent {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  users$ = this.userService.getUsers();

  onDeleteUser(email: User['email']) {
    this.userService
      .deleteUser(email)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.users$ = this.userService.getUsers();
          this.toastr.success(res.message);
        },
      });
  }

  openUserForm(user?: User) {
    this.dialog.open(UserFormComponent, {
      data: user,
      disableClose: true,
      width: '500px',
    });
  }
}
