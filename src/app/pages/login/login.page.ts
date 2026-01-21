import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage {

  // * [Tarea]: Crear un nuevo guard para validar si estoy logeado cuando entre al home, si no redireccionar al login ✅
  showPassword: boolean = false;
  errorMessage: string = '';
  loginForm: FormGroup;
  // * [Tarea]: Añadir los mensajes de validación para password ✅
  validationMessages: any = {
    email: [
      { type: 'required', message: 'El correo electrónico es obligatorio.' },
      { type: 'email', message: 'Correo electrónico inválido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Mínimo 8 caracteres.' },
      { type: 'pattern', message: 'Debe contener al menos una mayúscula, minúscula, número y carácter especial.' }
    ]
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/)
        ])
      )
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginUser(credentials: any) {
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = '';
      this.navCtrl.navigateForward('/home');
    }).catch(err => {
      this.errorMessage = err;
    });
  }
}