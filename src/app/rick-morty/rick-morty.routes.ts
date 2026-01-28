import { Routes } from '@angular/router';
import { DetailPage } from './pages/detail-page/detail-page';
import { CharacterListPage } from './pages/character-list-page/character-list-page';

export const rickMortyRoutes: Routes = [
  {
    path: '',
    component: CharacterListPage
  },
  {
    path: ':id', 
    component: DetailPage
  },
];

export default rickMortyRoutes;