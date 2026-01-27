import { Character, FullCharacter } from '../interfaces/character.interface';
import { RESTCharacter } from '../interfaces/rest-character.interfaces';

export class CharacterMapper {
  static restCharacterToCharacter(restCharacter: RESTCharacter): Character {
    return {
      id: restCharacter.id,
      name: restCharacter.name,
      status: restCharacter.status,
      species: restCharacter.species,
      image: restCharacter.image,
      location: {
        name: restCharacter.location.name,
      },
      gender: restCharacter.gender,
    };
  }
  static mapRestCharactersToCharacters(restCharacters: RESTCharacter[]): Character[]{
    return restCharacters.map(this.restCharacterToCharacter);
  }
  static fullCharacterToCharacter(fullCharacter: RESTCharacter): FullCharacter {
    return {
      ...this.restCharacterToCharacter(fullCharacter),
      type: fullCharacter.type,
      origin: {
        name: fullCharacter.origin.name,
      },
      episode: fullCharacter.episode,
      url: fullCharacter.url,
      created: fullCharacter.created,
    };
  }
}
