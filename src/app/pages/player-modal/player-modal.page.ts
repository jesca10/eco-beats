import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NowPlayingService } from 'src/app/services/now-playing-service';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlayerModalPage implements OnInit {

  currentTrack$ = this.nowPlayingService.track$;
  isPlaying$ = this.nowPlayingService.isPlaying$;
  progress$ = this.nowPlayingService.progress$;

  constructor(private modalCtrl: ModalController, private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  togglePlayPause() {
    this.nowPlayingService.togglePlayPause();
  }

  seek(event: any) {
    const value = event.detail.value;
    this.nowPlayingService.seekTo(value / 100);
  }

}