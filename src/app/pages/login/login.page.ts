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
  message: any;
  isToastOpen: boolean = false;
  showPassword: boolean = false;
  toastButtons = [
    {
      icon: 'close-sharp',
      role: 'cancel',
      handler: () => {
        this.setOpen(false);
      }
    }
  ];
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

  navRegister() {
    this.navCtrl.navigateForward('/register');
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  loginUser(credentials: any) {
    this.authService.loginUser(credentials).then(res => {
      this.navCtrl.navigateForward('/menu/home');
      this.loginForm.reset();
    }).catch(err => {
      this.message = { type: 'error', text: err, icon: 'close-circle-sharp' };
      this.setOpen(true);
    });
  }
}