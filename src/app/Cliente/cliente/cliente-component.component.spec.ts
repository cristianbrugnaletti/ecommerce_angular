import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteComponentComponent } from './cliente-component.component';

describe('ClienteComponentComponent', () => {
  let component: ClienteComponentComponent;
  let fixture: ComponentFixture<ClienteComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteComponentComponent]
    });
    fixture = TestBed.createComponent(ClienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
