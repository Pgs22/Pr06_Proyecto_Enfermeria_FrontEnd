import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { NurseService, Nurse } from '../services/nurse.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-profile',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nurse-profile.html',
  styleUrl: './nurse-profile.css',
})

export class NurseProfile implements OnInit {

  nurse: Nurse | null = null;

  constructor(private nurseService: NurseService, private router: Router) {}

  ngOnInit(): void {
    if (!this.nurseService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }
    const id = localStorage.getItem('currentNurseId');
    if (id) {
      this.nurse = this.nurseService.getNurses().find(n => n.id == +id) || null;
    }
  }

  update() {
    if (this.nurse) {
      this.nurseService.updateNurse(this.nurse);
      alert('Perfil actualizado');
    }
  }

  delete() {
    if (this.nurse?.id) {
      this.nurseService.deleteNurse(this.nurse.id);
      this.nurseService.logoutUser();
      localStorage.removeItem('currentNurseId');
      alert('Cuenta eliminada');
      this.router.navigate(['/']);
    }
  }
}