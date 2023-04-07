import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UiService } from './ui.service';
export interface Auth{
    email: string,
    password: string
}
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  url = 'http://localhost:4000/account';
  serverMessage = 'Internal Server Error, Status Code 500';
  userSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router, private uiService: UiService) { }

//   login(authInfo: Auth): void{
//     this.uiService.loadingStateChanged.next(true)
//     this.http.post<Auth>(this.url + '/login', {
//       email: authInfo.email,
//       password: authInfo.password
//     })
//     .subscribe((result: any) => {
//       this.uiService.loadingStateChanged.next(false)
//       if (!result.isLoggedIn) {
//         this.uiService.showSnackBar(result.message)
//         return;
//       }
//       const user = {
//         token: result.token,
//         username: result.username
//       };
//       localStorage.setItem('userData', JSON.stringify(user));
//       return this.router.navigate(['../user']);
//     })
// }
}