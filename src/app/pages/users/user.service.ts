import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPayload } from './user-form/user-form.component';

export interface User {
  readonly _id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  mobile: string;
  admin: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.backendUrl + '/account';

  getUsers() {
    return this.http
      .get<{ message: string; users: User[] }>(this.baseUrl + '/users')
      .pipe(map((res) => res.users));
  }

  createUser(user: UserPayload) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  deleteUser(email: User['email']) {
    return this.http.delete(this.baseUrl + '/delete/' + email);
  }
}
