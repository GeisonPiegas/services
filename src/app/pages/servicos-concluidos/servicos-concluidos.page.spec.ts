import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosConcluidosPage } from './servicos-concluidos.page';

describe('ServicosConcluidosPage', () => {
  let component: ServicosConcluidosPage;
  let fixture: ComponentFixture<ServicosConcluidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosConcluidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosConcluidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
