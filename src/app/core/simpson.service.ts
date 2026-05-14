import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SimpsonCharacter {
  name: string;
  category: string;
  hairColor: string;
  status: string;
  image: string;
  alt: string;
  cardClass: string;
}

export interface NewSimpsonCharacter {
  name: string;
  category: string;
  hairColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class SimpsonService {
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

  private readonly charactersSubject = new BehaviorSubject<SimpsonCharacter[]>(this.initialCharacters);
  readonly characters$ = this.charactersSubject.asObservable();

  addCharacter(character: NewSimpsonCharacter): void {
    const newCharacter: SimpsonCharacter = {
      ...character,
      status: 'Registrado',
      image: 'img/optimized/casa.png',
      alt: character.name,
      cardClass: this.getCardClass(character.hairColor),
    };

    this.charactersSubject.next([...this.charactersSubject.value, newCharacter]);
  }

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
}
