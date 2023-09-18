import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiFornitoreComponent } from './aggiungi-fornitore.component';

describe('AggiungiFornitoreComponent', () => {
  let component: AggiungiFornitoreComponent;
  let fixture: ComponentFixture<AggiungiFornitoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiFornitoreComponent]
    });
    fixture = TestBed.createComponent(AggiungiFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
