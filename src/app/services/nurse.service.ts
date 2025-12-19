import { Injectable } from '@angular/core';

export class Nurse {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  constructor( id?: number,  name?: string,  email?: string,  password?: string,  image?: string){
    this.id=id;
    this.name=name;
    this.email=email;
    this.password=password;
    this.image=image;
  }
}

@Injectable({ providedIn: 'root' })
export class NurseService {
   private _isLoggedIn: boolean = false; 
  private nurses: Nurse[] = [
    new Nurse(1,'María López','maria.lopez@example.com','password1','/img/Maria.png' ),
    new Nurse(2,'Juan Pérez','juan.perez@example.com','password2','/img/Juan.png'),
    new Nurse(3,'Ana García','ana.garcia@example.com','password3','/img/Ana.png' )
  ];

  getNurses(): Nurse[] {
    return this.nurses;
  }

  registerNurse(email: string, password: string): boolean {
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;

    if (emailPattern.test(email) && passwordPattern.test(password) ) {
      const newUser: Nurse = {
        email: email,
        password: password
      };

      this.nurses.push(newUser); // Add to Array
      return true;
    }
    
    return false;
  }

  // 2. Agregamos las funciones de login que venían del main
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
