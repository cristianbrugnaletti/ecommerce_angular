import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiOrdineClienteComponent } from './aggiungi-ordine-cliente.component';

describe('AggiungiOrdineClienteComponent', () => {
  let component: AggiungiOrdineClienteComponent;
  let fixture: ComponentFixture<AggiungiOrdineClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiOrdineClienteComponent]
    });
    fixture = TestBed.createComponent(AggiungiOrdineClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
