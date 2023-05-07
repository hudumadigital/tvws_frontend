import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  readonly _id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  mobile: string;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.backendUrl + '/account/users';

  constructor() {}

  getUsers() {
    return this.http
      .get<{ message: string; users: User[] }>(this.baseUrl)
      .pipe(map((res) => res.users));
  }
}
