import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineFornitoreComponent } from './ordine-fornitore.component';

describe('OrdineFornitoreComponent', () => {
  let component: OrdineFornitoreComponent;
  let fixture: ComponentFixture<OrdineFornitoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdineFornitoreComponent]
    });
    fixture = TestBed.createComponent(OrdineFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
