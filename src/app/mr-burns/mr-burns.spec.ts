import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrBurns } from './mr-burns';

describe('MrBurns', () => {
  let component: MrBurns;
  let fixture: ComponentFixture<MrBurns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrBurns],
    }).compileComponents();

    fixture = TestBed.createComponent(MrBurns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
