import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Arranca la aplicacion principal de Angular con su configuracion global.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
