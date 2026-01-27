import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Character, FullCharacter } from '../../interfaces/character.interface';
import { RickMortyService } from '../../services/rick-morty.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  imports: [RouterLink, NgClass, DatePipe],
  templateUrl: './detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage { 
  private route = inject(ActivatedRoute);
  private rmService = inject(RickMortyService);

  character = signal<FullCharacter | null>(null);
  episodes = signal<{ name: string; episode: string; air_date: string }[]>([]);
  loading = signal(true);
  loadingEpisodes = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.rmService.getCharacterById(id).subscribe({
        next: (c) => {
          this.character.set(c);
          this.loading.set(false);
        },
        error: () => {
          this.character.set(null);
          this.loading.set(false);
        },
      });
    }
  }
  loadEpisodes(episodeUrls: string[]) {
    if (episodeUrls.length === 0) return;

    this.loadingEpisodes.set(true);
    const episodesToLoad = episodeUrls.slice(0, 8);
    const episodeRequests = episodesToLoad.map(url => this.rmService.getEpisode(url));
    
    forkJoin(episodeRequests).subscribe({
      next: (episodes) => {
        this.episodes.set(episodes);
        this.loadingEpisodes.set(false);
      },
      error: () => {
        this.episodes.set([]);
        this.loadingEpisodes.set(false);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'badge-success';
      case 'dead':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return '';
      case 'dead':
        return '';
      default:
        return '';
    }
  }

  getGenderIcon(gender: string): string {
    switch (gender.toLowerCase()) {
      case 'male':
        return '';
      case 'female':
        return '';
      case 'genderless':
        return '';
      default:
        return '';
    }
  }
}
