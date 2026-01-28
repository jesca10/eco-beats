import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tracks-modal',
  templateUrl: './tracks-modal.page.html',
  styleUrls: ['./tracks-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TracksModalPage {

  scrolled: boolean = false;
  imageWidth: string = '60';
  imgNameOpacity: string = '1';
  titleOpacity: string = '0';

  @Input() info: any;

  constructor(private modalCtrl: ModalController) { }

  async selectTrack(track: any) {
    await this.modalCtrl.dismiss(track);
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  onScroll(event: CustomEvent) {
    const scrollTop = event.detail.scrollTop;

    const maxScroll = 250;
    const minWidth = 30;
    const width = Math.max(minWidth, 60 - (scrollTop / maxScroll) * (100 - minWidth));

    const opacity = Math.max(0, 1 - scrollTop / (maxScroll / 1.2));

    this.imageWidth = `${width}%`;
    this.imgNameOpacity = width <= minWidth ? `${opacity}` : '1';
    this.titleOpacity = width <= minWidth ? `${1 - opacity}` : '0';

    this.scrolled = scrollTop > maxScroll - 125;
  }
}