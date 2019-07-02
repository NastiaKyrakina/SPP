import { Action } from '@ngrx/store';

export enum QuizActionTypes {
  LoadQuizs = '[Quiz] Load Quizs'
}

export class LoadQuizs implements Action {
  readonly type = QuizActionTypes.LoadQuizs;
}

export type QuizActions = LoadQuizs;
