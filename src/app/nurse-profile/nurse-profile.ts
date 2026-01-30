import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { NurseService, Nurse } from '../services/nurse.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-nurse-profile',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-profile.html',
  styleUrl: './nurse-profile.css',
})

export class NurseProfile implements OnInit {

  nurse: Nurse | null = null;
  showPassword = false;

  constructor(
    private nurseService: NurseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.nurseService.getNurseById(this.nurseService.getSavedId()).subscribe({
      next: (response: any) => {
        this.nurse = response.nurse;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  update() {
    if (!this.nurse) return;
    this.nurseService.updateNurse(this.nurse).subscribe({
      next: (response: any) => {
        this.nurse = { ...this.nurse, ...response.nurse };
        this.cdr.detectChanges();
        alert('Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('No se pudo actualizar el perfil. Comprueba tu conexión o los datos introducidos.');
      }
    });
  }

  delete() {
    if (this.nurse?.id) {
      if (confirm('¿Seguro que quieres borrar tu cuenta?')) {

        this.nurseService.deleteNurse(this.nurse.id).subscribe({
          next: (response) => {
            alert('Cuenta eliminada definitivamente');

            this.nurseService.logoutUser();
            localStorage.removeItem('nurseId');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al borrar:', err);
            alert('No se pudo borrar la cuenta del servidor');
          }
        });

      }
    }
  }
}