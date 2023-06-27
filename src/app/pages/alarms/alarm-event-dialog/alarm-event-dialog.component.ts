import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
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

  loadingState: boolean = false;

  onSubmit() {
    const description = this.alarmDescription;
    const event: any = { ...this.data, description }!;
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

// this.loadingState = true;
// this.http.get(event.alarmPicUrl, { responseType: 'blob' }).subscribe({
//   next: (imageBlob: Blob) => {
//     console.log(imageBlob);
//     const reader: any = new FileReader();
//     reader.readAsDataURL(imageBlob);

//     reader.onloadend = () => {
//       const base64data = reader.result.toString();
//       const image = new Image();
//       image.src = base64data;
//       image.onload = () => {
//         const canvas: any = document.createElement('canvas');
//         canvas.width = image.width;
//         canvas.height = image.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(image, 0, 0);
//         canvas.toBlob(
//           (blob: any) => {
//             console.log(blob);
//             const modifiedEvent: any = { ...event, blob };
//             console.log(modifiedEvent);
//             this.ezvizCameraService
//               .submitReportedEvent(modifiedEvent)
//               .pipe(takeUntilDestroyed(this.destroyRef))
//               .subscribe({
//                 next: (result: any) => {
//                   this.loadingState = false;
//                   this.dialogRef.close();
//                   this.toastr.success(result.message);
//                 },
//                 error: (err) => {
//                   this.loadingState = false;
//                   // TODO: handle error
//                   this.toastr.error(err.error.message, 'Error');
//                   console.error(err);
//                 },
//               });
//           },
//           'image/jpeg',
//           1
//         );
//       };
//     };
//     // END OF BLOB
//   },
//   error: (error) => {},
// });
