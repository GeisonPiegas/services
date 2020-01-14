import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosConcluidosClientePage } from './servicos-concluidos-cliente.page';

describe('ServicosConcluidosClientePage', () => {
  let component: ServicosConcluidosClientePage;
  let fixture: ComponentFixture<ServicosConcluidosClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosConcluidosClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosConcluidosClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
