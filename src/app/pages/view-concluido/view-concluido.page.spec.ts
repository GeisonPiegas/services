import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConcluidoPage } from './view-concluido.page';

describe('ViewConcluidoPage', () => {
  let component: ViewConcluidoPage;
  let fixture: ComponentFixture<ViewConcluidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConcluidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConcluidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
