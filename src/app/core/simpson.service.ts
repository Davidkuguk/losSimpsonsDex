import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';

// Modelo completo de un personaje ya registrado en la SimpsonsDex.
export interface SimpsonCharacter {
  id?: number;
  name: string;
  category: string;
  hairColor: string;
  status: string;
  image: string;
  alt: string;
  cardClass: string;
}

// Datos minimos que introduce el usuario al crear un personaje nuevo.
export interface NewSimpsonCharacter {
  name: string;
  category: string;
  hairColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class SimpsonService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/personajes`;

  // Personajes iniciales que aparecen al abrir la aplicacion.
  private readonly initialCharacters: SimpsonCharacter[] = [
    {
      name: 'Homer',
      category: 'Padre',
      hairColor: 'Calvo',
      status: 'Registrado',
      image: 'img/optimized/homero.png',
      alt: 'Homer Simpson',
      cardClass: 'bg-warning',
    },
    {
      name: 'Marge',
      category: 'Madre',
      hairColor: 'Azul',
      status: 'Desbloqueada',
      image: 'img/optimized/margepng.png',
      alt: 'Marge Simpson',
      cardClass: 'bg-primary text-white',
    },
    {
      name: 'Bart',
      category: 'Hijo',
      hairColor: 'Rubio',
      status: 'Registrado',
      image: 'img/optimized/bart.png',
      alt: 'Bart Simpson',
      cardClass: 'bg-danger text-white',
    },
    {
      name: 'Lisa',
      category: 'Hija',
      hairColor: 'Rubio',
      status: 'Desbloqueada',
      image: 'img/optimized/lisa.png',
      alt: 'Lisa Simpson',
      cardClass: 'bg-info',
    },
    {
      name: 'Mr. Burns',
      category: 'Antagonista',
      hairColor: 'Gris',
      status: 'Registrado',
      image: 'img/optimized/mrBurns.png',
      alt: 'Mr. Burns',
      cardClass: 'bg-dark text-white',
    },
    {
      name: 'Milhouse',
      category: 'Amigo',
      hairColor: 'Azul',
      status: 'Desbloqueado',
      image: 'img/optimized/milhouse.png',
      alt: 'Milhouse Van Houten',
      cardClass: 'bg-secondary text-white',
    },
    {
      name: 'Maggie',
      category: 'Familia',
      hairColor: 'Amarillo',
      status: 'Desbloqueado',
      image: 'img/optimized/maggie.png',
      alt: 'Maggie Simpson',
      cardClass: 'bg-warning text-white',
    },
  ];

  // BehaviorSubject mantiene la coleccion actual y avisa a la interfaz de los cambios.
  private readonly charactersSubject = new BehaviorSubject<SimpsonCharacter[]>(this.initialCharacters);
  readonly characters$ = this.charactersSubject.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  // Devuelve una copia de la coleccion para evitar modificaciones externas directas.
  getCharacters(): SimpsonCharacter[] {
    return [...this.charactersSubject.value];
  }

  // Carga personajes desde la API y actualiza el estado reactivo de la aplicacion.
  loadCharactersFromApi(): Observable<SimpsonCharacter[]> {
    return this.http.get<SimpsonCharacter[]>(this.apiUrl).pipe(
      map((characters) => this.mergeCharacters(this.initialCharacters, characters)),
      tap((characters) => this.charactersSubject.next(characters)),
    );
  }

  // Guarda el personaje en el backend y actualiza la coleccion con la respuesta de la API.
  createCharacter(character: NewSimpsonCharacter): Observable<SimpsonCharacter> {
    return this.http.post<SimpsonCharacter>(this.apiUrl, character).pipe(
      tap((createdCharacter) => {
        this.charactersSubject.next([...this.charactersSubject.value, createdCharacter]);
      }),
    );
  }

  // Anade un personaje usando una imagen por defecto y un color segun su pelo.
  addCharacter(character: NewSimpsonCharacter): boolean {
    if (!this.isValidCharacter(character)) {
      return false;
    }

    const newCharacter: SimpsonCharacter = {
      name: character.name.trim(),
      category: character.category.trim(),
      hairColor: character.hairColor.trim(),
      status: 'Registrado',
      image: 'img/optimized/casa.png',
      alt: character.name.trim(),
      cardClass: this.getCardClass(character.hairColor),
    };

    this.charactersSubject.next([...this.charactersSubject.value, newCharacter]);
    return true;
  }

  // Elimina un personaje por nombre y confirma si se ha encontrado.
  deleteCharacter(name: string): boolean {
    const normalizedName = name.trim().toLowerCase();
    const updatedCharacters = this.charactersSubject.value.filter(
      (character) => character.name.toLowerCase() !== normalizedName,
    );

    if (updatedCharacters.length === this.charactersSubject.value.length) {
      return false;
    }

    this.charactersSubject.next(updatedCharacters);
    return true;
  }

  // Elimina un personaje persistido en la API y sincroniza la coleccion local.
  deleteCharacterFromApi(character: SimpsonCharacter): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${character.id}`).pipe(
      tap(() => this.deleteCharacter(character.name)),
    );
  }

  // Elige la clase visual de Bootstrap a partir del color de pelo escrito.
  private getCardClass(hairColor: string): string {
    const normalizedColor = hairColor.trim().toLowerCase();

    if (normalizedColor.includes('azul')) {
      return 'bg-primary text-white';
    }

    if (normalizedColor.includes('gris') || normalizedColor.includes('negro')) {
      return 'bg-dark text-white';
    }

    if (normalizedColor.includes('rojo')) {
      return 'bg-danger text-white';
    }

    if (normalizedColor.includes('calvo')) {
      return 'bg-warning';
    }

    return 'bg-info';
  }

  // Mantiene los personajes base y suma los de la API sin repetir nombres.
  private mergeCharacters(
    baseCharacters: SimpsonCharacter[],
    apiCharacters: SimpsonCharacter[],
  ): SimpsonCharacter[] {
    const charactersByName = new Map<string, SimpsonCharacter>();

    for (const character of [...baseCharacters, ...apiCharacters]) {
      charactersByName.set(character.name.trim().toLowerCase(), character);
    }

    return Array.from(charactersByName.values());
  }

  // Rechaza registros incompletos para que no entren fichas vacias en la coleccion.
  private isValidCharacter(character: NewSimpsonCharacter): boolean {
    return Boolean(
      character.name.trim() &&
      character.category.trim() &&
      character.hairColor.trim(),
    );
  }
}
