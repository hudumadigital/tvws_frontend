import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  serverMessage = 'Internal Serve Error, Status Code 500';

  constructor(private snackbar: MatSnackBar)
  {}

  showSnackBar(
    message: string = 'The request failed, Retry again',
    action = 'OK!',
    duration = 4000
  ): void {
    this.snackbar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      politeness: 'polite',
      verticalPosition: 'bottom',
    });
  }
  errorFormatter(error: any): void {
    const message = error.error.message
      ? error.error.message
      : this.serverMessage;
    this.showSnackBar(message);
    this.loadingStateChanged.next(false);
    console.error(message);
  }
}
