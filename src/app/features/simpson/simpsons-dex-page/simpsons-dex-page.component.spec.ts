import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpsonCharacter, SimpsonService } from '../../../core/simpson.service';
import { SimpsonsDexPageComponent } from './simpsons-dex-page.component';

describe('SimpsonsDexPageComponent', () => {
  let fixture: ComponentFixture<SimpsonsDexPageComponent>;
  let service: SimpsonService;
  let httpMock: HttpTestingController;

  const apiCharacters: SimpsonCharacter[] = [
    {
      name: 'Moe Szyslak',
      category: 'Tabernero',
      hairColor: 'Gris',
      status: 'Registrado',
      image: 'img/optimized/casa.png',
      alt: 'Moe Szyslak',
      cardClass: 'bg-dark text-white',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpsonsDexPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpsonsDexPageComponent);
    service = TestBed.inject(SimpsonService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne('http://localhost:8000/api/personajes').flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia crearse correctamente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deberia reaccionar a los personajes recibidos por HTTP simulado', async () => {
    fixture.detectChanges();

    service.loadCharactersFromApi().subscribe();

    const request = httpMock.expectOne('http://localhost:8000/api/personajes');
    expect(request.request.method).toBe('GET');
    request.flush(apiCharacters);

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Moe Szyslak');
    expect(compiled.textContent).toContain('Tabernero');
  });
});
