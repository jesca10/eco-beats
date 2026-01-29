import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService) { }

  async loginUser(credentials: any) {
    return fetch(`${environment.HOST}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Inicio de sesión fallido, verifica tus credenciales');
      }
      return response.json();
    });

    // * [Tarea]: Si el login es exitoso guardar en el storage 'login:true' ✅
    // return new Promise((resolve, reject) => {
    //   if (credentials.email === 'jarol@gmail.com' && credentials.password === 'Qwerty07*') {
    //     this.storageService.set('loggedIn', true);
    //     resolve('Login Correcto');
    //   } else {
    //     reject('Login Incorrecto');
    //   }

    // });
  }

  async registerUser(userData: any) {
    return fetch(`${environment.HOST}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Ha ocurrido un error al registrar el usuario');
      }
      return response.json();
    });

    // return new Promise((resolve, reject) => {
    //   if (userData.name && userData.lastName && userData.email && userData.password) {
    //     this.storageService.set('registeredUser', userData);
    //     resolve('Registro Exitoso');
    //   } else {
    //     reject('Registro Fallido');
    //   }
    // });
  }
}