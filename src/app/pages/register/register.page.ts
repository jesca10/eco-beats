import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage {

  showPassword: boolean = false;
  isToastOpen: boolean = false;
  message: any;
  toastButtons = [
    {
      icon: 'close-sharp',
      role: 'cancel',
      handler: () => {
        this.setOpen(false);
      }
    }
  ];
  registerForm: FormGroup;
  validationMessages: any = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio.' }
    ],
    lastName: [
      { type: 'required', message: 'El apellido es obligatorio.' }
    ],
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

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      lastName: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
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

  navLogin() {
    this.navCtrl.navigateBack('/login');
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async registerUser(formData: any) {
    this.authService.registerUser(formData).then((res: any) => {
      this.message = { type: 'success', text: res, icon: 'checkbox-sharp' };
      this.setOpen(true);
      setTimeout(() => {
        this.navCtrl.navigateBack('/login');
        this.registerForm.reset();
      }, 1000);
    }).catch(err => {
      this.message = { type: 'error', text: err, icon: 'close-circle-sharp' };
      this.setOpen(true);
    });
  }
}