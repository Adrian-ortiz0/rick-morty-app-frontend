// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Character, FullCharacter } from '../interfaces/character.interface';
// import { Observable } from 'rxjs';

// const API_URL = 'https://rickandmortyapi.com/api';

// @Injectable({ providedIn: 'root' })
// export class RickMortyService {
//   private http = inject(HttpClient);

//   searchAllCharacters(page: number) {
//     return this.http.get<{
//       info: { pages: number; next: string | null };
//       results: Character[];
//     }>(`${API_URL}/character?page=${page}`);
//   }

//   searchCharacters(
//     page: number,
//     name?: string,
//     status?: string,
//     species?: string,
//   ) {
//     const params: any = { page };

//     if (name) params.name = name;
//     if (status) params.status = status;
//     if (species) params.species = species;

//     return this.http.get<{ info: any; results: Character[] }>(
//       'https://rickandmortyapi.com/api/character',
//       { params },
//     );
//   }
//   getCharacterById(id: number): Observable<FullCharacter> {
//     return this.http.get<FullCharacter>(`${API_URL}/character/${id}`);
//   }

//   getEpisode(url: string): Observable<{ name: string; episode: string; air_date: string }> {
//     return this.http.get<{ name: string; episode: string; air_date: string }>(url);
//   }
// }
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, FullCharacter } from '../interfaces/character.interface';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class RickMortyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/character`;

  searchCharacters(
    page: number,
    name?: string,
    status?: string,
    species?: string,
  ): Observable<{ info: any; results: Character[] }> {
    let params = new HttpParams().set('page', page.toString());

    if (name?.trim()) params = params.set('name', name.trim());
    if (status?.trim()) params = params.set('status', status.trim());
    if (species?.trim()) params = params.set('species', species.trim());

    return this.http.get<{ info: any; results: Character[] }>(this.apiUrl, { params });
  }

  getCharacterById(id: number): Observable<FullCharacter> {
    return this.http.get<FullCharacter>(`${this.apiUrl}/${id}`);
  }

  getEpisode(url: string): Observable<{ name: string; episode: string; air_date: string }> {
    const params = new HttpParams().set('url', url);
    return this.http.get<{ name: string; episode: string; air_date: string }>(`${this.apiUrl}/episode`, { params });
  }
}