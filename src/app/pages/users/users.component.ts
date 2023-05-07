import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User, UserService } from './user.service';

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

  users$ = this.userService.getUsers();

  onDeleteUser(email: User['email']) {
    this.userService
      .deleteUser(email)
      .pipe()
      .subscribe({
        next: () => (this.users$ = this.userService.getUsers()),
      });
  }
}
