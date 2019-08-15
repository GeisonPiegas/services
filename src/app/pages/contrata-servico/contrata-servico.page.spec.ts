import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrataServicoPage } from './contrata-servico.page';

describe('ContrataServicoPage', () => {
  let component: ContrataServicoPage;
  let fixture: ComponentFixture<ContrataServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrataServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrataServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
