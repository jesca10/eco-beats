import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage-service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage {

  /** 
   * * [Tarea]: 
   * * Organizar el intro con slides dinamicos ✅
   * * Minino 4 slides ✅
   * * Utilizar variables css ✅
   * * Utilizar css utilities ✅
   * * Agregar un boton que nos lleve al home ✅
   */

  slides = [
    {
      image: 'assets/imgs/slide1.png',
      title: 'Bienvenido a EcoBeats',
      description: 'Escucha tu música favorita.'
    },
    {
      image: 'assets/imgs/slide2.png',
      title: 'Explora listas',
      description: 'Encuentra listas para cada estado.'
    },
    {
      image: 'assets/imgs/slide3.png',
      title: 'Disfruta la música',
      description: 'Mantén tus canciones favoritas en repetición.'
    },
    {
      image: 'assets/imgs/slide4.png',
      title: 'Modo sin conexión',
      description: 'Escucha tu música sin internet.'
    },
  ];

  @ViewChild('swiper') swiperRef: ElementRef | undefined;


  constructor(private router: Router, private storageService: StorageService) { }

  goBack() {
    this.router.navigateByUrl('/menu/home');
    //* [Tarea]: Al volver al home guardar en el storage que ya estuve en la pagina intro. ✅
    this.storageService.set('visitedIntro', true);
  }

  async start() {
    await this.storageService.set('visitedIntro', true);
    this.router.navigateByUrl('/menu/home');
  }

  next() {
    this.swiperRef?.nativeElement.swiper.slideNext();
  }
}
