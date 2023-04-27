import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const DEVICE_SERIAL_NUMBER = 'K57418162';
const APP_KEY = 'd76bfaa3a7a9422dbfc69e304175615c';
const APP_SECRET = 'f8d070b03a8d42199262fa4c530ad0aa';
const CHANNEL_NO = 1;

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
          `${this.url}/lapp/alarm/list?deviceSerial=${DEVICE_SERIAL_NUMBER}&accessToken=${accessToken}&channelNo=${CHANNEL_NO}`,
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
