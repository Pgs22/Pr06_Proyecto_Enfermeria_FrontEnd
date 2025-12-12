import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-register',
  //Importamos los modulos que vamos a necesitar
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-register.html',
  styleUrl: './nurse-register.css',
})
export class NurseRegister {
  email = '';
  password = '';
  confirm_password = '';

  // Propiedades para mostrar mensajes
  register_message: string[] = [];
  message_type = 'error'; // 'error' o 'success'
  submit = false;

  /**
   * Maneja el envío del formulario de registro.
   * Realiza validaciones del lado del cliente.
   */
  handleFormSubmit() {
    this.submit = true;
    this.register_message = [];
    let isValid = true;

    // --- 1. Validaciones de Email ---
    if (this.email.length <= 0) {
      this.register_message.push('Email cannot be empty.');
      isValid = false;
    } else if (!this.validateEmail(this.email)) {
      this.register_message.push('Email formatted incorrectly, please enter a valid email.');
      isValid = false;
    }

    // --- 2. Validaciones de Contraseña ---
    if (this.password.length < 8) {
      this.register_message.push('Password must be at the very least 8 characters long.');
      isValid = false;
    }

    // --- 3. Validación de Confirmación de Contraseña ---
    if (this.password !== this.confirm_password) {
      this.register_message.push('Password and Confirm Password do not match.');
      isValid = false;
    }

    // Si hay mensajes de error, detenemos el proceso
    if (this.register_message.length > 0) {
      return;
    }

    // --- 4. Lógica de Registro (Simulada) ---
    // NOTA: Aquí es donde normalmente harías una llamada HTTP POST a tu backend.
    
    if (isValid) {
      this.message_type = 'success';
      this.register_message = [
        `Registration successful for: ${this.email}. Redirecting...`
      ];
      
      // En un entorno real, redirigirías al usuario después de un registro exitoso.
      console.log('User registered:', this.email);
    } 
    // Si llegamos aquí y isValid es true, el mensaje ya está configurado como 'success'
  }

  /**
   * Valida el formato del email usando una expresión regular.
   * @param email La cadena de email a validar.
   * @returns Verdadero si el email tiene un formato válido.
   */
  validateEmail(email: string): boolean {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    );
  }
  
}
