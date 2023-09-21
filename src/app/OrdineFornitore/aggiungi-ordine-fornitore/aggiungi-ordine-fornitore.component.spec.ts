import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiOrdineFornitoreComponent } from './aggiungi-ordine-fornitore.component';

describe('AggiungiOrdineFornitoreComponent', () => {
  let component: AggiungiOrdineFornitoreComponent;
  let fixture: ComponentFixture<AggiungiOrdineFornitoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiOrdineFornitoreComponent]
    });
    fixture = TestBed.createComponent(AggiungiOrdineFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
