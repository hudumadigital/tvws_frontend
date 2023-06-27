import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import {
  Alarm,
  EzvizCameraService,
} from 'src/app/services/ezviz-camera.service';

@Component({
  selector: 'app-alarm-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './alarm-event-dialog.component.html',
  styleUrls: ['./alarm-event-dialog.component.scss'],
})
export class AlarmEventDialogComponent {
  private ezvizCameraService = inject(EzvizCameraService);
  public data = inject<Alarm>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);
  private toastr = inject(ToastrService);
  loading = signal(false);
  alarmDescription = '';

  onSubmit() {
    const description = this.alarmDescription;
    const event = { ...this.data, description };
    if (!description) return;
    this.loading.set(true);
    this.ezvizCameraService
      .submitReportedEvent(event)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.loading.set(false);
          this.toastr.success('Reported event successfully');
        },
        error: () => {
          this.loading.set(false);
          this.toastr.error('Failed to report event, try again later');
        },
      });
  }
}
