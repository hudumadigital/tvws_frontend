import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AlarmsComponent } from './pages/alarms/alarms.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
import { LivewatchComponent } from './pages/livewatch/livewatch.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AuthenticationService } from './services/authentication.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [
      () => {
        const authService = inject(AuthenticationService);
        const authUser = authService.authUser();
        const router = inject(Router);
        if (authUser) {
          router.navigate(['/dashboard']);
        }
        return !authUser;
      },
    ],
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: '',
    canActivate: [
      () => {
        const authService = inject(AuthenticationService);
        const authUser = authService.authUser();
        const router = inject(Router);
        if (!authUser) {
          router.navigate(['/login']);
        }
        return !!authUser;
      },
    ],
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
      {
        path: 'livewatch',
        component: LivewatchComponent,
      },
      {
        path: 'alarms',
        component: AlarmsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'incidents',
        component: IncidentsComponent,
      },
      {
        path: 'users',
        canActivate: [
          () => {
            const authService = inject(AuthenticationService);
            const authUser = authService.authUser();
            const router = inject(Router);
            if (authUser) {
              if (!authUser.admin) {
                router.navigate(['/dashboard']);
              }
              return authUser.admin;
            } else {
              return false;
            }
          },
        ],
        loadComponent: () => import('./pages/users/users.component'),
      },
    ],
  },
];
