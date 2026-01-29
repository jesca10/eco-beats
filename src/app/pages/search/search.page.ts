import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MusicService } from 'src/app/services/music-service';
import { NowPlayingService } from 'src/app/services/now-playing-service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class SearchPage {

  query = '';
  tracks: any[] = [];
  debounceTimeout: any;

  constructor(
    private musicService: MusicService,
    private nowPlayingService: NowPlayingService
  ) { }

  onInputChange(event: any) {
    const value = event.target.value;
    this.query = value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.search();
    }, 400);
  }

  async search() {
    if (!this.query.trim()) {
      this.tracks = [];
      return;
    }

    const params = { q: this.query };
    const results = await this.musicService.search(params);
    this.tracks = results.tracks || [];
  }

  playTrack(track: any) {
    this.nowPlayingService.setTrack(track);
  }
}