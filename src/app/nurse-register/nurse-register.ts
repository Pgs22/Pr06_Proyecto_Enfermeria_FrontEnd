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
    // We clear previous statuses and messages
    this.register_message = [];
    this.is_registered_ok = false;
    this.is_registered_error = false;
    this.message_type = 'danger';

    // Validations definition (Regex)
    const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");
    const passwordRegex = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}");

    // Validations
    if (!emailRegex.test(this.email)) {
      this.register_message.push('Invalid email format (e.g., name@domain.com).');
    }

    if (!passwordRegex.test(this.password)) {
      this.register_message.push('Password must include: 8-64 chars, a number, lowercase and uppercase.');
    }

    if (this.password !== this.confirm_password) {
      this.register_message.push('Passwords do not match.');
    }

    // Block if there are errors
    if (this.register_message.length > 0) {
      this.is_registered_error = true;
      return;
    }

    // Call for service
    if (this._nurseService.registerNurse(this.email, this.password)) {
      this.is_registered_ok = true;
      this.message_type = 'success';
      this.register_message = [`Registration successful for: ${this.email}.`];
      console.log('User registered:', this.email);
    } else {
      this.is_registered_error = true;
      this.register_message = ['The service is unavailable. Please try again later.'];
    }
  }

}
