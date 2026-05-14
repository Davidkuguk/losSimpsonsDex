import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { SimpsonCharacter, SimpsonService } from '../../../core/simpson.service';
import { NuevoPersonajeComponent } from '../nuevo-personaje/nuevo-personaje.component';

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
  protected readonly characters$: Observable<SimpsonCharacter[]>;
  protected readonly isModalOpen = signal(false);

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
  }

  protected openModal(): void {
    this.isModalOpen.set(true);
  }

  protected closeModal(): void {
    this.isModalOpen.set(false);
  }

  protected trackCharacter(_index: number, character: SimpsonCharacter): string {
    return character.name;
  }
}
