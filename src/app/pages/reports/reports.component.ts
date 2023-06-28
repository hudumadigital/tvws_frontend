import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    <section>
      <div class="flex justify-between">
        <h1 class="font-medium text-xl uppercase mb-4">REPORTS</h1>
        <button mat-raised-button color="primary" (click)="printReport()">
          <mat-icon>print</mat-icon>
        </button>
      </div>

      <ng-container *ngIf="reports | async as reports; else Loading">
        <div class="bg-white rounded-xl p-4">
          <div class="overflow-auto">
            <section class="w-full">
              <!-- BEGIN CODE -->
              <div
                *ngFor="let report of reports; let i = index"
                class="max-w-sm w-full lg:max-w-full lg:flex"
              >
                <div
                  class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                  style="background-image: url('/img/card-left.jpg')"
                  title="Reported Event Image"
                ></div>
                <div
                  class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
                >
                  <div class="mb-8">
                    <p class="text-sm text-gray-600 flex items-center">
                      <svg
                        class="fill-current text-gray-500 w-3 h-3 mr-2"
                        xmlns=""
                        viewBox="0 0 20 20"
                      >
                        <!-- <path
                          d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                        /> -->
                        <image [attr.href]="report.image" />
                      </svg>
                      Members only
                    </p>
                    <div class="text-gray-900 font-bold text-xl mb-2">
                      Description:
                    </div>
                    <p class="text-gray-700 text-base">
                      {{ report.description }}
                    </p>
                  </div>
                  <div class="flex items-center">
                    <div class="text-sm">
                      <p class="text-gray-900 leading-none">
                        Reported by: {{report.username}
                      </p>
                      <p class="text-gray-600">
                        Reported at: {{ report.updatedAt }}/p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END CODE -->
            </section>
          </div>
        </div>
      </ng-container>

      <ng-template #Loading>
        <div class="h-40 flex bg-white rounded-xl justify-center items-center">
          <mat-spinner [diameter]="60"></mat-spinner>
        </div>
      </ng-template>
    </section>
  `,
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  printReport() {
    throw new Error('Method not implemented.');
  }
  private ezvizService = inject(EzvizCameraService);
  reports = [];
  ngOnInit(): void {

    console.log(this.reports$);
  }
}
