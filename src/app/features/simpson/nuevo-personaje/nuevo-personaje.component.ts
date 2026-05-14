import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewSimpsonCharacter, SimpsonService } from '../../../core/simpson.service';

@Component({
  selector: 'app-nuevo-personaje',
  imports: [FormsModule],
  templateUrl: './nuevo-personaje.component.html',
})
export class NuevoPersonajeComponent {
  // Eventos que informan al componente padre del cierre o guardado del formulario.
  @Output() readonly closeModal = new EventEmitter<void>();
  @Output() readonly characterCreated = new EventEmitter<void>();

  // Modelo enlazado a los campos del formulario.
  protected character: NewSimpsonCharacter = {
    name: '',
    category: '',
    hairColor: '',
  };

  constructor(private readonly simpsonService: SimpsonService) {
  }

  // Valida, normaliza y guarda el personaje en el servicio compartido.
  protected addCharacter(): void {
    if (!this.isValidCharacter()) {
      return;
    }

    this.simpsonService.createCharacter({
      name: this.character.name.trim(),
      category: this.character.category.trim(),
      hairColor: this.character.hairColor.trim(),
    }).subscribe(() => {
      this.characterCreated.emit();
    });
  }

  protected cancel(): void {
    this.closeModal.emit();
  }

  // Comprueba que los tres campos obligatorios tienen contenido real.
  private isValidCharacter(): boolean {
    return Boolean(
      this.character.name.trim() &&
      this.character.category.trim() &&
      this.character.hairColor.trim(),
    );
  }
}
