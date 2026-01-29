import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class NowPlayingService {
  private currentTrackSubject = new BehaviorSubject<any>(null);
  track$ = this.currentTrackSubject.asObservable();

  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();

  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();

  private audio = new Audio();

  constructor(private storageService: StorageService) { }

  async initialize() {
    const storedTrack = await this.storageService.get('currentTrack');
    if (storedTrack) {
      this.currentTrackSubject.next(storedTrack);
      this.playTrack(storedTrack, storedTrack.currentTime, false);
    }
  }

  setTrack(track: any) {
    this.currentTrackSubject.next(track);
    this.storageService.set('currentTrack', track)
    this.playTrack(track);
  }

  togglePlayPause() {
    if (!this.audio.src) return;

    if (this.audio.paused) {
      this.audio.play();
      this.isPlayingSubject.next(true);
    } else {
      this.audio.pause();
      this.isPlayingSubject.next(false);
    }
  }

  private playTrack(track: any, resumeTime: number = 0, autoPlay = true) {
    this.audio.pause();
    this.audio = new Audio(track.preview_url);
    this.audio.currentTime = resumeTime;

    if (autoPlay) {
      this.audio.play();
      this.isPlayingSubject.next(true);
    } else {
      this.isPlayingSubject.next(false);
    }

    this.audio.ontimeupdate = () => {
      const progress = this.audio.currentTime / this.audio.duration;
      const updatedTrack = { ...track, currentTime: this.audio.currentTime };

      this.progressSubject.next(progress);
      this.storageService.set('currentTrack', updatedTrack);
      this.currentTrackSubject.next(updatedTrack);
    };

    this.audio.onended = () => {
      const updatedTrack = { ...track, currentTime: 0 };

      this.isPlayingSubject.next(false);
      this.progressSubject.next(0);
      this.currentTrackSubject.next(updatedTrack);
      this.storageService.set('currentTrack', updatedTrack);
    };
  }

  seekTo(progress: number) {
    if (this.audio && this.audio.duration) {
      this.audio.currentTime = this.audio.duration * progress;
    }
  }
}