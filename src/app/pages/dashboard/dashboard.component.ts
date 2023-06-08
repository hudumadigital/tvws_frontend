import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { map } from 'rxjs/operators';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'New Suspicious Events', cols: 1, rows: 1 },
          { title: 'Resolved Crimes', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'New Suspicious Events', cols: 2, rows: 1 },
        { title: 'Resolved Crimes', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  private cameraService = inject(EzvizCameraService);
  alarms: Array<any> = [];
  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.getAlarmsRepeat();
    setInterval(() => {
      this.getAlarmsRepeat();
    }, 5000);
  }
  getAlarmsRepeat(): void {
    this.cameraService.getAlarmsList().subscribe((data: Array<any>) => {
      this.alarms = data;
    });
  }
}
