import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      incidents works!
    </p>
  `,
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent {

}
