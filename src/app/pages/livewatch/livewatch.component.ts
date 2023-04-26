import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EzvizCameraService } from 'src/app/services/ezviz-camera.service';

@Component({
  selector: 'app-livewatch',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './livewatch.component.html',
  styleUrls: ['./livewatch.component.scss'],
})
export class LivewatchComponent implements OnInit {
  private cameraService = inject(EzvizCameraService);
  @ViewChild('videoPlayer', { static: false }) videoplayer?: ElementRef;
  isPlaying: boolean = false;
  liveStreamUrl = '';

  ngOnInit(): void {
    this.cameraService
      .getLiveStreamUrl()
      .subscribe((liveStreamUrl) => (this.liveStreamUrl = liveStreamUrl));
  }

  toggleVideo(event: any) {
    this.videoplayer?.nativeElement.play();
  }

  playPause() {
    var myVideo: any = document.getElementById('my_video_1');
    if (myVideo.paused) {
      myVideo.play();
      this.isPlaying = true;
    } else {
      myVideo.pause();
      this.isPlaying = false;
    }
  }

  makeBig() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 420;
  }

  skip(value: number) {
    let video: any = document.getElementById('my_video_1');
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById('my_video_1');
    video.currentTime = 0;
  }
}
