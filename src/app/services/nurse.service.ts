import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export class Nurse {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  constructor(id?: number, name?: string, email?: string, password?: string, image?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
  }
}

@Injectable({ providedIn: 'root' })
export class NurseService {
  constructor(private http: HttpClient) { }
  url = "http://localhost:8000/nurse/"
  private platformId = inject(PLATFORM_ID); //detect if is server o browser
  private _isLoggedIn: boolean = false;
  private nurses: Nurse[] = [
    // new Nurse(1, 'María López', 'maria.lopez@example.com', 'password1', '/img/Maria.png'),
    // new Nurse(2, 'Juan Pérez', 'juan.perez@example.com', 'password2', '/img/Juan.png'),
    // new Nurse(3, 'Ana García', 'ana.garcia@example.com', 'password3', '/img/Ana.png')
  ];

  getNurses(): Nurse[] {
    return this.nurses;
  }

  getNursesAjax(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.url+"index");
  }

  registerNurse(email: string, password: string): boolean {
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
      const newUser: Nurse = {
        email: email,
        password: password
      };

      this.nurses.push(newUser); // Add to Array
      return true;
    }

    return false;
  }

  loginUser() {
  this._isLoggedIn = true;
    if (isPlatformBrowser(this.platformId)) {
      // We stored something so that `isLoggedIn()` can find it.
      localStorage.setItem('userToken', 'true'); 
    }
  }

  logoutUser() {
    this._isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
    }
  }

  isAuthenticated(): boolean {
    return this._isLoggedIn;
  }

  isLoggedIn(): boolean {
    // To prevent listing or searching for nurses unless you log in, access the component's URL directly.
    if (isPlatformBrowser(this.platformId)) {
      return this._isLoggedIn || !!localStorage.getItem('userToken');
    }
    return this._isLoggedIn;
  }

  updateNurse(nurse: Nurse) {
    const index = this.nurses.findIndex(n => n.id === nurse.id);
    if (index !== -1) {
      this.nurses[index] = nurse;
    }
  }

  deleteNurse(id: number) {
    this.nurses = this.nurses.filter(n => n.id !== id);
  }
}
