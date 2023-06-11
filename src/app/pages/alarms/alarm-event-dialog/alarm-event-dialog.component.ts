import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Alarm } from 'src/app/services/ezviz-camera.service';

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
  public data = inject<Alarm>(MAT_DIALOG_DATA);
  alarmDescription = '';

  onSubmit() {
    console.log(this.data);
    console.log(this.alarmDescription);
  }
}
