import {Action} from '@ngrx/store';
import {WorkshopsActions, WorkshopsActionTypes} from './workshops.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {QuizModel} from '../../quizzes/models/quiz.model';
import {CommentModel, WorkshopModel} from '../../models/workshop.model';
import {Tag} from '../../models/additional.model';
import {UserModel} from '../../models/user.model';

export const adapter: EntityAdapter<WorkshopModel> = createEntityAdapter<WorkshopModel>();

export interface WorkshopsState extends EntityState<WorkshopModel> {
    workshopLoaded: boolean;
    workshop: WorkshopModel | null;
    tags: Tag[] | null;
    users: Array<UserModel> | null;
}

export const workshopsInitialState: WorkshopsState = adapter.getInitialState({
    workshopLoaded: false,
    workshop: null,
    tags: null,
    users: null,
});


export function workshopsReducer(state = workshopsInitialState, action: WorkshopsActions): WorkshopsState {
    switch (action.type) {

        case WorkshopsActionTypes.WorkshopsLoaded:
            return adapter.addAll(action.payload.workshops, state);

        case WorkshopsActionTypes.WorkshopLoaded:
            return {
                ...state,
                workshopLoaded: true,
                workshop: action.payload.workshop,
            };

        case WorkshopsActionTypes.WorkshopCommentsLoaded:
            return {
                ...state,
                workshop: {
                    ...state.workshop,
                    comments: action.payload.comments,
                },
            };

        case WorkshopsActionTypes.UsersLoaded:
            return {
                ...state,
                users: action.payload.users,
            };
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
