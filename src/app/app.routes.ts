import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LivewatchComponent } from './pages/livewatch/livewatch.component';
import { AlarmsComponent } from './pages/alarms/alarms.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: '',
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
        component: IncidentsComponent
      }
    ],
  },
];
