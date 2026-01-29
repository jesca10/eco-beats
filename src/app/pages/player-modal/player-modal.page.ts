import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NowPlayingService } from 'src/app/services/now-playing-service';
import { map } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service';
import { FavoritesService } from 'src/app/services/favorites-service';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlayerModalPage {

  currentTrack$ = this.nowPlayingService.track$;
  isPlaying$ = this.nowPlayingService.isPlaying$;

  progress$ = this.nowPlayingService.progress$.pipe(
    map(p => p * 100)
  );

  currentTime$ = this.currentTrack$.pipe(
    map(t => this.formatTime(t?.currentTime || 0))
  );

  duration$ = this.currentTrack$.pipe(
    map(t => this.formatTime(t?.duration_ms || 0))
  );

  toastButtons = [
    {
      icon: 'close-sharp',
      role: 'cancel',
      handler: () => {
        this.setOpen(false);
      }
    }
  ];
  message: any;
  isToastOpen: boolean = false;
  currentUserId: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private nowPlayingService: NowPlayingService,
    private storageService: StorageService,
    private favoritesService: FavoritesService
  ) { }

  async ngOnInit() {
    await this.loadUserProfile();
    await this.favoritesService.loadFavorites(this.currentUserId);
  }

  async loadUserProfile() {
    const user = await this.storageService.get('user');
    this.currentUserId = user.id || 0;
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

  isFavorite(track: any): boolean {
    return this.favoritesService.isFavorite(track.id);
  }

  async toggleFavorite(track: any) {
    const { message } = await this.favoritesService.toggleFavorite(track, this.currentUserId);
    this.message = message;
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  private formatTime(time: number): string {
    if (!time || isNaN(time)) return '0:00';

    if (time > 0 && time < 1000) {
      time = time * 1000;
    }

    const totalSeconds = Math.floor(time / 1000);
    const min = Math.floor(totalSeconds / 60);
    const sec = (totalSeconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }
}