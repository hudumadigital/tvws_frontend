import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';

@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss'],
})
export class AlarmsComponent implements OnInit {
  private cameraService = inject(EzvizCameraService);
  alarms: Array<any> = [];
  constructor() {}
  ngOnInit(): void {
    this.cameraService.getAlarmsList().subscribe((data: Array<any>) => {
      this.alarms = data;
    });
  }
  convertDate(date: Date): Date{
    return new Date(date);
  }
}
