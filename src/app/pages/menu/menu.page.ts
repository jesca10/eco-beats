import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonicModule]
})
export class MenuPage {

  constructor(private router: Router, private storageService: StorageService) { }

  async logout() {
    this.storageService.remove('loggedIn');
    this.router.navigateByUrl('/login');
  }
}