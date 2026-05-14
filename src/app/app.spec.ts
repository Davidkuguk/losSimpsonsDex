import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia crear la aplicacion', () => {
    const fixture = TestBed.createComponent(App);
    httpMock.expectOne('http://localhost:8000/api/personajes').flush([]);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deberia mostrar la portada de SimpsonsDex', async () => {
    const fixture = TestBed.createComponent(App);
    httpMock.expectOne('http://localhost:8000/api/personajes').flush([]);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('SimpsonsDex');
  });
});
