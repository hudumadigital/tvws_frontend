import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      alarms works!
    </p>
  `,
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent {

}
