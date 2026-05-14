import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marge } from './marge';

describe('Marge', () => {
  let component: Marge;
  let fixture: ComponentFixture<Marge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marge],
    }).compileComponents();

    fixture = TestBed.createComponent(Marge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
