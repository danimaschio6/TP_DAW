import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorEncuestasComponent } from './gestor-encuestas.component';

describe('GestorEncuestasComponent', () => {
  let component: GestorEncuestasComponent;
  let fixture: ComponentFixture<GestorEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorEncuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
