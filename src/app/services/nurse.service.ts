import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export class Nurse {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  profileImage?: string;
  constructor(id?: number, name?: string, email?: string, password?: string, profileImage?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.profileImage = profileImage;
  }
}

@Injectable({ providedIn: 'root' })
export class NurseService {
  constructor(private http: HttpClient) { }
  url = "http://localhost:8000/nurse/"

  private platformId = inject(PLATFORM_ID); //detect if is server o browser
  private _isLoggedIn: boolean = false;

  private nurses: Nurse[] = [];

  getNursesFindByName(name: string): Observable<Nurse[]> {
    if (!name || !name.trim()) {
      return this.getNursesList();
    }
    return this.http.get<Nurse[]>(this.url + "name/", { params: { name } });
  }

  getNursesList(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.url + "index");
  }

  searchNurses(nurses: Nurse[], searchTerm: string): Nurse[] {
    if (!searchTerm || !searchTerm.trim()) {
      return [];
    }
    const term = searchTerm.trim().toLowerCase();
    return nurses.filter(nurse =>
      (nurse.name || '').toLowerCase().includes(term)
    );
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

  getNurseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}id/${id}`);
  }

  getSavedId(): number {
    const id = localStorage.getItem('currentNurseId');
    console.log('Respuesta de Symfony recibida:', id);
    return id ? Number(id) : 8; // Devolvemos 8 temporalmente mientras no hay login
  }

  updateNurse(nurse: Nurse): Observable<any> {
    return this.http.put<any>(`${this.url}id/${nurse.id}`, nurse);
  }

  deleteNurse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}id/${id}`);
  }
}
