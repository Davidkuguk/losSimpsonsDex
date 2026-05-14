import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewSimpsonCharacter, SimpsonService } from '../../../core/simpson.service';

@Component({
  selector: 'app-nuevo-personaje',
  imports: [FormsModule],
  templateUrl: './nuevo-personaje.component.html',
})
export class NuevoPersonajeComponent {
  @Output() readonly closeModal = new EventEmitter<void>();
  @Output() readonly characterCreated = new EventEmitter<void>();

  protected character: NewSimpsonCharacter = {
    name: '',
    category: '',
    hairColor: '',
  };

  constructor(private readonly simpsonService: SimpsonService) {
  }

  protected addCharacter(): void {
    if (!this.isValidCharacter()) {
      return;
    }

    this.simpsonService.addCharacter({
      name: this.character.name.trim(),
      category: this.character.category.trim(),
      hairColor: this.character.hairColor.trim(),
    });

    this.characterCreated.emit();
  }

  protected cancel(): void {
    this.closeModal.emit();
  }

  private isValidCharacter(): boolean {
    return Boolean(
      this.character.name.trim() &&
      this.character.category.trim() &&
      this.character.hairColor.trim(),
    );
  }
}
