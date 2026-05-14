import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lisa } from './lisa';

describe('Lisa', () => {
  let component: Lisa;
  let fixture: ComponentFixture<Lisa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lisa],
    }).compileComponents();

    fixture = TestBed.createComponent(Lisa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
