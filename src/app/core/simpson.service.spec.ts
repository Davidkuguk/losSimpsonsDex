import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SimpsonCharacter, SimpsonService } from './simpson.service';

describe('SimpsonService', () => {
  let service: SimpsonService;
  let httpMock: HttpTestingController;

  const apiCharacters: SimpsonCharacter[] = [
    {
      name: 'Ned Flanders',
      category: 'Vecino',
      hairColor: 'Marron',
      status: 'Registrado',
      image: 'img/optimized/casa.png',
      alt: 'Ned Flanders',
      cardClass: 'bg-info',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(SimpsonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener la lista inicial de personajes', () => {
    const characters = service.getCharacters();

    expect(characters.length).toBeGreaterThan(0);
    expect(characters.some((character) => character.name === 'Homer')).toBe(true);
  });

  it('deberia anadir un personaje valido', () => {
    const initialTotal = service.getCharacters().length;

    const wasAdded = service.addCharacter({
      name: 'Krusty',
      category: 'Presentador',
      hairColor: 'Verde',
    });

    const characters = service.getCharacters();

    expect(wasAdded).toBe(true);
    expect(characters.length).toBe(initialTotal + 1);
    expect(characters.at(-1)).toEqual(expect.objectContaining({
      name: 'Krusty',
      category: 'Presentador',
      hairColor: 'Verde',
      status: 'Registrado',
    }));
  });

  it('deberia eliminar un personaje existente', () => {
    const initialTotal = service.getCharacters().length;

    const wasDeleted = service.deleteCharacter('Bart');

    expect(wasDeleted).toBe(true);
    expect(service.getCharacters().length).toBe(initialTotal - 1);
    expect(service.getCharacters().some((character) => character.name === 'Bart')).toBe(false);
  });

  it('deberia rechazar personajes con datos vacios', () => {
    const initialTotal = service.getCharacters().length;

    const wasAdded = service.addCharacter({
      name: '   ',
      category: 'Villano',
      hairColor: '',
    });

    expect(wasAdded).toBe(false);
    expect(service.getCharacters().length).toBe(initialTotal);
  });

  it('deberia mezclar los personajes base con los recibidos desde la API simulada', () => {
    let receivedCharacters: SimpsonCharacter[] = [];

    service.loadCharactersFromApi().subscribe((characters) => {
      receivedCharacters = characters;
    });

    const request = httpMock.expectOne('http://localhost:8000/api/personajes');
    expect(request.request.method).toBe('GET');
    request.flush(apiCharacters);

    expect(receivedCharacters.some((character) => character.name === 'Homer')).toBe(true);
    expect(receivedCharacters.some((character) => character.name === 'Ned Flanders')).toBe(true);
    expect(service.getCharacters()).toEqual(receivedCharacters);
  });
});
