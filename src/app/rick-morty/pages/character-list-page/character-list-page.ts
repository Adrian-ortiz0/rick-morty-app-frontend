  import { Component, signal } from '@angular/core';
import { TopMenu } from '../../components/top-menu/top-menu';
import { ListItem } from '../../components/list-item/list-item';

@Component({
  selector: 'app-character-list',
  imports: [TopMenu, ListItem],
  templateUrl: './character-list-page.html',
})
export class CharacterListPage {

  filters = signal({
    name: '',
    status: '',
    species: '',
  });

  onSearchName(name: string) {
    this.filters.update(f => ({ ...f, name }));
  }

  onStatusChange(status: string) {
    this.filters.update(f => ({ ...f, status }));
  }

  onSpeciesChange(species: string) {
    this.filters.update(f => ({ ...f, species }));
  }
}

