import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
}

const DEVICE_SERIAL_NUMBER = 'K57418162';
const APP_KEY = 'b40cffefa020417aacc3e2141f6c6dcf';
const APP_SECRET = '41701333c33348648631020da16c6418';
const CHANNEL_NO = 1;
const pageSize = 50;

@Injectable({
  providedIn: 'root',
})
export class EzvizCameraService {
  private accessToken = '';
  private url = ' https://ieuopen.ezvizlife.com/api';

  constructor(private http: HttpClient) {}

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
}
