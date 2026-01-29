import { Injectable } from '@angular/core';
import { MusicService } from './music-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private musicService: MusicService) { }

  async loadFavorites(userId: number) {
    const response = await this.musicService.getFavoriteTracks();
    this.favorites = response.filter((fav: any) => fav.user_id === userId);
    this.favoritesSubject.next(this.favorites);
  }

  isFavorite(trackId: number) {
    return this.favorites.some(f => f.track_id === trackId);
  }

  async toggleFavorite(track: any, userId: number) {
    const favorite = this.favorites.find(fav => fav.track_id === track.id);
    let message;

    if (favorite) {
      await this.musicService.deleteFavoriteTracks(favorite.id);
      message = { text: 'Eliminado de las canciones que me gustan.', icon: 'heart-dislike-sharp', type: 'success' };
    } else {
      const params = { favorite_track: { user_id: userId, track_id: track.id } };
      await this.musicService.addFavoriteTracks(params);
      message = { text: 'Añadido a canciones que me gustan.', icon: 'heart-sharp', type: 'success' };
    }

    await this.loadFavorites(userId);
    return { message };
  }
}