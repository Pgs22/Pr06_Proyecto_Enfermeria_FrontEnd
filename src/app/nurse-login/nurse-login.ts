import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseService, Nurse } from '../services/nurse.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-nurse-login',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-login.html',
  styleUrls: ['./nurse-login.css'],
})
export class NurseLogin {


  nurses: Nurse[] = [];
  email: string = '';
  password: string = '';

  constructor(private nurseService: NurseService, private router: Router) {
   // this.nurses = this.nurseService.getNurses();
  }

  login_message: string[] = [];
  message_type = 'error'

  submit = false;

  handleFormSubmit() {
    this.submit = true;
    this.login_message = [];

    if (this.nurses.length <= 0) {
      this.login_message.push('No nurses found.');
    }

    if (!this.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly, please enter a valid email.');
    }

    if (!this.password || this.password.length < 8) {
      this.login_message.push('Password must be at the very least 8 characters long.');
    }

    if (this.login_message.length > 0) {
      return;
    }

    const found = this.nurses.find(n => n.email === this.email);
    if (!found) {
      this.message_type = 'error';
      this.login_message = ['Email not found. Please check your email or register.'];
      return;
    }

    if (found.password !== this.password) {
      this.message_type = 'error';
      this.login_message = ['Incorrect password. Please try again.'];
      return;
    }

    // Validation success
    this.message_type = 'success';
    this.login_message = ['Welcome back! Logging in...'];
    this.nurseService.loginUser();

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 800);
  }

  validateEmail(email: string): boolean {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    );
  }

}
