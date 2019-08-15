import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfissaoPage } from './new-profissao.page';

describe('NewProfissaoPage', () => {
  let component: NewProfissaoPage;
  let fixture: ComponentFixture<NewProfissaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProfissaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfissaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
