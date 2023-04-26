import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterLinkActive,
  RouterLinkWithHref,
  RouterOutlet,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  private toastr = inject(ToastrService);
  private authService = inject(AuthenticationService);
  private destroy$ = new Subject<boolean>();
  username = '';

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      // console.log(user);
      this.username = user.username ? 'Logged in as: ' + user.username : 'Log in';
    }
    this.authService.userSubject.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        // this.username = res.username ? res.username : "Log in";
        // console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
  logout() {
    this.authService.logout();
    }
}
