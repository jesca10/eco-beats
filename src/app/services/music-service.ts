import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  urlServer: string = 'https://music.fly.dev';

  constructor() { }

  async getTracks() {
    const response = await fetch(`${this.urlServer}/tracks`);
    return await response.json();
  }

  async getTracksByAlbum(id: string) {
    return fetch(`${this.urlServer}/tracks/album/${id}`).then(
      response => response.json()
    );
  }

  async getTracksByArtist(id: string) {
    return fetch(`${this.urlServer}/tracks/artist/${id}`).then(
      response => response.json()
    );
  }

  async getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(
      response => response.json()
    );
  }

  async getAlbumByArtist(artistId: string) {
    return fetch(`${this.urlServer}/albums/artist/${artistId}`).then(
      response => response.json()
    );
  }

  async getArtists() {
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    );
  }

  async getArtist(artistId: string) {
    return fetch(`${this.urlServer}/artists/${artistId}`).then(
      response => response.json()
    );
  }

  getLocalArtists() {
    return dataArtists;
  }
}
