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

  @Input() info: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('TracksModalPage info:', this.info);
  }

  close() {
    return this.modalCtrl.dismiss(null, 'close');
  }
}