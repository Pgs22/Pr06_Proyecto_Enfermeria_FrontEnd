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
  private nurses: Nurse[] = [
    new Nurse(1,'María López','maria.lopez@example.com','password1','/img/Maria.png' ),
    new Nurse(2, 'Juan Pérez', 'juan.perez@example.com', 'password2', '/img/Juan.png'),
    new Nurse(3, 'Ana García', 'ana.garcia@example.com', 'password3', '/img/Ana.png' )
  ];

  getNurses(): Nurse[] {
    return this.nurses;
  }

  registerNurse(email: string, password: string) {
    const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$";
    const regex = new RegExp(emailPattern);

    if (regex.test(email)) {
      const newUser: Nurse = {
        email: email,
        password: password
      };

      this.nurses.push(newUser); // Añadir a la lista simulada
      return true;
    }else{
      return false;
    }


  }
}
