import {Action} from '@ngrx/store';
import {WorkshopsActions, WorkshopsActionTypes} from './workshops.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {QuizModel} from '../../quizzes/models/quiz.model';
import {WorkshopModel} from '../../models/workshop.model';

export const adapter: EntityAdapter<WorkshopModel> = createEntityAdapter<WorkshopModel>();

export interface WorkshopsState extends EntityState<WorkshopModel> {
    loaded: boolean;
}

export const workshopsInitialState: WorkshopsState = adapter.getInitialState({
    loaded: false,
});


export function workshopsReducer(state = workshopsInitialState, action: WorkshopsActions): WorkshopsState {
    switch (action.type) {

        case WorkshopsActionTypes.LoadWorkshopss:
            return state;


        default:
            return state;
    }
}
