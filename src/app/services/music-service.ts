import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor() { }

  async getTracks() {
    const response = await fetch(`${environment.HOST}/tracks`);
    return await response.json();
  }

  async getTracksByAlbum(id: string) {
    return fetch(`${environment.HOST}/tracks/album/${id}`).then(
      response => response.json()
    );
  }

  async getTracksByArtist(id: string) {
    return fetch(`${environment.HOST}/tracks/artist/${id}`).then(
      response => response.json()
    );
  }

  async getAlbums() {
    return fetch(`${environment.HOST}/albums`).then(
      response => response.json()
    );
  }

  async getAlbumByArtist(artistId: string) {
    return fetch(`${environment.HOST}/albums/artist/${artistId}`).then(
      response => response.json()
    );
  }

  async getArtists() {
    return fetch(`${environment.HOST}/artists`).then(
      response => response.json()
    );
  }

  async getArtist(artistId: string) {
    return fetch(`${environment.HOST}/artists/${artistId}`).then(
      response => response.json()
    );
  }

  async getFavoriteTracks() {
    return fetch(`${environment.HOST}/favorite_tracks`).then(
      response => response.json()
    );
  }

  async getFavTracksByUser(userId: string) {
    return fetch(`${environment.HOST}/user_favorites/${userId}`).then(
      response => response.json()
    );
  }

  async addFavoriteTracks(params: object) {
    const response = await fetch(`${environment.HOST}/favorite_tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data?.message || 'Error al añadir a favoritos.';
      throw new Error(error);
    }

    return data;
  }

  async deleteFavoriteTracks(favoriteId: string) {
    const response = await fetch(`${environment.HOST}/favorite_tracks/${favoriteId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const error = data?.message || 'Error al eliminar de favoritos.';
      throw new Error(error);
    }

    return { success: true };
  }

  async search(params: object) {
    const response = await fetch(`${environment.HOST}/search_track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    return await response.json();
  }

  getLocalArtists() {
    return dataArtists;
  }
}