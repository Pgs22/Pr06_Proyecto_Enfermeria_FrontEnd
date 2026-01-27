import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseService } from '../services/nurse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse-register',
  standalone: true, //P8
  //We import the modules we will need
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-register.html',
  styleUrl: './nurse-register.css',
})
export class NurseRegister {
  name = '';//añadido
  email = '';
  password = '';
  confirm_password = '';

  is_registered_ok=false;
  is_registered_error=false;

  // Properties for displaying messages
  register_message: string[] = [];
  message_type = ''; 
  isLoading = false;

  constructor( private _nurseService: NurseService,
    private router: Router
  ) { }

  /**
   * Handles the submission of the registration form.
   * Performs client-side validations.
   */
  // handleFormSubmit() {
  //   // 1. Total cleanup of states
  //   this.register_message = [];
  //   this.is_registered_ok = false;
  //   this.is_registered_error = false;
  //   this.isLoading = true;

  //   // 2. Regex definition (We use object format to avoid escape conflicts)
  //   const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;

  //   // 3. Logical validations
  //   if (!emailRegex.test(this.email)) {
  //     this.register_message.push('Invalid email format.');
  //   }

  //   if (!passwordRegex.test(this.password)) {
  //     this.register_message.push('Password does not meet security requirements.');
  //   }

  //   if (this.password !== this.confirm_password) {
  //     this.register_message.push('Passwords do not match.');
  //   }

  //   // 4. If there are local validation errors, display and stop
  //   if (this.register_message.length > 0) {
  //     this.is_registered_error = true;
  //     this.message_type = 'alert-danger';
  //     this.isLoading = false;
  //     return;
  //   }

  //   // 5. Registration attempt
  //   const success = this._nurseService.registerNurse(this.email, this.password);

  //   if (success) {
  //     this.is_registered_ok = true;
  //     this.message_type = 'alert-success';
  //     this.register_message = [`Registration successful for: ${this.email}`];
  //   } else {
  //     this.is_registered_error = true;
  //     this.message_type = 'alert-danger';
  //     this.register_message = ['Error: Service validation failed.'];
  //   }

  //   this.isLoading = false;
  // }
  handleFormSubmit() {
  // 1. Limpieza total de estados
  this.register_message = [];
  this.is_registered_ok = false;
  this.is_registered_error = false;
  this.isLoading = true;

  // 2. Definición de Regex
  const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;

  // 3. Validaciones lógicas (Frontend)
  if (!this.name.trim()) {
    this.register_message.push('Name is required.');
  }
  if (!emailRegex.test(this.email)) {
    this.register_message.push('Invalid email format.');
  }

  if (!passwordRegex.test(this.password)) {
    this.register_message.push('Password must have 8-64 chars, a number, and uppercase/lowercase.');
  }

  if (this.password !== this.confirm_password) {
    this.register_message.push('Passwords do not match.');
  }

  if (this.register_message.length > 0) {
    this.is_registered_error = true;
    this.message_type = 'alert-danger';
    this.isLoading = false;
    return;
  }

  // 4. LLAMADA AL BACKEND (Symfony)
  // Nota: Añadimos 'this.name' porque tu Symfony hace $nurse->setName($data['name'])
  this._nurseService.registerNurse(this.name, this.email, this.password).subscribe({
    next: (response) => {
      // Éxito: Symfony devuelve HTTP 201 y un JSON con el ID
      this.is_registered_ok = true;
      this.message_type = 'alert-success';
      this.register_message = [`Registration successful! ID: ${response.id}`];
      this.isLoading = false;

      // Opcional: Redirigir al login tras un breve retraso
      setTimeout(() => this.router.navigate(['/login']), 2000);
    },
    error: (err) => {
      // Error: Symfony devuelve 400 (Email already exists, etc.)
      this.is_registered_error = true;
      this.message_type = 'alert-danger';
      
      // Capturamos el mensaje de error que definiste en Symfony ['error' => '...']
      const errorMsg = err.error?.error || 'Error: Could not register user.';
      this.register_message = [errorMsg];
      this.isLoading = false;
    }
  });
}

}
