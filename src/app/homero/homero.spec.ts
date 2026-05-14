import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homero } from './homero';

describe('Homero', () => {
  let component: Homero;
  let fixture: ComponentFixture<Homero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homero],
    }).compileComponents();

    fixture = TestBed.createComponent(Homero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
