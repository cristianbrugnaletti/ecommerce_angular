import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaFornitoreComponent } from './elimina-fornitore.component';

describe('EliminaFornitoreComponent', () => {
  let component: EliminaFornitoreComponent;
  let fixture: ComponentFixture<EliminaFornitoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminaFornitoreComponent]
    });
    fixture = TestBed.createComponent(EliminaFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
