import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseService } from '../services/nurse.service';


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
    message_type = ''; 
    submit = false;
    isLoading = false;

    constructor( private _nurseService: NurseService) { }

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
      this._nurseService.registerNurse (this.email, this.password);
    }
    
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
