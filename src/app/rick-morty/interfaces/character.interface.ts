export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  location: Location;
}

export interface FullCharacter extends Character {
  type: string;
  origin: Location;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
}
