import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  alarms: Array<any> = [];
  constructor() {}
  ngOnInit(): void {
    this.cameraService.getAlarmsList().subscribe((data: Array<any>) => {
      this.alarms = data;
    });
  }
  convertDate(date: Date): Date {
    return new Date(date);
  }
}
