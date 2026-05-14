import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { SimpsonCharacter, SimpsonService } from '../../../core/simpson.service';
import { NuevoPersonajeComponent } from '../nuevo-personaje/nuevo-personaje.component';

// Pequena ficha de historia que se muestra en el archivo de Springfield.
interface Story {
  badge: string;
  badgeClass: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-simpsons-dex-page',
  imports: [AsyncPipe, NuevoPersonajeComponent],
  templateUrl: './simpsons-dex-page.component.html',
})
export class SimpsonsDexPageComponent {
  // Flujo reactivo con los personajes disponibles en la coleccion.
  protected readonly characters$: Observable<SimpsonCharacter[]>;

  // Controla la apertura y cierre del modal de nuevo personaje.
  protected readonly isModalOpen = signal(false);

  // Historias estaticas para ambientar la pagina.
  protected readonly stories: Story[] = [
    {
      badge: 'Mision 01',
      badgeClass: 'text-bg-warning border border-dark',
      title: 'La familia principal',
      text: 'Homer, Marge, Bart y Lisa forman el nucleo inicial de la coleccion.',
    },
    {
      badge: 'Mision 02',
      badgeClass: 'text-bg-danger',
      title: 'Travesuras de Bart',
      text: 'Bart aparece como personaje de tipo hijo con fondo rojo de peligro.',
    },
    {
      badge: 'Mision 03',
      badgeClass: 'text-bg-dark',
      title: 'El jefe final',
      text: 'Mr. Burns representa el antagonista de la coleccion SimpsonsDex.',
    },
  ];

  constructor(private readonly simpsonService: SimpsonService) {
    this.characters$ = this.simpsonService.characters$;
    this.simpsonService.loadCharactersFromApi().pipe(
      catchError(() => of(this.simpsonService.getCharacters())),
    ).subscribe();
  }

  protected openModal(): void {
    this.isModalOpen.set(true);
  }

  protected closeModal(): void {
    this.isModalOpen.set(false);
  }

  // Evita recrear tarjetas cuando Angular vuelve a pintar la lista.
  protected trackCharacter(_index: number, character: SimpsonCharacter): string {
    return character.name;
  }
}
