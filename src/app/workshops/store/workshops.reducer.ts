import {Action, combineReducers} from '@ngrx/store';
import {WorkshopQuizAdded, WorkshopsActions, WorkshopsActionTypes} from './workshops.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {QuizModel} from '../../quizzes/models/quiz.model';
import {CommentModel, WorkshopModel} from '../../models/workshop.model';
import {Tag} from '../../models/additional.model';
import {UserModel} from '../../models/user.model';
import {selectWorkshopsState} from './workshops.selectors';

export const adapter: EntityAdapter<WorkshopModel> = createEntityAdapter<WorkshopModel>();
export const commentAdapter: EntityAdapter<CommentModel> = createEntityAdapter<CommentModel>();
export const quizzesAdapter: EntityAdapter<QuizModel> = createEntityAdapter<QuizModel>();

export interface WorkshopsState extends EntityState<WorkshopModel> {
    workshopLoaded: boolean;
    workshop: WorkshopModel | null;
    comments: EntityState<CommentModel>;
    quizzes: EntityState<QuizModel>;
    tags: Tag[] | null;
    users: Array<UserModel> | null;
    idForQuizzes: string | null;
}

export const workshopsInitialState: WorkshopsState = adapter.getInitialState({
    workshopLoaded: false,
    workshop: null,
    comments: commentAdapter.getInitialState({}),
    quizzes: quizzesAdapter.getInitialState({}),
    tags: null,
    users: null,
    idForQuizzes: null,
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

        case WorkshopsActionTypes.WorkshopDeleted:
            return adapter.removeOne(
                action.payload.workshopId, state);

        case WorkshopsActionTypes.WorkshopCommentsLoaded:
            return {
                ...state,
                comments: commentAdapter.addAll(action.payload.comments, state.comments),
            };

        case WorkshopsActionTypes.WorkshopQuizzesLoaded:
            return {
                ...state,
                quizzes: quizzesAdapter.addAll(action.payload.quizzes, state.quizzes),
            };

        case WorkshopsActionTypes.WorkshopCommentsCreated:
            return {
                ...state,
                comments: commentAdapter.addOne(action.payload.comment, state.comments),
            };

        case WorkshopsActionTypes.WorkshopCommentsUpdated:
            return {
                ...state,
                comments: commentAdapter.updateOne({
                    id: action.payload.commentId,
                    changes: action.payload.comment
                }, state.comments),
            };

        case WorkshopsActionTypes.WorkshopCommentsDeleted:
            return {
                ...state,
                comments: commentAdapter.removeOne(
                    action.payload.commentId, state.comments),
            };

        case WorkshopsActionTypes.TagsLoaded:
            return {
                ...state,
                tags: action.payload.tags,
            };

        case WorkshopsActionTypes.WorkshopIdSet:
            return {
                ...state,
                idForQuizzes: state.workshop ? state.workshop.id : null,
            };
        case WorkshopsActionTypes.WorkshopQuizAdded:
            return {
            ...state,
            quizzes: quizzesAdapter.addOne(
                action.payload.quiz, state.quizzes),
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
    selectAll: selectAllWorkshops
} = adapter.getSelectors();

export const {
    selectAll: selectAllComments
} = commentAdapter.getSelectors();

export const {
    selectAll: selectAllQuizzes,
    selectIds: selectQuizzesIds,
} = quizzesAdapter.getSelectors();
