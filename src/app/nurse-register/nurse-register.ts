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
    isLoading = false;

    constructor( private _nurseService: NurseService) { }

  /**
   * Handles the submission of the registration form.
   * Performs client-side validations.
   */
  handleFormSubmit() {
    // 1. This causes the @if to "turn off" for a moment if there were old messages.
    this.register_message = [];

    // 2. Calling to service
    this._nurseService.registerNurse (this.email, this.password);

    // 3. This causes the @if to "light up" with the new message
    this.message_type = 'success';
    this.register_message = [
      `Registration successful for: ${this.email}. Redirecting...`
    ];
      
      // Print in console log
      console.log('User registered:', this.email);
    } 
    // Result 'success'
 
  
}
