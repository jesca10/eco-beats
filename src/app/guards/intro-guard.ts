import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage-service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    //* [Tarea]: Obtener del storage si el usuario ya vio la intro y dependiendo de eso dejar pasar al home, sino redirigir a la intro ✅
    const visitedIntro = await this.storageService.get('visitedIntro');

    if (visitedIntro) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
      return false;
    }
  }
}