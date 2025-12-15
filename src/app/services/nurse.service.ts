import { Injectable } from '@angular/core';

export class Nurse {
  id?: number;
  name?: string;
  email?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class NurseService {
  private nurses: Nurse[] = [
    { id: 1, name: 'María López', email: 'maria.lopez@example.com', image: '/img/Maria.png' },
    { id: 2, name: 'Juan Pérez', email: 'juan.perez@example.com', image: '/img/Juan.png' },
    { id: 3, name: 'Ana García', email: 'ana.garcia@example.com', image: '/img/Ana.png' },
  ];

  getNurses(): Nurse[] {
    return this.nurses;
  }
}
