import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maggie } from './maggie';

describe('Maggie', () => {
  let component: Maggie;
  let fixture: ComponentFixture<Maggie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maggie],
    }).compileComponents();

    fixture = TestBed.createComponent(Maggie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
