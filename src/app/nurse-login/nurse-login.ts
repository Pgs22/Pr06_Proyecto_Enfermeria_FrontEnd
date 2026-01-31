import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseService, Nurse } from '../services/nurse.service';
import { isEmpty } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core'; // Para solucionar mostrar mensaje error password en login Importamos ChangeDetectorRef

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

  constructor(
    private nurseService: NurseService,
    private router: Router,
    private cdr: ChangeDetectorRef // Para solucionar mostrar mensaje error password en login
    ) {  }
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
    this.message_type = 'error'; // Reset por defecto a error

    if (this.login_message.length > 0) {
      this.cdr.detectChanges(); // Para que salgan los errores de validación local
      return;
    }

    // 2. Llamada al servicio que conecta con Symfony
    this.nurseService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Tu Symfony retorna { success: true, id: X }
        if (response.success && response.id) {
          this.message_type = 'success';
          this.login_message = ['Welcome back! Logging in...'];
          
          // Pasamos el ID al método del servicio para que lo guarde en localStorage
          this.nurseService.loginUser(response.id.toString()); 

          this.cdr.detectChanges(); // Forzamos actualización para mostrar mensaje antes de redirigir

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

        this.cdr.detectChanges(); // 3. FORZAR el mensaje de error inmediatamente
        console.error('Login error:', err);
      }
    });
  }


}
