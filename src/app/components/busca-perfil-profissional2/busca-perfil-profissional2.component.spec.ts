import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaPerfilProfissional2Component } from './busca-perfil-profissional2.component';

describe('BuscaPerfilProfissional2Component', () => {
  let component: BuscaPerfilProfissional2Component;
  let fixture: ComponentFixture<BuscaPerfilProfissional2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaPerfilProfissional2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaPerfilProfissional2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
