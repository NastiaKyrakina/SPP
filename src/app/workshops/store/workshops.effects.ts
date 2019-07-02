import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WorkshopsActionTypes } from './workshops.actions';

@Injectable()
export class WorkshopsEffects {

  @Effect()
  loadWorkshopss$ = this.actions$.pipe(ofType(WorkshopsActionTypes.LoadWorkshopss));

  constructor(private actions$: Actions) {}
}
