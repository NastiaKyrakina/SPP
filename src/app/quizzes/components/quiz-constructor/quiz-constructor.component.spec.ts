import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConstructorComponent } from './quiz-constructor.component';

describe('QuizConstructorComponent', () => {
  let component: QuizConstructorComponent;
  let fixture: ComponentFixture<QuizConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
