import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>Create Suspicion Manual Event works!</p> `,
  styleUrls: ['./incidents.component.scss'],
})
export class IncidentsComponent {}
