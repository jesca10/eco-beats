import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service';
import { ThemeService } from 'src/app/services/theme-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage {

  user = {
    name: 'Jarol Escalante',
    email: 'jarol@gmail.com',
    avatar: 'assets/icon/logo.png',
    stats: {
      playlists: 12,
      likes: 234,
      following: 58
    }
  };

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
    private themeService: ThemeService
  ) { }

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
    this.router.navigateByUrl('/login');
  }
}