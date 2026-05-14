import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bart } from './bart';

describe('Bart', () => {
  let component: Bart;
  let fixture: ComponentFixture<Bart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bart],
    }).compileComponents();

    fixture = TestBed.createComponent(Bart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
