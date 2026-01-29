import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service';
import { ThemeService } from 'src/app/services/theme-service';
import { MusicService } from 'src/app/services/music-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage {

  user: any = {}

  options = [
    { icon: 'person-circle', label: 'Editar perfil', action: 'edit' },
    { icon: 'color-palette', label: 'Temas', action: 'theme' },
    { icon: 'settings', label: 'Configuración', action: 'settings' },
    { icon: 'log-out', label: 'Cerrar sesión', action: 'logout' }
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private themeService: ThemeService,
    private musicService: MusicService
  ) { }

  async ngOnInit() {
    await this.loadUserProfile();
    this.favoriteTracks();
  }

  async loadUserProfile() {
    this.user = await this.storageService.get('user');
  }

  favoriteTracks() {
    this.musicService.getFavTracksByUser(this.user.id).then(tracks => {
      this.user.favoriteTracks = tracks.length;
    }).catch(error => {
      console.error('Error fetching favorite tracks:', error);
      this.user.favoriteTracks = [];
    });
  }

  navigateTo(option: string) {
    switch (option) {
      case 'edit':
        break;
      case 'theme':
        this.presentThemeDialog();
        break;
      case 'settings':
        break;
      case 'logout':
        this.logout();
        break;
      default:
        console.warn('Opción no reconocida:', option);
    }
  }

  async presentThemeDialog() {
    const current = this.themeService.getThemePreference();

    const alert = await this.alertCtrl.create({
      header: 'Selecciona un tema',
      buttons: ['Cancelar', {
        text: 'Aceptar',
        handler: (data: 'light' | 'dark' | 'system') => {
          this.themeService.setThemePreference(data);
        }
      }],
      inputs: [
        {
          label: 'Claro',
          type: 'radio',
          value: 'light',
          checked: current === 'light'
        },
        {
          label: 'Oscuro',
          type: 'radio',
          value: 'dark',
          checked: current === 'dark'
        },
        {
          label: 'Sistema',
          type: 'radio',
          value: 'system',
          checked: current === 'system'
        }
      ],
      cssClass: 'theme-dialog'
    });

    await alert.present();
  }

  logout() {
    this.storageService.remove('loggedIn');
    this.storageService.remove('user');
    this.router.navigateByUrl('/login');
  }
}