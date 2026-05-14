import { Component } from '@angular/core';

import { SimpsonsDexPageComponent } from './features/simpson/simpsons-dex-page/simpsons-dex-page.component';

// Componente raiz: muestra la pagina principal de SimpsonsDex.
@Component({
  selector: 'app-root',
  imports: [SimpsonsDexPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
