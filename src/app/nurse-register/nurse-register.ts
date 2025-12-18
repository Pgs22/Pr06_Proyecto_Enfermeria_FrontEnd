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
    // 1. This causes the @if to "turn off" for a moment if there were old messages.
    this.register_message = [];

    // 2. Calling to service
    if(this._nurseService.registerNurse (this.email, this.password)){
      this.is_registered_ok=true;
    }else{
       this.is_registered_error=true
    }

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
