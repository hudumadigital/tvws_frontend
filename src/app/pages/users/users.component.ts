import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export default class UsersComponent {
  private userService = inject(UserService);

  users$ = this.userService.getUsers();
}
