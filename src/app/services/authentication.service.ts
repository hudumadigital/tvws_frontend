import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  email: string;
  userID: string;
  isLoggedIn: boolean;
  expiresIn: number;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);

  url = `${environment.backendUrl}/account`;
  userSubject = new BehaviorSubject<any>(null);
  userStorageKey = 'user';

  login(authInfo: Auth) {
    return this.http
      .post<AuthResponse>(this.url + '/login', {
        email: authInfo.email,
        password: authInfo.password,
      })
      .pipe(
        // tap is used to perform side effects without changing the value
        tap((result) => {
          if (result.isLoggedIn) {
            const user = {
              token: result.token,
              username: result.username,
            };
            this.userSubject.next(user);
            localStorage.setItem(this.userStorageKey, JSON.stringify(user));
          }
        })
      );
  }
}
