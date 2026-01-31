import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseService } from '../services/nurse.service';
import { ChangeDetectorRef } from '@angular/core'; // FOR SOLUTION swow msg returned by API
import { NgForm } from '@angular/forms'; // FOR SOLUTION swow msg returned by API


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

  constructor( 
    private _nurseService: NurseService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef to manually trigger change detection
  ) { }

  /**
   * Handles the submission of the registration form.
   * Performs client-side validations.
   */
  handleFormSubmit(form: NgForm) {
    // 1. Total cleanup of states
    this.register_message = [];
    this.is_registered_ok = false;
    this.is_registered_error = false;
    this.register_message = [];
    this.isLoading = true;
    this.cdr.detectChanges(); // Forzamos a que el mensaje viejo se borre de la pantalla

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

    this._nurseService.registerNurse(this.email, this.password).subscribe({

      next: (response) => {
        // Symfony devuelve 201 Created y un JSON con el ID
        const userEmail = this.email; //Guardamos email recibido
        // Para mostrar mensaje de registro cmpletado
        this.is_registered_ok = true;
        console.log('Registration successful, ID:', response.id); //Para detectar si cambia a true la variable o falla "" no muestra error ""
        this.is_registered_error = false;
        this.message_type = 'alert-success';
        this.register_message = [`Registration successful for: ${userEmail}`];

        form.resetForm();

        this.isLoading = false;        
        // Limpiamos los campos del formulario
        //this.email = '';
        //this.password = '';
        //this.confirm_password = '';

        // FORZAMOS A ANGULAR A REDIBUJAR
        this.cdr.markForCheck(); //Forzamos a la vista a pintarse YA
        this.cdr.detectChanges();
        console.log('Change detection triggered.');
      },

      error: (err) => {
        // Errores 400 (Email exists) o 500
        this.is_registered_error = true;
        this.cdr.detectChanges(); // También en el error
        this.is_registered_ok = false;
        this.message_type = 'alert-danger';
        
        // Mostramos el mensaje de error de Symfony: ['error' => '...'] ó por si no se recibe
        const errorMsg = err.error?.error || 'Error: Service validation failed.';
        this.register_message = [errorMsg];
        this.isLoading = false;
      }

    });
  }
}
