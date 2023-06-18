import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  admin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private router = inject(Router);

  url = `${environment.backendUrl}/account`;
  userSubject = new BehaviorSubject<any>(null);
  userStorageKey = 'user';

  storedUser = localStorage.getItem(this.userStorageKey);

  authUser = signal<{
    token: string;
    username: string;
    email: string;
    admin?: boolean;
  } | null>(this.storedUser ? JSON.parse(this.storedUser) : null);

  login(authInfo: Auth) {
    return this.http
      .post<AuthResponse>(this.url + '/login', {
        email: authInfo.email,
        password: authInfo.password,
      })
      .pipe(
        // tap is used to perform side effects without changing the value
        tap(
          (result) => {
            console.log(result);
            if (result.isLoggedIn) {
              const user = {
                token: result.token,
                username: result.username,
                email: result.email,
                admin: result.admin,
              };
              this.userSubject.next(user);
              localStorage.setItem(this.userStorageKey, JSON.stringify(user));
              this.authUser.set(user);
            }
          },
          (error) => {
            console.log(error);
            throw error;
          }
        )
      );
  }

  logout() {
    if (localStorage.getItem('user')) localStorage.removeItem('user');
    this.authUser.set(null);
    this.router.navigateByUrl('/');
  }
}
