import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornitoriComponentComponent } from './fornitori-component.component';

describe('FornitoriComponentComponent', () => {
  let component: FornitoriComponentComponent;
  let fixture: ComponentFixture<FornitoriComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornitoriComponentComponent]
    });
    fixture = TestBed.createComponent(FornitoriComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
