import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerGroupComponent } from './answer-group.component';

describe('AnswerGroupComponent', () => {
  let component: AnswerGroupComponent;
  let fixture: ComponentFixture<AnswerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
