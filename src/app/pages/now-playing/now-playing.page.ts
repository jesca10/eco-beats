import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NowPlayingService } from 'src/app/services/now-playing-service';
import { PlayerModalPage } from '../player-modal/player-modal.page';
import { StorageService } from 'src/app/services/storage-service';
import { FavoritesService } from 'src/app/services/favorites-service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.page.html',
  styleUrls: ['./now-playing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NowPlayingPage {

  currentTrack$ = this.nowPlayingService.track$;
  isPlaying$ = this.nowPlayingService.isPlaying$;
  progress$ = this.nowPlayingService.progress$;

  toastButtons = [
    {
      icon: 'close-sharp',
      role: 'cancel',
      handler: () => {
        this.setOpen(false);
      }
    }
  ];
  isToastOpen: boolean = false;
  message: any;
  currentUserId: number = 0;

  constructor(
    private nowPlayingService: NowPlayingService,
    private modalCtrl: ModalController,
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

  async toggleFavorite(event: any, track: any) {
    event.stopPropagation();
    const { message } = await this.favoritesService.toggleFavorite(track, this.currentUserId);
    this.message = message;
    this.setOpen(true);
  }

  isFavorite(track: any): boolean {
    return this.favoritesService.isFavorite(track.id);
  }

  togglePlayPause(event: any) {
    event.stopPropagation();
    this.nowPlayingService.togglePlayPause();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async openPlayerModal() {
    const modal = await this.modalCtrl.create({
      component: PlayerModalPage,
      canDismiss: true,
      showBackdrop: true,
      backdropDismiss: true,
      handle: false,
      breakpoints: [0, 1],
      initialBreakpoint: 1
    });

    await modal.present();
  }
}