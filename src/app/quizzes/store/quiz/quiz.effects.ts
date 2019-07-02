import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { QuizActionTypes } from './quiz.actions';

@Injectable()
export class QuizEffects {

  @Effect()
  loadQuizs$ = this.actions$.pipe(ofType(QuizActionTypes.LoadQuizs));

  constructor(private actions$: Actions) {}
}
