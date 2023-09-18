import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiComponentComponent } from './prodotti-component.component';

describe('ProdottiComponentComponent', () => {
  let component: ProdottiComponentComponent;
  let fixture: ComponentFixture<ProdottiComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdottiComponentComponent]
    });
    fixture = TestBed.createComponent(ProdottiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
