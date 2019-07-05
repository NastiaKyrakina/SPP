import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWorkshops from './workshops.reducer';
import {WorkshopsState} from './workshops.reducer';
import {WorkshopModel} from '../../models/workshop.model';

export const selectWorkshopsState = createFeatureSelector<fromWorkshops.WorkshopsState>('workshops');

export const selectWorkshops = createSelector(
    selectWorkshopsState,
    fromWorkshops.selectAllWorkshops
);

export const selectIsWorkshopLoaded = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshopLoaded
);

export const selectWorkshop = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshop
);


export const selectWorkshopCommentsState = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.comments,
);

export const selectWorkshopComments = createSelector(
    selectWorkshopCommentsState,
    fromWorkshops.selectAllComments
);

export const selectWorkshopQuizzesState = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.quizzes,
);

export const selectWorkshopQuizzes = createSelector(
    selectWorkshopQuizzesState,
    fromWorkshops.selectAllQuizzes
);

export const selectTags = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.tags
);

export const selectCurrentWorkshopTags = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => {
        if (!state.tags) {
            return [];
        }
        const tagsIds = state.workshop ? state.workshop.tags : [];
        return state.tags.filter(tag => tagsIds.includes(tag.seq));
    }
);


export const selectUsers = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.users
);

