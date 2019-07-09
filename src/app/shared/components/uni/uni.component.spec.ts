import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniComponent } from './uni.component';

describe('UniComponent', () => {
  let component: UniComponent;
  let fixture: ComponentFixture<UniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
