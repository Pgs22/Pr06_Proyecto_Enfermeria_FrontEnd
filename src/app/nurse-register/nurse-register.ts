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
    // 1. Total cleanup of states
    this.register_message = [];
    this.is_registered_ok = false;
    this.is_registered_error = false;
    this.isLoading = true;

    // 2. Regex definition (We use object format to avoid escape conflicts)
    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;

    // 3. Logical validations
    if (!emailRegex.test(this.email)) {
      this.register_message.push('Invalid email format.');
    }

    if (!passwordRegex.test(this.password)) {
      this.register_message.push('Password does not meet security requirements.');
    }

    if (this.password !== this.confirm_password) {
      this.register_message.push('Passwords do not match.');
    }

    // 4. If there are local validation errors, display and stop
    if (this.register_message.length > 0) {
      this.is_registered_error = true;
      this.message_type = 'alert-danger';
      this.isLoading = false;
      return;
    }

    // 5. Registration attempt
    
    /*
    //If return true the method registerNurse() - It will keep being true the varible "success"
    //But isn't possible in BBDD for sincron at Symfony

    const success = this._nurseService.registerNurse(this.email, this.password);

    if (success) {
      this.is_registered_ok = true;
      this.message_type = 'alert-success';
      this.register_message = [`Registration successful for: ${this.email}`];
    } else {
      this.is_registered_error = true;
      this.message_type = 'alert-danger';
      this.register_message = ['Error: Service validation failed.'];
    }
    this.isLoading = false;
    */

    //For to connect at Symfony and BBDD
    this._nurseService.registerNurseAjax({ email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        this.is_registered_ok = true;
        this.message_type = 'alert-success';
        this.register_message = [`Registration successful for: ${this.email}`];
        this.isLoading = false;
        //Empty filds at finished
        this.email = ''; this.password = ''; this.confirm_password = '';
      },
      error: (err: any) => {
        this.is_registered_error = true;
        this.message_type = 'alert-danger';
        this.register_message = ['Error: Service validation failed.'];
      }
    });


  }

}
