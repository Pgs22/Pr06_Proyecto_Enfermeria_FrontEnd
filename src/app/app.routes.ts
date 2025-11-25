import { Routes } from '@angular/router';
import { NurseList } from './nurse-list/nurse-list';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'nurselist',
    component: NurseList
  }
];
