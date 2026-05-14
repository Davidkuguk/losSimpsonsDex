import { Component } from '@angular/core';

import { SimpsonsDexPageComponent } from './features/simpson/simpsons-dex-page/simpsons-dex-page.component';

@Component({
  selector: 'app-root',
  imports: [SimpsonsDexPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
