import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Nurse {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class NurseService {
   private _isLoggedIn: boolean = false; 
  private nurses: Nurse[] = [
    { id: 1, name: 'María López', email: 'maria.lopez@example.com', password: 'password1', image: '/img/Maria.png' },
    { id: 2, name: 'Juan Pérez', email: 'juan.perez@example.com', password: 'password2', image: '/img/Juan.png' },
    { id: 3, name: 'Ana García', email: 'ana.garcia@example.com', password: 'password3', image: '/img/Ana.png' },
  ];

  getNurses(): Nurse[] {
    return this.nurses;
  }

  registerNurse(email: string, password: string) {
    const newUser: Nurse = {
      email: email,
      password: password
    };

    this.nurses.push(newUser); // Añadir a la lista simulada

  }

  // Variable para guardar el estado del logueo + logica
  loginUser() {
    this._isLoggedIn = true;
  }

  logoutUser() {
    this._isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this._isLoggedIn;
  }
}
