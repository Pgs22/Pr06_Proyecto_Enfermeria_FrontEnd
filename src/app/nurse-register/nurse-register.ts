import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseService } from '../services/nurse.service';


@Component({
  selector: 'app-nurse-register',
  //We import the modules we will need
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-register.html',
  styleUrl: './nurse-register.css',
})
export class NurseRegister {
  email = '';
  password = '';
  confirm_password = '';

  is_registered_ok=false;
  is_registered_error=false;

  // Properties for displaying messages
  register_message: string[] = [];
  message_type = ''; 
  isLoading = false;

  constructor( private _nurseService: NurseService) { }

  /**
   * Handles the submission of the registration form.
   * Performs client-side validations.
   */
  handleFormSubmit() {
    // 1. Resetear estados cada vez que se pulsa el botón
    this.register_message = [];
    this.is_registered_ok = false;
    this.is_registered_error = false;
    this.isLoading = true; // Iniciamos feedback de carga

    // 2. Definición de Expresiones Regulares (Regex)
    // Usamos doble \\ para escapar caracteres especiales dentro de strings de TS
    const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");
    const passwordRegex = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}");

    // 3. Validaciones manuales adicionales (Segunda capa de seguridad aparte del HTML)
    if (!emailRegex.test(this.email)) {
      this.register_message.push('Invalid email format (e.g., name@domain.com).');
    }

    if (!passwordRegex.test(this.password)) {
      this.register_message.push('Password must be 8-64 chars, include a number, lowercase and uppercase.');
    }

    if (this.password !== this.confirm_password) {
      this.register_message.push('Passwords do not match.');
    }

    // 4. Si hay errores de validación, detenemos el proceso aquí
    if (this.register_message.length > 0) {
      this.is_registered_error = true;
      this.message_type = 'alert-danger'; // Clase CSS de Bootstrap
      this.isLoading = false;
      return; 
    }

    // 5. Intento de registro a través del servicio
    // Como tu servicio es síncrono y devuelve un boolean:
    const success = this._nurseService.registerNurse(this.email, this.password);

    if (success) {
      // CASO ÉXITO
      this.is_registered_ok = true;
      this.message_type = 'alert-success'; 
      this.register_message = [`Registration successful for: ${this.email}.`];
      console.log('User registered in local array:', this.email);
      
      // Opcional: Limpiar el formulario tras el éxito
      // this.email = ''; this.password = ''; this.confirm_password = '';
    } else {
      // CASO ERROR DEL SERVICIO
      this.is_registered_error = true;
      this.message_type = 'alert-danger';
      this.register_message = ['Service error: The email format was rejected by the server.'];
    }

    this.isLoading = false; // Finalizamos carga
  }

}
