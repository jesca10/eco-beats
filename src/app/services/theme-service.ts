import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'eco-theme';
  private currentTheme: 'light' | 'dark' | 'system' = 'dark';

  constructor(private storageService: StorageService) { }

  async initTheme() {
    const saved = await this.storageService.get(this.themeKey);
    const theme = saved || 'dark';
    this.currentTheme = theme;
    this.applyTheme(theme);
  }

  getThemePreference(): 'light' | 'dark' | 'system' {
    return this.currentTheme;
  }

  async setThemePreference(theme: 'light' | 'dark' | 'system') {
    this.currentTheme = theme;
    await this.storageService.set(this.themeKey, theme);
    this.applyTheme(theme);
  }

  applyTheme(theme: 'light' | 'dark' | 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const finalTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');

    if (finalTheme === 'dark') {
      body.classList.add('theme-dark');
    } else {
      body.classList.add('theme-light');
    }
  }
}