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

  /**
   * LOGIN CALL AT BACKEND
   * @param email
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + "login", { email, password });
  }

  /**
   * LOGIN VALIDACION
   * @param nurseId //Si se acepta login guardamos ID
   */
  loginUser(nurseId: string) {
    this._isLoggedIn = true;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userToken', 'true');
      localStorage.setItem('nurseId', nurseId);
    }
  }

  logoutUser() {
    this._isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('nurseId');
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
    const id = localStorage.getItem('nurseId');
    return id ? Number(id) : 0;
  }

  updateNurse(nurse: Nurse): Observable<any> {
    return this.http.put<any>(`${this.url}id/${nurse.id}`, nurse);
  }

  deleteNurse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}id/${id}`);
  }
}
