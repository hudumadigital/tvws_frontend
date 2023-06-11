import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  Alarm,
  EzvizCameraService,
} from 'src/app/services/ezviz-camera.service';
import { AlarmEventDialogComponent } from './alarm-event-dialog/alarm-event-dialog.component';

@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss'],
})
export class AlarmsComponent implements OnInit {
  private cameraService = inject(EzvizCameraService);
  private dialog = inject(MatDialog);
  alarms: Array<any> = new Array<any>();

  ngOnInit(): void {
    this.getAlarmsRepeat();
    // setInterval(() => {
    //   this.getAlarmsRepeat();
    // }, 5000);
  }

  getAlarmsRepeat(): void {
    this.cameraService.getAlarmsList().subscribe({
      next: (data: Array<any>) => {
        this.alarms = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  convertDate(date: Date): Date {
    return new Date(date);
  }

  onReportThisEvent(alarm: Alarm) {
    this.dialog.open(AlarmEventDialogComponent, {
      data: alarm,
    });
  }

  onDeleteEvent() {
    throw new Error('Method not implemented.');
  }
}
