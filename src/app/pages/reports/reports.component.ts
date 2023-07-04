import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateManipulationPipe } from 'src/app/pipes/date-manipulation.pipe';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    DateManipulationPipe,
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  private ezvizService = inject(EzvizCameraService);
  backendUrl = environment.backendUrl;
  reports$ = this.ezvizService.getReports();

  ngOnInit(): void {}

  printReport() {
    window.print();
  }
}
