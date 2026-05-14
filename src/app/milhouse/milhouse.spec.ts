import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Milhouse } from './milhouse';

describe('Milhouse', () => {
  let component: Milhouse;
  let fixture: ComponentFixture<Milhouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Milhouse],
    }).compileComponents();

    fixture = TestBed.createComponent(Milhouse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
