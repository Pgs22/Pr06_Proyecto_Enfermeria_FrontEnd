import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Nurse {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class NurseService {
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
}
