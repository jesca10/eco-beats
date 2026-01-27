import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { ThemeService } from './services/theme-service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(private themeService: ThemeService) {
    this.initializeApp();
  }

  initializeApp() {
    this.themeService.initTheme();
  }
}
