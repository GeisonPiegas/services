import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicosPage } from './lista-servicos.page';

describe('ListaServicosPage', () => {
  let component: ListaServicosPage;
  let fixture: ComponentFixture<ListaServicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaServicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
