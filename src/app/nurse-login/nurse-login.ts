import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-nurse-login',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-login.html',
  styleUrl: './nurse-login.css',
})
export class NurseLogin {
  email = ''
  password = ''

  test_email = 'test@test.com'
  test_password = '12345678'

  login_message: string[] = [];
  message_type = 'error'

  submit = false;
  
  handleFormSubmit() {
    this.submit = true;
    this.login_message = [];

    if (this.email.length <= 0) {
      this.login_message.push('Email cannot be empty.')
    }

    if (!this.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly, please enter a valid email.')
    }

    if (this.password.length < 8) {
      this.login_message.push('Password must be at the very least 8 characters long.')
    }

    if (this.login_message.length > 0) {
      return;
    }

    if (this.email === this.test_email && this.password === this.test_password) {
      this.message_type = 'success'
      this.login_message = ['Welcome back! Logging in...']
    } else {
      this.login_message = ['Incorrect credentials, please verify you entered them correctly.']
    }
  }

  validateEmail(email: string): boolean {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    );
  }

}
