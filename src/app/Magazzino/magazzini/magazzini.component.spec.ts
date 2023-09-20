import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazziniComponent } from './magazzini.component';

describe('MagazziniComponent', () => {
  let component: MagazziniComponent;
  let fixture: ComponentFixture<MagazziniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazziniComponent]
    });
    fixture = TestBed.createComponent(MagazziniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
