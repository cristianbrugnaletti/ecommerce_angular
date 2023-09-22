import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaFornitoreComponent } from './modifica-fornitore.component';

describe('ModificaFornitoreComponent', () => {
  let component: ModificaFornitoreComponent;
  let fixture: ComponentFixture<ModificaFornitoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaFornitoreComponent]
    });
    fixture = TestBed.createComponent(ModificaFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
