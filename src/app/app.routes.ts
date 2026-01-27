import { Routes } from '@angular/router';
import { HomePage } from './rick-morty/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'characters',
    loadChildren: () => import('./rick-morty/rick-morty.routes')
        
  },
  {
    path: '**',
    redirectTo: ''
  }
];
