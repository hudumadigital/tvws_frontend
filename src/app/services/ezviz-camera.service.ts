import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Alarm {
  alarmId: string;
  alarmName: string;
  alarmPicUrl: string;
  alarmTime: number;
  alarmType: number;
  channelNo: number;
  customerInfo: string | null;
  customerType: string | null;
  delayTime: number;
  deviceSerial: string;
  isChecked: boolean;
  isEncrypt: boolean;
  preTime: number;
  recState: number;
  relationAlarms: Array<any>;
  description?: string;
}

const DEVICE_SERIAL_NUMBER = 'K57418162';
const APP_KEY = '43d4719a24d946d585deab06f6589913';
const APP_SECRET = '7d086bed07a64c02af82886a9e2d65e7';
const CHANNEL_NO = 1;
const pageSize = 50;
export interface Event {}
@Injectable({
  providedIn: 'root',
})
export class EzvizCameraService {
  private http = inject(HttpClient);
  private accessToken = '';
  private url = ' https://ieuopen.ezvizlife.com/api';
  private backendUrl = `${environment.backendUrl}`;
  private toastr = inject(ToastrService);
  constructor() {}

  getAccessToken(): Observable<string> {
    if (this.accessToken) {
      return of(this.accessToken);
    }

    const body = new FormData();
    body.append('appKey', APP_KEY);
    body.append('appSecret', APP_SECRET);

    return this.http
      .post<{ data: { accessToken: string } }>(
        this.url + '/lapp/token/get',
        body
      )
      .pipe(
        tap((response: any) => {
          this.accessToken = response?.data?.accessToken;
          // console.log(this.accessToken);
        }),
        map((response) => response?.data?.accessToken)
      );
  }
  getLiveStreamUrl(): Observable<string> {
    // const params = {
    //   accessToken: this.accessToken,
    //   source: 'ys7',
    //   deviceSerial: DEVICE_SERIAL_NUMBER,
    //   channelNo: CHANNEL_NO,
    // };
    const deviceSerial = DEVICE_SERIAL_NUMBER;
    const channelNo = CHANNEL_NO;
    const streamType = 0;
    return this.getAccessToken().pipe(
      switchMap((accessToken) =>
        this.http.get<{ data: { url: string } }>(
          `${this.url}/lapp/live/url?accessToken=${accessToken}&deviceSerial=${deviceSerial}&channelNo=${channelNo}&streamType=${streamType}`
        )
      ),
      map((response: any) => response?.data?.url),
      tap((response) => {
        console.log(response);
      })
    );
  }
  getAlarmsList(): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((accessToken) =>
        this.http.post(
          `${this.url}/lapp/alarm/list?deviceSerial=${DEVICE_SERIAL_NUMBER}&accessToken=${accessToken}&channelNo=${CHANNEL_NO}&pageSize=${pageSize}`,
          {}
        )
      ),
      map((response: any) => response?.data),
      tap((response: any) => {
        console.log(response);
      })
    );
  }
  submitReportedEvent(event: Alarm): Observable<any> {
    return this.http
      .post(this.backendUrl + '/report-event', event, this.getOptions())
      .pipe(
        tap((result) => {
          // console.log(result);
        })
      );
  }
  getOptions(): object {
    const storageData: string = localStorage.getItem('user')!;
    const { token } = JSON.parse(storageData) ? JSON.parse(storageData) : '';
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  getReports() {
    return this.http
      .get<{ message: string; reports: any }>(
        this.backendUrl + '/reports',
        this.getOptions()
      )
      .pipe(map((response) => response.reports));
  }
}
