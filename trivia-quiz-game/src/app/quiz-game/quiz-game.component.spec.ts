import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGameComponent } from './quiz-game.component';

describe('QuizGameComponent', () => {
  let component: QuizGameComponent;
  let fixture: ComponentFixture<QuizGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizGameComponent]
    });
    fixture = TestBed.createComponent(QuizGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
