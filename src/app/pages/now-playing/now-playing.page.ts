import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NowPlayingService } from 'src/app/services/now-playing-service';
import { MusicService } from 'src/app/services/music-service';
import { Subscription } from 'rxjs';
import { PlayerModalPage } from '../player-modal/player-modal.page';

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
  favorites: any[] = [];
  currentUserId: number = 1;
  currentTrackId: number | null = null;

  private trackSub!: Subscription;

  constructor(
    private nowPlayingService: NowPlayingService,
    private musicService: MusicService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.loadFavorites();

    this.trackSub = this.currentTrack$.subscribe(track => {
      this.currentTrackId = track?.id ?? null;
    });
  }

  ngOnDestroy() {
    if (this.trackSub) this.trackSub.unsubscribe();
  }

  async loadFavorites() {
    const response = await this.musicService.getFavoriteTracks();
    this.favorites = response.filter((fav: any) => fav.user_id = this.currentUserId) ?? [];
  }

  async toggleFavorite(event: any, track: any) {
    event.stopPropagation();

    try {
      const favorite = this.favorites.find(fav => fav.track_id === track.id);
      let res;

      if (favorite) {
        res = await this.musicService.deleteFavoriteTracks(favorite.id);

        this.message = {
          type: 'success',
          text: 'Eliminado de las canciones que me gustan.',
          icon: 'heart-dislike-sharp'
        }
      } else {
        res = await this.musicService.addFavoriteTracks({
          favorite_track: {
            user_id: this.currentUserId,
            track_id: track.id
          }
        });

        this.message = {
          type: 'success',
          text: 'Añadido a canciones que me gustan.',
          icon: 'heart-sharp'
        }
      }

      await this.loadFavorites();
    } catch (err) {
      this.message = {
        type: 'error',
        text: 'Ocurrió un error al actualizar favoritos.',
        icon: 'alert-circle-sharp'
      }
    } finally {
      this.setOpen(true);
    }
  }

  isFavorite(track: any): boolean {
    return this.favorites.some(fav => fav.track_id === track.id);
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
      cssClass: 'player-modal'
    });

    modal.present();
  }
}