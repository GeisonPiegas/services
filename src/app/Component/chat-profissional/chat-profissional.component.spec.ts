import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponentProfissional } from './chat-profissional.component';

describe('ChatComponent-profissional', () => {
  let component: ChatComponentProfissional;
  let fixture: ComponentFixture<ChatComponentProfissional>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponentProfissional ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponentProfissional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
