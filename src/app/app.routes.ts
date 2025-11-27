import { NurseList } from './nurse-list/nurse-list';
import { App } from './app';
import { NurseFind } from './nurse-find/nurse-find';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'nurselist',
    component: NurseList
  },
    // {
    //     path: 'home',
    //     component: App
    //     },
    {
        path: 'nurse_find',
        component: NurseFind
    },
];
