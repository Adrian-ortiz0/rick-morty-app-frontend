import { Routes } from '@angular/router';

export const rickMortyRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/character-list-page/character-list-page').then(m => m.CharacterListPage),
  },
  {
    path: ':id', 
    loadComponent: () => import('./pages/detail-page/detail-page').then(m => m.DetailPage),
  },
];

export default rickMortyRoutes;