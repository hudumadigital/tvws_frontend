import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UiService } from 'src/app/services/ui.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <nav class="flex justify-between p-4 bg-purple-900 text-white">
      <div>left side</div>
      <div>right side</div>
    </nav>
  `,
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
