import { NurseList } from './nurse-list/nurse-list';
import { App } from './app';
import { NurseFind } from './nurse-find/nurse-find';
import { Routes } from '@angular/router';
import { NurseLogin } from './nurse-login/nurse-login';
import { NurseRegister } from './nurse-register/nurse-register';

export const routes: Routes = [
  {path:'',
      loadComponent:()=>
          import('./home/home').then(m=>m.Home)
  },
  {path:'home/:user/:upasswd',
      loadComponent:()=>
          import('./home/home').then(m=>m.Home)
  },
  {
    path: '',
    component: App
  },
  {
    path: 'nurse-list',
    component: NurseList
  },
  {
      path: 'nurse-find',
      component: NurseFind
  },
  {
      path: 'nurse-login',
      component: NurseLogin
  },
    {
      path: 'nurse-register',
      component: NurseRegister
  }

  
];
