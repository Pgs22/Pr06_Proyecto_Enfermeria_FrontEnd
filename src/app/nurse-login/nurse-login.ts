import { Component, OnInit } from '@angular/core';
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

//Añadimos implements OnInit
export class NurseLogin implements OnInit{

  nurses: Nurse[] = [];
  email: string = '';
  password: string = '';
  login_message: string[] = [];
  message_type = 'error'
  submit = false;

  constructor(private nurseService: NurseService, private router: Router) {
  //Antes: this.nurses = this.nurseService.getNurses();
  }
  //Ahora:
  ngOnInit(): void {
    // Usamos el metodo del service para cargar la lista que viene del backend
    this.nurseService.getNursesList().subscribe({
      next: (result) => {
        this.nurses = result;
      }
    });
  }


/**
 * LOGIN connection with nurseService.login()and connected with Symfony backend
 * @return ID en navegador si es OK
 */
  handleFormSubmit() {
    this.submit = true;
    this.login_message = [];

    // 1. Validaciones básicas de formato
    if (!this.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly.');
    }
    if (!this.password || this.password.length < 8) {
      this.login_message.push('Password must be at least 8 characters long.');
    }

    if (this.login_message.length > 0) return;

    // 2. Llamada al servicio que conecta con Symfony
    this.nurseService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Tu Symfony retorna { success: true, id: X }
        if (response.success && response.id) {
          this.message_type = 'success';
          this.login_message = ['Welcome back! Logging in...'];
          
          // Pasamos el ID al método del servicio para que lo guarde en localStorage
          this.nurseService.loginUser(response.id.toString()); 

          setTimeout(() => {
            this.router.navigate(['/']); 
          }, 800);
        }
      },
      error: (err) => {
        // Aquí entra si Symfony retorna el HTTP_UNAUTHORIZED (401)
        this.message_type = 'error';
        // Usamos el mensaje que viene de Symfony si existe, si no, uno genérico
        const errorMsg = err.error?.message || 'Invalid credentials. Please try again.';
        this.login_message = [errorMsg];
        console.error('Login error:', err);
      }
    });
  }

  validateEmail(email: string): boolean {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    );
  }

}
