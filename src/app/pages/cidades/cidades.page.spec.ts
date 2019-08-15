import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadesPage } from './cidades.page';

describe('CidadesPage', () => {
  let component: CidadesPage;
  let fixture: ComponentFixture<CidadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidadesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
