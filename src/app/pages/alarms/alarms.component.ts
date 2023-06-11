import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';

@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss'],
})
export class AlarmsComponent implements OnInit {
  reportThisEvent() {
    throw new Error('Method not implemented.');
  }
  onDeleteEvent() {
    throw new Error('Method not implemented.');
  }
  private cameraService = inject(EzvizCameraService);
  alarms: Array<any> = new Array<any>();
  constructor() {}
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
}
