import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCidadePage } from './details-cidade.page';

describe('DetailsCidadePage', () => {
  let component: DetailsCidadePage;
  let fixture: ComponentFixture<DetailsCidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
