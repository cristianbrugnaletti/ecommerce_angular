import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiClienteComponent } from './aggiungi-cliente.component';

describe('AggiungiClienteComponent', () => {
  let component: AggiungiClienteComponent;
  let fixture: ComponentFixture<AggiungiClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiClienteComponent]
    });
    fixture = TestBed.createComponent(AggiungiClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
