import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { RickMortyService } from '../../services/rick-morty.service';
import { CharacterCard } from '../character-card/character-card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-item',
  imports: [CharacterCard, RouterLink],
  templateUrl: './list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {

  private rmService = inject(RickMortyService);

  filters = input<{ name: string; status: string; species: string }>({
    name: '',
    status: '',
    species: '',
  });

  characters = signal<Character[]>([]);
  currentPage = signal(1);
  totalPages = signal(0);
  loading = signal(false);

  constructor() {

    effect(() => {
      this.filters();  
      this.currentPage.set(1);
    });

    effect(() => {
      this.currentPage();     
      this.filters();        
      this.fetchCharacters();
    });
  }

  fetchCharacters() {
    const { name, status, species } = this.filters();

    this.loading.set(true);

    this.rmService
      .searchCharacters(this.currentPage(), name, status, species)
      .subscribe({
        next: resp => {
          this.characters.set(resp.results);
          this.totalPages.set(resp.info.pages);
          this.loading.set(false);
        },
        error: () => {
          this.characters.set([]);
          this.totalPages.set(0);
          this.loading.set(false);
        },
      });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
